import { useEffect } from 'react';

// 'visitedPages' anahtarı altında yerel depolama (localStorage) için anahtar değeri
const VISITED_PAGES_KEY = 'visitedPages';

// Ziyaret edilen sayfaları izlemek için özel bir hook oluşturur.
export const useVisitedPages = () => {
  useEffect(() => {
    // Ziyaret edilen sayfaları güncelleyen fonksiyon
    const updateVisitedPages = () => {
      const pathname = window.location.pathname; // Geçerli sayfa yolunu alır.
      // Yerel depolamadan ziyaret edilen sayfaları alır ve dizini günceller.
      const visitedPages = JSON.parse(localStorage.getItem(VISITED_PAGES_KEY) || '[]');
      const newVisitedPages = [pathname, ...visitedPages.filter((page: string) => page !== pathname)];

      // En fazla 5 sayfa tutar, fazlasını atar.
      if (newVisitedPages.length > 5) newVisitedPages.pop();

      // Güncellenmiş sayfa listesini yerel depolamaya kaydeder.
      localStorage.setItem(VISITED_PAGES_KEY, JSON.stringify(newVisitedPages));
    };

    updateVisitedPages(); // Bileşen ilk yüklendiğinde sayfa güncellemesi yapar.

    // Tarayıcı geçmişi değiştiğinde sayfa güncellemelerini işleyecek fonksiyon.
    const handleHistoryChange = () => {
      updateVisitedPages();
    };

    // popstate olayını dinler (tarayıcı geri ve ileri navigasyonları için)
    window.addEventListener('popstate', handleHistoryChange);
    // pushstate ve replacestate olaylarını dinler (manuel gezinme için)
    window.addEventListener('pushstate', handleHistoryChange);
    window.addEventListener('replacestate', handleHistoryChange);

    // Orijinal history.pushState ve history.replaceState metodlarını referans alır.
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    // history.pushState metodunu aşırı yükler (override) ve handleHistoryChange'i çağırır.
    history.pushState = function (...args) {
      originalPushState.apply(this, args); // Orijinal pushState'i çağırır.
      handleHistoryChange(); // Sayfa değişikliğini işler.
    };

    // history.replaceState metodunu aşırı yükler (override) ve handleHistoryChange'i çağırır.
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args); // Orijinal replaceState'i çağırır.
      handleHistoryChange(); // Sayfa değişikliğini işler.
    };

    // Temizleme fonksiyonu, bileşen yok edildiğinde olay dinleyicilerini kaldırır.
    return () => {
      window.removeEventListener('popstate', handleHistoryChange);
      window.removeEventListener('pushstate', handleHistoryChange);
      window.removeEventListener('replacestate', handleHistoryChange);

      // pushState ve replaceState metodlarını orijinal halleri ile değiştirir.
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);
};
