import { KatexEquation } from '@/components/math/Equation';
import { Edges, Html, Line, Plane, Sphere } from '@react-three/drei';
import { MutableRefObject, forwardRef, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { PlaneMesh } from './canvas/PlaneMesh';
import { Point } from './canvas/Point';

const VertexTriangleMesh = forwardRef<HTMLElement>(({ }, ref) => {
    return (
        <>
            <PlaneMesh />
            <Line points={[[-2.5, -2.5, 0], [2.5, 2.5, 0]]} lineWidth={10} color={'red'} />
            <Line points={[[-2.5, -2.5, 0], [-2.5, 2.5, 0]]} lineWidth={10} color={'red'} />
            <Line points={[[-2.5, 2.5, 0], [2.5, 2.5, 0]]} lineWidth={10} color={'red'} />
            <Point ref={ref} position={new THREE.Vector3(-2.5, -2.5, 0)} />
            <Point ref={ref} position={new THREE.Vector3(2.5, 2.5, 0)} />
            <Point ref={ref} position={new THREE.Vector3(-2.5, 2.5, 0)} />
            <Point ref={ref} position={new THREE.Vector3(2.5, -2.5, 0)} />
        </>
    );
});

VertexTriangleMesh.displayName = 'VertexMesh';

export { VertexTriangleMesh }