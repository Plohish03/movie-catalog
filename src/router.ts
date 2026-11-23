export interface RouteContext {
  params: Record<string, string>;
  query: URLSearchParams;
}
export type PageRenderer = (root: HTMLElement, ctx: RouteContext) => void | (() => void);

interface Route {
  pattern: RegExp;
  keys: string[];
  render: PageRenderer;
}

const routes: Route[] = [];

export function addRoute(path: string, render: PageRenderer): void {
  const keys: string[] = [];
  const source = path.replace(/:(\w+)/g, (_, key: string) => {
    keys.push(key);
    return '([^/]+)';
  });
  routes.push({ pattern: new RegExp(`^${source}$`), keys, render });
}

export function navigate(path: string): void {
  location.hash = path;
}

export function startRouter(outlet: HTMLElement): void {
  let cleanup: (() => void) | undefined;

  const handle = (): void => {
    cleanup?.();
    cleanup = undefined;
    outlet.replaceChildren();

    const [path = '/', search = ''] = (location.hash.slice(1) || '/').split('?');
    for (const route of routes) {
      const match = route.pattern.exec(path);
      if (!match) continue;
      const params = Object.fromEntries(route.keys.map((k, i) => [k, match[i + 1] ?? '']));
      const result = route.render(outlet, { params, query: new URLSearchParams(search) });
      cleanup = typeof result === 'function' ? result : undefined;
      return;
    }
    outlet.textContent = 'Страница не найдена';
  };

  window.addEventListener('hashchange', handle);
  handle();
}
