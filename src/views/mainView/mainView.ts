import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { Search } from '../../components/search/serach';

export interface Abstract {
  setTitle: (title: string) => void;
  render: () => void;
  destroy: () => void;
}

export interface MainState {
  list: number[];
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
    loading: false,
    searchQuery: undefined,
    offSet: 0,
  };

  constructor(private appState: AppState) {
    super();
    this.appState = appState;
    // Track changes in appState using 'onChange'
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Поиск книг'); // Use setTitle correctly, assuming it's implemented in AbstractView
  }

  // Hook to handle appState changes
  appStateHook(path: string) {
    if (path === 'favorites') {
      console.log(`Favorites updated: ${this.appState.favorites}`);
    }
  }

  render() {
    const main = document.createElement('div');
    main.append(new Search(this.state).render());
    this.app?.append(main);

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
