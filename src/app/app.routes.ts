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
];
