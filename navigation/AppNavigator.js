import React from 'react'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
// Switch 二选1导航
import AuthLoadingScreen from '../screens/AppLoading/AppLoading'
import LoginScreen from '../screens/Login/LoginScreen'
import MainTabNavigator from './MainTabNavigator'

// 非登陆其他所有页面视图
import HomeNavigator from '../screens/Home'
import RechargeNavigator from '../screens/Recharge'
import Personal from '../screens/Personal'
import Found from '../screens/Found'
import Games from '../screens/Games'
import Bet from '../screens/Bet/BetScreen'
import ChaseScreen from '../screens/Bet/ChaseScreen'
import SizeScreen from '../screens/SizeScreen'
import BallScreen from '../screens/BallScreen'
import ShouldUpdateScreen from '../screens/ShouldUpdateScreen'
import ShouldUpdateBetScreen from '../screens/ShouldUpdateBetScreen'
import ShouldUpdateBetHOCScreen from '../screens/ShouldUpdateBetHOCScreen'

const MainNavigator = createStackNavigator({
  Main: MainTabNavigator,
  ...HomeNavigator,
  ...RechargeNavigator,
  ...Personal,
  ...Found,
  ...Games,
  Bet,
  ChaseScreen,
  BallScreen,
  SizeScreen
}, {
  initialRouteName: 'Main',
  headerLayoutPreset: 'center',
  // 在 v2 及其以下版本, 您要用于执行此操作的属性是 navigationOptions`。
  // 在 v3 中，我们将其重命名为 `defaultNavigationOptions`.
  navigationOptions: {
    headerStyle: {
      elevation: 0, // 去阴影
      backgroundColor: '#016fca'
    },
    headerTintColor: '#fff'
  }
})

const RootNavigation = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AppLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Main: MainNavigator,
    ShouldUpdateScreen,
    ShouldUpdateBetScreen,
    ShouldUpdateBetHOCScreen
  },
  {
    initialRouteName: 'AppLoading'
  }
)

RootNavigation.navigationOptions = {
  header: null
}

export default RootNavigation
