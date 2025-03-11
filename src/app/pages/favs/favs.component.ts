import { Component } from '@angular/core';
import { IonHeader, IonContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../model/Recipe';
import { CommonModule } from '@angular/common'; // Hier hinzufügen
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';

@Component({
  selector: 'app-favs',
  templateUrl: 'favs.component.html',
  styleUrls: ['favs.component.scss'],
  imports: [CommonModule, IonGrid, IonCol, IonRow, RecipeListComponent, IonHeader, IonContent],
  standalone: true
})
export class FavsComponent{
  recipes: Recipe[] = [];
  
  constructor(private recipeService: RecipeService
  ) {
    
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // Wird bei jedem Betreten der Route ausgeführt
    this.reloadData();
  }

  async reloadData() {
    this.recipes = (await this.recipeService.getRecipes()).filter(d => d.isFavorite);
  }
}
