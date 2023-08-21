'use client'

import { Loader } from '@/components/Loader'
import { GridLayout } from '@/components/dom/GridLayout'
import { KatexEquation } from '@/components/math/Equation'
import { Box, Environment, Line, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { MutableRefObject, Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import 'katex/dist/katex.min.css'
import { useQuaternionRotationStore } from './hooks/useQuaternionStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const round = (float: number): string => {
  return (Math.round(float * 100) / 100).toFixed(1)
}

const normalise = (vector: [number, number, number]): [number, number, number] => {
  const [x, y, z] = vector
  const length = Math.sqrt(x * x + y * y + z * z)

  if (length == 0) return [0, 0, 0]
  return [x / length, y / length, z / length]
}

const SimpleGrid = () => {
  return (
    <>
      <group>
        <Line
          points={[
            [-20, 0, 0],
            [20, 0, 0],
          ]}
          color='red'
        />
        <Line
          points={[
            [0, -20, 0],
            [0, 20, 0],
          ]}
          color='green'
        />
        <Line
          points={[
            [0, 0, -20],
            [0, 0, 20],
          ]}
          color='blue'
        />
      </group>
    </>
  )
}

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

const Cube = () => {
  const [axis, angle] = useQuaternionRotationStore((state) => [state.axis, state.angle])
  const ref = useRef<THREE.Group>()

  const radians = useMemo(() => {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    return toRad(angle)
  }, [angle])

  let quaternion = new THREE.Quaternion()
  useFrame((state, delta) => {
    quaternion.setFromAxisAngle(new THREE.Vector3(axis[0], axis[1], axis[2]), radians)
    ref.current.quaternion.slerp(quaternion, delta * 15)
  })

  return (
    <>
      <group ref={ref}>
        <Box args={[5, 5, 5]}>
          <meshStandardMaterial color={'orange'} />
        </Box>
      </group>
    </>
  )
}

export default function QuaternionRotationPage() {
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const [angle, axis] = useQuaternionRotationStore((state) => [state.angle, state.axis])
  useQuaternionControls()

  const view1 = useRef()

  const radians = useMemo(() => {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    return toRad(angle)
  }, [angle])

  let _angle = round(radians)
  let _axis = axis.map((p) => round(p))

  return (
    <>
      <GridLayout>
        <Suspense fallback={null}>
          <div className='flex flex-col gap-4 bg-white px-12 py-8'>
            <h2 className='text-center text-4xl font-semibold'>Axis Angle</h2>
            <p>
              A Quaternion is a 4 dimensional vector that is used to represent rotations in 3D space. It is a more
              compact way of representing rotations compared to a rotation matrix.
            </p>
            <div className='flex flex-col gap-2'>
              <p className='text-center'>
                <KatexEquation className='block' text={`q = s + ix + jy + kz = [s;v] = [s; x, y, z] `}></KatexEquation>
              </p>
              <div className='flex flex-col gap-2'>
                <p>
                  <KatexEquation className='inline' text={`s, x, y, z `} /> are scalars
                </p>
                <p>
                  <KatexEquation className='inline' text={`v = (x,y,z)`} /> is a vector
                </p>
              </div>
            </div>
            <p>
              Given an axis angle <KatexEquation className='inline' text='[\theta(x, y, z)]' />, the corresponding
              quaternion is
            </p>
            <p>
              <KatexEquation className='inline' text={`cos(\\frac{\\theta}{2})+ sin(\\frac{\\theta}{2})[ix, jy, kz]`} />
              <KatexEquation
                className='inline'
                text={`= cos(\\frac{${_angle}}{2}) + sin(\\frac{${_angle}}{2})[${_axis[0]} \\cdot x, ${_axis[1]} \\cdot y, ${_axis[2]} \\cdot z]`}
              />
              .
            </p>
          </div>
        </Suspense>
        <div className='bg-zinc-800'>
          <div className='relative' ref={view1} />
          <View className='h-full w-full' index={0} track={view1} orbit>
            <Cube />
            <Environment preset='city' />
            <SimpleGrid />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} />
            <directionalLight position={[0, 0, 10]} intensity={0.3} />
            <PerspectiveCamera ref={cameraRef} makeDefault position={[10, 10, 10]} fov={60} />
            <OrbitControls makeDefault />
          </View>
        </div>
      </GridLayout>
    </>
  )
}
