import { create } from 'zustand'

interface TranslationState {
  position: number[]
  setPosition: (state: [number, number, number]) => void
}

const useTranslationStore = create<TranslationState>((set) => ({
  position: [0, 0, 0],
  setPosition: (value: [number, number, number]) => set(() => ({ position: value })),
}))

export { useTranslationStore }
