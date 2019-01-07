import React from 'react'
import {
  View,
  Text
} from 'react-native'

class VersionInfo extends React.Component {
  render() {
    return (
      <View style={{marginTop: 10, backgroundColor: '#ffffff', alignItems: 'center'}}>
        <Text style={{color: '#333', lineHeight: 40, fontSize: 14}}>天祥国际 - v1.1.0</Text>
      </View>
    )
  }
}

export default VersionInfo
