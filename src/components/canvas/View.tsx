'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

interface ViewProps {
  children?: any
  props?: any
  orbit?: boolean
  className?: string
  track?: any
  index?: number
}

const View = forwardRef(({ children, orbit, className, ...props }: ViewProps, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} className={className} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls makeDefault />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
