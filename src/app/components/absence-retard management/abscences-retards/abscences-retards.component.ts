import { Component, OnInit } from '@angular/core';
import { ClassServiceService } from '../../../services/class/class-service.service';
import { Class } from '../../../model/class';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../models/student/student';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbsenceService } from '../../../services/absence/absence.service';
import { RetardService } from '../../../services/retard/retard.service';
import { Absence } from '../../../models/absence.model';
import { Retard } from '../../../models/retard.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReasonDialogComponent } from '../reason-dialog/reason-dialog.component';
import {DetailsDialogComponentComponent} from '../details-dialog-component/details-dialog-component.component'

@Component({
  selector: 'ssi-sx-abscences-retards',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './abscences-retards.component.html',
  styleUrls: ['./abscences-retards.component.scss']
})
export class AbscencesRetardsComponent implements OnInit {
  classes: Class[] = [];
  form: FormGroup;
  alertMessage: string | null = null;
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;
  students: Student[] = [];
  paginatedStudents: Student[] = [];

  // Store checked states
  checkedAbsences: { [studentId: number]: boolean } = {};
  checkedTardiness: { [studentId: number]: boolean } = {};

  constructor(
    private classService: ClassServiceService,
    private studentService: StudentService,
    private absenceService: AbsenceService,
    private retardService: RetardService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    const today = new Date().toISOString().split('T')[0];
    this.form = this.fb.group({
      classId: [''],
      date: [today, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClasses();
    this.loadAllStudents(this.currentPage);
    const initialDate = this.form.get('date')?.value;
    this.loadAbsencesAndTardinessByDate(initialDate);

    this.form.get('classId')?.valueChanges.subscribe(classId => {
      if (classId) {
        this.studentService.getStudentsByClassId(classId).subscribe(students => {
          this.students = students;
          this.totalPages = Math.ceil(students.length / this.pageSize);
          this.updatePaginatedStudents();
        });
      } else {
        this.loadAllStudents(this.currentPage);
      }
    });

    this.form.get('date')?.valueChanges.subscribe(date => {
      this.loadAbsencesAndTardinessByDate(date);
    });
  }

  loadAbsencesAndTardinessByDate(date: string): void {
    this.absenceService.getAbsencesByDate(date).subscribe((absences: Absence[]) => {
      this.checkedAbsences = {};
      absences.forEach(absence => {
        this.checkedAbsences[absence.studentId] = true;
      });

      this.retardService.getRetardsByDate(date).subscribe((retards: Retard[]) => {
        this.checkedTardiness = {};
        retards.forEach(retard => {
          this.checkedTardiness[retard.studentId] = true;
        });

        this.updatePaginatedStudents();
      });
    });
  }

  loadAllStudents(page: number): void {
    this.studentService.getStudents(page, this.pageSize).subscribe(response => {
      if (response && response.content) {
        this.students = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = page;
        this.updatePaginatedStudents();
      }
    });
  }

  updatePaginatedStudents(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedStudents = this.students.slice(start, end);

    // Restore checked states from stored values and disable checkboxes
    this.paginatedStudents.forEach(student => {
      student.absenceChecked = this.checkedAbsences[student.id] || false;
      student.absenceDisabled = !!this.checkedAbsences[student.id];
      student.tardinessChecked = this.checkedTardiness[student.id] || false;
      student.tardinessDisabled = !!this.checkedTardiness[student.id];
    });
  }

  openReasonDialog(student: Student): void {
    const dialogRef = this.dialog.open(ReasonDialogComponent, {
      data: { 
        studentId: student.id, 
        date: this.form.get('date')?.value,
        absenceChecked: this.checkedAbsences[student.id] || false,
        retardChecked: this.checkedTardiness[student.id] || false
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

  toggleAbsence(studentId: number): void {
    if (!this.checkedAbsences[studentId]) {
      this.checkedAbsences[studentId] = !this.checkedAbsences[studentId];
    }
  }

  toggleTardiness(studentId: number): void {
    if (!this.checkedTardiness[studentId]) {
      this.checkedTardiness[studentId] = !this.checkedTardiness[studentId];
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedStudents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedStudents();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedStudents();
  }

  loadClasses(): void {
    this.classService.getAllClasses().subscribe(classes => {
      this.classes = classes;
    });
  }

  onSubmit(): void {
    const date = this.form.get('date')?.value;
    let submissionSuccess = true;
  
    const studentIds = Array.from(new Set([
      ...Object.keys(this.checkedAbsences),
      ...Object.keys(this.checkedTardiness)
    ]));
  
    studentIds.forEach(studentId => {
      const student = this.students.find(student => student.id === Number(studentId));
  
      if (student) {
        if (this.checkedAbsences[student.id] && !student.absenceDisabled) {
          const absence = {
            studentId: student.id,
            date: date,
            reason: student.absenceReason || 'Absence'
          };
          this.absenceService.addAbsence(absence).subscribe({
            error: () => submissionSuccess = false
          });
        }
  
        if (this.checkedTardiness[student.id] && !student.tardinessDisabled) {
          const retard = {
            studentId: student.id,
            date: date,
            reason: student.tardinessReason || 'Retard'
          };
          this.retardService.addRetard(retard).subscribe({
            error: () => submissionSuccess = false
          });
        }
      }
    });
  
    if (submissionSuccess) {
      this.alertMessage = "Les absences et retards ont été enregistrés avec succès.";
      this.resetNewCheckedStates();
    } else {
      this.alertMessage = "Erreur lors de l'enregistrement des absences et retards.";
    }
  
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }
  

  resetNewCheckedStates(): void {
    this.paginatedStudents.forEach(student => {
      if (!student.absenceDisabled) {
        student.absenceChecked = false;
      }
      if (!student.tardinessDisabled) {
        student.tardinessChecked = false;
      }
    });

    this.updatePaginatedStudents();
  }


viewDetails(student: Student): void {
  this.absenceService.getAbsencesByStudentId(student.id).subscribe(absences => {
    this.retardService.getRetardsByStudentId(student.id).subscribe(retards => {
      const dialogRef = this.dialog.open(DetailsDialogComponentComponent, { 
        width: '600px',
        data: { absences: absences, retards: retards }
      });
    });
  });
}


}
