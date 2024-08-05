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
import { LoadingController, AlertController } from '@ionic/angular';

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
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  access_token: any;
  codes: any = [];
  category_id: number = 2;
  categories: any = [];
  manufacturer_id: any;
  manufacturers: any = [];
  manufacturer: any;
  price: number = 0;
  part_name: string = '';
  product_categories: any = [];
  default_category: any;

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
              access_token: this.access_token,
            }
            this.api.getManufacturers(data).subscribe((resp: any) => {
              this.manufacturers = resp.manufacturers;
              let data = {
                access_token: this.access_token,
                category_id: this.category_id,
              }
              this.api.getCategories(data).subscribe((resp: any) => {
                loading.dismiss();
                this.categories = resp.categories;
              });
            });
          });
        });
      }
    });
  }

  categorySelect() {
    this.loadingController.create().then((loading) => {
      loading.present();
      let data = {
        access_token: this.access_token,
        category_id: this.category_id,
      }
      this.api.getCategory(data).subscribe((resp: any) => {
        this.product_categories.push(resp.categories[0]);
        console.log(this.product_categories);
        let data = {
          access_token: this.access_token,
          category_id: this.category_id,
        }
        this.api.getCategories(data).subscribe((resp: any) => {
          this.categories = resp.categories;
          loading.dismiss();
          if (this.categories == undefined) {
            this.default_category = this.category_id;
          }
        });
      });
    });
  }

  createProduct() {

    if (!this.manufacturer_id || this.product_categories.length == 0) {
      this.alertController.create({
        header: 'Validação',
        message: 'Os campos Fabricante e Categoria são obrigatórios',
        buttons: ['Ok']
      }).then((alert) => {
        alert.present();
      });
    } else {
      this.loadingController.create().then((loading) => {
        loading.present();
        let data = {
          access_token: this.access_token,
          manufacturer_id: this.manufacturer_id,
        }
        this.api.getManufacturer(data).subscribe((resp: any) => {
          this.manufacturer = resp.manufacturers[0];

          let references = this.codes.join(',');

          let names_pt: any = [];
          let names_es: any = [];
          let names_en: any = [];
          this.product_categories.forEach((category: any) => {
            names_pt.push(category.name[0].value);
            names_es.push(category.name[1].value);
            names_en.push(category.name[2].value);
          });

          names_pt.shift();
          names_es.shift();
          names_en.shift();

          let name_pt = names_pt.join(' ');
          let name_es = names_es.join(' ');
          let name_en = names_en.join(' ');

          let data = {
            access_token: this.access_token,
            reference: this.codes[0],
            categories: this.product_categories,
            default_category: this.default_category,
            manufacturer_id: this.manufacturer_id,
            references: references,
            price: this.price,
            name_pt: name_pt + ' - ' + this.manufacturer.name,
            name_es: name_es + ' - ' + this.manufacturer.name,
            name_en: name_en + ' - ' + this.manufacturer.name,
            part_name: this.part_name,
          }
          this.api.createProduct(data).subscribe((resp: any) => {
            loading.dismiss();
            if (resp.id != '' && resp.warnings.length > 0) {
              this.alertController.create({
                header: 'Erro',
                message: resp.warnings,
                buttons: ['ok']
              }).then((alert) => {
                alert.present();
              });
            } else {
              let product_id = resp.id;
              setTimeout(() => {
                this.router.navigateByUrl('image/' + product_id);
              }, 500);
            }
          }, (error) => {
            this.alertController.create({
              header: 'Erro',
              message: error.message,
              buttons: ['ok']
            }).then((alert) => {
              alert.present();
            });
          });
        });
      });
    }
  }

}
