import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonList,
  IonItem,
  IonInput,
  IonFooter,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonList,
    IonItem,
    IonInput,
    IonFooter,
    IonButton,
  ]
})
export class LoginPage implements OnInit {

  constructor() { }

  email: string = 'marcosborges@netlook.pt';
  password: string = 'Leonor(2024)';

  ngOnInit() {
  }

  login() {
    console.log('login');
  }

}
