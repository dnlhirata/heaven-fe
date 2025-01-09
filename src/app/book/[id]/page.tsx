import Questions from "@/components/questions";

export default async function BookDetail({ params }: { params: { id: string } }) {
  const { id } = await params
  const data = await fetch(`http://localhost:8000/api/books/${id}`)
  const book = await data.json()
  const formattedText = book.content.replace(/\r\n/g, '<br />');

  return (
    <div className="max-h-screen flex gap-x-3 p-5">
      <div className="flex flex-col gap-y-3 w-1/2">
        <section className="h-1/2 p-3 border-2 border-gray-400">
          <h1 className="text-center">Metadata</h1>
          <p>Author ...</p>
        </section>
        <Questions bookId={id}/>
      </div>
      <section className="flex flex-col w-1/2 p-3 border-2 border-gray-400">
        <h1 className="text-center">Content</h1>
        <div className="overflow-y-auto" dangerouslySetInnerHTML={{ __html: formattedText }} />
      </section>
    </div>
  )
}