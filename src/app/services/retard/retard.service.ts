import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetardService {
  private baseUrl = 'http://localhost:8080/api/retards';

  constructor(private http: HttpClient) {}

  addRetard(retardData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, retardData);
  }

  getRetardsByDate(date: string): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get(`${this.baseUrl}/byDate`, { params });
  }

  getRetardsByStudentId(studentId: number): Observable<any> {
    const params = new HttpParams().set('studentId', studentId.toString());
    return this.http.get(`${this.baseUrl}/byStudentId`, { params });
  }

  getRetardByStudentIdAndDate(studentId: number, date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}/date/${date}`);
  }

  updateRetardReason(retardData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateReason`, retardData);
  }
}
