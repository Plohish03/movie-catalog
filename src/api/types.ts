export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  posterUrl: string | null;
  year: number;
  rating: number;
  runtime: number;
  genreIds: number[];
  director: string;
  cast: string[];
}

export interface Database {
  genres: Genre[];
  movies: Movie[];
}

export interface Paginated<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}

export type SortBy = 'rating.desc' | 'year.desc' | 'year.asc' | 'title.asc';
