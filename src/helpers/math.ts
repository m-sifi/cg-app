const round = (float: number): string => {
  return Math.round(float).toFixed(1)
}

const normalise = (vector: [number, number, number]): [number, number, number] => {
  const [x, y, z] = vector
  const length = Math.sqrt(x * x + y * y + z * z)

  if (length == 0) return [0, 0, 0]
  return [x / length, y / length, z / length]
}

const radians = (degree: number) => (degree * Math.PI) / 180

export { round, normalise, radians }
