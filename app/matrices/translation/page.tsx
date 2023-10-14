'use client'

import { Loader } from '@/components/Loader'
import { Common } from '@/components/canvas/Common'
import { KatexEquation } from '@/components/math/Equation'
import { round } from '@/helpers/math'
import { Blockquote, Container, Heading, Section } from '@radix-ui/themes'
import { Line } from '@react-three/drei'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Cube } from './components/Cube'
import { useTranslationStore } from './hooks/useTranslateStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

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

  return (
    <>
      <div className='relative' ref={view1} />
      <View className='relative left-0 top-0 h-full w-full' index={0} track={view1} orbit>
        <Cube id='pre-transform' position={origin} portal={view1} />
        <Cube id='post-transform' position={position} portal={view1} />
        <group>
          <Line points={[origin, position]} color='orange' />
        </group>
        <Common />
      </View>
      <div className='fixed pl-80 w-screen left-0 top-10 z-10'>
        <Container p='4'>
          <Heading size='4' weight='light'>
            A Translation Matrix is a 4x4 matrix used in 3D graphics to represent the transformation of an object's position in space.<br />
            It describes how much the object has to move from its original position along the x, y, and z axes.<br />
            The translation matrix is applied to the object's coordinates, resulting in a new position relative to its original location.
          </Heading>
          <Section size='1' mt={'2'} className='flex justify-center items-center'>
            <KatexEquation
              className='select-none'
              text={`p^{\\prime} = \\begin{bmatrix} ${_position[0]} \\\\ ${_position[1]} \\\\ ${_position[2]} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 & ${_translation[0]} \\\\ 0 & 1 & 0 & ${_translation[1]} \\\\ 0 & 0 & 1 & ${_translation[2]} \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} ${_origin[0]} \\\\ ${_origin[1]} \\\\ ${_origin[2]} \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} ${_origin[0]} + ${_translation[0]} \\\\ ${_origin[1]} + ${_translation[1]} \\\\ ${_origin[2]} + ${_translation[2]} \\\\ 1 \\end{bmatrix}`}
            />
          </Section>
        </Container>
      </div>
      <div className='fixed pl-80 w-screen left-0 bottom-10 z-10'>
        <Section p='6'>
          <Blockquote>Feel free to explore the impact of different origin and position values by adjusting them, and observe how the translation matrix dynamically transforms the object's position in the 3D space.</Blockquote>
        </Section>
      </div>
    </>
  )
}
