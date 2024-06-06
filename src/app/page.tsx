"use client";

import Head from 'next/head';
import Board from '../components/Board';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <meta name="description" content="Kanban Board with Next.js, TypeScript, and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <Board />
      </main>
    </div>
  );
};

export default Home;
