import { AppState } from '../app';
interface Abstract {
  setTitle: (title: string) => void;
  render: () => void;
  destroy: () => void;
}

export class AbstractView implements Abstract {
  protected appState: AppState;
  protected app: HTMLElement | null;

  constructor(appState: AppState) {
    this.appState = appState;
    this.app = document.getElementById('root');
  }
  setTitle(title: string): void {
    document.title = title;
  }
  render(): void {}
  destroy(): void {}
}
