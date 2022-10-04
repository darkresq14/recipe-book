import { Recipe } from '../recipe.model';
import { RecipesActions, RecipesActionTypes } from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const INITIAL_STATE: State = {
  recipes: [],
};

export function recipesReducer(
  state: State = INITIAL_STATE,
  action: RecipesActions
) {
  switch (action.type) {
    case RecipesActionTypes.SetRecipes:
      return { ...state, recipes: [...action.payload] };
    case RecipesActionTypes.AddRecipe:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case RecipesActionTypes.UpdateRecipe:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return { ...state, recipes: updatedRecipes };
    case RecipesActionTypes.DeleteRecipe:
      return {
        ...state,
        recipes: state.recipes.filter(
          (_recipe, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}
