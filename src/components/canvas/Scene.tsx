'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useMemo, useState } from 'react'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      {process.env.NODE_ENV === 'development' && <Perf position='bottom-right' />}
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}
