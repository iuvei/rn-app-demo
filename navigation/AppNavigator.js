import React from 'react'
import {createSwitchNavigator, createStackNavigator} from 'react-navigation'
// Switch 二选1导航
import LoginScreen from '../screens/Login/LoginScreen'
import MainTabNavigator from './MainTabNavigator'

// 非登陆其他所有页面视图
import HomeNavigator from '../screens/Home'
import RechargeNavigator from '../screens/Recharge'
import Personal from '../screens/Personal'

const MainNavigator = createStackNavigator({
  Main: MainTabNavigator,
  ...HomeNavigator,
  ...RechargeNavigator,
  ...Personal
})

MainNavigator.navigationOptions = {
  header: null
}

const RootNavigation = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: LoginScreen,
    Main: MainNavigator
  }, {
    initialRouteName: 'Login'
  }
)

RootNavigation.navigationOptions = {
  header: null
}

export default RootNavigation
