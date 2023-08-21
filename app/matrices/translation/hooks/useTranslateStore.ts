import { create } from 'zustand'

interface TranslationState {
  origin: number[]
  position: number[]
  setOrigin: (state: [number, number, number]) => void
  setPosition: (state: [number, number, number]) => void
}

const useTranslationStore = create<TranslationState>((set) => ({
  origin: [0, 0, 0],
  position: [0, 0, 0],
  setPosition: (value: [number, number, number]) => set(() => ({ position: value })),
  setOrigin: (value: [number, number, number]) => set(() => ({ origin: value })),
}))

export { useTranslationStore }
