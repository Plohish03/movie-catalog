import type { PageRenderer } from '../router';

export const renderMoviesPage: PageRenderer = (root) => {
  root.textContent = 'Movies page';
};
