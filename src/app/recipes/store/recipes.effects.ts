import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipes.actions';

@Injectable()
export class RecipesEffects {
  FIREBASE_URL =
    'https://recipe-book-3bbf6-default-rtdb.europe-west1.firebasedatabase.app/';

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.RecipesActionTypes.FetchRecipes),
      switchMap(() =>
        this.httpClient.get<Recipe[]>(this.FIREBASE_URL + '/recipes.json')
      ),
      map((recipes) =>
        recipes
          ? recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            })
          : []
      ),
      map((recipes) => new RecipesActions.SetRecipes(recipes))
    )
  );

  storeRecipes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.RecipesActionTypes.StoreRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_actionData, recipesState]) =>
          this.httpClient.put(
            this.FIREBASE_URL + '/recipes.json',
            recipesState.recipes
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {}
}
