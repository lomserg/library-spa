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

  render(): HTMLDivElement {
    this.el.classList.add('card');
    // const existInFav = this.appState.favorites.find(
    //   (b) => b.key === this.cardsState.key,
    // );
    this.el.innerHTML = `
    <div class="card__image">
    <img src="https://covers.openlibrary.org/b/olid/${this.cardsState.cover_edition_key}-M.jpg"/> 
    </div>
    <div class="card__info">
      ${this.cardsState.subject ? this.cardsState.subject[0] : 'Не найдено'}
    </div>
    <div class="card__name">
      ${this.cardsState?.title}
    </div>
    <div class="card__author">
      ${this.cardsState.author_name ? this.cardsState.author_name[0] : 'не задан'}
    </div>
    <div class="card__footer">
      <button>
      </button>
    </div>
   
    `;
    return this.el;
  }
}
