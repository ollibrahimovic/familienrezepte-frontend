import { Component } from '@angular/core';
import { IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common'; // Hier hinzufügen
import { RouterLink } from '@angular/router';
import { Category } from '../model/category';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonAccordionGroup, IonAccordion, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonButton, IonIcon, RouterLink],
})
export class HomePage {

  categories: Category[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getCategories().subscribe(data => {      
      this.categories = data;
      this.categories.forEach(d => {d.recipes=[]});
      this.categories.forEach(d => {
        this.recipeService.getRecipesOfCategory(d).subscribe(data => {
          d.recipes = data;
        });        
      });
    });
  }


  toggleFavorite(recipe: Recipe) {
    this.recipeService.toggleFavorite(recipe._id!).subscribe(updatedRecipe => {
      recipe.isFavorite = updatedRecipe.isFavorite;
    });
  }
}
