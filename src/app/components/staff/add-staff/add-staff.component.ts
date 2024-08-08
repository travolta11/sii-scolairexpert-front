import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Staff} from "../../../models/Staff.model";
import {StaffDto} from "../../../models/StaffDto.model";
import {StaffService} from "../../../services/staff.service";

@Component({
  selector: 'ssi-sx-add-staff',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.scss'
})
export class AddStaffComponent {

  staffForm:FormGroup;
  isFormSubmitted: boolean=false;
  constructor(private staffService :StaffService){
    this.staffForm=new FormGroup({
      firstName: new FormControl("",Validators.required),
      lastName: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.email,Validators.required]),
      phoneNumber: new FormControl("",[Validators.required,Validators.minLength(9)]),
      position: new FormControl("",Validators.required),
      department: new FormControl("",Validators.required),
      cin: new FormControl("",Validators.required),
      dateOfBirth: new FormControl("",Validators.required),
      address: new FormControl("",Validators.required),
      startDate: new FormControl("",Validators.required),
      gender: new FormControl("",Validators.required),
    })
  }


  validateForm() {
    const isFormValid = this.staffForm.valid;
    this.isFormSubmitted =  true;
  }

  addStaffMember(){
    this.validateForm();
    this.staffService.addNewStaffMember(this.mapFormToStaff(this.staffForm.value));
  }

  private mapFormToStaff(formValue: any): StaffDto {
    return {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      address: formValue.address,
      phone: formValue.phone,
      cin: formValue.cin,
      date_of_birth: formValue.date_of_birth,
      date_of_start: formValue.date_of_start,
      gender: formValue.gender,
      position: formValue.position,
      department: formValue.department,
    };
  }



}
