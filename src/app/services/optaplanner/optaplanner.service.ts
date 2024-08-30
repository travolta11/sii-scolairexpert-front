import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptaplannerService {
  private baseUrl = 'http://localhost:8080/timetable';

  constructor(private http: HttpClient) {}

  startSolving(): Observable<any> {
    console.log('Start solving initiated');
    return this.http.post(`${this.baseUrl}/solve`, {}).pipe(
      
      delay(40000), // Wait   seconds
      switchMap(() =>
         this.stopSolving()) //  stop solving
    );
  }

  stopSolving(): Observable<any> {
    console.log('Stopping solving');
    return this.http.post(`${this.baseUrl}/stopSolving`, {});
  }

  getTimetable(): Observable<any> {
    console.log('Getting timetable');
    return this.http.get(`${this.baseUrl}`);
  }
 
}
