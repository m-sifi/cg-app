import { create } from 'zustand'

type Vector3 = [number, number, number]

interface VectorStore {
  position: Vector3
  rotation: Vector3
  scale: Vector3

  setPosition: (position: Vector3) => void
  setRotation: (rotation: Vector3) => void
  setScale: (scale: Vector3) => void
}

const useVectorStore = create<VectorStore>((set) => ({
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],

  setPosition: (position) => set({ position }),
  setRotation: (rotation) => set({ rotation }),
  setScale: (scale) => set({ scale }),
}))
