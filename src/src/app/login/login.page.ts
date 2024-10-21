import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: string = '';
  contrasena: string = '';
  root: boolean = false;
  toastMessage: string = '';;

  constructor(private loginService: LoginServiceService, private router: Router, private toastController:ToastController) {}

  ngOnInit() {
  }

  onLogin() {
    this.loginService.login(this.nombre, this.contrasena).subscribe(
      (response) => {
        if (response.status === 'success') {
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('userId', response.user_id);

          //console.log(localStorage.getItem('userRole'));
          //console.log(localStorage.getItem('userId'));
          this.router.navigate(['/folder/inbox']);
          this.toastMessage = 'Bienvenido ' + this.nombre;
          this.mostrarToast();
          //console.log("*************************************************************************") 
        } else {       
          //console.log("++++++++++++++++++++++++++++++++++++++++++++++")
          this.root = true;
          this.toastMessage = 'Usuario o contraseña incorrectos';
          this.mostrarToast();
        }
      },
      (error) => {
        console.error(error);
        
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
