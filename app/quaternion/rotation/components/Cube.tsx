'use client'

import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useQuaternionRotationStore } from "../hooks/useQuaternionStore"


const Cube = () => {
    const [axis, angle] = useQuaternionRotationStore((state) => [state.axis, state.angle])
    const ref = useRef<THREE.Group>()

    const radians = useMemo(() => {
        const toRad = (deg: number) => (deg * Math.PI) / 180
        return toRad(angle)
    }, [angle])

    let quaternion = new THREE.Quaternion()
    useFrame((state, delta) => {
        quaternion.setFromAxisAngle(new THREE.Vector3(axis[0], axis[1], axis[2]), radians)
        ref.current.quaternion.slerp(quaternion, delta * 15)
    })

    return (
        <>
            <group ref={ref}>
                <Box args={[5, 5, 5]}>
                    <meshStandardMaterial color={'orange'} />
                </Box>
            </group>
        </>
    )
}

export { Cube }
