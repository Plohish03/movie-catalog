import type { PageRenderer } from '../router';

export const renderMoviePage: PageRenderer = (root, ctx) => {
  root.textContent = `Movie page: ${ctx.params.id}`;
};
