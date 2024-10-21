import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Curso{
  id: number;
  nombre: string;
  descripcion: string;
}

interface Usuario {
  nombre: string;
  nota: number;
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

  getUsuariosMatriculados(cursoId: number): Observable<Usuario[]> {
    return this.http.get<any[]>(`${this.url}/curso/${cursoId}/usuarios`);
  }

  getNotaUsuario(cursoId: number, userId: string | null): Observable<number> {
    return this.http.get<number>(`${this.url}/curso/${cursoId}/usuario/${userId}/nota`);
  }
}
