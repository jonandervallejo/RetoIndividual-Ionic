import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosServiceService } from '../services/cursos-service.service';

interface Curso{
  id: number;
  nombre: string;
  descripcion: string;
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

  constructor(private cursosService:CursosServiceService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.cargarCursos();
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
}
