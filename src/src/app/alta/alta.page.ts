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
  selectedCurso: number | null = null; 
  toastMessage: string = '';
  esRoot: boolean = false;

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarCursos();
    this.verificarRoot();
  }

  // Verificar el rol del usuario desde la base de datos
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

  //cargar los cursos en el desplegable
  cargarUsuarios() 
  {
    this.http.get<any[]>('http://44.198.98.117:8001/usuario').subscribe(data => {
      this.usuarios = data;
      //console.log('Usuarios cargados:', this.usuarios); 
    });
  }

  //cargar los cursos en el desplegable 
  cargarCursos() 
  {
    this.http.get('http://44.198.98.117:8001/curso').subscribe(
        (response: any) => {
            this.cursos = response; 
            //console.log('Cursos cargados:', this.cursos); 
        },
        error => {
            console.error('Error al cargar los cursos:', error);
        }
    );
  }

  //hacer la relacion entre el usuario y el curso (se recogen las ids y se muestran sus nombres)
  enlazarUsuarioCurso() {
    // Asegúrate de que selectedUsuario y selectedCurso tengan valores
    if (this.selectedUsuario === null || this.selectedCurso === null) {
        this.toastMessage = 'Por favor selecciona un usuario y un curso.';
        this.mostrarToast();
        return;
    }

    
    const body = {
      id_usuario: this.selectedUsuario,
      id_curso: this.selectedCurso 
    };

    console.log('Datos enviados:', body); 

    this.http.post('http://44.198.98.117:8001/usuarioCurso/anadir', body).subscribe(
      () => {
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

  //pa los mensajes 
  async mostrarToast() {
    const toast = await this.toastController.create({
      message: this.toastMessage,
      duration: 2000
    });
    toast.present();
  }
}
