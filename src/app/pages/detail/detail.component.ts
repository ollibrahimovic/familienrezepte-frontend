import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { IonTitle, IonToolbar, IonHeader, IonIcon, IonContent, IonButton, IonItem, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Share } from '@capacitor/share';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [CommonModule, IonGrid, IonCol, IonRow, IonButton, IonTitle, IonToolbar, IonHeader, IonIcon, IonItem, IonIcon, IonContent, IonButton]

})
export class DetailComponent  implements OnInit {

  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipe(id)
        .subscribe(data => {
          this.recipe = data;
      });
    }
  }

  getPicture() {
    if(this.recipe && this.recipe.image) {    
      return `${this.recipe.image}`;
    }
    return `/assets/platzhalter.png`;
  }
 
  async share() {
    await Share.share({
      title: this.recipe?.title,
      text: `Schau dir das Rezept '${this.recipe?.title}' von Familienrezepte an!`,
      url: `${environment.frontend}/app/detail/${this.recipe?._id}`,
      dialogTitle: 'Rezept teilen',
    });
  }  
}
