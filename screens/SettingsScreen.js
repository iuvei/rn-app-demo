import React from 'react'
import {
  View,
  Text
} from 'react-native'
import {
  Ionicons
} from '@expo/vector-icons'
import { List, Icon, WhiteSpace } from '@ant-design/react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '设置'
  }

  render() {
    return (
      <View>
        <WhiteSpace size="sm" />
        <List>
          <List.Item
            thumb={<Ionicons name="md-card" color="#016fca" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('BankManager')}
          >
            银行卡管理
          </List.Item>
        </List>
      </View>
    )
  }
}
