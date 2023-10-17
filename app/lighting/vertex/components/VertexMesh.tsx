import { KatexEquation } from '@/components/math/Equation';
import { Edges, Html, Plane, Sphere } from '@react-three/drei';
import { MutableRefObject, forwardRef, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Point } from './canvas/Point';
import { PlaneMesh } from './canvas/PlaneMesh';


const VertexMesh = forwardRef<HTMLElement>(({ }, ref) => {
    const planeProperties: [width: number, height: number] = [5, 5];
    return (
        <>
            <PlaneMesh />
            <Point ref={ref} position={new THREE.Vector3(-2.5, -2.5, 0)} />
            <Point ref={ref} position={new THREE.Vector3(2.5, 2.5, 0)} />
            <Point ref={ref} position={new THREE.Vector3(-2.5, 2.5, 0)} />
            <Point ref={ref} position={new THREE.Vector3(2.5, -2.5, 0)} />
        </>
    );
});

VertexMesh.displayName = 'VertexMesh';
Point.displayName = 'Point';

export { VertexMesh }