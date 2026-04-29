const scriptPromises = new Map<string, Promise<void>>();
const stylesheetPromises = new Map<string, Promise<void>>();

function createAssetError(kind: 'script' | 'stylesheet', url: string) {
  return new Error(`Failed to load ${kind}: ${url}`);
}

export function loadExternalScript(src: string) {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existingScript?.dataset.loaded === 'true') {
    return Promise.resolve();
  }

  const pendingPromise = scriptPromises.get(src);
  if (pendingPromise) {
    return pendingPromise;
  }

  const promise = new Promise<void>((resolve, reject) => {
    if (existingScript) {
      existingScript.addEventListener(
        'load',
        () => {
          existingScript.dataset.loaded = 'true';
          resolve();
        },
        { once: true },
      );
      existingScript.addEventListener('error', () => reject(createAssetError('script', src)), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true';
        resolve();
      },
      { once: true },
    );
    script.addEventListener('error', () => reject(createAssetError('script', src)), {
      once: true,
    });
    document.body.appendChild(script);
  }).finally(() => {
    scriptPromises.delete(src);
  });

  scriptPromises.set(src, promise);
  return promise;
}

export function loadExternalStylesheet(href: string) {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  const existingStylesheet = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`);
  if (existingStylesheet?.dataset.loaded === 'true') {
    return Promise.resolve();
  }

  const pendingPromise = stylesheetPromises.get(href);
  if (pendingPromise) {
    return pendingPromise;
  }

  const promise = new Promise<void>((resolve, reject) => {
    if (existingStylesheet) {
      existingStylesheet.addEventListener(
        'load',
        () => {
          existingStylesheet.dataset.loaded = 'true';
          resolve();
        },
        { once: true },
      );
      existingStylesheet.addEventListener(
        'error',
        () => reject(createAssetError('stylesheet', href)),
        { once: true },
      );
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.addEventListener(
      'load',
      () => {
        link.dataset.loaded = 'true';
        resolve();
      },
      { once: true },
    );
    link.addEventListener(
      'error',
      () => reject(createAssetError('stylesheet', href)),
      { once: true },
    );
    document.head.appendChild(link);
  }).finally(() => {
    stylesheetPromises.delete(href);
  });

  stylesheetPromises.set(href, promise);
  return promise;
}
