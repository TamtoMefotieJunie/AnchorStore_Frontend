'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@app/components/Button/Button'
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Products', href: '#' },
  { name: 'Categories', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Contact Us', href: '#' },
]

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter();
  return (
    <div className="bg-white h-screen w-full">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between w-full lg:px-8">
          <div className="flex items-center w-1/8">
              <Image src='/logo.png' width={200} height={100} alt='logo' />
          </div>
        
          <div className="flex items-center w-1/3 gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-md font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center w-1/7 justify-around gap-x-4  ">
            <a href="/Auth/Signin" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
            <Button variant="secondary" label = "Sign Up" onClick={() => {
                  router.push("/Auth/Signup");
            }}/>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/778 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-complementary to-tertiary opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
       <div className='flex flex-row items-center justify-around'>
            <div className="max-w-2xl py-54">
                <div className="text-center">
                    <h1 className="text-6xl font-semibold tracking-tight text-balance text-gray-900">
                    Never Run Out of Stock &
                    Build Customer Trust
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    Track inventory in real time, prevent stockouts, and keep your customers confident in your business.
                    </p>
                    <div className="mt-10 w-[40%] flex items-center justify-start mx-5">
                    <Button variant="secondary" label="Get Started"/>
                    </div>
                </div>
            </div>
            <div className="">
                <Image src='/landing.png' width={700} height={400} alt='heroimage' />
            </div>
       </div>
        
      </div>
    </div>
  )
}
