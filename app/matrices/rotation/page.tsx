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
import { useRotationStore } from './hooks/useRotationStore'

import 'katex/dist/katex.min.css'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const round = (float: number): string => {
  return (Math.round(float * 100) / 100).toFixed(1)
}

function getMatrix(matrix: THREE.Matrix4) {
  let elements = matrix.elements.map((el) => round(el))
  let equation = `\\begin{bmatrix} ${elements[0]} & ${elements[1]} & ${elements[2]} & ${elements[3]} \\\\ ${elements[4]} & ${elements[5]} & ${elements[6]} & ${elements[7]} \\\\ ${elements[8]} & ${elements[9]} & ${elements[10]} & ${elements[11]} \\\\ ${elements[12]} & ${elements[13]} & ${elements[14]} & ${elements[15]} \\end{bmatrix}`

  return equation
}

function getRotationXMatrix(theta?: number) {
  let _theta = theta ? round(theta) : `\\theta`
  let equation = `\\begin{bmatrix} 1 & 0 & 0 & 0 \\\\ 0 & \\cos {theta} & -\\sin {theta} & 0 \\\\ 0 & \\sin {theta} & \\cos {theta} & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`

  return equation.replaceAll('{theta}', _theta)
}

function getRotationYMatrix(theta?: number) {
  let _theta = theta ? round(theta) : `\\theta`
  let equation = `\\begin{bmatrix} \\cos {theta} & 0 & \\sin {theta} & 0 \\\\ 0 & 1 & 0 & 0 \\\\ -\\sin {theta} & 0 & \\cos {theta} & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`

  return equation.replaceAll('{theta}', _theta)
}

function getRotationZMatrix(theta?: number) {
  let _theta = theta ? round(theta) : `\\theta`
  let equation = `\\begin{bmatrix} \\cos {theta} & -\\sin {theta} & 0 & 0 \\\\ \\sin {theta} & \\cos {theta} & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}`

  return equation.replaceAll('{theta}', _theta)
}

interface CubeProps {
  camera?: MutableRefObject<THREE.PerspectiveCamera>
  portal?: MutableRefObject<HTMLElement>
}
const useRotationControls = () => {
  const [setX, setY, setZ] = useRotationStore((state) => [state.setX, state.setY, state.setZ])
  const { x, y, z } = useControls({
    x: {
      value: 0,
      step: 0.1,
      min: 0.1,
      max: 360,
      color: 'red',
    },
    y: {
      value: 0,
      step: 0.1,
      min: 0.1,
      max: 360,
      color: 'green',
    },
    z: {
      value: 0,
      step: 0.1,
      min: 0.1,
      max: 360,
      color: 'blue',
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

const Cube = ({ camera }: CubeProps) => {
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
      <GridLayout>
        <Suspense fallback={null}>
          <div className='flex flex-col gap-4 overflow-auto bg-white px-12 py-8'>
            <h2 className='text-center text-4xl font-semibold'>Rotation</h2>
            <p>
              A Rotation Matrix allows you to rotate objects in 3D space. It is typically composed of a series of 4x4
              matrices, each representing a rotation around a particular axis.
            </p>
            <div className='flex flex-col gap-2'>
              <p className='text-center'>
                <KatexEquation className='block' text={`R_{x} = ${getRotationXMatrix()}`}></KatexEquation>
              </p>
              <p className='text-center'>
                <KatexEquation className='block' text={`R_{y} = ${getRotationYMatrix()}`}></KatexEquation>
              </p>
              <p className='text-center'>
                <KatexEquation className='block' text={`R_{z} = ${getRotationZMatrix()}`}></KatexEquation>
              </p>
              <p className='italic'>Note that the values represented are in radians</p>
            </div>
            <div>
              <p>
                The respective axis are then multiplied in order to get the desired rotation matrix that results in what
                you are seeing now
              </p>
              <div className='m-4 mx-auto flex rounded-md bg-white p-4'>
                <KatexEquation
                  className='block'
                  text={`${getRotationXMatrix(radians[0])}${getRotationYMatrix(radians[1])}${getRotationZMatrix(
                    radians[2],
                  )}`}
                ></KatexEquation>
              </div>
            </div>
            <p>The final rotation matrix after multiplying all the axis is as follows</p>
            <KatexEquation className='block' text={finalRotation}></KatexEquation>
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
