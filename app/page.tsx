"use client"
import React from 'react'
import CompainionCard from '@/components/CompainionCard'
import CompainionList from '@/components/CompainionList'
import CTA from '@/components/CTA'
import { recentSessions } from '../constants/index'
 
const Page = () => {
  console.log(recentSessions)
  return (
    <>
      <main>
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
         <section className='home-section'>
            <CompainionCard 
              id="123"
              name="Companion 1"
              topic="This is a description of Companion 1."
              subject="Math"
              duration={5}
              color="#E5D0FF"
            />
            <CompainionCard 
              id="456"
              name="Companion 2"
              topic="This is a description of Companion 2."
              subject="Science"
              duration={10}
              color="#FFDA6E" 
            />
            <CompainionCard 
              id="789"
              name="Companion 3"
              topic="This is a description of Companion 3."
              subject="History"
              duration={15}
              color="#BDE7FF"
            />
         </section>
          <section className='home-section'>
              <CompainionList 
                title="Recently completed lessons"
                companions={recentSessions}
                classNames='w-2/3 max-md:w-full'
              />
              <CTA/>
          </section>
  
      </main>
    </>
  )
}

export default Page