import { create } from 'zustand'

interface RotationState {
  x: number
  y: number
  z: number
  setX: (state: number) => void
  setY: (state: number) => void
  setZ: (state: number) => void
}

const useRotationStore = create<RotationState>((set) => ({
  x: 0,
  y: 0,
  z: 0,
  setX: (value: number) => set(() => ({ x: value })),
  setY: (value: number) => set(() => ({ y: value })),
  setZ: (value: number) => set(() => ({ z: value })),
}))

export { useRotationStore }
