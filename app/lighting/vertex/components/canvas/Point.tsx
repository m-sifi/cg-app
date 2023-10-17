import { KatexEquation } from "@/components/math/Equation";
import { Sphere, Html } from "@react-three/drei";
import { MutableRefObject, forwardRef, useMemo } from "react";
import * as THREE from "three";

interface PointProps {
    position: THREE.Vector3;
}

const Point = forwardRef<HTMLElement, PointProps>(({ position }, ref) => {
    const mutableRef = ref as MutableRefObject<HTMLElement>;
    const point = useMemo(() => new THREE.Vector3(position.x * 2, position.y * 2, position.z * 2), [position.x, position.y, position.z]);
    return (
        <group position={position.toArray()}>
            <Sphere args={[0.1, 8, 8]}>
                <meshStandardMaterial color={'red'} />
            </Sphere>
            <Html center portal={mutableRef} zIndexRange={[1, 0]}>
                <div className='-translate-y-10 rounded-md bg-neutral-800 p-1 py-2 text-neutral-200'>
                    <KatexEquation text={`(${point.x}, ${point.y})`} />
                </div>
            </Html>
        </group>);
});

Point.displayName = 'Point';
export { Point }