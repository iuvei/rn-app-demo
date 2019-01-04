import React from 'react'
import { WebView, View } from 'react-native'
import Header from './Header'

export default class ThirdView extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      // header: null
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{uri: this.props.navigation.getParam('uri', 'http://www.baidu.com/')}}
          startInLoadingState={true}
        />
      </View>
    )
  }
}