import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class PersonalScreen extends React.Component {
  static navigationOptions = {
    title: '个人'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我是PersonalScreen页面</Text>
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
