import React from 'react'
import {
  View,
  Text
} from 'react-native'

class OrderDetail extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '订单详情'
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>OrderDetail</Text>
      </View>
    )
  }
}

export default OrderDetail
