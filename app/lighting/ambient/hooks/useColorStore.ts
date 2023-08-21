import { create } from 'zustand'

interface LightProperty {
  enabled: boolean
  color: string
  intensity: number
}

interface ColorState {
  ambient: LightProperty
  diffuse: LightProperty
  specular: LightProperty
  setAmbient: (state: LightProperty) => void
  setDiffuse: (state: LightProperty) => void
  setSpecular: (state: LightProperty) => void
}

const useColorStore = create<ColorState>((set) => ({
  ambient: {
    enabled: false,
    color: '#ffffff',
    intensity: 1,
  },
  diffuse: {
    enabled: false,
    color: '#ffffff',
    intensity: 1,
  },
  specular: {
    enabled: false,
    color: '#ffffff',
    intensity: 1,
  },
  setAmbient: (value: LightProperty) => set(() => ({ ambient: value })),
  setDiffuse: (value: LightProperty) => set(() => ({ diffuse: value })),
  setSpecular: (value: LightProperty) => set(() => ({ specular: value })),
}))

export { useColorStore }
