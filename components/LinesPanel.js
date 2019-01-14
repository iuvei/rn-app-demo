import React, {Component} from 'react'
import {
  Text, View, StyleSheet
} from 'react-native'
import FloatBall from './FloatBall'

export default class LinesPanel extends Component {
  render() {
    return (
      <View>
        <FloatBall>
          <Text style={styles.text}>加速</Text>
        </FloatBall>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {lineHeight: 40, textAlign: 'center', color: '#ffffff'}
})
