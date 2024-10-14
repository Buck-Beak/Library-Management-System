"use client"
import React from 'react'
import { notFound } from 'next/navigation'
import { useState ,useEffect } from 'react'

export default function BookDetails({params}) {
    const [book, setBook] = useState(null);
    const [msg,setMsg] = useState('');

    const getBook=async(id)=>{
      const res = await fetch(`http://localhost:4000/api/book/${id}`)
    
      if (!res.ok) {
        notFound()
      }
    
      return res.json()
    }

    // Fetch the book details on component mount
    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await getBook(params.id);
            setBook(bookData); // Set the book state
        };

        fetchBook();
    }, [params.id]);
    const decrementAvailable=async()=>{
      try {
        const res = await fetch(`http://localhost:4000/api/book/${book._id}/rent`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to rent book');
        }

        const data = await res.json();
        setBook((prevBook) => ({ ...prevBook, available: data.available })); // Update available count
        setMsg('Kindly return the book within a week to avoid a 100 ruppees fee.');
      } catch (error) {
          console.error(error.message);
      }
    }
  return (
    <main>
      <nav>
        <h2>Book Details</h2>
      </nav>
      <div className="card">
        <h3>{book && book.bookName}</h3>
        <small>Written by {book && book.author}</small>
        <p>{book && book.description}</p>
        <p className="available-box">Available: {book && book.available}</p>
      </div>
      <div className="card">
        <button className="btn-primary" onClick={decrementAvailable}>Rent book</button>
        <p>{msg && msg}</p>
      </div>
    </main>
  )
}
