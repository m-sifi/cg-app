'use client'

import { Loader } from '@/components/Loader'
import { Blockquote, Container, Heading, Section } from '@radix-ui/themes'
import { PerspectiveCamera } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { VertexMesh } from './components/VertexMesh'
import { Button } from './components/Button'
import { VertexState } from './types/VertexState'
import { VertexEdgeMesh } from './components/VertexEdgeMesh'
import { VertexTriangleMesh } from './components/VertexTriangleMesh'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})


export default function LightingVertexPage() {
  const [state, setState] = useState<VertexState>(VertexState.VERTEX);
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const view1 = useRef()

  const changeState = (state: VertexState) => {
    let newState = state
    const size = Object.keys(VertexState).length / 2
    if (newState > size - 1)
      newState = 0;
    else if (newState < 0)
      newState = size - 1;

    setState(newState)

  }

  const getVertexStateDemo = (state: VertexState): React.ReactNode => {
    switch (state) {
      case VertexState.VERTEX:
        return <VertexMesh ref={view1} />
      case VertexState.EDGES:
        return <VertexEdgeMesh />
      case VertexState.FACE:
      default:
        return <VertexTriangleMesh ref={view1} />
    }
  };

  const getVertexStateExplaination = (state: VertexState): string => {
    switch (state) {
      case VertexState.VERTEX:
        return 'A vertex is a point in space.'
      case VertexState.EDGES:
        return 'An edge is a line segment connecting two vertices.'
      case VertexState.FACE:
        return 'A face / triangle is a polygon with three edges and three vertices. This plane is made of 2 faces'
      default:
        return 'A vertex is a point in space.'
    }
  };

  return (
    <>
      <div className='relative' ref={view1} />
      <View className='h-full w-full' index={0} track={view1} orbit>
        {getVertexStateDemo(state)}
        <ambientLight intensity={0.3} />
        <pointLight position={[15, 15, 15]} intensity={2} />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 15]} fov={60} />
      </View>
      <div className='fixed left-0 top-10 z-10 w-screen pl-80'>
        <Container p='6' px={'9'}>
          <Heading size='8' weight='light' mb={'2'}>Vertex</Heading>
          <Heading size='4' weight='light'>
            A Triangle Mesh consists of vertices, edges and triangles. <br />
            <Heading size='4' weight='light'>
              {getVertexStateExplaination(state)}
              <div className='mt-3 flex gap-2'>
                <Button onClick={() => changeState(state - 1)} >Previous</Button>
                <Button onClick={() => changeState(state + 1)}>Next</Button>
              </div>
            </Heading>
          </Heading>
        </Container>
      </div>
      <div className='fixed bottom-10 left-0 z-10 w-screen pl-80'>
        <Section p='6'>
          <Blockquote>
            Explore the anatomy of a mesh by clicking on the buttons above.
          </Blockquote>
        </Section>
      </div>
    </>
  )
}
