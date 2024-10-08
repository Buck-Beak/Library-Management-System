import React from 'react'
import Link from 'next/link'

async function getBooks() {
    const res = await fetch('http://localhost:4000/api/book')
  
    return res.json()
  }

export default async function BookList() {
    const books = await getBooks()

    return (
      <>
        {books.map((book) => (
          <div key={book._id} className="card my-5">
            <Link href={`/books/${book._id}`}>
              <h3>{book.bookName}</h3>
              <h4>{book.author}</h4>
              <p>{book.description.slice(0, 200)}...</p>
            </Link>
          </div>
        ))}
      </>
    )
}
