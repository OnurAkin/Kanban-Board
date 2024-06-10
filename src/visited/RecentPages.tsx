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
    <div className="block max-w-sm p-6 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h4 className="font-semibold text-lg mb-3 flex items-center justify-between">
        <span>Son Gezilenler</span>

      </h4>
      <ul className="space-y-2 text-sm list-disc list-inside">
        {recentPages.map((page, index) => (
          <li key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1">
            <Link href={page} className="hover:underline">
              {page === '/' ? 'Ana Sayfa' : decodeURIComponent(page).replace(/^\//, '')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPages;
