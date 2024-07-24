import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
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
  IonFooter,
  IonButton,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { PreferencesService } from '../services/preferences.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonFooter,
    IonButton,
  ]
})
export class ImagePage implements OnInit {

  constructor(
    private preferences: PreferencesService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private api: ApiService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  imageUrl: any = 'https://ionicframework.com/docs/img/demos/card-media.png';
  access_token: any;
  photo: boolean = false;
  product_id: any = this.route.snapshot.params['product_id'];

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
      quality: 70,
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

  uploadImage = async () => {
    if (!this.photo || !this.imageUrl) {
      console.error('Nenhuma foto disponível para envio');
      return;
    }

    // Converte Data URL para Blob
    const response = await fetch(this.imageUrl);
    const blob = await response.blob();

    // Criar um FormData para enviar a imagem
    const formData = new FormData();
    formData.append('image', blob, 'photo.jpg');
    formData.append('product_id', this.product_id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.access_token
      })
    };

    const url = 'https://ai.autorcpecas.pt/api/upload-image';

    this.http.post(url, formData, httpOptions).subscribe((data) => {
        this.alertController.create(({
          header: 'Imagem gravada',
          message: 'Pode avançar',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Continuar a tirar fotografias',
              handler: () => {
                this.imageUrl = 'https://ionicframework.com/docs/img/demos/card-media.png';
                this.photo = false;
              }
            },
            {
              text: 'Concluir',
              handler: () => {
                this.router.navigateByUrl('references');
              }
            }
          ]
        })).then((alert) => {
          alert.present();
        });
      },
      (error) => {
        console.error('Erro ao enviar a imagem:', error);
      }
    );
  };

}
