import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe.service';
import { AlertController, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Share } from '@capacitor/share';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  imports: [ CommonModule, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, RouterLink],

})
export class RecipeListComponent  implements OnInit {

  @Input() recipes: Recipe[] = []; // decorate the property with @Input()

  constructor(
    private recipeService: RecipeService, 
    private alertController: AlertController) { 

    }

  ngOnInit() {
    console.log("RECIPESLIST", this.recipes);
  }
  
  getPicture(recipe: Recipe) {
    if(recipe.image) {    
      return `${recipe.image}`;
    }
    return `${environment.frontend}/assets/platzhalter.png`;
  }

  async deleteRecipe(recipe: Recipe) {
    const alert = await this.alertController.create({
      header: 'Rezept löschen',
      message: 'Wollen Sie das Rezept wirklich löschen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel'
        },
        {
          text: 'Ja',
          handler: () => {
            this.recipes = this.recipes.filter((element) => {
              return element._id !== recipe._id;
            });;
            this.recipeService.deleteRecipe(recipe._id!).subscribe(updatedRecipe => {
              console.log(recipe.title,'wird gelöscht!');
            });             
          }
        }
      ]
    });
    await alert.present();
}

toggleFavorite(recipe: Recipe) {
  recipe.isFavorite = !recipe.isFavorite;
  this.recipeService.toggleFavorite(recipe._id!).subscribe(updatedRecipe => {
    recipe.isFavorite = updatedRecipe.isFavorite;
  });
}

async share(recipe:Recipe) {
  await Share.share({
    title: recipe?.title,
    text: `Schau dir das Rezept '${recipe?.title}' von Familienrezepte an!`,
    url: `${environment.frontend}/app/detail/${recipe?._id}`,
    dialogTitle: 'Rezept teilen',
  });
} 

}
