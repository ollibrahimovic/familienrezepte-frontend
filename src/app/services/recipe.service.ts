import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Recipe } from '../model/Recipe';
import { Category } from '../model/Category';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    private baseUrl = `${environment.api}`;

    constructor(private http: HttpClient,
      private authService: AuthService
    ) {

    }

    // Recipes
    async getRecipes(): Promise<Recipe[]> {

      try {
        const recipes = await firstValueFrom(this.http.get<Recipe[]>(`${this.baseUrl}/recipes`));
        
        // Favoritenstatus für jedes Rezept setzen
        for (const recipe of recipes) {
          if(recipe._id && this.authService.currentUser) {
            recipe.isFavorite = await this.isMyFavorite(this.authService.currentUser.dbId, recipe._id);
          }
        }
  
        return recipes;
      } catch (error) {
        console.error('Fehler beim Laden der Rezepte:', error);
        return [];
      }
    }

    getRecipe(recipeId: string): Observable<Recipe> {
      return this.http.get<Recipe>(`${this.baseUrl}/recipes/${recipeId}`);
    }  
  
    getRecipesByCategory(categoryId: string): Observable<Recipe[]> {
      return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/category/${categoryId}`);
    }
  
    addRecipe(recipe: Recipe): Observable<Recipe> {
      return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe);
    }
  
    updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
      return this.http.put<Recipe>(`${this.baseUrl}/recipes/${id}`, recipe);
    }
  
    deleteRecipe(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/recipes/${id}`);
    }
  
    // Categories
    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.baseUrl}/categories`);
    }
  
    async getCategory(id: string): Promise<Category|null> {      
      try {
        const cat = await firstValueFrom(this.http.get<Category>(`${this.baseUrl}/categories/${id}`));
        if(cat.recipes) {
          // Favoritenstatus für jedes Rezept setzen
          for (const recipe of cat.recipes) {
            if(recipe._id && this.authService.currentUser) {
              recipe.isFavorite = await this.isMyFavorite(this.authService.currentUser.dbId, recipe._id);
            }
          }
        }
        return cat;
      } catch (error) {
        console.error('Fehler beim Laden der Rezepte:', error);
        return null;
      }
    }
  
    addCategory(category: Category): Observable<Category> {
      return this.http.post<Category>(`${this.baseUrl}/categories`, category);
    }
  
    deleteCategory(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
    }
  
    // Users
    getUser(userId: string): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
    }
  
    addUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/users`, user);
    }
  
    deleteUser(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
    }
  
    toggleFavorite(userId: string, recipeId: string): Observable<User> {
      console.log("TOGGLE2");
      return this.http.post<User>(`${this.baseUrl}/users/${userId}/favorites/${recipeId}`, {});
    }

    async isMyFavorite(userId: string, recipeId: string): Promise<boolean> {
      try {
        const result = await firstValueFrom(
          this.http.get<boolean>(`${this.baseUrl}/users/${userId}/favorites/${recipeId}`)
        );
        return result ?? false;
      } catch (error) {
        console.error('Fehler beim Abrufen der Favoriten:', error);
        return false;
      }
    }
}
