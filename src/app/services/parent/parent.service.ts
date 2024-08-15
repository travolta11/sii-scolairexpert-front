import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Parent } from '../../models/parent/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = 'http://localhost:8080/api/parents';

  constructor(private http: HttpClient) {}

  getParents(page: number, size: number): Observable<{ content: Parent[], totalPages: number }> {
    return this.http.get<{ content: Parent[], totalPages: number }>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  deleteParent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateParent(parent: Parent): Observable<Parent> {
    return this.http.put<Parent>(`${this.apiUrl}/${parent.id}`, parent);
  }

  addParent(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(this.apiUrl, parent);
  }

  getParentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

  getParentByCin(cin: string): Observable<Parent|null> {
    return this.http.get<Parent>(`${this.apiUrl}/cin/${cin}`).pipe(
      catchError(() => of(null))  // Return null if there's an error
    );
  }

  checkCinExists(cin: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-cin-exists/${cin}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email-exists/${email}`);
  }

  checkPhoneExists(phone: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-phone-exists/${phone}`);
  }
}

