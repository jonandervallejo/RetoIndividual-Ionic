import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/inbox', icon: 'mail' },
    { title: 'Alta', url: '/alta', icon: 'paper-plane' },
    { title: 'Login', url: '/login', icon: 'heart' },

  ];
  toastMessage: string = '';
  
  constructor(private router:Router, private toastController:ToastController) {}

  cerrarSesion() {
    //eliminar los datos del usuario del almacenamiento local
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    //redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);

    this.toastMessage = 'Sesión cerrada';
    this.mostrarToast();
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
