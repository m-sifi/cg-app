'use client'

import { KatexEquation } from '@/components/math/Equation'
import { round } from '@/helpers/math'
import { Box, Circle, Html } from '@react-three/drei'
import { MutableRefObject, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useRotationStore } from '../hooks/useRotationStore'
import { useFrame } from '@react-three/fiber'

interface CubeProps {
  portal?: MutableRefObject<HTMLElement>
}

const Cube = ({ portal }: CubeProps) => {
  const rotation = useRotationStore((state) => [state.x, state.y, state.z])
  const groupRef = useRef<THREE.Group>()

  const speed = 15
  const newRotation = new THREE.Quaternion(...rotation)

  const radians = useMemo(() => {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    return rotation.map((deg) => toRad(deg))
  }, [rotation])

  useFrame((state, delta) => {
    newRotation.setFromEuler(new THREE.Euler(...radians))
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
