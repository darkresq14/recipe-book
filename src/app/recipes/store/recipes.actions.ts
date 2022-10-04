import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipesActionTypes {
  SetRecipes = '[Recipes] Set Recipes',
  FetchRecipes = '[Recipes] Fetch Recipes',
  AddRecipe = '[Recipes] Add Recipe',
  UpdateRecipe = '[Recipes] Update Recipe',
  DeleteRecipe = '[Recipes] Delete Recipe',
  StoreRecipes = '[Recipes] Store Recipes',
}

export class SetRecipes implements Action {
  readonly type = RecipesActionTypes.SetRecipes;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = RecipesActionTypes.FetchRecipes;
}

export class AddRecipe implements Action {
  readonly type = RecipesActionTypes.AddRecipe;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipesActionTypes.UpdateRecipe;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipesActionTypes.DeleteRecipe;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = RecipesActionTypes.StoreRecipes;
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
