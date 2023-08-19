'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import React from 'react'
import { NavigationMenu } from './NavigationMenu'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()

  return (
    <div
      className='flex flex-row'
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'none',
        touchAction: 'auto',
      }}
    >
      <NavigationMenu />
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
    </div>
  )
}

export { Layout }
