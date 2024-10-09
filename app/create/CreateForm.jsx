"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from "next/navigation"

export default function CreateForm() {
    const router = useRouter()
    const [bookName,setBookName] = useState('');
    const [author,setAuthor] = useState('');
    const [description,setDescription] = useState('');
    const [available,setAvailable] = useState('');
    const [error,setError] = useState(null);
    const [emptyFields,setEmptyFields] = useState([]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const book = {bookName,author,description,available}
        const response = await fetch('http://localhost:4000/api/book',{
            method:'POST',
            body:JSON.stringify(book),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setBookName('');
            setAuthor('');
            setDescription('');
            setAvailable('');
            setError(null);
            setEmptyFields([]);
            console.log("new book added");
            router.push('/books');
            router.refresh();
        }
        /*if (response.status === 201) {
          router.refresh()
          router.push('/books');
        }*/
    }

  return (
    <form onSubmit = {handleSubmit} className="w-1/2">
        <label>
        <span>Book Title:</span>
        <input
          required 
          type="text"
          onChange={(e) => setBookName(e.target.value)}
          value={bookName}
          className={emptyFields.includes('bookName')?'error':''}
        />
      </label>
      <label>
        <span>Author:</span>
        <input
          required
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          className={emptyFields.includes('author')?'error':''}
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={emptyFields.includes('description')?'error':''}
        />
      </label>
      <label>
        <span>Available:</span>
        <input
          required
          type="number"
          onChange={(e) => setAvailable(e.target.value)}
          value={available}
          className={emptyFields.includes('available')?'error':''}
        />
      </label>
      <button className="btn-primary" >Add Book</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
