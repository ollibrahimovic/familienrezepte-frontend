import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonCol, IonContent, IonGrid, IonHeader, IonRow} from '@ionic/angular/standalone';
import { Category } from 'src/app/model/Category';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [CommonModule, RecipeListComponent,IonGrid, IonCol, IonRow, IonHeader, IonContent],
    standalone: true
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

  async reloadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const c = await  this.recipeService.getCategory(id);
      this.isLoading = false;
      if(c) {
        this.category = c;        
      }
    }
  }
}
