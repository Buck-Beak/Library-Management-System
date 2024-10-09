"use client"
import React from 'react'
import { useState } from 'react'

export default function signup() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log('signup');
    }
  return (
    <form onSubmit = {handleSubmit}>
        <label>
        <span>First Name:</span>
        <input
          required 
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          //className={emptyFields.includes('bookName')?'error':''}
        />
      </label>
      <label>
        <span>Last Name:</span>
        <input
          required 
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          //className={emptyFields.includes('bookName')?'error':''}
        />
      </label>
        <label>
        <span>Email:</span>
        <input
          required 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          //className={emptyFields.includes('bookName')?'error':''}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          //className={emptyFields.includes('author')?'error':''}
        />
        </label>
        <button className="btn-primary">Login</button>
    </form>
  )
}
