import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Nav() {
  return (
    <div className="flex justify-between items-center px-40 py-8">
      <div>
        <Link href="/">
          <Image src="/subtract.png" alt="logo" width={50} height={50} />
        </Link>
      </div>
      <div className="flex gap-8 text-white">
        <Link href="/">
          Home
        </Link>
        <Link href="/">
          About
        </Link>
        <Link href="/">
          Contact
        </Link>
      </div>
      <div className="bg-[#575756] font-bold rounded-[25px] border-2 border-[#7F7F7F]  text-white px-5 py-2">
        <Link href="/">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Nav
