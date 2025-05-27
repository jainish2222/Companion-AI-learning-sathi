import React from 'react'
import { Button } from "@/components/ui/button"
 
const Page = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-black'>
      <h1 className='text-2xl underline bg-amber-300 text-red-400'>Learnify</h1>
      <Button>Click Me</Button>
    </div>
  )
}

export default Page