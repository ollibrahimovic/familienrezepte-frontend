import { Component, OnInit } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';
import { Category } from '../../model/Category';
import { RecipeService } from '../../services/recipe.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Hier hinzufügen
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, 
    RouterModule,
    IonGrid, IonCol, IonRow, IonContent, IonTitle, IonHeader, IonToolbar],
    standalone: true
})
export class HomeComponent implements OnInit{
  categories: Category[] = [];
  isLoading: boolean = true;

  constructor(private recipeService: RecipeService, private userService: AuthService) {

  }
  ngOnInit(): void {
    this.userService.signInAnonymously()
      .then(userId => {
        console.log('Eingeloggte User-ID:', userId);
    });
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
