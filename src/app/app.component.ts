import { Component } from '@angular/core';
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
  
  constructor() {}
}
