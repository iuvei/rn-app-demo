import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/Home/HomeScreen'
import GameScreen from '../screens/Games/GamesScreen'
import RechargeScreen from '../screens/Recharge/RechargeScreen'
import FoundScreen from '../screens/Found/FoundScreen'
import PersonalScreen from '../screens/Personal/PersonalScreen'

// 首页
const HomeStack = createStackNavigator({
  Home: HomeScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? "ios-home" : "md-home"}
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
      name="logo-game-controller-b"
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
      name={Platform.OS === 'ios' ? "logo-yen" : "logo-yen"}
    />
  )
}

// 发现
const FoundStack = createStackNavigator({
  Found: FoundScreen
})
FoundStack.navigationOptions = {
  tabBarLabel: '发现',
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
  tabBarLabel: '个人中心',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      tips={true}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  )
}

const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    GamesStack,
    RechargeStack,
    FoundStack,
    PersonalStack
  },
  {
    tabBarOptions: {
      labelStyle: {
        color: '#ffffff'
      },
      style: {
        backgroundColor: '#00b4cc'
      },
    }
  }
)

MainTabNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null
}

export default MainTabNavigator
