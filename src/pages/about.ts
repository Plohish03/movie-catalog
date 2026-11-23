import type { PageRenderer } from '../router';

export const renderAboutPage: PageRenderer = (root) => {
  root.textContent = 'About page';
};
