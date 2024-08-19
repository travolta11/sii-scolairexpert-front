import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../models/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/etudiants';

  constructor(private http: HttpClient) {}

  getStudents(page: number, size: number): Observable<{ content: Student[], totalPages: number }> {
    return this.http.get<{ content: Student[], totalPages: number }>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }

  addStudent(student: Student): Observable<Student> {
    console.log("Student being added: ", student);
    return this.http.post<Student>(this.apiUrl, student);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email-exists/${email}`);
  }

  checkPhoneExists(phone_number: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-phone-exists/${phone_number}`);
  }

  getStudentsByClassId(classId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/class/${classId}`);
  }
}
