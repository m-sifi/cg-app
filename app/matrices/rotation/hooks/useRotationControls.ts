import { useControls } from 'leva'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useRotationStore } from './useRotationStore'

const radians = (degrees: number) => (degrees * Math.PI) / 180

const useRotationControls = () => {
  const controls = useControls({
    order: {
      options: ['XYZ', 'XZY', 'YXZ', 'YZX', 'ZXY', 'ZYX'],
      value: 'XYZ',
    },
    x: {
      value: 0,
      min: 0,
      max: 360,
    },
    y: {
      value: 0,
      min: 0,
      max: 360,
    },
    z: {
      value: 0,
      min: 0,
      max: 360,
    },
  })

  useEffect(() => {
    const order = controls.order as THREE.EulerOrder
    useRotationStore.setState({
      rotation: new THREE.Euler(radians(controls.x), radians(controls.y), radians(controls.z), order),
    })
  }, [controls])
}

export { useRotationControls }
