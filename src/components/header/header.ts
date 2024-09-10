import { DivComponent } from '../../common/div-component';
import { AppState } from '../../app';

export class Header extends DivComponent {
  appState: AppState;
  constructor(appState: AppState) {
    super();
    this.appState = appState;
  }
  render(): HTMLDivElement {
    this.el.innerHTML = '';
    this.el.classList.add('header');
    return this.el;
  }
}
