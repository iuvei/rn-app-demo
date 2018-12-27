import React from 'react'
import {Platform, StyleSheet} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import GameScreen from '../screens/GameScreen'
import RechargeScreen from '../screens/RechargeScreen'
import FoundScreen from '../screens/FoundScreen'
import PersonalScreen from '../screens/PersonalScreen'

// 首页
const HomeStack = createStackNavigator({
  Home: HomeScreen
})
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

// 彩厅
const GamesStack = createStackNavigator({
  Links: GameScreen
})
GamesStack.navigationOptions = {
  tabBarLabel: '彩厅',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'logo-game-controller-b' : 'md-link'}
    />
  )
}

// 充值
const RechargeStack = createStackNavigator({
  Recharge: RechargeScreen
})
RechargeStack.navigationOptions = {
  tabBarLabel: '充值',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-refresh-circle' : 'md-options'}
    />
  )
}

// 发现
const FoundStack = createStackNavigator({
  Found: FoundScreen
})
FoundStack.navigationOptions = {
  tabBarLabel: 'Found',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  )
}

// 个人
const PersonalStack = createStackNavigator({
  Personal: PersonalScreen
})
PersonalStack.navigationOptions = {
  tabBarLabel: 'Personal',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-link'}
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  GamesStack,
  FoundStack,
  RechargeStack,
  PersonalStack
})
