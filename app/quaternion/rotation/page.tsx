'use client'

import { Loader } from '@/components/Loader'
import { Common } from '@/components/canvas/Common'
import { normalise, radians, round } from '@/helpers/math'
import { PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Cube } from './components/Cube'
import { useQuaternionRotationStore } from './hooks/useQuaternionStore'
import { Blockquote, Container, Heading, Section } from '@radix-ui/themes'
import { KatexEquation } from '@/components/math/Equation'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})


const useQuaternionControls = () => {
  const [setAxis, setAngle] = useQuaternionRotationStore((state) => [state.setAxis, state.setAngle])
  const [{ axis, vector, angle }, set] = useControls(() => ({
    axis: {
      value: [0, 0, 0],
      step: 0.1,
      min: 0,
      max: 1,
    },
    vector: {
      value: [0, 0, 0],
      step: 0.1,
      min: 0,
      max: 1,
      disabled: true,
    },
    angle: {
      value: 0,
      step: 0.1,
      min: 0,
      max: 360,
    },
  }))
  useEffect(() => {
    setAngle(angle)
  }, [setAngle, angle])

  useEffect(() => {
    let v = normalise(axis)
    set({ vector: v })
    setAxis(v)
  }, [axis, set, setAxis, vector])
}

export default function QuaternionRotationPage() {
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const [angle, axis] = useQuaternionRotationStore((state) => [state.angle, state.axis])
  useQuaternionControls()

  const view1 = useRef()

  const theta = useMemo(() => {
    return radians(angle)
  }, [angle])

  let _angle = round(theta)
  let _axis = axis.map((p) => p.toFixed(1))

  return (
    <>
      <div className='relative' ref={view1} />
      <View className='h-full w-full' index={0} track={view1} orbit>
        <Cube />
        <Common />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[15, 15, 15]} fov={60} />
      </View>
      <div className='fixed pl-80 w-screen left-0 top-10 z-10'>
        <Container p='4'>
          <Heading size='4' weight='light'>
            Quaternion is a 4 dimensional vector that is used to represent rotations in 3D space. <br />
            It provide compactness over matrices, reducing memory usage, enabling efficient interpolation, avoiding gimbal lock issues, and offering improved numerical stability.
          </Heading>
          <Section size='1' mt={'2'} className='flex justify-center items-center'>
            <KatexEquation
              className='mx-auto block'
              text={`q = s + ix + jy + kz = [s;v] = [s; x, y, z] = cos(\\frac{${_angle}}{2}) + sin(\\frac{${_angle}}{2})[${_axis[0]} \\cdot x, ${_axis[1]} \\cdot y, ${_axis[2]} \\cdot z]`}
            />
          </Section>
        </Container>
      </div>
      <div className='fixed pl-80 w-screen left-0 bottom-10 z-10'>
        <Section p='6'>
          <Blockquote>Experiment with axis-vector and angle values to discover the precision and versatility of quaternion rotations in controlling 3D object orientations.</Blockquote>
        </Section>
      </div>
    </>
  )
}
