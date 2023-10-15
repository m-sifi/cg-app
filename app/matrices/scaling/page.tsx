'use client'

import { Loader } from '@/components/Loader'
import { GridLayout } from '@/components/layout/GridLayout'
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
import { Common } from '@/components/canvas/Common'
import { Cube } from './components/Cube'
import { Blockquote, Container, Heading, Section } from '@radix-ui/themes'

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

export default function MatrixScalingPage() {
  const cameraRef = useRef<THREE.PerspectiveCamera>()

  const scale = useScaleStore((state) => state.scale)
  let _scale = scale.map((p) => round(p))

  useScaleControls()

  const view1 = useRef()

  return (
    <>
      {/* <GridLayout>
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
      </GridLayout> */}
      <div className='relative' ref={view1} />
      <View className='h-full w-full' index={0} track={view1} orbit>
        <Cube />
        <Common />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[15, 15, 15]} fov={60} />
      </View>
      <div className='fixed left-0 top-10 z-10 w-screen pl-80'>
        <Container p='4'>
          <Heading size='4' weight='light'>
            A Scale Matrix is a 4x4 matrix used in 3D graphics to control the size or scale of an object along each
            axis.
            <br />
            It is an essential component for resizing objects in a three-dimensional space.
          </Heading>
          <Section size='1' mt={'2'} className='flex items-center justify-center'>
            <KatexEquation
              className='mx-auto block'
              text={`p^{\\prime} = \\begin{bmatrix} x^{\\prime} \\\\ y^{\\prime} \\\\ z^{\\prime} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} ${_scale[0]} & 0 & 0 & 0 \\\\ 0 & ${_scale[1]} & 0 & 0 \\\\ 0 & 0 & ${_scale[2]} & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} x \\cdot t_x \\\\ y \\cdot t_y \\\\ z \\cdot t_z \\\\ 1 \\end{bmatrix}`}
            />
          </Section>
        </Container>
      </div>
      <div className='fixed bottom-10 left-0 z-10 w-screen pl-80'>
        <Section p='6'>
          <Blockquote>
            Explore the effects of different scaling values on each axis to see how the Scale Matrix dynamically adjusts
            the object&apos;s size in 3D space.
          </Blockquote>
        </Section>
      </div>
    </>
  )
}
