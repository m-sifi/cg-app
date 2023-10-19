import { useControls } from 'leva'
import { useEffect } from 'react'
import * as THREE from 'three'
import { ProjectionType, useCoordinateStore } from './useCoordinateStore'

const useProjectionControls = () => {
  const controls = useControls('Projection Coordinate', {
    type: {
      value: 'perspective',
      options: ['perspective', 'orthographic'],
    },
  })

  useEffect(() => {
    const projection = controls.type === 'perspective' ? ProjectionType.Perspective : ProjectionType.Orthographic
    useCoordinateStore.setState({ projection: projection })
  }, [controls])
}

export { useProjectionControls }
