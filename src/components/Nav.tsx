"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 md:px-40 py-6  bg-[#222222] text-white">
      <div>
        <Link href="/">
          <Image src="/subtract.png" alt="logo" width={50} height={50} />
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
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
        <div className="absolute top-16 z-10 left-0 w-full bg-[#222222] flex flex-col items-center py-6 md:hidden">
          <Link href="/" className="py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="py-2" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="py-2" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/login" className="mt-4 bg-[#575756] font-bold rounded-[25px] border-2 border-[#7F7F7F] px-5 py-2" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
