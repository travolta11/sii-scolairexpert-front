import { Component } from '@angular/core';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ssi-sx-list-teacher',
  standalone: true,
  imports: [AddTeacherComponent, CommonModule],
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent {
  teachers: any[] = [
    { fullName: 'John Doe', email: 'john.doe@example.com', phoneNo: '658 799 8941' },
    { fullName: 'Jane Smith', email: 'jane.smith@example.com', phoneNo: '123 456 7890' }
  ];

  constructor() {}

  
}
