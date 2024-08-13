import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../models/student/student';
import { Gender } from '../../../enum/gender.enum';
import { Level } from '../../../enum/level.enum';
import { ParentService } from '../../../services/parent/parent.service';
import { ClassServiceService } from '../../../services/class/class-service.service';
import { Class } from '../../../model/class';
import { ParentFormComponent } from '../../parent/parent-form/parent-form.component';

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
  emailExistsMessage: string = '';
  phoneExistsMessage: string = '';
  classes: Class[] = []; 
  parentNotFound = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private parentService: ParentService,
    private classService: ClassServiceService,
    private dialogRef: MatDialogRef<EditStudentComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.classService.getAllClasses().subscribe(classes => {
      this.classes = classes;
    });
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
      classId: [data?.classId, Validators.required],
      cin:['', Validators.required],
      parentId: [data?.parentId, Validators.required]
    });
    if (data?.parentId) {
      this.parentService.getParentById(data.parentId).subscribe(parent => {
        if (parent) {
          this.studentForm.patchValue({
            cin: parent.cin,
            parentId: parent.id
          });
        }
      });
    }
  }


  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      const studentId = this.data?.id;
      const cin = this.studentForm.get('cin')?.value;
      const email = this.studentForm.get('email')?.value;
      const phone = this.studentForm.get('phoneNumber')?.value;
      this.checkEmailExists(email, () => {
        this.checkPhoneExists(phone, () => {
      this.parentService.getParentByCin(cin).subscribe(parent => {
        if (parent) {
          this.studentForm.get('parentId')?.setValue(parent.id);
          studentData.id = studentId;
          this.studentService.updateStudent(studentData).subscribe(response => {
            this.dialogRef.close();
          });
        } else {
          this.parentNotFound = true;
        }
      }, error => {
        console.error('Error fetching parent by CIN', error);
        this.parentNotFound = true;
      });
    } );
  });}else {
      this.studentForm.markAllAsTouched();
    }
  }

  private checkEmailExists(email: string, onSuccess: () => void): void {
    const currentEmail = this.data?.email;
    
    if (email === currentEmail) {
        this.emailExistsMessage = '';
        onSuccess();
    } else {
        this.studentService.checkEmailExists(email).subscribe(exists => {
            if (exists) {
                this.emailExistsMessage = 'Email already exists.';
            } else {
                this.emailExistsMessage = '';
                onSuccess();
            }
        });
    }
}

private checkPhoneExists(phone: string, onSuccess: () => void): void {
  const currentPhone = this.data?.phoneNumber;
  
  if (phone === currentPhone) {
      this.phoneExistsMessage = '';
      onSuccess();
  } else {
      this.studentService.checkPhoneExists(phone).subscribe(exists => {
          if (exists) {
              this.phoneExistsMessage = 'Phone number already exists.';
          } else {
              this.phoneExistsMessage = '';
              onSuccess();
          }
      });
  }
}


  closeDialog(): void {
    this.dialogRef.close();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ParentFormComponent);

  dialogRef.componentInstance.parentAdded.subscribe((newParentCIN: string) => {
    this.studentForm.get('cin')?.setValue(newParentCIN);
  });
  }
}
