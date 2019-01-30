import { Updates } from 'expo'
import { Alert } from 'react-native'
import { Toast } from '@ant-design/react-native'

export const fetchUpdateAndReload = async () => {
  try {
    const response = await Updates.fetchUpdateAsync()
    // logInfo('JES app fetchUpdateAndReload response', response)

    Alert.alert(
      'Aviso',
      'fetchUpdateAsync response->' + JSON.stringify(response),
      [
        {text: 'Cerrar', onPress: () => Toast.info('Alert Cerrar checkOtaUpdates'), style: 'cancel'}
      ],
      {cancelable: true}
    )

    if (response.isNew) {
      Updates.reloadFromCache()
    }

  } catch (e) {
    // handle or log error
    // logInfo('JES app fetchUpdateAndReload error!!!', e)
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
    console.log('JES checkOtaUpdates', update)
    Alert.alert(
      'Aviso',
      'update.isAvailable:' + update.isAvailable,
      [
        {text: 'Cerrar', onPress: () => Toast.info('Alert Cerrar checkOtaUpdates'), style: 'cancel'}
      ],
      {cancelable: true}
    )

    if (update.isAvailable) {
      fetchUpdateAndReload()
    }
    // return update.isAvailable
    // ... notify user of update ...
    // logInfo('JES app checkOtaUpdates about to reload from cache!!!');
    // Alert.alert(
    //   'Aviso',
    //   '应用程序检查ota更新即将从缓存重新加载',
    //   [
    //     {text: 'Cerrar', onPress: () => Toast.info('Alert Cerrar checkOtaUpdates'), style: 'cancel'}
    //   ],
    //   {cancelable: true}
    // )

  } catch (e) {
    // handle or log error
    console.log('JES app checkOtaUpdates error!!!', e)
    return false
  }
}
