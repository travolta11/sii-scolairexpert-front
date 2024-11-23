import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materiel } from '../../models/materiel.model';
@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  private apiUrl = 'http://localhost:8080/api/materiel';


  constructor(private http: HttpClient) { }

  getMateriel(): Observable< Materiel[]>{
    return this.http.get<Materiel[]>(`${this.apiUrl}/all`)
  }

  addMateriel(materiel: Materiel): Observable< Materiel>{
    return this.http.post<Materiel>(`${this.apiUrl}/create`,materiel)
  }

  updateMateriel(materiel: Materiel): Observable<Materiel>{
    return this.http.put<Materiel>(`${this.apiUrl}/update/${materiel.id}`,materiel)
  }

  getMaterielById(id: number): Observable <Materiel>{
    return this.http.get<Materiel>(`${this.apiUrl}/${id}`)
  }

  deleteMateriel(id: number): Observable <void>{
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
  }
}
