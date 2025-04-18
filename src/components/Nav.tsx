"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center lg:mx-20 px-6 py-6   bg-[#222222] text-white  rounded-[50px]">
      <div>
        <Link href="/">
          <Image src="/Subtract.png" alt="logo" width={50} height={50} />
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 font-bold ">
        <Link className='hover:text-yellow-400' href="/">Home</Link>
        <Link className='hover:text-yellow-400'href="/about">About</Link>
        <Link className='hover:text-yellow-400'href="/contact">Contact</Link>
      </div>
      
      <div className="hidden md:block bg-[#575756] font-bold rounded-[25px] border-2 border-[#7F7F7F] px-5 py-2">
        <Link href="/login">Login</Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 z-10 left-0 w-full h-[calc(100vh-8%)] justify-around font-bold text-3xl bg-[#222222] flex flex-col items-center py-6 md:hidden">
          <Link href="/" className="py-2 hover:text-yellow-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="py-2 hover:text-yellow-400" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="py-2 hover:text-yellow-400" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/login" className=" hover:text-yellow-400 mt-4 bg-[#575756] font-bold rounded-[25px] border-2 border-[#7F7F7F] px-5 py-2" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
