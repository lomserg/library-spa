import { DivComponent } from '../../common/div-component';
// import { AppState } from '../../app';
import './search.css';
import { MainState } from '../../views/mainView/mainView';
export class Search extends DivComponent {
  state: MainState;
  constructor(state: MainState) {
    super();
    this.state = state;
  }
  render(): HTMLDivElement {
    this.el.classList.add('search');
    this.el.innerHTML = `
   <div class="search__wrapper">
   <input type="text" placeholder="введите запрос" value="${this.state.searchQuery ? this.state.searchQuery : ''}" class="search__input">
   <img src="/static/search.svg"/>
   </div>
   <button>
    <img src="/static/search.svg" />
   </button>
    `;
    return this.el;
  }
}
