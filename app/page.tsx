"use client"
import React from 'react'
import CompainionCard from '@/components/CompainionCard'
import CompainionList from '@/components/CompainionList'
import CTA from '@/components/CTA'

 
const Page = () => {
  return (
    <>
      <main>
          <h1 className="text-3xl font-bold mb-4">Companions</h1>
         <section className='home-section'>
            <CompainionCard 
              id="123"
              name="Companion 1"
              topic="This is a description of Companion 1."
              subject="Math"
              duration="5 minutes"
              color="#FF5733"
            />
            <CompainionCard 
              id="456"
              name="Companion 2"
              topic="This is a description of Companion 2."
              subject="Science"
              duration="10 minutes"
              color="#33FF57" 
            />
            <CompainionCard 
              id="789"
              name="Companion 3"
              topic="This is a description of Companion 3."
              subject="History"
              duration="15 minutes"
              color="#3357FF"
            />
         </section>
          <section className='home-section'>
              <CompainionList />
              <CTA/>
          </section>
  
      </main>
    </>
  )
}

export default Page