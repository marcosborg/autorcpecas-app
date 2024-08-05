import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
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
import { ApiService } from '../services/api.service';
import { PreferencesService } from '../services/preferences.service';
import { Router } from '@angular/router';

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

  constructor(
    private loadingController: LoadingController,
    private api: ApiService,
    private alertController: AlertController,
    private preferences: PreferencesService,
    private router: Router
  ) { }

  email: string = '';
  password: string = '';
  screen: boolean = false;

  ngOnInit() {
    this.preferences.checkName('access_token').then((resp: any) => {
      if (resp.value) {
        this.router.navigateByUrl('/references');
      } else {
        this.screen = true;
      }
    });
  }

  login() {
    this.loadingController.create().then((loading) => {
      loading.present();
      let data = {
        email: this.email,
        password: this.password
      }
      this.api.login(data).subscribe((resp: any) => {
        loading.dismiss();
        this.preferences.setName('access_token', resp.access_token).then(() => {
          this.router.navigateByUrl('/references');
        });
      }, (err) => {
        loading.dismiss();
        let errors = err.error.message;;
        this.alertController.create({
          header: 'Erro de validação',
          message: errors,
          buttons: [
            {
              text: 'Repetir',
              role: 'cancel'
            }
          ]
        }).then((alert) => {
          alert.present();
        });
      });
    });
  }

}
