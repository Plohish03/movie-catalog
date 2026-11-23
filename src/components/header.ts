import { el } from '../utils/dom';

export function renderHeader(): HTMLElement {
  return el(
    'header',
    { class: 'header' },
    el('a', { href: '#/' }, 'О нас'),
    el('a', { href: '#/movies' }, 'Фильмы'),
  );
}
