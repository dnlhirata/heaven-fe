import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';
import Link from 'next/link';
import SearchForm from './components/searchForm';
import { Book } from './types';

export default async function SearchBook() {
  const cookieStore = await cookies()  
  const token = cookieStore.get('auth_token')

  if (!token) {
    redirect('/');
  }

  const userLastViewedBooks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/last_viewed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token?.value}`
    }
  });
  const data = await userLastViewedBooks.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-none list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get start by entering an ID of a book on Project Gutenberg.
          </li>
        </ol>

        <SearchForm />
      </main>
      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span>Last viewed books: </span>
        {data.map((book: Book) => (<Link className="text-gray-400 underline" key={book.external_id} href={`book/${book.external_id}`}>{book.metadata.title}</Link>))}
      </div>
    </div>
  );
}