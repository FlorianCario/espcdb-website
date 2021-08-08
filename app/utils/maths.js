export function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

export function map(x, a, b, c, d) {
  return (x - a) * (d - c) / (b - a) + c
}

