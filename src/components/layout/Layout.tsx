'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import React from 'react'
import { Navigation } from './Navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import { Container, Flex, Grid, Theme } from '@radix-ui/themes'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()

  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [theme])

  return (
    <>
      <ThemeProvider defaultTheme='dark' disableTransitionOnChange enableSystem={false} attribute='class'>
        <Theme scaling={'110%'}>
          <div className='touch-auto overflow-hidden' ref={ref}>
            <Flex width='100%'>
              <Navigation />
              <div className='grow'>{children}</div>
            </Flex>
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
        </Theme>
      </ThemeProvider>
    </>
  )
}

export { Layout }
