import { Component, OnInit} from '@angular/core';
import { AddMaterielComponent } from './add-materiel/add-materiel.component';
import { ShowMaterielComponent } from './show-materiel/show-materiel.component';
import { UpdateMaterielComponent } from "./update-materiel/update-materiel.component";
import { Materiel } from '../../models/materiel.model';
import { MaterielService } from '../../services/materiel/materiel.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'ssi-sx-materiel',
  standalone: true,
  imports: [AddMaterielComponent, ShowMaterielComponent, UpdateMaterielComponent, CommonModule,NgxPaginationModule,FormsModule],
  templateUrl: './materiel.component.html',
  styleUrl: './materiel.component.scss'
})
export class MaterielComponent implements OnInit{
  materiel: Materiel[]= [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  filtredMateriel: Materiel[]= [];
  searchTerm: string = '';
  selectedMaterielId?: number;
  showAlert: boolean = false;
  totalPages: number = 0;
  paginatedRMateriels: Materiel[] = [];

  constructor(private materielService: MaterielService){}

  ngOnInit(){
    this.loadMateriel();
  }

  loadMateriel(){
    this.materielService.getMateriel().subscribe(
      (data: Materiel[])=> {
        this.materiel= data;
        this.filterMateriel();
        this.totalPages = Math.ceil(this.materiel.length / this.itemsPerPage);
        this.updatePaginatedMateriels();
      },
      error => {
        console.log('error fetching materiel',error);
      }
    );
  }

  updatePaginatedMateriels() {
    const filtredMateriel = this.materiel.filter(mat =>
      mat.code?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      mat.type?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      mat.status?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRMateriels= filtredMateriel.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedMateriels();
  }
  
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedMateriels();
    }
  }
  
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedMateriels();
    }
  }
  
  goToFirstPage() {
    this.currentPage = 1;
    this.updatePaginatedMateriels();
  }
  
  goToLastPage() {
    this.currentPage = this.totalPages;
    this.updatePaginatedMateriels();
  }
  

  OnMaterielAdded(materiel: Materiel){
    this.loadMateriel();
  }

  onMaterielUpdated(materiel: Materiel){
    this.loadMateriel();
  }
  updateMateriel(materilId: number){
    this.selectedMaterielId= materilId;
  }

  showMateriel(materielId: number) {
    this.selectedMaterielId = materielId;
  }
  
  deleteMateriel(materiel: Materiel){
    this.materielService.deleteMateriel(materiel.id).subscribe(() => {
      this.materiel = this.materiel.filter(u => u.id !== materiel.id);
      this.filterMateriel();
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 3000);
    });

  }

  filterMateriel(){
    if(this.searchTerm){
      this.filtredMateriel= this.materiel.filter(materiel => 
        materiel.code?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        materiel.type?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        materiel.status?.toLowerCase().includes(this.searchTerm.toLowerCase())

      );
    } else {
      this.filtredMateriel = [...this.materiel];
    }
  }
}
