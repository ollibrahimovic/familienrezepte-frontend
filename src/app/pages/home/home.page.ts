import { Component, ViewChild } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonAccordionGroup, IonIcon,IonLabel, AlertController, IonItem, IonAccordion, IonList, IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { Category } from '../../model/category';
import { RecipeService } from '../../services/recipe.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Hier hinzufügen
import { map } from 'rxjs';
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, RecipeListComponent, 
    RouterModule,
    IonGrid, IonCol, IonRow,
    IonIcon, IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonList, IonContent, IonTitle, IonHeader, IonToolbar],
})
export class HomeComponent {
  categories: Category[] = [];
  isLoading: boolean = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
  }

  getImage(category: Category) {
    return `/assets/categories/${category.image}`;
  }

  ionViewWillEnter() {
    this.reloadData();
  }

  reloadData() {
    this.recipeService.getCategories()
      .pipe(
        map(data => {
          this.categories = data;
          this.isLoading = false;
          return this.categories;
        }), 
        map(data=>{
          console.log('reset start');
        })     
      )
      .subscribe();
  }
}
