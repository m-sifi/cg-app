import { Euler } from '@react-three/fiber'
import * as THREE from 'three'
import { create } from 'zustand'

interface RotationState {
  rotation: Euler
}

const useRotationStore = create<RotationState>((set) => ({
  rotation: new THREE.Euler(),
}))

export { useRotationStore }
