import { KatexEquation } from '@/components/math/Equation';
import { Edges, Html, Line, Plane, Sphere } from '@react-three/drei';
import { MutableRefObject, forwardRef, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { PlaneMesh } from './canvas/PlaneMesh';

const VertexEdgeMesh = forwardRef<HTMLElement>(({ }, ref) => {
    const planeProperties: [width: number, height: number] = [5, 5];
    return (
        <>
            <PlaneMesh />
            <Line points={[[-2.5, -2.5, 0], [2.5, 2.5, 0]]} lineWidth={10} color={'red'} />
        </>
    );
});

VertexEdgeMesh.displayName = 'VertexMesh';

export { VertexEdgeMesh }