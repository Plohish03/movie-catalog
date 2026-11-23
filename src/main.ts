import './style.css';
import { addRoute, startRouter } from './router';
import { renderHeader } from './components/header';
import { renderAboutPage } from './pages/about';
import { renderMoviesPage } from './pages/movies';
import { renderMoviePage } from './pages/movie';
import { el } from './utils/dom';

const app = document.querySelector<HTMLDivElement>('#app')!;
const outlet = el('main');
app.append(renderHeader(), outlet);

addRoute('/', renderAboutPage);
addRoute('/movies', renderMoviesPage);
addRoute('/movies/:id', renderMoviePage);

startRouter(outlet);
