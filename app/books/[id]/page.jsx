import React from 'react'
import { notFound } from 'next/navigation'

async function getBook(id) {
    const res = await fetch(`http://localhost:4000/api/book/${id}`)
  
    if (!res.ok) {
      notFound()
    }
  
    return res.json()
  }

export default async function BookDetails({params}) {
    const book = await getBook(params.id)
  return (
    <main>
      <nav>
        <h2>Book Details</h2>
      </nav>
      <div className="card">
        <h3>{book.bookName}</h3>
        <small>Written by {book.author}</small>
        <p>{book.description}</p>
        <p className="available-box">Available: {book.available}</p>
      </div>
    </main>
  )
}
