import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../model/Recipe';
import { RecipeService } from '../services/recipe.service';
import { AlertController, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Share } from '@capacitor/share';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  imports: [ CommonModule, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, RouterLink],
  standalone: true
})
export class RecipeListComponent  implements OnInit {

  @Input() recipes: Recipe[] = []; // decorate the property with @Input()

  constructor(
    private recipeService: RecipeService, 
    private alertController: AlertController,
    private authService: AuthService) { 
  }

  ngOnInit() {
  }
  
  getPicture(recipe: Recipe) {
    if(recipe.image) {    
      return `${recipe.image}`;
    }
    return `/assets/platzhalter.png`;
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
  
   if(this.authService.currentUser && recipe._id) {
    this.recipeService.toggleFavorite(this.authService.currentUser.dbId, recipe._id!)
      .subscribe(anonUser => {       
        recipe.isFavorite = anonUser.favorites.some(d=>d._id === recipe._id);
       /* if(!recipe.isFavorite) {
          const index = this.recipes.indexOf(recipe, 0);
          if (index > -1) {
            this.recipes.splice(index, 1);
          }
        }*/  
      });
    }      
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
