import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonList,
  IonItem,
  IonIcon,
  IonFooter,
  IonToolbar,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { PreferencesService } from '../services/preferences.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { trash } from 'ionicons/icons';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-references',
  templateUrl: './references.page.html',
  styleUrls: ['./references.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonList,
    IonItem,
    IonIcon,
    IonFooter,
    IonToolbar,
    IonLabel,
    CommonModule,
    FormsModule,
    IonInput,
  ]
})
export class ReferencesPage implements OnInit {

  constructor(
    private preferences: PreferencesService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private api: ApiService
  ) {
    addIcons({ trash });
  }

  imageUrl: any = 'https://ionicframework.com/docs/img/demos/card-media.png';
  access_token: any;
  photo: boolean = false;
  codes: any[] = [];

  ngOnInit() {
    this.preferences.checkName('access_token').then((resp) => {
      if (!resp.value) {
        this.router.navigateByUrl('/');
      } else {
        this.access_token = resp.value;
      }
    });
  }

  takePicture = async () => {
    this.photo = false;
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    // Cria um novo elemento de imagem
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + image.base64String;

    img.onload = () => {
      // Cria um canvas para redimensionar a imagem
      const canvas = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (ctx) {
        // Define a largura desejada
        const desiredWidth = 1000;
        const scaleFactor = desiredWidth / img.width;

        canvas.width = desiredWidth;
        canvas.height = img.height * scaleFactor;

        // Desenha a imagem redimensionada no canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Converte o canvas de volta para uma imagem base64
        this.imageUrl = canvas.toDataURL('image/jpeg', 0.5); // Qualidade 50%
        this.photo = true;
      } else {
        console.error('Erro ao obter o contexto 2D do canvas');
      }
    };
  };

  sendPhoto() {
    this.loadingController.create().then((loading) => {
      loading.present();
      let data = {
        access_token: this.access_token,
        imageUrl: this.imageUrl
      }
      this.api.sendPhoto(data).subscribe((resp: any) => {
        this.codes = resp;
        console.log(this.codes);
        loading.dismiss();
        if (this.codes.length == 0) {
          this.toastController.create({
            message: 'Não encontramos correspondência.',
            duration: 3000,
            position: 'bottom'
          }).then((toast) => {
            toast.present();
            this.photo = false;
          });
        }
      }, () => {
        loading.dismiss();
        this.toastController.create({
          message: 'Não encontramos correspondência.',
          duration: 3000,
          position: 'bottom'
        }).then((toast) => {
          toast.present();
          this.photo = false;
        });
      });
    });
  }

  removeCode(index: number) {
    this.codes.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  addCode() {
    this.codes.push('');
  }

  createProduct() {
    this.preferences.setName('codes', JSON.stringify(this.codes)).then(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/product');
      }, 500);
    });
  }

}
