import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe';
import { Category } from '../model/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
    private apiUrl = `${environment.api}/recipes`;
    private apiUrlCategories = `${environment.api}/categories`;
    private apiUrlCategory = `${environment.api}/category`;

    constructor(private http: HttpClient) { }

    //Toggled den Favoritenstatus
    toggleFavorite(id: string): Observable<Recipe> {
        return this.http.put<Recipe>(`${this.apiUrl}/${id}/favorite`, {});
    }

    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.apiUrl}`, recipe);
    }

    // Alle Rezepte abrufen
    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.apiUrl);
    }

    // Alle kategorien abrufen
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrlCategories);
    }

    getRecipesOfCategory(cat:Category): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/category/${cat._id}`, {});
    }

    // Einzelnes Rezept abrufen
    getRecipe(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
    }

    // Rezept aktualisieren
    updateRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.put<Recipe>(`${this.apiUrl}/${recipe._id}`, recipe);
    }

    // Rezept löschen
    deleteRecipe(id: string): Observable<any> {
        console.log('DELETE', id);
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    // Rezept löschen
    deleteCategory(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrlCategory}/${id}`);
    }
}
