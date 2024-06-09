// components/RecentPages.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const VISITED_PAGES_KEY = 'visitedPages';

const RecentPages: React.FC = () => {
  const [recentPages, setRecentPages] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPages = JSON.parse(localStorage.getItem(VISITED_PAGES_KEY) || '[]');
      setRecentPages(storedPages);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg w-48 z-50">
      <h4 className="font-bold mb-2">Son Gezilenler</h4>
      <ul className="space-y-1 text-sm">
        {recentPages.map((page, index) => (
          <li key={index}>
            <Link href={page} className="hover:underline">
              {page === '/' ? 'Ana Sayfa' : page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPages;
