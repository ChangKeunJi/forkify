import * as model from './model.js'; // {state, loadRecipe, ..}
import recipeView from './views/recipeView.js'; // instance of Class. Can name any name.
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable'; // Convert new features to ES5
import 'regenerator-runtime/runtime'; // Convert async await to ES5

// if (module.hot) {
//   module.hot.accept();
// }

// Address of API
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // Request 할 때에는 #이 필요없다.

    if (!id) return;

    recipeView.renderSpinner();

    //! 1) Loading recipe : Updating a recipe state in Model
    // Since it's a async function, need to wait until it fatched.
    await model.loadRecipe(id);

    //! 2) Rendering recipe : Render a page using recipe in state
    recipeView.render(model.state.recipe);
  } catch (err) {
    // display a error message
    recipeView.renderError();
  }
};

const controlSearchRecipe = async function (e) {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  // Publisher : addHandlerRender
  // Subscriber : controlRecipes
  recipeView.addHandlerRender(controlRecipes);

  searchView.addHandlerSearch(controlSearchRecipe);
};

init();

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );
