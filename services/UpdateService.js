import { Updates } from 'expo'
import { Alert } from 'react-native'
import { Toast } from '@ant-design/react-native'

export const fetchUpdateAndReload = async () => {
  try {
    const response = await Updates.fetchUpdateAsync()
    if (response.isNew) {
      Alert.alert(
        '温馨提示',
        '感谢您的耐心等待，已为您更新最新版本！',
        [
          {
            text: '进入游戏',
            onPress: () => Updates.reloadFromCache(),
            style: 'cancel'
          }
        ],
        {cancelable: true}
      )
    }

  } catch (e) {
    // handle or log error
    // console.log('JES app fetchUpdateAndReload error!!!', e)
  }
}

/**
 * @name checkOtaUpdates
 * @description Check for Expo Over-The-Air updates   (new update is done by running 'expo publish')
 * @return {boolean} true is there is a new update
 */
export const checkOtaUpdates = async () => {

  try {
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable) {
      Alert.alert(
        '温馨提示',
        '当前有新版本，是否为您自动更新！',
        [
          {
            text: '确 定',
            onPress: () => {
              Toast.loading('正在下载最新版本...')
              fetchUpdateAndReload()
            },
            style: 'cancel'
          }
        ],
        {cancelable: true}
      )
    }
  } catch (e) {
    return false
  }
}
