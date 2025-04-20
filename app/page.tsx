"use client";

import dynamic from 'next/dynamic'

// Use dynamic import with no SSR to prevent server-side rendering issues
const App = dynamic(() => import('../src/App'), { ssr: false })

export default function Page() {
  return <App />
}
