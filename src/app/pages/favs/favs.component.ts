import { Component } from '@angular/core';
import { IonTitle, IonToolbar, IonHeader, IonContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../model/recipe';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Hier hinzufügen
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';

@Component({
  selector: 'app-favs',
  templateUrl: 'favs.component.html',
  styleUrls: ['favs.component.scss'],
  imports: [CommonModule, IonGrid, IonCol, IonRow, RecipeListComponent, IonTitle, IonToolbar, IonHeader, IonContent],
})
export class FavsComponent{
  recipes: Recipe[] = [];
  
  constructor(private recipeService: RecipeService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // Wird bei jedem Betreten der Route ausgeführt
    this.reloadData();
  }

  reloadData() {
    this.recipeService.getRecipes()
      .subscribe(data => {       
        this.recipes = data.filter(d=>d.isFavorite);
        console.log("FAVS", this.recipes);
        return this.recipes;
    });
  }
}
