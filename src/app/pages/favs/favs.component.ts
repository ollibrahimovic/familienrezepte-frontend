import { Component } from '@angular/core';
import { IonItem, IonTitle, IonTab, IonTabButton, IonButtons, IonTabBar, IonTabs, IonToolbar, IonHeader, IonIcon, IonLabel, IonContent, IonAccordion, IonAccordionGroup, IonList, IonButton } from '@ionic/angular/standalone';
import { Category } from '../../model/category';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../model/recipe';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Hier hinzufügen

@Component({
  selector: 'app-favs',
  templateUrl: 'favs.component.html',
  styleUrls: ['favs.component.scss'],
  imports: [CommonModule, IonButtons, IonTab, IonTabBar, IonTabButton, IonTabs, IonButton, IonTitle, IonToolbar, IonHeader, IonIcon,  IonItem, IonIcon, IonLabel, IonContent, IonList, IonAccordion, IonAccordionGroup, IonButton, RouterLink],
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
    });
  }

  toggleFavorite(recipe: Recipe) {
    this.recipeService.toggleFavorite(recipe._id!)
      .subscribe(updatedRecipe => {
        recipe.isFavorite = updatedRecipe.isFavorite;
        this.recipes = this.recipes.filter((updatedRecipe) => {
          return updatedRecipe._id !== recipe._id;
        });
    });
  }
}
