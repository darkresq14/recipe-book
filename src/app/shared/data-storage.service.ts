import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  FIREBASE_URL =
    'https://recipe-book-3bbf6-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();

    this.httpClient
      .put(this.FIREBASE_URL + '/recipes.json', recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient
      .get<Recipe[]>(this.FIREBASE_URL + '/recipes.json')
      .pipe(
        map((recipes) =>
          recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          })
        ),
        tap((recipes) => this.recipeService.setRecipes(recipes))
      );
  }
}
