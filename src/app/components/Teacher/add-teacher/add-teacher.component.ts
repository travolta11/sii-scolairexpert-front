import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/Teacher/teacher.service';
import { Teacher } from '../../../model/Teacher/teacher';

@Component({
  selector: 'ssi-sx-add-teacher',
  templateUrl: './add-teacher.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent {
  userForm: FormGroup;
  isFormSubmitted: boolean = false;


  @Output() teacherAdded = new EventEmitter<void>();


  constructor(private teacherService: TeacherService) {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNo: new FormControl('', Validators.required)
    });
  }

  onSubmit() {    
    this.isFormSubmitted = true;
    if (this.userForm.valid) {
      const newTeacher: Teacher = this.userForm.value;
      this.teacherService.addTeacher(newTeacher).subscribe(response => {
        this.teacherAdded.emit(); 
      });
    }
    
  }

  onCancel() {
    this.userForm.reset();
    this.isFormSubmitted = false;
  }

 
}

