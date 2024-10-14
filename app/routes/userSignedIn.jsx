import React from 'react'
import Link from 'next/link'

export default function UserSignedIn() {
  return (
    <nav>
        <Link href="/books">Books</Link>
        <Link href="/create">Add Book</Link>
    </nav>
    
  )
}

/*<Link href="/auth/login">Login</Link>
        <Link href="/auth/signup">Sign up</Link> */
