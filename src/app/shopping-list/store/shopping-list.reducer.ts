import { Ingredient } from 'src/app/shared/ingredient.model';
import {
  ShoppingListActions,
  ShoppingListActionTypes,
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const INITIAL_STATE: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatos', 15)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = INITIAL_STATE,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActionTypes.AddIngredient:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case ShoppingListActionTypes.AddIngredients:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActionTypes.UpdateIngredient:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActionTypes.DeleteIngredient:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_, idx) => idx !== state.editedIngredientIndex
        ),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActionTypes.StartedEditing:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListActionTypes.StoppedEditing:
      return { ...state, editedIngredient: null, editedIngredientIndex: -1 };
    default:
      return state;
  }
}
