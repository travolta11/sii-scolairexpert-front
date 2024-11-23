import { Component, OnInit } from '@angular/core';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
 
import { CommonModule } from '@angular/common';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
import { ViewTeacherComponent } from '../view-teacher/view-teacher.component';
import { Teacher } from '../../../model/Teacher/teacher';
import { TeacherService } from '../../../services/Teacher/teacher.service';

@Component({
  selector: 'ssi-sx-list-teacher',
  templateUrl: './list-teacher.component.html',
  standalone: true,
  imports: [AddTeacherComponent, CommonModule,EditTeacherComponent,ViewTeacherComponent],
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {
  teachers: Teacher[] = [];
  selectedTeacherId: number | null = null ;
  currentPage: number = 1;
  itemsPerPage: number = 5;  
  totalPages: number = 0;
  paginatedTeachers: Teacher[] = [];
  searchTerm: string = '';
  alertMessage: string | null = null;
  alertClass: string | null = null;




  constructor(private teacherService: TeacherService) {
  }

ngOnInit(): void {
  this.loadTeachers();

}
loadTeachers() {
  this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
    this.teachers = data;
    this.totalPages = Math.ceil(this.teachers.length / this.itemsPerPage);
    this.updatePaginatedTeachers();
  });
}

updatePaginatedTeachers() {
  const filteredTeachers = this.teachers.filter(teacher =>
    teacher.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    teacher.phoneNo.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  this.paginatedTeachers = filteredTeachers.slice(start, end);
}
onSearchTermChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const searchValue = target?.value || '';
  this.searchTerm = searchValue;
  this.currentPage = 1; 
  this.updatePaginatedTeachers();
}


goToPage(page: number) {
  this.currentPage = page;
  this.updatePaginatedTeachers();
}

goToNextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedTeachers();
  }
}

goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedTeachers();
  }
}

goToFirstPage() {
  this.currentPage = 1;
  this.updatePaginatedTeachers();
}

goToLastPage() {
  this.currentPage = this.totalPages;
  this.updatePaginatedTeachers();
}


  onTeacherAdded() {
    this.loadTeachers(); 
    this.showAlert('Enseignant ajouté avec succès!', 'alert-success');

  }

  onEditTeacher(teacher: Teacher) {
    this.selectedTeacherId = teacher.id !== undefined ? teacher.id : null;
    this.loadTeachers();

  }
   
  onTeacherUpdated() {
    console.log('Teacher updated event received');

    this.loadTeachers();
    this.showAlert('Enseignant modifié avec succès!', 'alert-info');

  }

  onViewTeacher(teacher: Teacher) {
    this.selectedTeacherId = teacher.id !== undefined ? teacher.id : null;
  }

  onDeleteTeacher(id: number | undefined) {
    if (id !== undefined) {
      this.teacherService.deleteTeacher(id).subscribe(() => {
        this.loadTeachers();
        this.showAlert('Enseignant supprimé avec succès!', 'alert-danger');

      });
    }
  }

  showAlert(message: string, alertClass: string) {
    this.alertMessage = message;
    this.alertClass = alertClass;
    setTimeout(() => {
      this.alertMessage = null;
      this.alertClass = null;
    }, 3000); // L'alerte disparaîtra après 3 secondes
  }

}
