import { AbstractView } from '../../components/view';
import onChange from 'on-change';

export interface Abstract {
  setTitle: (title: string) => void;
  render: () => void;
  destroy: () => void;
}

interface MainState {
  list: number[]; // Adjusted the type to be more generic; replace 'any' as needed
  loading: boolean;
  searchQuery: string | undefined;
  offSet: number;
}
interface AppState {
  favorites: string[]; // Define your app state with correct properties
}
class MainView extends AbstractView implements Abstract {
  state: MainState = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offSet: 0,
  };

  constructor(private appState: AppState) {
    // Ensure appState is stored in a private property
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Поиск книг');
  }

  appStateHook() {}
  render() {
    const main = document.createElement('div');
    main.innerHTML = `Число книг: ${this.appState.favorites.length}`;
    this.app?.append(main);
  }
  destroy(): void {
    // Implement the destroy method to clean up, if necessary
    if (this.app) {
      this.app.innerHTML = '';
    }
  }
}
export default MainView;
