import React from 'react'
import Image from 'next/image'
import Logo from './book.png'
import Link from 'next/link'

export default function Navbar() {
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
      <Link href="/">Dashboard</Link>
      <Link href="/books">Books</Link>
      <Link href="/create">Add Book</Link>
    </nav>
  )
}
