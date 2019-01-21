import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Button, Tabs } from '@ant-design/react-native'
import LotteryHall from './LotteryHall'
import RealPeople from './RealPeople'
import Slot from './Slot'
import Chess from './Chess'
import Header from './../../components/Header'

export default class GamesScreen extends React.Component {
  static navigationOptions = {
    header: <Header hideLeft={true} title={'彩厅'}/>
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  componentWillMount() {
    this.didFocusSubscription = this.props.navigation.addListener('didFocus', this.updateImmediateData)
    this.didBlurSubscription = this.props.navigation.addListener('didBlur', this.removeParamsData)
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.didFocusSubscription.remove();
  }

  removeParamsData = () => {
    let { activeTab } = this.state
    this.props.navigation.setParams({activeTab})
  }

  updateImmediateData =() => {
    let { params } = this.props.navigation.state
    this.setState({
      activeTab: params ? params.activeTab : 0
    })
  }

  render() {
    let { activeTab } = this.state
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
        <Tabs
          tabs={tabs}
          page={activeTab}
          tabBarUnderlineStyle={{backgroundColor: 'orange'}}
          tabBarBackgroundColor={'#0066ba'}
          tabBarActiveTextColor={'orange'}
          tabBarInactiveTextColor={'#eff5fb'}
          onChange={(tab, index) => this.setState({activeTab: index})}>
          <LotteryHall navigation={this.props.navigation}></LotteryHall>
          <RealPeople navigation={this.props.navigation}></RealPeople>
          <Slot navigation={this.props.navigation}></Slot>
          <Chess navigation={this.props.navigation}></Chess>
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

