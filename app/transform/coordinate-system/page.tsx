'use client'

import { Loader } from '@/components/Loader'
import { Blockquote, Box, Heading, Section, Strong, Text } from '@radix-ui/themes'
import { OrthographicCamera, PerspectiveCamera, Plane, Edges, Grid } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { useWorldControls } from './hooks/useWorldControls'
import { useViewControls } from './hooks/useViewControls'
import { useProjectionControls } from './hooks/useProjectionControls'
import { ProjectionType, useCoordinateStore } from './hooks/useCoordinateStore'
import { useThree } from '@react-three/fiber'
import { Cube } from './components/Cube'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
    ssr: false,
    loading: () => <Loader />,
})

export default function TransformCoordinateSystemPage() {
    const perspectiveCameraRef = useRef<THREE.PerspectiveCamera>();
    const orthographicCameraRef = useRef<THREE.OrthographicCamera>();
    const view1 = useRef();

    useProjectionControls()
    useWorldControls()
    useViewControls()

    const [projection] = useCoordinateStore((state) => [state.projection]);

    return (
        <>
            <Suspense fallback={null}>
                <div className='relative' ref={view1} />
                <View className='h-full w-full' index={0} track={view1} orbit>
                    <Cube />
                    {projection === ProjectionType.Perspective ? <PerspectiveCamera ref={perspectiveCameraRef} makeDefault position={[0, 0, 30]} fov={60} /> : <OrthographicCamera ref={orthographicCameraRef} makeDefault position={[0, 0, 30]} zoom={30} />}
                    <Grid />
                </View>
                <div className='fixed left-0 top-10 z-10 w-screen pl-80'>
                    <Box ml={'9'}>
                        <Heading size='8' weight='light' mb={'2'}>Coordinate System</Heading>
                        <Text size='4' weight='light'>
                            Coordinate Systems is used to orient objects in a Scene. <br />
                            It is achieved by combining multiple Coordinate Spaces (represented as a matrix) <br />
                            <ul className='list-disc'>
                                <li className='ml-10'>Projection Space: 2D space that represents the 3D scene</li>
                                <li className='ml-10'>Eye Space: 3D space that represents the viewer&#39;s perspective</li>
                                <li className='ml-10'>World Space: 3D space that represents the global positions of objects</li>
                            </ul>
                        </Text>
                        <Heading size='4' weight='light'>

                        </Heading>
                    </Box>
                </div>
                <div className='fixed bottom-10 left-0 z-10 w-screen pl-80'>
                    <Section p='6'>
                        <Blockquote>
                            Explore the changes in the coordinate system by playing around with the projection, world and view properties.
                        </Blockquote>
                    </Section>
                </div>
            </Suspense>
        </>
    )
}