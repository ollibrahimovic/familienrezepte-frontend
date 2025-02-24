import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { IonHeader, IonToolbar, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonButton, IonIcon, RouterLink],
})
export class FavouritesComponent  implements OnInit {

  allfavs: Recipe[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(data => {      
      this.allfavs = data.filter(d => d.isFavorite);
      console.log(data);
    });
  }

  toggleFavorite(recipe: Recipe) {
    this.recipeService.toggleFavorite(recipe._id!).subscribe(updatedRecipe => {
      recipe.isFavorite = updatedRecipe.isFavorite;
      this.recipeService.getRecipes().subscribe(data => {      
        this.allfavs = data.filter(d=>d.isFavorite);     
      });
    });
  }
}
