import { DivComponent } from '../../common/div-component';
import { AppState } from '../../app';
import './card.css';
import { CardsState } from './cardInterface';
export class Card extends DivComponent {
  appState: AppState;
  cardsState: CardsState;

  constructor(appState: AppState, cardsState: CardsState) {
    super();
    this.appState = appState;
    this.cardsState = cardsState;
  }
  addFavorites() {
    // Check if a card with the same key is already in favorites
    if (
      !this.appState.favorites.some((fav) => fav.key === this.cardsState.key)
    ) {
      this.appState.favorites.push(this.cardsState);
    }
  }

  deleteFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      (b) => b.key !== this.cardsState.key,
    );
    // this.appState.favorites = this.appState.favorites.filter(
    //   (fav) => fav.key !== this.cardsState.key,
    // );
  }

  render(): HTMLDivElement {
    this.el.classList.add('card');
    const isFavorite = this.appState.favorites.some(
      (fav) => fav.key === this.cardsState.key,
    );
    // const existInFav = this.appState.favorites.find(
    //   (b) => b.key === this.cardsState.key,
    // );
    this.el.innerHTML = `
    <div class="card__image">
      <img
        src="https://covers.openlibrary.org/b/olid/${this.cardsState.cover_edition_key}-M.jpg"
      />
    </div>
    <div class="card__info">
      <div class="card__tag">
        ${this.cardsState.subject ? this.cardsState.subject[0] : 'Не найдено'}
      </div>
      <div class="card__name">${this.cardsState?.title}</div>
      <div class="card__author">
        ${this.cardsState.author_name ? this.cardsState.author_name[0] : 'не задан'}
      </div>
      <div class="card__footer">
        <button>${isFavorite ? 'в избранном' : 'NO FAV'}</button>
      </div>
    </div>`;
    if (isFavorite) {
      this.el
        .querySelector('button')
        ?.addEventListener('click', this.deleteFavorites.bind(this));
    } else {
      this.el
        .querySelector('button')
        ?.addEventListener('click', this.addFavorites.bind(this));
      console.log(this.appState.favorites);
    }

    return this.el;
  }
}
