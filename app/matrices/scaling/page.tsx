'use client'

import { Loader } from '@/components/Loader'
import { GridLayout } from '@/components/dom/GridLayout'
import { KatexEquation } from '@/components/math/Equation'
import {
  Box,
  Circle,
  Environment,
  GizmoHelper,
  GizmoViewport,
  Html,
  Line,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { MutableRefObject, Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useScaleStore } from './hooks/useScaleStore'

import 'katex/dist/katex.min.css'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const round = (float: number): string => {
  return (Math.round(float * 100) / 100).toFixed(1)
}

interface ArrowProps {
  origin: [number, number, number]
  direction: [number, number, number]
  length: number
}

interface CubeProps {
  camera?: MutableRefObject<THREE.PerspectiveCamera>
  portal?: MutableRefObject<HTMLElement>
}
const useScaleControls = () => {
  const setScale = useScaleStore((state) => state.setScale)
  const { scale } = useControls({
    scale: {
      value: [1, 1, 1],
      step: 0.1,
      min: 0.1,
      max: 10,
    },
  })

  useEffect(() => {
    setScale(scale)
  }, [scale, setScale])
}

const Arrow = ({ origin, direction, length }: ArrowProps) => {
  const arrowRef = useRef<THREE.ArrowHelper>()

  useEffect(() => {
    arrowRef.current.position.set(...origin)
    arrowRef.current.setDirection(new THREE.Vector3(...direction))
    arrowRef.current.setLength(length)
  }, [origin, direction, length])

  return (
    <>
      <arrowHelper ref={arrowRef}></arrowHelper>
    </>
  )
}

const Cube = ({ camera }: CubeProps) => {
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

export default function MatrixScalingPage() {
  const cameraRef = useRef<THREE.PerspectiveCamera>()

  const scale = useScaleStore((state) => state.scale)
  let _scale = scale.map((p) => round(p))

  useScaleControls()

  const view1 = useRef()

  return (
    <>
      <GridLayout>
        <Suspense fallback={null}>
          <div className='flex flex-col gap-4 bg-white px-12 py-8'>
            <h2 className='text-center text-4xl font-semibold'>Scaling</h2>
            <p>
              A Scale Matrix allows you to resize objects in 3D space.{' '}
              <KatexEquation className='inline' text='p^{\prime}' /> represents a point on the mesh after the scale
              matrix has been applied. <KatexEquation className='inline' text='p' /> represents the point on the mesh
              before the scale matrix has been applied.
            </p>
            <div>
              <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
                <KatexEquation
                  className='mx-auto block'
                  text={`p^{\\prime} = \\begin{bmatrix} x^{\\prime} \\\\ y^{\\prime} \\\\ z^{\\prime} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} t_x & 0 & 0 & 0 \\\\ 0 & t_y & 0 & 0 \\\\ 0 & 0 & t_z & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} x \\cdot t_x \\\\ y \\cdot t_y \\\\ z \\cdot t_z \\\\ 1 \\end{bmatrix}`}
                ></KatexEquation>
              </div>
              <p>
                In this example, we create the scalar matrix based on the scale vector provided by the user. We then
                multiply the points on the mesh by the scalar matrix to get the new points.
              </p>
              <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
                <KatexEquation
                  className='mx-auto block'
                  text={`p^{\\prime} = \\begin{bmatrix} x^{\\prime} \\\\ y^{\\prime} \\\\ z^{\\prime} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} ${_scale[0]} & 0 & 0 & 0 \\\\ 0 & ${_scale[1]} & 0 & 0 \\\\ 0 & 0 & ${_scale[2]} & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} x \\cdot t_x \\\\ y \\cdot t_y \\\\ z \\cdot t_z \\\\ 1 \\end{bmatrix}`}
                ></KatexEquation>
              </div>
            </div>
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
