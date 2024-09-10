interface DivComponentInterface {
  el: HTMLDivElement;
  render: () => HTMLDivElement;
}

export class DivComponent implements DivComponentInterface {
  el: HTMLDivElement;
  constructor() {
    this.el = document.createElement('div');
  }

  render(): HTMLDivElement {
    return this.el;
  }
}
