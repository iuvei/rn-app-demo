import {Toast} from '@ant-design/react-native'

const $Toast = {
  info: (message) => {
    Toast.info(message, 1, undefined, false)
  },
  success: (message) => {
    Toast.success(message, 1, undefined, false)
  },
  fail: (message) => {
    Toast.fail(message, 1, undefined, false)
  },
  loading: (message) => {
    Toast.loading(message, 1, undefined, false)
  }
}

export default $Toast
