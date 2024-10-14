"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import Logo from './book.png'
//import Link from 'next/link'
import UserSignedIn from '../routes/userSignedIn'
import UserSignedOut from '../routes/userSignedOut'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { signedIn, setSignedIn } = useAuth();
 // const [signedIn,setIsSignedIn] = useState(false);
  const router = useRouter();

  const handleClick=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setSignedIn(false);
    router.push('/auth/login');
  }

  /*useEffect(() => {
    if (localStorage !== 'undefined'){
      const token = localStorage.getItem('token'); 
      if (token) {
        setSignedIn(true);
      }
      console.log(signedIn);
    }
  }, [signedIn]);*/

  return (
    <nav>
      <Image
        src={Logo}
        alt='Library Manager'
        width={70}
        placeholder='blur'
        quality={100}
      />
      <h1>Library Manager</h1>
      {signedIn?(<UserSignedIn/>):(<UserSignedOut/>)}
      <nav>
      <button onClick={handleClick}>Log Out</button>
      </nav>
    </nav>
  )
}

/*<Link href="/">Dashboard</Link>
      <Link href="/books">Books</Link>
      <Link href="/create">Add Book</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/signup">Sign up</Link>*/