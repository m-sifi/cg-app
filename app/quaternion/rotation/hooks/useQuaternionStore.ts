import { create } from 'zustand'

interface QuaternionRotationState {
  axis: [number, number, number]
  angle: number
  setAxis: (state: [number, number, number]) => void
  setAngle: (state: number) => void
}

const useQuaternionRotationStore = create<QuaternionRotationState>((set) => ({
  axis: [0, 0, 0],
  angle: 0,
  setAxis: (value: [number, number, number]) => set(() => ({ axis: value })),
  setAngle: (value: number) => set(() => ({ angle: value })),
}))

export { useQuaternionRotationStore }
