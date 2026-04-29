type IdleDeadlineLike = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type RequestIdleCallbackLike = (
  callback: (deadline: IdleDeadlineLike) => void,
  options?: { timeout: number }
) => number;

type CancelIdleCallbackLike = (handle: number) => void;

type IdleWindow = Window & typeof globalThis & {
  requestIdleCallback?: RequestIdleCallbackLike;
  cancelIdleCallback?: CancelIdleCallbackLike;
};

export function scheduleIdleTask(task: () => void, timeout = 1200) {
  if (typeof window === 'undefined') {
    return null;
  }

  const idleWindow = window as IdleWindow;

  if (typeof idleWindow.requestIdleCallback === 'function') {
    return idleWindow.requestIdleCallback(() => task(), { timeout });
  }

  return window.setTimeout(task, 250);
}

export function cancelIdleTask(handle: number | null) {
  if (handle === null || typeof window === 'undefined') {
    return;
  }

  const idleWindow = window as IdleWindow;

  if (
    typeof idleWindow.requestIdleCallback === 'function' &&
    typeof idleWindow.cancelIdleCallback === 'function'
  ) {
    idleWindow.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
}
