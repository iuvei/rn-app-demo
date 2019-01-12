import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { Constants } from 'expo'

class VersionInfo extends React.Component {
  render() {
    const { manifest } = Constants

    return (
      <View style={{marginTop: 10, backgroundColor: '#ffffff', alignItems: 'center'}}>
        <Text style={{color: '#333', lineHeight: 40, fontSize: 14}}>天祥国际 - v{manifest.version}</Text>
      </View>
    )
  }
}

export default VersionInfo
