import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Staff} from "../models/Staff.model";
import {StaffDto} from "../models/StaffDto.model";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseUrl='http://localhost:8080/api/staff'
  constructor(private http: HttpClient) {
    this.fetchStaffMembers();
  }
  private staffMemberToEditSource = new BehaviorSubject<Staff | null>(null);
  staffMemberToEdit$ = this.staffMemberToEditSource.asObservable();
  private staffMembersSubject = new BehaviorSubject<any[]>([]);
  staffMembers$ = this.staffMembersSubject.asObservable();

  fetchStaffMembers() {
    this.http.get<any[]>(`${this.baseUrl}/all`).subscribe(data => {
      this.staffMembersSubject.next(data);
    });
  }
  addNewStaffMember(newStaffMember: any) {
    return this.http.post<any>(this.baseUrl, newStaffMember)
      .subscribe(() => {
        this.fetchStaffMembers();
      });
  }
  setStaffMemberToEdit(staffMember: Staff) {
    this.staffMemberToEditSource.next(staffMember);
  }

  getStaffMemberToEdit(): Observable<Staff | null> {
    return this.staffMemberToEdit$;
  }

  updateStaffMember(id: number, updatedStaffMember: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updatedStaffMember).subscribe(
      () => {this.fetchStaffMembers();}
    )
  }
  deleteStaffMember(id:number){
    return this.http.delete<any>(`${this.baseUrl}/${id}`).subscribe(
      () => {this.fetchStaffMembers();}
    )
  }

  addStaffMember(newStaffMember: StaffDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}`, newStaffMember);
  }

}
