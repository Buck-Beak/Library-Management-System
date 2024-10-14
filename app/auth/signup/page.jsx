"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [error,setError] = useState('');
    const router = useRouter();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log('signup');
        try {
          const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: firstName, lastname: lastName, email, password }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.error || "Failed to sign up");
          }
          // Optionally, you could redirect or take other actions here
          router.push('/auth/login');
        } catch (err) {
          setError(err.message);  // Set error message
        }
    }
  return (
    <form onSubmit = {handleSubmit}>
        <label>
          <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        </label>
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
        {error && <div className="error">{error}</div>}
    </form>
  )
}
