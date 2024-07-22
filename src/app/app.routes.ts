import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'references',
    loadComponent: () => import('./references/references.page').then( m => m.ReferencesPage)
  },
  {
    path: 'product',
    loadComponent: () => import('./product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'image/:product_id',
    loadComponent: () => import('./image/image.page').then( m => m.ImagePage)
  },
];
