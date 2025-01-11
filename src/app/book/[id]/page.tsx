import { cookies } from 'next/headers';
import Link from 'next/link'
import Questions from "@/app/book/components/questions";

export default async function BookDetail({ params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  
  const token = cookieStore.get('auth_token')
  const { id } = await params
  const data = await fetch(`http://localhost:8000/api/books/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token?.value}`
    }
  });
  const book = await data.json()
  const formattedText = book.content.replace(/\r\n/g, '<br />');

  return (
    <div className="h-screen flex flex-col gap-x-3 p-4">
      <Link className="flex" href="/book">Back to search</Link>
      <div className="flex flex-1 gap-x-3 h-full">
        <div className="flex flex-col gap-y-3 w-1/2">
          <section className="h-fit p-3 border-2 border-gray-400">
            <h1 className="text-center py-2">Metadata</h1>
            <p>Title: {book.metadata.title}</p>
            <p>Author: {book.metadata.author}</p>
            <p>Language: {book.metadata.language}</p>
          </section>
          <Questions bookId={id}/>
        </div>
        <section className="flex flex-col w-1/2 p-3 border-2 border-gray-400 overflow-y-auto max-h-screen">
          <h1 className="text-center py-2">Content</h1>
          <div className="overflow-y-auto" dangerouslySetInnerHTML={{ __html: formattedText }} />
        </section>
      </div>
    </div>
  )
}