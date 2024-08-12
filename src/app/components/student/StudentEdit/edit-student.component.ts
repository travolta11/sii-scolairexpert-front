import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../models/student/student';
import { Gender } from '../../../enum/gender.enum';
import { Level } from '../../../enum/level.enum';
import { ParentService } from '../../../services/parent/parent.service';

@Component({
  selector: 'ssi-sx-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent {
  studentForm: FormGroup;
  student!: Student;
  genders = Gender;
  levels = Level;
  parents: any[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private parentService: ParentService,
    private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentForm = this.fb.group({
      firstName: [data?.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [data?.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: [data?.email, [Validators.required, Validators.email]],
      phoneNumber: [data?.phoneNumber, [Validators.pattern('^[0-9]{10}$')]],
      address: [data?.address, Validators.required],
      zipCode: [data?.zipCode],
      dateOfBirth: [data?.dateOfBirth],
      gender: [data?.gender, Validators.required],
      level: [data?.level, Validators.required],
      classe: [data?.classe, Validators.required],
      parentId: [data?.parentId, Validators.required]
    });

    this.loadParents();
  }

  loadParents(): void {
    const page = 0;
    const size = 10;
    this.parentService.getParents(page, size).subscribe(response => {
      this.parents = response.content;
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      studentData.id = this.data.id;
      this.studentService.updateStudent(studentData).subscribe(response => {
        this.dialogRef.close();
      });
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
