import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Button } from '@ant-design/react-native'
import LotteryHall from './LotteryHall'
import RealPeople from './RealPeople'
import Slot from './Slot'
import Chess from './Chess'

export default class GamesScreen extends React.Component {
  static navigationOptions = {
    title: 'Games'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>这是充值模版</Text>
        <Button>antd</Button>
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

