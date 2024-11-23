import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../../../services/Teacher/teacher.service';
import { Teacher } from '../../../model/Teacher/teacher';


@Component({
  selector: 'ssi-sx-edit-teacher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-teacher.component.html',
  styleUrl: './edit-teacher.component.scss'
})
export class EditTeacherComponent implements OnChanges {

  @Input() teacherId: number | null = null;

  @Output() teacherUpdated = new EventEmitter<void>();

  userForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private teacherService: TeacherService) {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNo: new FormControl('', Validators.required)
    });
  }
  ngOnChanges() {
    if (this.teacherId !== null) {
      this.teacherService.getTeacherById(this.teacherId).subscribe(teacher => {
        this.userForm.patchValue(teacher);
      });
    }
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.valid) {
      const updatedTeacher: Teacher = this.userForm.value;
      if (this.teacherId) {
        this.teacherService.updateTeacher(this.teacherId, updatedTeacher).subscribe(response => {
          console.log('Teacher updated:', response);
          this.teacherUpdated.emit(); 
        });
      }
    }
  }
}