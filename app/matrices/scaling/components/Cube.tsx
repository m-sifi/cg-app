'use client'

import { KatexEquation } from '@/components/math/Equation'
import { round } from '@/helpers/math'
import { Box, Circle, Html } from '@react-three/drei'
import { MutableRefObject, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useScaleStore } from '../hooks/useScaleStore'

const Cube = () => {
  const scale = useScaleStore((state) => state.scale)
  const groupRef = useRef<THREE.Group>()
  const lineRef = useRef<THREE.Line>()

  const speed = 15
  const newScale = new THREE.Vector3()

  useFrame((state, delta) => {
    newScale.set(scale[0], scale[1], scale[2])
    groupRef.current.scale.lerp(newScale, delta * speed)
  })

  return (
    <>
      <group ref={groupRef}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color={'orange'} />
        </Box>
      </group>
    </>
  )
}

export { Cube }
