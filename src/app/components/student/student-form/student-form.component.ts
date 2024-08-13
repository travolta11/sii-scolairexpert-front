import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ParentService } from '../../../services/parent/parent.service'; 
import { StudentService } from '../../../services/student/student.service'; 
import { CommonModule } from '@angular/common';
import { Gender } from '../../../enum/gender.enum';
import { Level } from '../../../enum/level.enum';
import { ParentFormComponent } from '../../parent/parent-form/parent-form.component';

@Component({
  selector: 'ssi-sx-student-form',
  templateUrl: './student-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, ParentFormComponent],
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  @Output() studentAdded = new EventEmitter<void>();
  emailExistsMessage: string = '';
  phoneExistsMessage: string = '';
  
  studentForm!: FormGroup;
  genders = Gender;
  levels = Level;
  parents: any[] = []; 
  parentNotFound = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    private parentService: ParentService,
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      zipCode: [''],
      dateOfBirth: [''],
      gender: ['', Validators.required],
      level: ['', Validators.required],
      classe: ['', Validators.required],
      cin: ['', Validators.required] ,
      parentId: ['']
    });

  }


  onSubmit(): void {
    if (this.studentForm.valid) {
      const cin = this.studentForm.get('cin')?.value;
      const email = this.studentForm.get('email')?.value;
      const phone = this.studentForm.get('phoneNumber')?.value;
      this.checkEmailExists(email, () => {
        this.checkPhoneExists(phone, () => {
      this.parentService.getParentByCin(cin).subscribe(parent => {
        if (parent) {
          this.studentForm.get('parentId')?.setValue(parent.id);
          this.studentService.addStudent(this.studentForm.value).subscribe(response => {
            this.studentAdded.emit();
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
    this.studentService.checkEmailExists(email).subscribe(exists => {
      if (exists) {
        this.emailExistsMessage = 'Email already exists.';
      } else {
        this.emailExistsMessage = '';
        onSuccess();
      }
    });
  }

  private checkPhoneExists(phone: string, onSuccess: () => void): void {
    this.studentService.checkPhoneExists(phone).subscribe(exists => {
      if (exists) {
        this.phoneExistsMessage = 'Phone number already exists.';
      } else {
        this.phoneExistsMessage = '';
        onSuccess();
      }
    });
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
