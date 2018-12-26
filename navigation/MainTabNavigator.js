import React from 'react'
import {
  Platform, View, Button,
  AsyncStorage, Text,
  StyleSheet
} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

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

const LinksStack = createStackNavigator({
  Links: LinksScreen
})

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

class SignInScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      clickTime: ''
    }
  }

  static navigationOptions = {
    title: 'Please sign in'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.clickTime}</Text>
        <Button title="Sign in!" onPress={this._signInAsync}/>
      </View>
    )
  }

  _signInAsync = async () => {
    let {clickTime} = this.state
    this.setState({
      clickTime: Number(clickTime) + 1
    })
    await AsyncStorage.setItem('userToken', 'abc')
    this.props.navigation.navigate('App')
  }
}

const AuthStack = createStackNavigator({
  Settings: SignInScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  AuthStack
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
