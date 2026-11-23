import { describe, expect, it } from 'vitest';
import { paginate } from './movies';

describe('paginate', () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  it('returns the requested page', () => {
    expect(paginate(items, 2, 10).results).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('clamps page above the last one', () => {
    expect(paginate(items, 99, 10).page).toBe(3);
  });

  it('returns one empty page for empty input', () => {
    expect(paginate([], 1, 10)).toEqual({ page: 1, results: [], totalPages: 1, totalResults: 0 });
  });
});
