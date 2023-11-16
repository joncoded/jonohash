'use client'

import Link from "next/link"

const Skip = () => {

  const handleSkip = () => {
    document.getElementsByTagName("main")[0].focus()
  }

  return (
    <Link 
      href="#main"
      onClick={handleSkip}
      className={`skip-link
        absolute top-0 right-full z-[1000]
        focus:right-auto focus:bg-zinc-600 focus:text-white focus:border-2
        focus:border-white focus:p-4
      `}
    >
      skip to main content
    </Link>
  )
}

export default Skip