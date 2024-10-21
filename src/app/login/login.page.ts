import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private loginService: LoginServiceService, private router: Router) {}

  ngOnInit() {
  }

  onLogin() {
    this.loginService.login(this.nombre, this.contrasena).subscribe(
      (response) => {
        if (response.status === 'success') {
          //localStorage.setItem('userRole', response.role);
         // localStorage.setItem('userId', response.user_id);

         // this.router.navigate(['/folder/inbox']);
          console.log("*************************************************************************")
          this.root = true;

        } else {
          
          console.log("++++++++++++++++++++++++++++++++++++++++++++++")
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('userId', response.user_id);

          this.router.navigate(['/folder/inbox']);
        }
      },
      (error) => {
        console.error(error);
        
      }
    );
  }

}
