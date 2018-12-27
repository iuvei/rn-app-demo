import React, {Component} from 'react'
import {View, Image, Button, StyleSheet} from 'react-native'

class LoginComponent extends Component {
  render() {
    return (
      <View>
        <Image
          source={
            __DEV__
              ? require('../assets/images/robot-dev.png')
              : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
        <Button
          style={styles.btn}
          onPress={() => {
            this._toLogin().then(res => {
              console.log(res)
              if (res.code === 0) {
                setTimeout(() => {
                  this.setState({
                    isLogin: true
                  })
                }, 3000)
              }
            })
          }}
          title='TO LOGIN'/>
      </View>
    )
  }
}

export default LoginComponent

const styles = StyleSheet.create({
  btn: {
    marginTop: 30
  }
})

