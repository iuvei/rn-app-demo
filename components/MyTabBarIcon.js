import React from 'react'
import {
  View,
  Text,
  Platform
} from 'react-native'
import {MyIconFont} from './MyIconFont'

export default class MyTabBarIcon extends React.PureComponent {
  render() {
    return <View style={{position: 'relative'}}>
      {
        this.props.badgeNum ? <Text style={{color: 'red', position: 'absolute', top: 0, right: 4}}>{this.props.badgeNum}</Text> : null
      }
      {
        this.props.badgeDot ? <View style={{width: 8, height: 8, backgroundColor: 'red', borderRadius: 8, position: 'absolute', top: 4, right: 4}}></View> : null
      }
      <MyIconFont name={this.props.name} size={this.props.size} color={this.props.color}/>
    </View>
  }
}