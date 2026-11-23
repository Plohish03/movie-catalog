import type { Database } from './types';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted();
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

let dbPromise: Promise<Database> | null = null;

export function loadDb(): Promise<Database> {
  dbPromise ??= fetch(`${import.meta.env.BASE_URL}data/movies.json`)
    .then((res) => {
      if (!res.ok) throw new ApiError(res.status, `Failed to load data: ${res.status}`);
      return res.json() as Promise<Database>;
    })
    .catch((error) => {
      dbPromise = null;
      throw error;
    });
  return dbPromise;
}
