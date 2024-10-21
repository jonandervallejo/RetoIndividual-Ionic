import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosServiceService } from '../services/cursos-service.service';

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

  constructor(private cursosService:CursosServiceService, private router: Router) {}

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

  cargarUsuariosMatriculados(cursoId: number) {
    return this.cursosService.getUsuariosMatriculados(cursoId);
  }

  cargarNotaUsuario(cursoId: number) {
    const userId = localStorage.getItem('userId');
    return this.cursosService.getNotaUsuario(cursoId, userId);
  }
}
