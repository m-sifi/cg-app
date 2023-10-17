import { Plane } from "@react-three/drei";
import { forwardRef } from "react";

const PlaneMesh = forwardRef<HTMLElement>(({ }, ref) => {
    const planeProperties: [width: number, height: number] = [5, 5];
    return (
        <>
            <Plane args={planeProperties}>
            </Plane>
            <Plane args={planeProperties}>
                <meshBasicMaterial wireframe color={'black'} />
            </Plane>
        </>
    );
});
PlaneMesh.displayName = 'PlaneMesh';

export { PlaneMesh }