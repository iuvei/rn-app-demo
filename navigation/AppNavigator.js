import React from 'react'
import {createSwitchNavigator, createStackNavigator} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import BetNavigator from './BetNavigator'
import ScrollNavigator from './ScrollNavigator'
import Personal from './PersonalNavigator'
import AddCustomizeGamesScreen from './../screens/AddCustomizeGames/AddCustomizeGames'
import RechargeSuccess from '../screens/Recharge/RechargeSuccess'
import BetHistory from '../screens/Personal/MyselfReport/BetHistory'

const MainTabs = createStackNavigator({
  Main: MainTabNavigator,
  CustomizeGames: AddCustomizeGamesScreen,
  RechargeSuccess: createStackNavigator({RechargeSuccess: RechargeSuccess}),
  ...Personal
})


const betHistoryNavigator = createStackNavigator({
  BetHistory: BetHistory
})

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabs,
    Login: LoginNavigator,
    Bet: BetNavigator,
    Scroll: ScrollNavigator,
    BetHistory: betHistoryNavigator
  }, {
    // initialRouteName: 'BetHistory'
    initialRouteName: 'Login'
  }
)
