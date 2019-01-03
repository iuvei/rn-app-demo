import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native'
import Header from './../../components/Header'
import { Provider, Tabs } from '@ant-design/react-native';

class MailboxScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header title={'信箱'} navigation={navigation}/>
    }
  }

  constructor(props) {
    super (props)
    this.state = {
      tabs: [
        {title: '收件箱'},
        {title: '发件箱'},
        {title: '写信'}
      ]
    }
  }

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <Tabs tabs={this.state.tabs}>
            <View><Text>112</Text></View>
            <View><Text>113</Text></View>
            <View><Text>114</Text></View>
          </Tabs>
        </View>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  }
})
export default MailboxScreen
