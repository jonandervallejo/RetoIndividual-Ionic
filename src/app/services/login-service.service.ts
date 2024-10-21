import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }
  
  login(nombre: string, contrasena: string): Observable<any> {

    return this.http.post('http://44.198.98.117:8001/login', { nombre: nombre, contrasena: contrasena });
  }


  
}
