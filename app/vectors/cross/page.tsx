'use client'
import { Loader } from '@/components/Loader'
import { Common } from '@/components/canvas/View'
import { GridLayout } from '@/components/dom/GridLayout'
import {
  Box,
  GizmoHelper,
  GizmoViewport,
  Line,
  OrbitControls,
  OrthographicCamera,
  Point,
  Points,
  Wireframe,
} from '@react-three/drei'
import { WireframeMaterialProps } from '@react-three/drei/materials/WireframeMaterial'
import { useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface WireframeBoxProps {
  ambient: boolean
  diffuse: boolean
  specular: boolean
}

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const WireframeBox = ({ ambient = true, diffuse = false, specular = false }: WireframeBoxProps) => {
  const mesh = useRef<THREE.Mesh>()
  const wireframe: WireframeMaterialProps = {
    fill: '#e3e3e3',
    fillOpacity: 0,
    stroke: '#202020',
    strokeOpacity: 1,
    thickness: 0.03,
    backfaceStroke: '#c5c5c5',
    colorBackfaces: true,
  }

  return (
    <Box position={[0, -2, 0]} scale={[5, 1, 1]} ref={mesh}>
      <meshBasicMaterial />
    </Box>
  )
}

const FollowMouseLine = () => {
  const [vec, setVec] = useState<[number, number, number]>([0, 0, 0])
  const [cross, setCross] = useState<[number, number, number]>([0, 0, 0])

  useEffect(() => {
    let tmp = new THREE.Vector3()
    tmp.crossVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(vec[0], vec[1], vec[2]))
    setCross(tmp.toArray())
  }, [vec])

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5
    const y = (mouse.y * viewport.height) / 2.5
    setVec([x, y, 0])
  })

  return (
    <>
      <Line
        points={[[0, -1.5, 0], vec]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
        color='black' // Default
        lineWidth={1} // In pixels (default)
        segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
        dashed={false} // Default
      />
      <Line
        points={[[0, -1.5, 0], cross]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
        color='red' // Default
        lineWidth={1} // In pixels (default)
        segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
        dashed={false} // Default
      />
    </>
  )
}

export default function DotProductPage() {
  return (
    <GridLayout>
      <div className='bg-slate-500'></div>
      <div className=''>
        <View className='h-full w-full' orbit>
          <Suspense fallback={null}>
            <FollowMouseLine />
            <WireframeBox ambient={false} diffuse={false} specular={false} />
            <GizmoHelper alignment='bottom-right' margin={[100, 100]} renderPriority={2}>
              <GizmoViewport labelColor='white' axisHeadScale={1} />
            </GizmoHelper>
            <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={100} />
            {/* <OrbitControls makeDefault /> */}
          </Suspense>
        </View>
      </div>
    </GridLayout>
  )
}
