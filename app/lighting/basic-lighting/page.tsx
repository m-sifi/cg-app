'use client'

import { Loader } from '@/components/Loader'
import { Blockquote, Box, Heading, Section, Strong, Text } from '@radix-ui/themes'
import { PerspectiveCamera } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Cube } from './components/Cube'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
    ssr: false,
    loading: () => <Loader />,
})
export default function LightingBasicPage() {
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const view1 = useRef();

    return (
        <>
            <Suspense fallback={null}>
                <div className='relative' ref={view1} />
                <View className='h-full w-full' index={0} track={view1} orbit>
                    <Cube ref={cameraRef} />
                    <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 30]} fov={60} />
                </View>
                <div className='fixed left-0 top-10 z-10 w-screen pl-80'>
                    <Box ml={'9'}>
                        <Heading size='8' weight='light' mb={'2'}>Basic Lighting</Heading>
                        <Text size='4' weight='light'>
                            This example uses the <Strong>Phong Illumination Model</Strong> which is an appromixation of how light interacts with a surface. <br /> The model is based on the Phong reflection model which describes the way light reflects off a surface. <br />The model is composed of three components: ambient, diffuse and specular.
                        </Text>
                        <Heading size='4' weight='light'>

                        </Heading>
                    </Box>
                </div>
                <div className='fixed bottom-10 left-0 z-10 w-screen pl-80'>
                    <Section p='6'>
                        <Blockquote>
                            Explore the properties of light by playing around with the ambient, diffuse and specular properties.
                        </Blockquote>
                    </Section>
                </div>
            </Suspense>
        </>
    )
}
