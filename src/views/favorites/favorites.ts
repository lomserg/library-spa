import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { CardList } from '../../components/card-list/cardList';
import { AppState } from '../../app';
import { MainState } from '../mainView/mainView';
interface Abstract {
  setTitle: (title: string) => void;
  render: () => void;
  destroy: () => void;
}

class FavoritesView extends AbstractView implements Abstract {
  constructor(appState: AppState) {
    super(appState);
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Избранное'); // Use setTitle correctly, assuming it's implemented in AbstractView
  }

  // Hook to handle appState changes
  appStateHook(path: string) {
    if (path === 'favorites') {
      console.log(`Favorites updated: ${this.appState.favorites}`);
      this.render();
    }
  }

  render() {
    const main = document.createElement('div');
    if (this.app) {
      this.app.innerHTML = '';
    }
    this.app?.append(main);
    // Create a MainState object for the favorites view
    const favoritesState: MainState = {
      list: this.appState.favorites, // The favorites list
      numFound: this.appState.favorites.length, // The number of favorites
      loading: false, // No need for loading in this case
      offSet: 0, // Optional, could be left as default
    };

    const cardList = new CardList(this.appState, favoritesState);
    const cardListHtml = cardList.render();

    main.append(cardListHtml);

    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState);
    const headerHtml = header.render();
    this.app?.prepend(headerHtml);
  }

  destroy(): void {
    onChange.unsubscribe(this.appState);
  }
}

export default FavoritesView;
