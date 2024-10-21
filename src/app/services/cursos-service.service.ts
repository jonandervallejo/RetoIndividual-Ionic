import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Curso{
  id: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursosServiceService {

  private url = 'http://44.198.98.117:8001/curso';

  constructor(private http:HttpClient) { }

  //metodo para coger los cursos de la api
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }
}
