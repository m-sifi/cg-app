'use client'

import { KatexEquation } from '@/components/math/Equation'
import { radians, round } from '@/helpers/math'
import { Box, Circle, Html } from '@react-three/drei'
import { MutableRefObject, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useRotationStore } from '../hooks/useRotationStore'
import { useFrame } from '@react-three/fiber'

interface CubeProps {
  portal?: MutableRefObject<HTMLElement>
}

const Cube = ({ portal }: CubeProps) => {
  const rotation = useRotationStore((state) => state.rotation) as THREE.Euler;
  const groupRef = useRef<THREE.Group>()

  const speed = 5

  const newRotation = useMemo(() => {
    return new THREE.Quaternion()
  }, [])

  useFrame((state, delta) => {
    newRotation.setFromEuler(rotation)
    groupRef.current.quaternion.slerp(newRotation, delta * speed)
  })

  return (
    <>
      <group ref={groupRef}>
        <Box args={[5, 5, 5]}>
          <meshStandardMaterial color={'orange'} />
        </Box>
      </group>
    </>
  )
}
export { Cube }
