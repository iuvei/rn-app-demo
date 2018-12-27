import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default class RechargeScreen extends React.Component {
  static navigationOptions = {
    title: 'Recharge'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>这是充值模版</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})

