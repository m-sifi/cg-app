'use client'

import { Environment, Line, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

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


const Common = () => {
    return (
        <>
            <SimpleGrid />
            <Environment preset='city' />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.5} />
            <directionalLight position={[0, 0, 10]} intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 15, 30]} fov={60} />
        </>
    );
}

export { Common };
