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
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { PreferencesService } from '../services/preferences.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonInput,
    IonTextarea,
  ]
})
export class ProductPage implements OnInit {

  constructor(
    private preferences: PreferencesService,
    private api: ApiService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  access_token: any;
  codes: any = [];
  category_id: any;
  categories: any = [];
  manufacturer_id: any;
  manufacturers: any = [];
  price: number = 0;
  part_name: string = '';

  ngOnInit() {
    this.preferences.checkName('access_token').then((resp) => {
      if (!resp.value) {
        this.router.navigateByUrl('/');
      } else {
        this.access_token = resp.value;
        this.loadingController.create().then((loading) => {
          loading.present();
          this.preferences.checkName('codes').then((resp: any) => {
            this.codes = JSON.parse(resp.value);
            let data = {
              access_token: this.access_token
            }
            this.api.getCategories(data).subscribe((resp: any) => {
              this.categories = resp.categories.filter((category: any) => category.id > 2);
              console.log(this.categories);
              this.api.getManufacturers(data).subscribe((resp: any) => {
                this.manufacturers = resp.manufacturers;
                loading.dismiss();
              });
            });
          });
        });
      }
    });
  }

  createProduct() {

  }

}
