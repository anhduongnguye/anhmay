export function getScrollBehavior() {
  if (typeof window === 'undefined') return 'smooth';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function scrollToElement(element, options = {}) {
  if (!element) return;
  element.scrollIntoView({
    behavior: getScrollBehavior(),
    block: 'start',
    ...options,
  });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
}

export const PAGE_TRANSITION_STYLE = {
  opacity: 1,
  transform: 'translateY(0)',
  transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
};

export const PAGE_TRANSITION_HIDDEN = {
  opacity: 0,
  transform: 'translateY(20px)',
};
