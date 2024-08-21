import { AbstractView } from "../../components/view";
export interface Abstract {
  setTitle: (title: string) => void;
  render: () => void;
  destroy: () => void;
}
class MainView extends AbstractView implements Abstract {
  constructor() {
    super();
    this.setTitle("Поиск книг");
  }
  render() {
    const main = document.createElement("div");
    main.innerHTML = "Поиск";
    this.app?.append(main);
  }
  destroy(): void {
    // Implement the destroy method to clean up, if necessary
    if (this.app) {
      this.app.innerHTML = "";
    }
  }
}
export default MainView;
