import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { EditStudentComponent } from '../StudentEdit/edit-student.component';
import { Student } from '../../../models/student/student';
import { StudentService } from '../../../services/student/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'ssi-sx-student',
  templateUrl: './student.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, StudentDetailsComponent,StudentFormComponent],
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  selectedStudent?: Student;
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;

  constructor(private studentService: StudentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadStudents(this.currentPage);
  }

  loadStudents(page: number): void {
    this.studentService.getStudents(page, this.pageSize).subscribe(response => {
      if (response && response.content) {
        this.students = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = page;
      } 
    });
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadStudents(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadStudents(this.currentPage + 1);
    }
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents(this.currentPage);
      });
    }
  }

  viewStudent(student: Student): void {
    this.dialog.open(StudentDetailsComponent, {
      data: student
    });
  }

  openInscriptionModal(): void {
    const dialogRef = this.dialog.open(StudentFormComponent);

    dialogRef.componentInstance.studentAdded.subscribe(() => {
      this.loadStudents(this.currentPage);
    });
  }

  editStudent(student: Student): void {
    this.dialog.open(EditStudentComponent, {
      data: student
    }).afterClosed().subscribe(() => {
      this.loadStudents(this.currentPage);
    });
  }
}
