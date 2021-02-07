import * as model from './model.js'; // {state, loadRecipe, ..}
import recipeView from './views/recipeView.js'; // instance of Class. Can name any name.
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'; // Convert new features to ES5
import 'regenerator-runtime/runtime'; // Convert async await to ES5

// if (module.hot) {
//   module.hot.accept();
// }

// Address of API
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//! Rendering recipe
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // Doesn't need "#" to request

    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to marked selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // 1) Loading recipe : Updating a recipe state in Model
    // Since it's a async function, need to wait until it fatched.
    await model.loadRecipe(id);

    // 2) Rendering recipe : Render a page using recipe in state
    recipeView.render(model.state.recipe);
  } catch (err) {
    // display a error message
    recipeView.renderError();
    console.error(err);
  }
};

//! Rendering search results on sidebar
const controlSearchRecipe = async function (e) {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

//! Rendering Page buttons
const controlPagination = function (goToPage) {
  // 3) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render new initial pagination
  paginationView.render(model.state.search);
};

//! Change serving counts: Update UI & state
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the UI
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  //: Won't update image but only text & attribute

  // console.log(model.state.recipe);
};

//! Adding bookmark
const controlAddBookmark = function () {
  // 1) Add or Remove bookmark
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }

  recipeView.update(model.state.recipe);

  // 2) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  // Publisher : addHandlerRender
  // Subscriber : controlRecipes
  recipeView.addHandlerRender(controlRecipes);

  searchView.addHandlerSearch(controlSearchRecipe);

  paginationView.addHandlerClick(controlPagination);

  recipeView.addHandlerUpdateServings(controlServings);

  recipeView.addHandlerBookmark(controlAddBookmark);

  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
