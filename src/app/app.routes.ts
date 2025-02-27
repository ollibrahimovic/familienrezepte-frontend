import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';


export const routes: Routes = [
  {
    path: 'app',
    component: StartComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/add/add.component').then((m) => m.AddComponent),
      }    
      ,
      {
        path: 'detail/:id',
        loadComponent: () => import('./pages/detail/detail.component').then((m) => m.DetailComponent),
      },
      {
        path: 'favs',
        loadComponent: () => import('./pages/favs/favs.component').then((m) => m.FavsComponent),
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent),
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
];