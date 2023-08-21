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

import 'katex/dist/katex.min.css'
import { useColorStore } from './hooks/useColorStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const round = (float: number): string => {
  return (Math.round(float * 100) / 100).toFixed(1)
}

interface CubeProps {
  camera?: MutableRefObject<THREE.PerspectiveCamera>
  portal?: MutableRefObject<HTMLElement>
}

const useColorControls = () => {
  const [setAmbient, setDiffuse] = useColorStore((state) => [state.setAmbient, state.setDiffuse])

  {
    // Block scope for ambient
    const { enabled, color, intensity } = useControls('ambient', {
      enabled: true,
      color: '#fff',
      intensity: {
        value: 0.5,
        min: 0,
        max: 1,
      },
    })

    useEffect(() => {
      setAmbient({
        enabled: enabled,
        color: color,
        intensity: intensity,
      })
    }, [enabled, color, intensity, setAmbient])
  }

  {
    // Block scope for diffuse
    const { enabled, color, intensity } = useControls('diffuse', {
      enabled: true,
      color: '#fff',
      intensity: {
        value: 0.5,
        min: 0,
        max: 5,
      },
    })

    useEffect(() => {
      setDiffuse({
        enabled: enabled,
        color: color,
        intensity: intensity,
      })
    }, [enabled, color, intensity, setDiffuse])
  }
}

const Cube = () => {
  const [ambient, diffuse] = useColorStore((state) => [state.ambient, state.diffuse])
  const groupRef = useRef<THREE.Group>()

  return (
    <>
      <group ref={groupRef}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color={'orange'} />
        </Box>
        {ambient.enabled && <ambientLight color={ambient.color} intensity={ambient.intensity} />}
        {diffuse.enabled && <pointLight position={[5, 5, 5]} color={diffuse.color} intensity={diffuse.intensity} />}
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

export default function LightingAmbientPage() {
  useColorControls()
  const view1 = useRef()

  return (
    <>
      <GridLayout>
        <Suspense fallback={null}>
          <div className='flex flex-col gap-4 bg-white px-12 py-8'>
            <h2 className='text-center text-4xl font-semibold'>Scaling</h2>
          </div>
        </Suspense>
        <div className='bg-zinc-800'>
          <div className='relative' ref={view1} />
          <View className='h-full w-full' index={0} track={view1} orbit>
            <Cube />
            {/* <Environment preset='city' /> */}
            <SimpleGrid />
            <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={60} />
            <OrbitControls makeDefault />
          </View>
        </div>
      </GridLayout>
    </>
  )
}
