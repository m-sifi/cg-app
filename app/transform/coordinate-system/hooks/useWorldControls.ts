import { useControls } from 'leva'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useCoordinateStore } from './useCoordinateStore'

const useWorldControls = () => {
  const [model, set] = useControls('World Coordinate', () => ({
    position: {
      value: [0, 0, 0],
      step: 0.1,
    },
    rotation: {
      value: [0, 0, 0],
      step: 0.1,
    },
    scale: {
      value: [1, 1, 1],
      step: 0.1,
    },
  }))

  useEffect(() => {
    useCoordinateStore.setState((state) => ({
      ...state,
      model: {
        position: new THREE.Vector3(model.position[0], model.position[1], model.position[2]),
        rotation: new THREE.Euler(model.rotation[0], model.rotation[1], model.rotation[2]),
        scale: new THREE.Vector3(model.scale[0], model.scale[1], model.scale[2]),
      },
    }))
  }, [model])

  return model
}

export { useWorldControls }
