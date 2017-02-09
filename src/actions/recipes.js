import * as types from './types';
import Api from '../lib/api';
export function addRecipe() {
  return {
    type: types.ADD_RECIPE,
  }
}

export function setSearchedRecipes({ recipes }) {
  return {
  type: types.SET_SEARCHED_RECIPES,
  recipes
  }
}
export function fetchRecipes(ingredients) {
  return (dispatch, getState) => {
    const params = [
     `i=${encodeURIComponent(ingredients)}`,
     'p=1'
   ].join('&')
    fetch(`http://www.recipepuppy.com/api/?${params}`, {
			method: "GET"
		})
		.then((response) => response.json())
		.then((recipeJson) => {
			dispatch(setSearchedRecipes({ recipes: recipeJson.results}));
		});
  }
}
