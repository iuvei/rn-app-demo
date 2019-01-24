import React from 'react'
import { View, Text, PixelRatio } from 'react-native'
import * as ScreenUtil from '../utils/ScreenUtil'

export default class SizeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontSize: 30}}>没适配,本机像素：{PixelRatio.get()}</Text>
        <Text style={{fontSize: ScreenUtil.setSpText(30)}}>已适配</Text>
        <View style={{
          height: 50, width: 240, backgroundColor: 'green'
        }}/>
        <View style={{
          height: ScreenUtil.scaleSize(50),
          width: ScreenUtil.scaleSize(240),
          backgroundColor: 'red'
        }}/>
      </View>
    )
  }
}
