'use client'
import { Loader } from '@/components/Loader'
import { Common } from '@/components/canvas/View'
import { GridLayout } from '@/components/dom/GridLayout'
import { Box } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import * as THREE from 'three'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <Loader />,
})

const WireframeBox = () => {
  const mesh = useRef<THREE.Mesh>()
  const euler = new THREE.Euler(50, 45, 45, 'XYZ')

  return (
    <Box args={[1, 1, 1]} rotation={euler} ref={mesh}>
      <meshStandardMaterial color={'orange'} />
    </Box>
  )
}

export default function DotProductPage() {
  return (
    <GridLayout>
      <div></div>
      <div>
        <View className='h-full w-full'>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <WireframeBox />
        </View>
      </div>
    </GridLayout>
  )
}
