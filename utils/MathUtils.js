export const toFixed4 = (value) => {
  value = parseFloat(value)
  return value ? value.toFixed(4) : '0.0000'
}
