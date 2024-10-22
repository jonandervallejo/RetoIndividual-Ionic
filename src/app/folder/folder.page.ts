import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosServiceService } from '../services/cursos-service.service';
import { HttpClient } from '@angular/common/http';

interface Curso{
  id: number;
  nombre: string;
  descripcion: string;
  nota?: number; //nota del usuario logueado
  usuarios?: Usuario[]; //usuarios matriculados (solo visible para root)
}

interface Usuario {
  nombre: string;
  nota: number;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  cursos: Curso[] = []; //almaceno los cursos
  isLoggedIn: boolean = false;
  esRoot: boolean = false;
  estudiantes: any[] = [];
  nota: number | null = null;
  errorMessage: string = '';


  constructor(private cursosService:CursosServiceService, private router: Router, private http:HttpClient) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.cargarCursos();
    this.verificarUsuarioLogueado();
    if (this.isLoggedIn) {
      this.cargarCursos();
    } else {
      //this.router.navigate(['/login']); // Redirigir a la página de login si no está logueado
    }
  }

  verificarUsuarioLogueado() {
    const userId = localStorage.getItem('userId');
    this.isLoggedIn = !!userId; //verifica si hay un userId en el almacenamiento local
  }

  cargarCursos() {
    this.cursosService.getCursos().subscribe(
      (data: Curso[]) => {
        this.cursos = data;
      },
      (error) => {
        console.error('Error al obtener los cursos', error);
      }
    );
  }

  /*verDetalleCurso(cursoId: number) {
    this.router.navigate(['/curso-detalle', cursoId]);
  }*/

  verificarRoot() 
  {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'root') {
      this.esRoot = true;
      console.log('Tienes permiso para acceder a esta página como root.');

    } else {
      this.esRoot = false;
      //this.toastMessage = 'No tienes permiso para acceder a esta página.';
      //this.mostrarToast();
    }
  }

  cargarEstudiantesPorCurso(cursoId: number) {
    this.http.get<any[]>(`http://44.198.98.117:8001/curso/${cursoId}/usuarios`).subscribe(data => {
      this.estudiantes = data;
      console.log('Estudiantes cargados:', this.estudiantes);
    }, error => {
      this.errorMessage = 'Error al cargar los estudiantes';
      console.error(error);
    });
  }

  verCurso(cursoId: number) {
    const userId = localStorage.getItem('userId');
  
    if (this.esRoot) {
      // Si el usuario es administrador, cargar los estudiantes del curso
      this.cargarEstudiantesPorCurso(cursoId);
    } else {
      // Si no, cargar la nota del estudiante
      if (userId) {
        //console.log('ID del usuario recuperado:', userId);
        this.http.get<any>(`http://44.198.98.117:8001/curso/${cursoId}/nota/${userId}`).subscribe(data => {
          this.nota = data.nota; // Ahora la nota se obtiene del nuevo endpoint
          //console.log('Nota cargada:', this.nota);
        }, error => {
          //añadir toasts
        });
      } else {
        
      }
    }
  }
  

  cargarNotaUsuario(cursoId: number) {
    const userId = localStorage.getItem('userId');
    return this.cursosService.getNotaUsuario(cursoId, userId);
  }
}
