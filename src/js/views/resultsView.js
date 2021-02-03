//! Display list of recipes from search

import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  // _data; : FROM VIEW

  _parentElement = document.querySelector('.results');
  _errorMessage = 'No search results! 😥😥';
  _message = '';

  //   render(data) {
  //     this._data = data;
  //     const markup = this._generateMarkup();
  //     this._clear();
  //     this._parentElement.insertAdjacentHTML('afterbegin', markup);
  //   } => FROM VIEW

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return ` <li class="preview">
    <a class="preview__link " href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

export default new ResultsView();

/*
renderRecipes(recipes) {
    const markup = recipes
      .map(recipe => {
        return `
      <li class="preview">
      <a class="preview__link preview__link--active" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
      `;
      })
      .join('');

    this.#results.insertAdjacentHTML('afterbegin', markup);
  }
  */
