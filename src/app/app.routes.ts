import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent
  },
  {
    path: 'favorites',
    component: FavouritesComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
