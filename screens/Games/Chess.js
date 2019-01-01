import React from 'react'
import {ScrollView, View, Text, ImageBackground, Image, StyleSheet} from 'react-native'
import {Card} from '@ant-design/react-native'

export default class Chess extends React.Component {
  render () {
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#f5f5f9'}}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{alignItems: 'center'}}>
          <Image resizeMode= 'contain' source={require('../../assets/images/chess/jf.png')} style={{width: 400, height: 190}}></Image>
          <Image resizeMode= 'contain' source={require('../../assets/images/chess/ky.png')} style={{width: 400, height: 190}}></Image>
        </View>
      </ScrollView>
    )
  }
}
