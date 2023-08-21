'use client'

import { Loader } from '@/components/Loader'
import { GridLayout } from '@/components/dom/GridLayout'
import { KatexEquation } from '@/components/math/Equation'
import { Box, Circle, Environment, Html, Line, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { MutableRefObject, Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTranslationStore } from './hooks/useTranslateStore'

import 'katex/dist/katex.min.css'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const round = (float: number): string => {
  return (Math.round(float * 100) / 100).toFixed(1)
}

interface OriginProps {
  portal?: MutableRefObject<HTMLElement>
}

interface CubeProps {
  portal?: MutableRefObject<HTMLElement>
}
interface OriginProps {
  portal?: MutableRefObject<HTMLElement>
}

const Origin = ({ portal }: OriginProps) => {
  const ref = useRef<THREE.Group>()
  const origin = useTranslationStore((state) => state.origin)

  const speed = 15
  const newPosition = new THREE.Vector3()

  useFrame((state, delta) => {
    newPosition.set(origin[0], origin[1], origin[2])
    ref.current.position.lerp(newPosition, delta * speed)
  })

  let _origin = origin.map((p) => round(p))

  return (
    <>
      <group ref={ref} position={[origin[0], origin[1], origin[2]]}>
        <Box args={[5, 5, 5]}>
          <meshStandardMaterial color={'orange'} transparent opacity={0.3} />
        </Box>
        <Circle args={[0.1]}>
          <Html center portal={portal}>
            <div className='rounded-md bg-white p-1 py-2'>
              <KatexEquation
                text={`\\begin{pmatrix} ${_origin[0]}, \\ ${_origin[1]}, \\ ${_origin[2]} \\end{pmatrix}`}
              />
            </div>
          </Html>
        </Circle>
      </group>
    </>
  )
}

const useTranslationControls = () => {
  const [setPosition, setOrigin] = useTranslationStore((state) => [state.setPosition, state.setOrigin])
  const { origin, position } = useControls({
    origin: {
      value: [-10, 0, 0],
      step: 0.1,
      min: -10,
      max: 10,
    },
    position: {
      value: [10, 0, 0],
      step: 0.1,
      min: -10,
      max: 10,
    },
  })

  useEffect(() => {
    setOrigin(origin)
  }, [origin, setOrigin])

  useEffect(() => {
    setPosition(position)
  }, [position, setPosition])
}

const Cube = ({ portal }: CubeProps) => {
  const position = useTranslationStore((state) => state.position)
  const groupRef = useRef<THREE.Group>()

  const speed = 15
  const newPosition = new THREE.Vector3()

  let _position = position.map((p) => round(p))

  useFrame((state, delta) => {
    newPosition.set(position[0], position[1], position[2])
    groupRef.current.position.lerp(newPosition, delta * speed)
  })

  return (
    <>
      <group ref={groupRef}>
        <Box args={[5, 5, 5]}>
          <meshStandardMaterial color={'orange'} />
          <Html center portal={portal}>
            <div className='rounded-md bg-white p-1 py-2'>
              <KatexEquation
                text={`\\begin{pmatrix} ${_position[0]}, \\ ${_position[1]}, \\ ${_position[2]} \\end{pmatrix}`}
              />
            </div>
          </Html>
        </Box>
      </group>
    </>
  )
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

export default function MatrixTranslationPage() {
  const [position, origin] = useTranslationStore((state) => [state.position, state.origin]) as [
    [number, number, number],
    [number, number, number],
  ]

  let translation = useMemo(() => {
    let v1 = new THREE.Vector3()
    let v2 = new THREE.Vector3()
    let temp = new THREE.Vector3()

    v1.set(position[0], position[1], position[2])
    v2.set(origin[0], origin[1], origin[2])
    temp.subVectors(v1, v2)
    return temp.toArray()
  }, [position, origin]) as [number, number, number]

  let _position = position.map((p) => round(p))
  let _origin = origin.map((p) => round(p))
  let _translation = translation.map((p) => round(p))

  useTranslationControls()
  const view1 = useRef()
  0
  const { gridSize, ...gridConfig } = {
    gridSize: [10.5, 10.5],
    cellSize: 0.6,
    cellThickness: 1,
    cellColor: '#6f6f6f',
    sectionSize: 3.3,
    sectionThickness: 1.5,
    sectionColor: '#9d4b4b',
    fadeDistance: 25,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  }

  return (
    <>
      <GridLayout>
        <Suspense fallback={null}>
          <div className='flex flex-col gap-4 bg-white px-12 py-8'>
            <h2 className='text-center text-4xl font-semibold'>Translation</h2>
            <p>
              A Translation Matrix allows you to move things around on the screen. It is represented as a 4x4 matrix (in
              3D space) or a 3x3 matrix (in 2D space). It essentially describes the object how much it has to move from
              it's current position. vector <KatexEquation className='inline' text='t' />.
            </p>
            <div>
              <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
                <KatexEquation
                  className='mx-auto block'
                  text={`p^{\\prime} = \\begin{bmatrix} x^{\\prime} \\\\ y^{\\prime} \\\\ z^{\\prime} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 & t_x \\\\ 0 & 1 & 0 & t_y \\\\ 0 & 0 & 1 & t_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} x + t_x \\\\ y + t_y \\\\ z + t_z \\\\ 1 \\end{bmatrix}`}
                ></KatexEquation>
              </div>
              <p>
                For this example, we have both the origin (previous position before transform) and the position (current
                position after transform). By playing around with the both properties, we can see how the translation
                matrix is derived from both the old and new positions
              </p>
              <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
                <KatexEquation
                  className='mx-auto block'
                  text={`p^{\\prime} = \\begin{bmatrix} ${_position[0]} \\\\ ${_position[1]} \\\\ ${_position[2]} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 & ${_translation[0]} \\\\ 0 & 1 & 0 & ${_translation[1]} \\\\ 0 & 0 & 1 & ${_translation[2]} \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} ${_origin[0]} \\\\ ${_origin[1]} \\\\ ${_origin[2]} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} ${_origin[0]} + ${_translation[0]} \\\\ ${_origin[1]} + ${_translation[1]} \\\\ ${_origin[2]} + ${_translation[2]} \\\\ 1 \\end{bmatrix}`}
                ></KatexEquation>
              </div>
              <p>
                Notice that vector <KatexEquation className='inline' text='t' /> is obtained by subtracting the original
                position vector from the old position vector (in this example it is the origin point).
              </p>
              <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
                <KatexEquation
                  className='mx-auto block'
                  text={`t = v_{position} - v_{origin} = \\begin{bmatrix} ${_position[0]} \\\\ ${_position[1]} \\\\ ${_position[2]} \\end{bmatrix} - \\begin{bmatrix} ${_origin[0]} \\\\ ${_origin[1]} \\\\ ${_origin[2]} \\end{bmatrix} = \\begin{bmatrix} ${_translation[0]} \\\\ ${_translation[1]} \\\\ ${_translation[2]} \\end{bmatrix}`}
                ></KatexEquation>
              </div>
            </div>
          </div>
        </Suspense>
        <div className='bg-zinc-800'>
          <div className='relative' ref={view1} />
          <View className='h-full w-full' index={0} track={view1} orbit>
            <Cube portal={view1} />
            <Origin portal={view1} />
            <Environment preset='city' />
            <SimpleGrid />
            <group>
              <Line points={[origin, position]} color='orange' />
            </group>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} />
            <directionalLight position={[0, 0, 10]} intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={60} />
          </View>
        </div>
      </GridLayout>
    </>
  )
}
