import {Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {StaffService} from "../../../services/staff.service";
import {Staff} from "../../../models/Staff.model";


@Component({
  selector: 'ssi-sx-edit-staff',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.scss'
})
export class EditStaffComponent implements OnInit{
  staffForm:FormGroup;
  isFormSubmitted: boolean=false;

  staffMemberToEdit! :Staff;


  constructor( private staffService:StaffService ){
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
  ngOnInit(): void {
    this.getStaffMember();
  }
  getStaffMember():void{
    this.staffService.getStaffMemberToEdit().subscribe(staffMember =>{
      if(staffMember != null){
        this.staffMemberToEdit=staffMember;
        this.staffForm.patchValue({
          firstName: staffMember.firstName,
          lastName: staffMember.lastName,
          email: staffMember.email,
          phoneNumber: staffMember.phone,
          position: staffMember.position,
          department: staffMember.department,
          cin: staffMember.cin,
          dateOfBirth: staffMember.date_of_birth,
          address: staffMember.address,
          startDate: staffMember.date_of_start,
          gender: staffMember.gender,
        });
      }

    })
  }


  submitChanges(): void{
   this.validateForm();
   this.editStaffMember()
  }

  editStaffMember():void{
     const updatedStaffMember =this.mapFormToStaff(this.staffForm.value);

    this.staffService.updateStaffMember(this.staffMemberToEdit.id,updatedStaffMember);
  }

  private mapFormToStaff(formValue: any): Staff {
    return {
      id:this.staffMemberToEdit.id,
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
