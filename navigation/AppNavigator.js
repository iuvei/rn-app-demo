import React from 'react'
import {createSwitchNavigator, createStackNavigator} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import BetNavigator from './BetNavigator'
import ScrollNavigator from './ScrollNavigator'
import AddCustomizeGamesScreen from './../screens/AddCustomizeGames/AddCustomizeGames'

const MainTabs = createStackNavigator({
  Main: MainTabNavigator,
  CustomizeGames: AddCustomizeGamesScreen,
})

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabs,
    Login: LoginNavigator,
    Bet: BetNavigator,
    Scroll: ScrollNavigator,
  }, {
    initialRouteName: 'Login'
  }
)
