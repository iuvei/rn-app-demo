import React from 'react'
import {createSwitchNavigator} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import BetNavigator from './BetNavigator'
import ScrollNavigator from './ScrollNavigator'

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Login: LoginNavigator,
    Bet: BetNavigator,
    Scroll: ScrollNavigator,
  }, {
    initialRouteName: 'Login'
  }
)
