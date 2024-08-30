import { Component, OnInit } from '@angular/core';
import { OptaplannerService } from '../../services/optaplanner/optaplanner.service';
import { CommonModule, NgClass } from '@angular/common';
import { TimetableData, Session } from '../../models/timetable.model';
@Component({
  selector: 'ssi-sx-timetable',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent implements OnInit {
  timetableData: TimetableData | null = null;
  filteredSessions: Session[] = [];
  
  ngOnInit() {
    const storedData = localStorage.getItem('timetableData');
    if (storedData) {
      this.timetableData = JSON.parse(storedData);
    }
  }

  constructor(private optaplannerSerice: OptaplannerService){}
  generateTimetable(): void {
    this.optaplannerSerice.startSolving().subscribe(() => {
      this.optaplannerSerice.getTimetable().subscribe(data => {
        this.storeTimetableData(data);
      });
    });
  }

  storeTimetableData(data: any): void {
    localStorage.setItem('timetableData', JSON.stringify(data));
  }

  onClassChange(event: Event) {
    const classId = (event.target as HTMLSelectElement).value;
    if (this.timetableData) {
      this.filteredSessions = this.timetableData.sessionList.filter(
        session => session.classEntity.id === Number(classId)
      );
    }
  }

  onTeacherChange(event: Event) {
    const teacherId = (event.target as HTMLSelectElement).value;
    if (this.timetableData) {
      this.filteredSessions = this.timetableData.sessionList.filter(
        session => session.teacher.id === Number(teacherId)
      );
    }
  }
}
