import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {
  usuarios: any[] = [];
  cursos: any[] = [];
  selectedUsuario: number | null = null;
  selectedCurso: number | null = null; // Asegúrate de que sea un número
  toastMessage: string = '';

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarCursos();
  }

  cargarUsuarios() {
    this.http.get<any[]>('http://44.198.98.117:8001/usuario').subscribe(data => {
      this.usuarios = data;
      console.log('Usuarios cargados:', this.usuarios); 
    });
  }

 
  cargarCursos() {
    this.http.get('http://44.198.98.117:8001/curso').subscribe(
        (response: any) => {
            this.cursos = response; 
            console.log('Cursos cargados:', this.cursos); 
        },
        error => {
            console.error('Error al cargar los cursos:', error);
        }
    );
  }


  enlazarUsuarioCurso() {
    // Asegúrate de que selectedUsuario y selectedCurso tengan valores
    if (this.selectedUsuario === null || this.selectedCurso === null) {
        this.toastMessage = 'Por favor selecciona un usuario y un curso.';
        this.mostrarToast();
        return;
    }

    const body = {
      usuarioId: this.selectedUsuario,
      cursoId: this.selectedCurso // Debería ser el ID del curso
    };

    console.log('Datos enviados:', body); // Verifica lo que se envía

    this.http.post('http://44.198.98.117:8001/usuarioCurso/anadir', body).subscribe(
      response => {
        this.toastMessage = 'Usuario enlazado con éxito al curso';
        this.mostrarToast();
      },
      error => {
        console.error(error);
        this.toastMessage = 'Error al enlazar el usuario al curso';
        this.mostrarToast();
      }
    );
  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: this.toastMessage,
      duration: 2000
    });
    toast.present();
  }
}
