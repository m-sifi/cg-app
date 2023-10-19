'use client'
import { Edges, Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { ProjectionType, useCoordinateStore } from '../hooks/useCoordinateStore'
import { Mesh, Quaternion, Vector3, Euler } from 'three'
import { useMemo, useRef } from 'react'

const Cube = () => {
  const mesh = useRef<Mesh>(null!)
  const [projection, model] = useCoordinateStore((state) => [state.projection, state.model]);
  const origin = new Vector3();

  const rotation = useMemo(() => {
    return new Quaternion().setFromEuler(model.rotation as Euler);
  }, [model])

  useFrame((state, delta) => {
    const camera = state.camera;
    const position = model.position as Vector3;
    const scale = model.scale as Vector3
    rotation.setFromEuler(model.rotation as Euler);

    mesh.current?.position.lerp(position, delta * 5);
    mesh.current?.scale.lerp(scale, delta * 5);
    mesh.current?.quaternion.slerp(rotation, delta * 5)

    useCoordinateStore.setState((state) => ({
      ...state,
      view: {
        position: camera.position,
        rotation: camera.rotation,
        zoom: projection === ProjectionType.Perspective ? camera.position.distanceTo(origin) : camera.zoom,
      }
    }))
  })

  return (
    <Box ref={mesh} args={[5, 5, 5]}>
      <Edges />
    </Box>
  )
}

export { Cube }
