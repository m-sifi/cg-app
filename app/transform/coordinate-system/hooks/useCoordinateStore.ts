import { Euler, Matrix4, Vector3 } from '@react-three/fiber'
import { create } from 'zustand'
import * as THREE from 'three'

enum ProjectionType {
  Perspective = 0,
  Orthographic = 1,
}

type Entity = {
  position: Vector3
  rotation: Euler
  scale: Vector3
}

type Camera = {
  position: Vector3
  rotation: Euler
  zoom: number
}

interface CoordinateStore {
  projection: ProjectionType
  view: Camera
  model: Entity
}

const useCoordinateStore = create<CoordinateStore>(() => ({
  projection: ProjectionType.Perspective,
  view: { position: new THREE.Vector3(), rotation: new THREE.Euler(), zoom: 1 },
  model: { position: new THREE.Vector3(), rotation: new THREE.Euler(), scale: new THREE.Vector3() },
}))

export { useCoordinateStore, ProjectionType }
