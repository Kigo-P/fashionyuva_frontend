export function findMinAndMax(arr) {
  if (arr.length === 0) return [0, 20000]
  return [Math.min(...arr), Math.max(...arr)]
}
