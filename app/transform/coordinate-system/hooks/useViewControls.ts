import { useControls } from 'leva'
import { ProjectionType, useCoordinateStore } from './useCoordinateStore'
import { useEffect } from 'react'

const useViewControls = () => {
  const [get, set] = useControls('View Coordinate', () => ({
    type: {
      disabled: true,
      value: 'perspective camera',
      options: ['perspective camera', 'orthographic camera'],
    },
    position: {
      value: [0, 0, 0],
      disabled: true,
    },
    rotation: {
      value: [0, 0, 0],
      disabled: true,
    },
    zoom: {
      value: 1,
      disabled: true,
    },
  }))

  const [projection, view] = useCoordinateStore((state) => [state.projection, state.view])

  useEffect(() => {
    const cameraPos = view.position as THREE.Vector3
    const cameraRot = view.rotation as THREE.Euler
    set({
      position: [cameraPos.x, cameraPos.y, cameraPos.z],
      rotation: [cameraRot.x, cameraRot.y, cameraRot.z],
      type: projection === ProjectionType.Perspective ? 'perspective camera' : 'orthographic camera',
      zoom: view.zoom,
    })
  }, [set, projection, view])
}

export { useViewControls }
