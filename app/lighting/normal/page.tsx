'use client'

import { Loader } from '@/components/Loader'
import { Blockquote, Container, Heading, Section } from '@radix-ui/themes'
import { PerspectiveCamera } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Button } from './components/Button'
import { FaceNormalMesh } from './components/FaceNormalMesh'
import { VertexNormalMesh } from './components/VertexNormalMesh'
import { NormalType } from './types/NormalType'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})


export default function LightingModePage() {
  const [type, setType] = useState<NormalType>(NormalType.VERTEX);
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const view1 = useRef()

  const showNormalTypeDemo = (type: NormalType) => {
    switch (type) {
      case NormalType.FACE:
        return <FaceNormalMesh />
      case NormalType.VERTEX:
      default:
        return <VertexNormalMesh />
    }
  }

  const getNormalTypeExplaination = (type: NormalType): string => {
    switch (type) {
      case NormalType.FACE:
        return 'Surface Normal for a triangle is the vector cross product of two edges of that triangle'
      case NormalType.VERTEX:
      default:
        return 'Vertex Normal is defined at a triangle vertex.'
    }
  }

  const decrementType = () => {
    let newType = type - 1
    const size = Object.keys(NormalType).length / 2
    if (newType < 0)
      newType = size - 1;

    setType(newType)
  }

  const incrementType = () => {
    let newType = type + 1
    const size = Object.keys(NormalType).length / 2
    if (newType > size - 1)
      newType = 0;

    setType(newType)
  }
  return (
    <>
      <div className='relative' ref={view1} />
      <View className='h-full w-full' index={0} track={view1} orbit>
        {showNormalTypeDemo(type)}
        <ambientLight intensity={0.3} />
        <pointLight position={[15, 15, 15]} intensity={2} />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[15, 15, 15]} fov={60} />
      </View>
      <div className='fixed left-0 top-10 z-10 w-screen pl-80'>
        <Container p='6' px={'9'}>
          <Heading size='8' weight='light' mb={'2'}>Normals</Heading>
          <Heading size='4' weight='light'>
            {getNormalTypeExplaination(type)}
            <div className='mt-3 flex gap-2'>
              <Button onClick={decrementType}>Previous</Button>
              <Button onClick={incrementType}>Next</Button>
            </div>
          </Heading>
        </Container>
      </div>
      <div className='fixed bottom-10 left-0 z-10 w-screen pl-80'>
        <Section p='6'>
          <Blockquote>
            Explore the different kinds of normals in a mesh by clicking on the buttons above.
          </Blockquote>
        </Section>
      </div>
    </>
  )
}
