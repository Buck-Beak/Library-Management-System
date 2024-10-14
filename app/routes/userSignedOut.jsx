import React from 'react'
import Link from 'next/link'

export default function UserSignedOut() {
  return (
    <nav>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/signup">Sign up</Link>
    </nav>
  )
}
