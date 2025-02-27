import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { IonImg, IonItem, IonTitle, IonTab, IonTabButton, IonButtons, IonTabBar, IonTabs, IonToolbar, IonHeader, IonIcon, IonLabel, IonContent, IonAccordion, IonAccordionGroup, IonList, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [CommonModule,IonImg, IonButtons, IonTab, IonTabBar, IonTabButton, IonTabs, IonButton, IonTitle, IonToolbar, IonHeader, IonIcon,  IonItem, IonIcon, IonLabel, IonContent, IonList, IonAccordion, IonAccordionGroup, IonButton, RouterLink],

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
}
