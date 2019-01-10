import dayjs from 'dayjs'

const TIME_PATTERN = 'YYYY-MM-DD HH:mm:ss'
const DATE_PATTERN = 'YYYY-MM-DD'

export const toFixed4 = (value) => {
  value = parseFloat(value)
  return value ? value.toFixed(4) : '0.0000'
}

export const formatTime = (value) => {
  return dayjs(value).format(TIME_PATTERN)
}

export const formatDate = (value) => {
  return dayjs(value).format(DATE_PATTERN)
}
