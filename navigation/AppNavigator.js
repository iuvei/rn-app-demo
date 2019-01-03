import React from 'react'
import {createSwitchNavigator, createStackNavigator} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import BetNavigator from './BetNavigator'
import ScrollNavigator from './ScrollNavigator'
import Personal from './PersonalNavigator'
import AddCustomizeGamesScreen from './../screens/AddCustomizeGames/AddCustomizeGames'
import BroadcastScreen from './../screens/Home/BroadcastScreen'
import MailboxScreen from './../screens/Home/MailboxScreen'
import RechargeSuccess from '../screens/Recharge/RechargeSuccess'
import Withdrawal from '../screens/Withdrawal/'
import BetHistory from '../screens/Personal/MyselfReport/BetHistory'
import ThirdView from '../components/ThirdView'

const MainTabs = createStackNavigator({
  Main: MainTabNavigator,
  CustomizeGames: AddCustomizeGamesScreen,
  Broadcast: BroadcastScreen,
  Mailbox: MailboxScreen,
  RechargeSuccess: createStackNavigator({RechargeSuccess: RechargeSuccess}),
  Withdrawal: createStackNavigator({Withdrawal: Withdrawal}),
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
    BetHistory: betHistoryNavigator,
    ThirdView: createStackNavigator({Withdrawal: ThirdView}),
  }, {
    // initialRouteName: 'BetHistory'
    initialRouteName: 'Login'
  }
)
