import React from 'react'
import {ScrollView, View, Text, ImageBackground, Image, StyleSheet} from 'react-native'
import {Button} from '@ant-design/react-native'

export default class RealPeople extends React.Component {
  render () {
    let list = [
      {
        name: 'AG平台',
        status: true,
        icon: require('../../assets/images/realPeople/ag-ico.png'),
        bgImgL: require('../../assets/images/realPeople/ag.png')
      },{
        name: 'OG平台',
        status: true,
        icon: require('../../assets/images/realPeople/og-ico.png'),
        bgImgL: require('../../assets/images/realPeople/og.jpg')
      },{
        name: '欧博平台',
        status: true,
        icon: require('../../assets/images/realPeople/allbet-ico.png'),
        bgImgL: require('../../assets/images/realPeople/allbet.png')
      },{
        name: 'eBET平台',
        status: true,
        icon: require('../../assets/images/realPeople/ebet-ico.png'),
        bgImgL: require('../../assets/images/realPeople/ebet.png')
      },
    ]
    return (
      <ScrollView style={styles.container}>
        {
          list.map((item, index) => {
            return (
              <View style={{margin: 8, flex: 1}} key={index}>
                <ImageBackground source={item.bgImgL} resizeMode= 'contain' style={{width: '100%', height: '100%'}}>
                  <View style={styles.card}>
                    <View style={styles.footer}>
                      <Image source={item.icon} resizeMode= 'contain' style={{width: 120, height: 60}}></Image>
                      <View style={{width: 120, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 18}}>{item.name}</Text>
                        <Button style={{width: 120, height: 30}}>{item.status ? '进入游戏' : '请等待'}</Button>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // flexWrap: 'wrap'
  },
  card: {
    flex: 1,
    margin: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: 400,
    height: 450
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 350,
    height: 80
  }
})
