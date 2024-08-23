import MainView, { Abstract } from './views/mainView/mainView';
const hello = 'hello';
interface AppComponent {
  routes: Route[];
}

interface Route {
  path: string;
  view: new () => Abstract;
}

class App implements AppComponent {
  private currentView: Abstract | null = null; // Declare currentView as a class property

  routes = [{ path: '', view: MainView }];
  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  }

  route() {
    // Destroy the current view before loading a new one
    if (this.currentView) {
      this.currentView.destroy();
    }

    // Find the matching route
    const matchingRoute =
      this.routes.find((r) => r.path === location.hash) || this.routes[0];
    const ViewClass = matchingRoute.view;

    // Instantiate and render the new view
    this.currentView = new ViewClass();
    this.currentView.render();
  }
}

new App();
