import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AddStaffComponent} from "../add-staff/add-staff.component";
import {EditStaffComponent} from "../edit-staff/edit-staff.component";
import {StaffService} from "../../../services/staff/staff.service";
import {Staff} from "../../../models/Staff.model";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormControl} from "@angular/forms";
import {ShowStaffComponent} from "../show-staff/show-staff.component";
import {Teacher} from "../../../model/Teacher/teacher";
@Component({
  selector: 'ssi-sx-staff-list',
  standalone: true,
  imports: [AddStaffComponent, EditStaffComponent, CommonModule, ShowStaffComponent],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent implements OnInit{



  currentPage: number = 1;
  itemsPerPage: number = 10;
  staffMembers : Staff[]=[];
  searchValue: string ='';
  filteredStaffMembers: Staff[] = [];
  selectedMemberId:  number | null = null ;

  updateVisibleData() {
    this.filteredStaffMembers = this.staffMembers.filter(member =>
      member.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      member.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) );

  }
  onSearchTermChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target?.value || '';
    this.searchValue = searchValue;
    this.currentPage = 1;
    this.updateVisibleData();
  }


  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    // this.loadStaffMembers();
    this.staffService.staffMembers$.subscribe(data => {
      this.staffMembers = data;
      this.filteredStaffMembers=data;
    });
    console.log(this.staffMembers)
  }



  editStaff(staffMember :Staff){
    this.staffService.setStaffMemberToEdit(staffMember);
  }
  deleteStaffMember(id: number): void {
    this.staffService.deleteStaffMember(id);
  }
  get totalItems(): number {
    return this.staffMembers.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get visibleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredStaffMembers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }
  showMember(member: Staff) {
    this.selectedMemberId = member.id !== undefined ? member.id : null;
  }

}
