import * as model from './model.js'; // {state, loadRecipe}
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // Convert new features to ES5
import 'regenerator-runtime/runtime'; // Convert async await to ES5

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Address of API
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // Request 할 때에는 #이 필요없다.

    if (!id) return;

    recipeView.renderSpinner();

    //! 1) Loading recipe
    await model.loadRecipe(id);

    //! 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
