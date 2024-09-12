import { DivComponent } from '../../common/div-component';
import { AppState } from '../../app';
import './header.css';

export class Header extends DivComponent {
  appState: AppState;
  constructor(appState: AppState) {
    super();
    this.appState = appState;
  }
  render(): HTMLDivElement {
    this.el.innerHTML = '';
    this.el.classList.add('header');
    this.el.innerHTML = `
    <div>
    <img src='/static/logo.svg' alt='logo'>
    </div>
    <div class='menu'>
      <a class='menu__item' href='#'>
          <img src='/static/search.svg' alt='иконка поиска'>
          Поиск книг
      </a>
      <a class='menu__item' href='#favorites'>
          <img src='/static/favorites.svg' alt='иконка избранного'>
            Избранное
            <div class="counter">${this.appState.favorites.length}</div>
      </a>
    </div>
    `;
    return this.el;
  }
}
