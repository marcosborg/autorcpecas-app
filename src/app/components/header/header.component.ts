import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonImg,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { PreferencesService } from 'src/app/services/preferences.service';
import { lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonImg,
    IonIcon,
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private preferences: PreferencesService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ lockClosed });
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showBackButton = this.router.url !== '/references';
    });
  }

  showBackButton: boolean = true;

  logout() {
    this.alertController.create({
      header: 'Tem a certeza?',
      message: 'Vai encerrar a sessão.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Encerrar a sessão',
          handler: () => {
            this.preferences.removeName('access_token').then(() => {
              this.router.navigateByUrl('/');
            });
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    })
  }

}
