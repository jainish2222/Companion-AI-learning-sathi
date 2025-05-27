import CompanionForm from '../../../components/CompainionForm'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
const page = async () => {
      const { userId } = await auth();
    if(!userId) redirect('/sign-in');

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center mb-7">
      <article className="w-full gap-4 flex flex-col">
                    <h1 className='text-2xl'>Companion Builder</h1>

                    <CompanionForm />
      </article>
    </main>
  )
}

export default page