import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonTitle, IonSearchbar, IonToolbar,IonContent, IonHeader, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeListComponent } from 'src/app/recipe-list/recipe-list.component';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, RecipeListComponent, IonGrid, IonCol, IonRow, IonSearchbar,CommonModule, IonTitle, IonToolbar, IonContent, IonHeader],
})
export class SearchComponent  implements OnInit {

  isLoading: Boolean = false;
  constructor(private recipeService: RecipeService) { 

  }

  ngOnInit() {}

  public results:Recipe[] = [];

  async handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if(query.length === 0) {
      this.results=[];
      return;
    }
    if(query.length>2) {
      this.results = [];
      this.isLoading = true;
      var d = await this.recipeService.getRecipes()
      this.isLoading = false;
      this.results = d.filter((d) => d.title.toLowerCase().includes(query) || d.description.toLowerCase().includes(query))
    }
  }
}
