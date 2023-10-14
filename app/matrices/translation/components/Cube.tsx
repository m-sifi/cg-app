'use client'

import { KatexEquation } from "@/components/math/Equation"
import { round } from "@/helpers/math"
import { Box, Circle, Html } from "@react-three/drei"
import { MutableRefObject, useRef } from "react"
import * as THREE from "three"

interface CubeProps {
    id: string;
    position: [number, number, number]
    portal?: MutableRefObject<HTMLElement>
}


const Cube = ({ position, portal }: CubeProps) => {
    const ref = useRef<THREE.Group>()
    let _position = position.map((p) => round(p))

    return (
        <>
            <group ref={ref} position={[position[0], position[1], position[2]]}>
                <Box args={[5, 5, 5]}>
                    <meshStandardMaterial color={'orange'} />
                </Box>
                <Circle args={[0.1]}>
                    <Html center portal={portal} zIndexRange={[1, 0]}>
                        <div className='rounded-md p-1 py-2 bg-neutral-800 text-neutral-200'>
                            <KatexEquation
                                text={`\\begin{pmatrix} ${_position[0]}, \\ ${_position[1]}, \\ ${_position[2]} \\end{pmatrix}`}
                            />
                        </div>
                    </Html>
                </Circle>
            </group>
        </>
    )
}

export { Cube }
