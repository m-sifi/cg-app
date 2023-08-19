'use client'

import { Loader } from '@/components/Loader'
import { GridLayout } from '@/components/dom/GridLayout'
import { Equation } from '@/components/math/Equation'
import { Box, Circle, Environment, Grid, Html, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useTranslationStore } from './hooks/useTranslateStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const round = (float: number): string => {
  return (Math.round(float * 100) / 100).toFixed(2)
}

const getTransform = (position?: [number, number, number]) => {
  let matrix = `$[[1.0,0.0,0.0,T_x],[0.0,1.0,0.0,T_y],[0.0,0.0,1.0,T_z],[0.0,0.0,0.0,1.0]]$`
  if (!position) return matrix

  matrix = matrix.replace('T_x', round(position[0]))
  matrix = matrix.replace('T_y', round(position[1]))
  matrix = matrix.replace('T_z', round(position[2]))
  return matrix
}

const Cube = () => {
  const [setPosition] = useTranslationStore((state) => [state.setPosition])

  const { position } = useControls({
    position: {
      value: [0, 0, 0],
      step: 0.1,
      min: -10,
      max: 10,
      onChange: (value) => {
        setTimeout(() => {
          setPosition(value)
        }, 500)
      },
      transient: false,
    },
  })

  return (
    <>
      <Box args={[5, 5, 5]} position={position}>
        <meshStandardMaterial color={'orange'} />
      </Box>
    </>
  )
}

export default function MatrixTranslationPage() {
  const position = useTranslationStore((state) => state.position) as [number, number, number]
  const view1 = useRef()

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
        <div className='flex flex-col gap-4 bg-white px-12 py-8'>
          <h2 className='text-center text-4xl font-semibold'>Translation</h2>
          <p>
            A Translation Matrix allows you to move things around on the screen. It is a 4x4 matrix that is used to move
            an object to a different position. It is also known as a displacement matrix. It is used to move an object
            from one position to another.
          </p>
          <p>The formula for computing a Translation Matrix in a 3D space is as follows:</p>
          <div>
            <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
              <Equation className='mx-auto block' text={getTransform()}></Equation>
            </div>
            <p>
              <Equation className='inline' text='$T_x$' /> represents the translation along the x-axis
            </p>
            <p>
              <Equation className='inline' text='$T_y$' /> represents the translation along the y-axis
            </p>
            <p>
              <Equation className='inline' text='$T_z$' /> represents the translation along the z-axis
            </p>
          </div>
          <p>
            As you can see in the demo, by changing the position of the cube, we are able to see the computed
            translation matrix for it
          </p>
          <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
            <Equation className='mx-auto block' text={getTransform(position)}></Equation>
          </div>
        </div>
        <div className='bg-zinc-800'>
          <div className='relative' ref={view1} />
          <View className='h-full w-full' index={0} track={view1}>
            <Cube />
            <group position={[0, 0, 0]}>
              <Circle args={[0.1]}>
                <Html center portal={view1}>
                  <div className='rounded-md bg-white p-1'>
                    <Equation text='$(0, 0, 0)$' />
                  </div>
                </Html>
              </Circle>
            </group>
            <Environment preset='city' />
            <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
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
