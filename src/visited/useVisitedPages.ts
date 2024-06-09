// hooks/useVisitedPages.ts
import { useEffect } from 'react';

const VISITED_PAGES_KEY = 'visitedPages';

export const useVisitedPages = () => {
  useEffect(() => {
    const updateVisitedPages = () => {
      const pathname = window.location.pathname;
      const visitedPages = JSON.parse(localStorage.getItem(VISITED_PAGES_KEY) || '[]');
      const newVisitedPages = [pathname, ...visitedPages.filter((page: string) => page !== pathname)];

      if (newVisitedPages.length > 5) newVisitedPages.pop();

      localStorage.setItem(VISITED_PAGES_KEY, JSON.stringify(newVisitedPages));
    };

    updateVisitedPages(); // Initial update

    const handleHistoryChange = () => {
      updateVisitedPages();
    };

    window.addEventListener('popstate', handleHistoryChange);
    window.addEventListener('pushstate', handleHistoryChange);
    window.addEventListener('replacestate', handleHistoryChange);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleHistoryChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleHistoryChange();
    };

    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
      window.removeEventListener('pushstate', handleHistoryChange);
      window.removeEventListener('replacestate', handleHistoryChange);

      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);
};
