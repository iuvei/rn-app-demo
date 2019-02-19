import { Permissions, Notifications } from 'expo'
import { Toast } from '@ant-design/react-native'
import { Clipboard } from 'react-native'

export const requestNotificationsPermissionAsync = async () => {
  const oldPermission = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  if (oldPermission.status === 'granted') {
    return true
  }

  const newPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  return newPermission.status === 'granted'
}

export const printExpoPushTokenAsync = async () => {
  const hasPermission = await requestNotificationsPermissionAsync()
  Toast.success(`hasPermission: ${hasPermission}`)
  if (hasPermission) {
    const pushToken = await Notifications.getExpoPushTokenAsync()
    Toast.success(`pushToken: ${pushToken}`)
    Clipboard.setString(pushToken)
    console.log(`Your device's Expo push token is: ${pushToken}`)
  } else {
    console.log(`Your device does not have permission to show push notifications.`)
  }
}


