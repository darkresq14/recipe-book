import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export enum ShoppingListActionTypes {
  AddIngredient = '[Shopping List] Add Ingredient',
  AddIngredients = '[Shopping List] Add Ingredients',
  UpdateIngredient = '[Shopping List] Update Ingredient',
  DeleteIngredient = '[Shopping List] Delete Ingredient',
  StartedEditing = '[Shopping List] Started Editing',
  StoppedEditing = '[Shopping List] Stopped Editing',
}

export class AddIngredient implements Action {
  readonly type = ShoppingListActionTypes.AddIngredient;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListActionTypes.AddIngredients;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = ShoppingListActionTypes.UpdateIngredient;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListActionTypes.DeleteIngredient;
}

export class StartedEditing implements Action {
  readonly type = ShoppingListActionTypes.StartedEditing;

  constructor(public payload: number) {}
}

export class StoppedEditing implements Action {
  readonly type = ShoppingListActionTypes.StoppedEditing;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | DeleteIngredient
  | UpdateIngredient
  | StartedEditing
  | StoppedEditing;
