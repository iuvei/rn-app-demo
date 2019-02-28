import {Toast as NToast} from 'native-base'
import {Toast} from '@ant-design/react-native'
import {Platform} from 'react-native'

const $Toast = {
  info: (message) => {
    // Toast.info(message, 1, undefined, false)
    NToast.show({
      text: message,
      buttonText: 'OK',
      style: {
        bottom: 500,
        ...Platform.select({
          'android': {
            marginHorizontal: 20,
            borderRadius: 5
          }
        })
      }
    })
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
