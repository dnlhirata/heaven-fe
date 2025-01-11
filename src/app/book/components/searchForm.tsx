"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function SearchForm() { 
  const [bookId, setBookId] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleBookSearch = () => {
    if (!bookId) setError(true);

    router.push(`/book/${bookId}`);
  }

  return (
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
  );
}