import { create } from 'zustand'

interface ScalingState {
  scale: number[]
  setScale: (state: [number, number, number]) => void
}

const useScaleStore = create<ScalingState>((set) => ({
  scale: [0, 0, 0],
  setScale: (value: [number, number, number]) => set(() => ({ scale: value })),
}))

export { useScaleStore }
