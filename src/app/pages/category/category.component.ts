import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Category } from 'src/app/model/category';
import { Recipe } from 'src/app/model/recipe';
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [CommonModule, 
    RecipeListComponent,
    IonGrid, IonCol, IonRow, IonButton, IonTitle, IonToolbar, IonHeader, IonIcon, IonItem, IonIcon, IonContent, IonButton]
})
export class CategoryComponent implements OnInit {

  category: Category | undefined;
  isLoading: Boolean = true;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {

  }

  ionViewWillEnter() {
    this.reloadData();
  }

  getImage() {
    const img = this.route.snapshot.paramMap.get('img');
    if(img){
      return `/assets/categories/${img}`;
    }
    return '';
  }

  getName() {
    const name = this.route.snapshot.paramMap.get('name');
    return name;
  }

  getRecipes() : Recipe[] {
    if(this.category && this.category.recipes) {
      return this.category.recipes;
    }
    return [];
  }

  ngOnInit() {
    
  }

  reloadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getCategory(id).subscribe(data => {
        this.category = data;
        this.isLoading = false;
        console.log(this.category.recipes);
      });
    }
  }
}
