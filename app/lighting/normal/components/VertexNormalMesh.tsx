'use client'

import { ShapeProps, Sphere, useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useMemo, useRef } from 'react';
import * as THREE from 'three'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';

const VertexNormalMesh = () => {
    const meshRef = useRef<THREE.Mesh>();
    const sphereProperties: [radius?: number, widthSegments?: number, heightSegments?: number] = [5, 8, 8];

    const { flat, color } = useControls({
        color: {
            label: 'Color',
            value: '#ff0000',
        },
        flat: {
            label: 'Flat Shading',
            value: true,
        }
    });

    useHelper(meshRef, VertexNormalsHelper, 2, parseInt(color.replace('#', ''), 16));


    return (
        <>
            <Sphere ref={meshRef} args={sphereProperties}>
                {flat ? <meshPhongMaterial flatShading color={'white'} shininess={100} /> : <meshLambertMaterial color={'white'} />}
            </Sphere>

            <Sphere args={[...sphereProperties, 0, Math.PI * 2, 0, Math.PI]}>
                <meshBasicMaterial wireframe color={'black'} />
            </Sphere>
        </>);
}

export { VertexNormalMesh };