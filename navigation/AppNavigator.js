import React from 'react'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
// Switch 二选1导航
import LoginScreen from '../screens/Login/LoginScreen'
import MainTabNavigator from './MainTabNavigator'

// 非登陆其他所有页面视图
import HomeNavigator from '../screens/Home'
import RechargeNavigator from '../screens/Recharge'
import Personal from '../screens/Personal'
import Found from '../screens/Found'
import Bet from '../screens/Bet/BetScreen'
import ChaseScreen from '../screens/Bet/ChaseScreen'

const MainNavigator = createStackNavigator({
  Main: MainTabNavigator,
  ...HomeNavigator,
  ...RechargeNavigator,
  ...Personal,
  ...Found,
  Bet,
  ChaseScreen
}, {
  initialRouteName: 'Main',
  headerLayoutPreset: 'center',
  // 在 v2 及其以下版本, 您要用于执行此操作的属性是 navigationOptions`。
  // 在 v3 中，我们将其重命名为 `defaultNavigationOptions`.
  navigationOptions: {
    headerStyle: {
      elevation: 0, // 去阴影
      backgroundColor: '#016fca',
    },
    headerTintColor: '#fff'
  }
})

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
