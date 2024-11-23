import { Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Class } from '../../../model/class'
import { ClassServiceService } from '../../../services/class/class-service.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'ssi-sx-add-class',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.scss'
})
export class AddClassComponent {

  
  constructor(private fb: FormBuilder,
    private classService: ClassServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddClassComponent>,
             ) {}

  authForm: FormGroup = this.fb.group({});
  className: string = '';
  nbOfStudents: number=0;
  
  ngOnInit(): void {
    this.authForm = this.fb.group({
      nameClass: ['', [Validators.required]],
      nbOfStudent: ['', [Validators.required,Validators.max(30)]]
    });
  }

  onSubmit():void {

    if(this.authForm.valid){

      const newClass: Class = {
        id: 0, 
        name: this.className,
        nbOfStudents: this.nbOfStudents
      };
      
      this.classService.createClass(newClass).subscribe(
        (response) => {
          this.dialogRef.close();
         this.openSuccessDialog('Success', 'New class was added successfully!')
        },
        (error) => {
          console.error('Error creating class:', error);
        }
      );
    }
  }

  //  Method to handle the opening of a successDialog

openSuccessDialog(title: string, message: string): void {
  this.dialog.open(SuccessDialogComponent, {
    width: '300px',
    data: { title, message }
  });
}

//closedialog

closeDialog(): void {
  this.dialogRef.close();
}

}
