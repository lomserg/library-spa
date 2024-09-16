import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { Search } from '../../components/search/serach';
import { CardList } from '../../components/card-list/cardList';
import { CardsState } from '../../components/card/cardInterface';
export interface Abstract {
  setTitle: (title: string) => void;
  render: () => void;
  destroy: () => void;
}

export interface MainState {
  list: CardsState[];
  numFound: number;
  loading: boolean;
  searchQuery?: string; // 'undefined' is implicit for optional properties
  offSet: number;
}

interface AppState {
  favorites: string[];
}

class MainView extends AbstractView implements Abstract {
  state: MainState = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    offSet: 0,
  };

  constructor(private appState: AppState) {
    super();
    this.appState = appState;
    // Track changes in appState using 'onChange'
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Поиск книг'); // Use setTitle correctly, assuming it's implemented in AbstractView
  }

  // Hook to handle appState changes
  appStateHook(path: string) {
    if (path === 'favorites') {
      console.log(`Favorites updated: ${this.appState.favorites}`);
    }
  }

  async stateHook(path: string) {
    console.log('State changed:', path); // Add this line for debugging

    if (path === 'searchQuery') {
      this.state.loading = true;
      this.render(); // Trigger re-render to show the loading state
      const data = await this.loading(
        this.state.searchQuery,
        this.state.offSet,
      );
      this.state.loading = false;
      this.state.list = data.docs;
      this.state.numFound = data.numFound;
      console.log(this.state.list.length);
      console.log(data);
      this.render(); // Re-render again to update with fetched data
    }

    if (path === 'list') {
      this.render();
    }
  }

  async loading(q: string | undefined, offset: number) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`,
    );
    return res.json();
  }
  render() {
    const main = document.createElement('div');
    if (this.app) {
      this.app.innerHTML = '';
    }
    this.app?.append(main);
    const cardList = new CardList(this.appState, this.state);
    const cardListHtml = cardList.render();

    main.append(new Search(this.state).render());
    main.append(cardListHtml);

    // Simulating a change in appState
    // this.appState.favorites.push('db');
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState);
    const headerHtml = header.render();
    this.app?.prepend(headerHtml);
  }

  destroy(): void {
    if (this.app) {
      this.app.innerHTML = '';
    }
  }
}

export default MainView;
