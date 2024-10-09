"use client"
import React from 'react'
import { useState } from 'react'

export default function login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log('login');
    }
  return (
    <form onSubmit = {handleSubmit}>
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
