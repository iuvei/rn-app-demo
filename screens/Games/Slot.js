import React from 'react'
import {ScrollView, View, Text, ImageBackground, Image, StyleSheet} from 'react-native'
import {Card} from '@ant-design/react-native'

export default class Slot extends React.Component {
  render () {
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#f5f5f9'}}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  desc: {
    fontSize: 14,
    color: 'white'
  }
})
