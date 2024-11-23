import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../../model/class';

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {
  private apiUrl = 'http://localhost:8080/api/classes';

  constructor(private http: HttpClient) { }
  
  getAllClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiUrl}/all`);
  }

  createClass(newClass: Class): Observable<any> {
    return this.http.post<Class>(`${this.apiUrl}`, newClass);
  }

  deleteClass(classId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${classId}`);
  }

  updateClass(updatedClass: Class): Observable<Class> {
    return this.http.put<Class>(`${this.apiUrl}/${updatedClass.id}`, updatedClass);
  }

  getClassById(classId:number):Observable<Class>{
    return this.http.get<Class>(`${this.apiUrl}/${classId}`);
  }
}
