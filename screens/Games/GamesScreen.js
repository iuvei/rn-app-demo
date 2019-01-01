import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Button, Tabs } from '@ant-design/react-native'
import LotteryHall from './LotteryHall'
import RealPeople from './RealPeople'
import Slot from './Slot'
import Chess from './Chess'

export default class GamesScreen extends React.Component {
  static navigationOptions = {
    title: 'Games'
  }

  render() {
    const tabs = [
      { title: '彩票大厅' },
      { title: '真人娱乐' },
      { title: '电子亿游' },
      { title: '棋牌娱乐' },
    ]
    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      backgroundColor: '#fff',
    }
    return (
      <View style={styles.container}>
        <Tabs tabs={tabs} tabBarUnderlineStyle={{backgroundColor: 'orange'}} tabBarBackgroundColor={'#0066ba'} tabBarActiveTextColor={'orange'} tabBarInactiveTextColor={'#eff5fb'}>
          <LotteryHall></LotteryHall>
          <RealPeople></RealPeople>
          <Slot></Slot>
          <Chess></Chess>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

