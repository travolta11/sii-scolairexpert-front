import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../../model/Teacher/teacher';
import { TeacherService } from '../../../services/Teacher/teacher.service';
@Component({
  selector: 'ssi-sx-view-teacher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.scss'
})
export class ViewTeacherComponent implements OnChanges {
  @Input() teacherId: number | null = null;
  teacher: Teacher | null = null;

  constructor(private teacherService: TeacherService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teacherId'] && this.teacherId !== null) {
      this.loadTeacher();
    }
  }

  ngOnInit(): void {
    const modalElement = document.getElementById('viewTeacherModal');
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.loadTeacher();
      });
    }
  }

  private loadTeacher() {
    if (this.teacherId !== null) {
      this.teacherService.getTeacherById(this.teacherId).subscribe(teacher => {
        this.teacher = teacher;
      });
    }
  }
}