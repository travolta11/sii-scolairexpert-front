import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Teacher} from "../../../model/Teacher/teacher";
import {TeacherService} from "../../../services/Teacher/teacher.service";
import {Staff} from "../../../models/Staff.model";
import {StaffService} from "../../../services/staff/staff.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ssi-sx-show-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-staff.component.html',
  styleUrl: './show-staff.component.scss'
})
export class ShowStaffComponent implements OnChanges{

  @Input() memberId: number | null = null;
  staffMember!: Staff ;

  constructor(private staffService: StaffService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['memberId'] && this.memberId !== null) {
      this.loadStaffMember();
    }
  }

  ngOnInit(): void {
    const modalElement = document.getElementById('viewStaffMember');
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        this.loadStaffMember();
      });
    }
  }

  private loadStaffMember() {
    if (this.memberId !== null) {
      this.staffService.getMemberById(this.memberId).subscribe(member => {
        this.staffMember = member;
      });
    }
  }
}
