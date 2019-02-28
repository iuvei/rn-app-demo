import {Toast} from '@ant-design/react-native'
import {default as EToast} from 'react-native-root-toast'

const $Toast = {
  info: (message) => {
    EToast.show(message, {
      duration: 1000, // toast显示时长
      position: 100, // toast位置
      shadow: true, // toast是否出现阴影
      animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
      hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
      delay: 0})
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
