'use client'

import React from 'react'
import SSEComponent from './components/SseComponent'
import './globals.css'

export default function Home (): React.JSX.Element {
  return (
    <>
      <h1 className="text-3xl shadow-md font-bold text-white text-center bg-blue-400 p-4">Upfluence SSE Stream</h1>
      <div className="bg-gradient-to-b from-gray-300 to-gray-100 min-h-screen">
        <SSEComponent />
      </div>
    </>
  )
}
