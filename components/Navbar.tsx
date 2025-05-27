"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer relative z-10">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={46}
                        height={44}
                    />
                </div>
            </Link>
            <NavItems />
            <div className="relative z-10 flex items-center gap-4 ">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <div className="bg-[#fe5933] text-white px-4 py-2 rounded-lg">
                          <SignInButton mode="modal" />
                    </div>                
                </SignedOut>
            </div>
    </nav>
  )
}

export default Navbar