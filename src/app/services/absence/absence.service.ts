import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private baseUrl = 'http://localhost:8080/api/absences';

  constructor(private http: HttpClient) {}

  addAbsence(absenceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, absenceData);
  }

  getAbsencesByDate(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/date/${date}`);
  }

  getAbsencesByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}`);
  }

  getAbsenceByStudentIdAndDate(studentId: number, date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}/date/${date}`);
  }

  updateAbsenceReason(absenceData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/reason`, absenceData);
  }
}
