import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'ssi-sx-add-teacher',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.scss'
})
export class AddTeacherComponent {
 userForm : FormGroup ; 
 isFormSubmitted: boolean = false ; 
 constructor(){
  this.userForm = new FormGroup({
    fullName : new FormControl("",[Validators.required]),
    email : new FormControl("",[Validators.required,Validators.email]),
    phoneNo : new FormControl("",Validators.required)
  })
 }
 onSubmit(){
  const isFormValid = this.userForm.valid;
  debugger ; 
  this.isFormSubmitted = true ;
 }
 onCancel() {
  this.userForm.reset();
  this.isFormSubmitted = false;
}

}
