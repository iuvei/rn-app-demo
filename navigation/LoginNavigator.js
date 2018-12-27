import React from 'react'
import {createStackNavigator} from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
// import {View, Text, Button, StyleSheet} from 'react-native'
// import {AsyncStorage} from 'react-native'

// 官方 示例
// class SignInScreen extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       clickTime: ''
//     }
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>{this.state.clickTime.toString() || null}</Text>
//         <Button title="Sign in!" onPress={this._signInAsync}/>
//       </View>
//     )
//   }
//
//   _signInAsync = async () => {
//     let {clickTime} = this.state
//     this.setState({
//       clickTime: Number(clickTime) + 1
//     })
//     await AsyncStorage.setItem('userToken', 'abc')
//     this.props.navigation.navigate('Main')
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

export default createStackNavigator({
  Login: LoginScreen
})
