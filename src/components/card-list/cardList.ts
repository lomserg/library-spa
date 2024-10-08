import { DivComponent } from '../../common/div-component';
import { AppState } from '../../app';
import './cardList.css';
import { MainState } from '../../views/mainView/mainView';
import { Card } from '../card/card';
export class CardList extends DivComponent {
  appState: AppState;
  state: MainState;

  constructor(appState: AppState, state: MainState) {
    super();
    this.state = state;
    this.appState = appState;
  }

  render(): HTMLDivElement {
    this.el.innerHTML = ''; // Clear the content

    if (this.state.loading) {
      this.el.innerHTML = `<div class="class_list__loader">Загрузка..</div>`;
      return this.el;
    }

    this.el.classList.add('card_list');
    this.el.innerHTML = `
    <h1>Найдено книг - ${this.state.numFound}</h1>
  `;
    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card__grid');
    for (const card of this.state.list) {
      cardGrid.append(new Card(this.appState, card).render());
    }
    this.el.append(cardGrid);
    return this.el;
  }
}
