interface Abstract {
  setTitle: (title: string) => void;
  render: () => void;
  destroy: () => void;
}

export class AbstractView implements Abstract {
  protected app: HTMLElement | null;

  constructor() {
    this.app = document.getElementById('root');
  }
  setTitle(title: string): void {
    document.title = title;
  }
  render(): void {
    return;
  }
  destroy(): void {
    return;
  }
}
