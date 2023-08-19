'use client'

import { Loader } from '@/components/Loader'
import { GridLayout } from '@/components/dom/GridLayout'
import { Equation } from '@/components/math/Equation'
import { Box, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
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
  return (
    <>
      <GridLayout>
        <div className='bg-slate-200'>
          <div className='m-4 mx-auto flex w-64 rounded-md bg-white p-4'>
            <Equation className='mx-auto block' text={getTransform(position)}></Equation>
          </div>
        </div>
        <div className=''>
          <View className='h-full w-full'>
            <Suspense fallback={null}>
              <Cube />
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <directionalLight position={[0, 0, 10]} intensity={0.5} />
              <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            </Suspense>
          </View>
        </div>
      </GridLayout>
    </>
  )
}
