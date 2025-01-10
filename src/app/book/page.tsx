"use client"

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react'

export default function Book() { 
  const [bookId, setBookId] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleBookSearch = () => {
    if (!bookId) setError(true);

    router.push(`/book/${bookId}`);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-none list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get start by entering an ID of a book on Project Gutenberg.
          </li>
        </ol>

        <div className="w-full flex gap-4 justify-center items-center flex-col sm:flex-row">
          <div>
            <input className="rounded text-black outline-none border-2 border-gray-400" type="text" onChange={(event) => setBookId(event.target.value)}/>
            {error && <p className="text-red-500 text-center text-sm absolute">Please, insert a ID of a book</p>}
          </div>
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={handleBookSearch}
          >
            Search
          </button>
        </div>
      </main>
      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span>Last viewed books: </span>
        <Link href="">Housekeeping</Link>
      </div>
    </div>
  );
}