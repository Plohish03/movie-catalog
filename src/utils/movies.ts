import type { Movie, Paginated, SortBy } from '../api/types';

export interface MovieFilters {
  genre?: number;
  year?: number;
  query?: string;
}

export function filterMovies(movies: Movie[], { genre, year, query }: MovieFilters): Movie[] {
  const q = query?.trim().toLowerCase();
  return movies.filter(
    (m) =>
      (genre === undefined || m.genreIds.includes(genre)) &&
      (year === undefined || m.year === year) &&
      (!q || m.title.toLowerCase().includes(q)),
  );
}

export function sortMovies(movies: Movie[], sortBy: SortBy): Movie[] {
  const copy = [...movies];
  switch (sortBy) {
    case 'rating.desc':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'year.desc':
      return copy.sort((a, b) => b.year - a.year);
    case 'year.asc':
      return copy.sort((a, b) => a.year - b.year);
    case 'title.asc':
      return copy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }
}

export function paginate<T>(items: T[], page: number, pageSize: number): Paginated<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    page: current,
    results: items.slice(start, start + pageSize),
    totalPages,
    totalResults: items.length,
  };
}
