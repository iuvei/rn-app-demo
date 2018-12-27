import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default class GamesScreen extends React.Component {
  static navigationOptions = {
    title: 'Games'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>这是充值模版</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})

