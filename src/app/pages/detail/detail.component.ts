import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { IonTitle, IonToolbar, IonHeader, IonIcon, IonContent, IonButton, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Share } from '@capacitor/share';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [CommonModule,  IonButton, IonTitle, IonToolbar, IonHeader, IonIcon, IonItem, IonIcon, IonContent, IonButton],

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
      this.recipeService.getRecipe(id).subscribe(data => {
        this.recipe = data;
      });
    }
  }
 
  async share() {
    await Share.share({
      title: this.recipe?.title,
      text: 'Schau dir dieses Rezept von Familienrezepte an!',
      url: `${environment.frontend}/app/detail/${this.recipe?._id}`,
      dialogTitle: 'Rezept teilen',
    });
  }  
}
