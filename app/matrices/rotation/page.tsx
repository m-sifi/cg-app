'use client'

import { Loader } from '@/components/Loader'
import { KatexEquation } from '@/components/math/Equation'
import { PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useRotationStore } from './hooks/useRotationStore'

import { Common } from '@/components/canvas/Common'
import { round } from '@/helpers/math'
import { Blockquote, Box, Container, Heading, Section, Text } from '@radix-ui/themes'
import 'katex/dist/katex.min.css'
import { Cube } from './components/Cube'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

function getMatrix(matrix: THREE.Matrix4) {
  let elements = matrix.elements.map((el) => el.toFixed(1))
  let equation = `\\begin{bmatrix} ${elements[0]} & ${elements[1]} & ${elements[2]} & ${elements[3]} \\\\ ${elements[4]} & ${elements[5]} & ${elements[6]} & ${elements[7]} \\\\ ${elements[8]} & ${elements[9]} & ${elements[10]} & ${elements[11]} \\\\ ${elements[12]} & ${elements[13]} & ${elements[14]} & ${elements[15]} \\end{bmatrix}`

  return equation
}

function getRotationXMatrix(theta?: number) {
  let _theta = theta ? theta.toFixed(1) : `\\theta`
  let equation = `\\begin{bmatrix} 1 & 0 & 0 & 0 \\\\ 0 & \\cos {theta} & -\\sin {theta} & 0 \\\\ 0 & \\sin {theta} & \\cos {theta} & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`

  return equation.replaceAll('{theta}', _theta)
}

function getRotationYMatrix(theta?: number) {
  let _theta = theta ? theta.toFixed(1) : `\\theta`
  let equation = `\\begin{bmatrix} \\cos {theta} & 0 & \\sin {theta} & 0 \\\\ 0 & 1 & 0 & 0 \\\\ -\\sin {theta} & 0 & \\cos {theta} & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`

  return equation.replaceAll('{theta}', _theta)
}

function getRotationZMatrix(theta?: number) {
  let _theta = theta ? theta.toFixed(1) : `\\theta`
  let equation = `\\begin{bmatrix} \\cos {theta} & -\\sin {theta} & 0 & 0 \\\\ \\sin {theta} & \\cos {theta} & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`

  return equation.replaceAll('{theta}', _theta)
}

const useRotationControls = () => {
  const [setX, setY, setZ] = useRotationStore((state) => [state.setX, state.setY, state.setZ])
  const { x, y, z } = useControls({
    x: {
      value: 0,
      step: 0.1,
      min: 0.1,
      max: 360,
      label: 'x-axis (blue)',
    },
    y: {
      value: 0,
      step: 0.1,
      min: 0.1,
      max: 360,
      label: 'y-axis (red)',
    },
    z: {
      value: 0,
      step: 0.1,
      min: 0.1,
      max: 360,
      label: 'z-axis (green)',
    },
  })

  useEffect(() => {
    setX(x)
  }, [x, setX])

  useEffect(() => {
    setY(y)
  }, [y, setY])

  useEffect(() => {
    setZ(z)
  }, [z, setZ])
}

export default function MatrixRotationPage() {
  const cameraRef = useRef<THREE.PerspectiveCamera>()

  useRotationControls()

  const rotation = useRotationStore((state) => [state.x, state.y, state.z])
  const radians = useMemo(() => {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    return rotation.map((deg) => toRad(deg))
  }, [rotation])

  const finalRotation = useMemo(() => {
    const matrix = new THREE.Matrix4()
    const newRotation = new THREE.Quaternion()
    newRotation.setFromEuler(new THREE.Euler(...radians))

    matrix.makeRotationFromQuaternion(newRotation)
    return getMatrix(matrix)
  }, [radians])

  const view1 = useRef()

  return (
    <>
      <div className='relative' ref={view1} />
      <View className='h-full w-full' index={0} track={view1} orbit>
        <Cube />
        <Common />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[15, 15, 15]} fov={60} />
      </View>
      <div className='fixed left-0 top-10 z-10 w-screen pl-80'>
        <Container p='4'>
          <Heading size='4' weight='light'>
            A Rotation Matrix is a 4x4 matrix used in 3D graphics to represent the orientation of an object in space.
            <br />
            It is commonly composed of a series of 4x4 matrices, with each matrix representing a rotation around a
            specific axis.
            <br />
          </Heading>
          <Box mt={'2'}>
            <Text size={'2'}>Note that the values are represented in radians</Text>
          </Box>
          <Section size='1' mt={'2'} className='flex items-center justify-center'>
            <Box className='text-blue-400'>
              <KatexEquation text={getRotationXMatrix(radians[0])} />
              <p className='text-center'>
                <KatexEquation text={'\\text{x-axis}'} />
              </p>
            </Box>
            <Box className='text-red-400'>
              <KatexEquation text={getRotationYMatrix(radians[1])} />
              <p className='text-center'>
                <KatexEquation text={'\\text{y-axis}'} />
              </p>
            </Box>
            <Box className='text-green-400'>
              <KatexEquation text={getRotationZMatrix(radians[2])} />
              <p className='text-center'>
                <KatexEquation text={'\\text{z-axis}'} />
              </p>
            </Box>
            <Box className=''>
              <KatexEquation text={`= ${finalRotation}`}></KatexEquation>
              <p className='text-center'>
                <KatexEquation className='ml-5' text={'\\text{ final rotation}'} />
              </p>
            </Box>
          </Section>
        </Container>
      </div>
      <div className='fixed bottom-10 left-0 z-10 w-screen pl-80'>
        <Section p='6'>
          <Blockquote>
            Explore the impact of different rotation values on each axis, observing how they dynamically influence the
            object&apos;s orientation in 3D space.
          </Blockquote>
        </Section>
      </div>
    </>
  )
}
