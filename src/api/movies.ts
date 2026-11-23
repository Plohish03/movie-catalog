import { ApiError, delay, loadDb } from './client';
import type { Genre, Movie, Paginated, SortBy } from './types';
import { filterMovies, paginate, sortMovies } from '../utils/movies';

export const PAGE_SIZE = 12;
const LATENCY_MS = 300;

export interface DiscoverParams {
  page?: number;
  genre?: number;
  year?: number;
  sortBy?: SortBy;
}

export async function discoverMovies(
  params: DiscoverParams = {},
  signal?: AbortSignal,
): Promise<Paginated<Movie>> {
  const [db] = await Promise.all([loadDb(), delay(LATENCY_MS, signal)]);
  signal?.throwIfAborted();
  const filtered = filterMovies(db.movies, { genre: params.genre, year: params.year });
  const sorted = sortMovies(filtered, params.sortBy ?? 'rating.desc');
  return paginate(sorted, params.page ?? 1, PAGE_SIZE);
}

export async function searchMovies(
  query: string,
  page = 1,
  signal?: AbortSignal,
): Promise<Paginated<Movie>> {
  const [db] = await Promise.all([loadDb(), delay(LATENCY_MS, signal)]);
  signal?.throwIfAborted();
  return paginate(filterMovies(db.movies, { query }), page, PAGE_SIZE);
}

export async function getMovieDetails(id: number, signal?: AbortSignal): Promise<Movie> {
  const [db] = await Promise.all([loadDb(), delay(LATENCY_MS, signal)]);
  signal?.throwIfAborted();
  const movie = db.movies.find((m) => m.id === id);
  if (!movie) throw new ApiError(404, `Movie ${id} not found`);
  return movie;
}

export async function getGenres(signal?: AbortSignal): Promise<Genre[]> {
  const db = await loadDb();
  signal?.throwIfAborted();
  return db.genres;
}
