"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    //const [signedIn,setIsSignedIn] = useState(false);
    const router = useRouter();
    const { setSignedIn } = useAuth();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log('login');
        try {
          const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.error || "Failed to login");
          }

          //localStorage.setItem('user',JSON.stringify(json));
          localStorage.setItem('token', data.token);
          localStorage.setItem('userEmail', data.email);
          setSignedIn(true);

          // Optionally, you could redirect or take other actions here
          router.push('/books');
        } catch (err) {
          setError(err.message);  // Set error message
        }
        
    }
  return (
    <form onSubmit = {handleSubmit}>
      <label>
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
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
