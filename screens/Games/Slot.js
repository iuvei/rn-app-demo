import React from 'react'
import {ScrollView, View, Text, ImageBackground, Image, StyleSheet} from 'react-native'
import {Flex, Button} from '@ant-design/react-native'

export default class Slot extends React.Component {
  render () {
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#f5f5f9'}}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Flex direction={'row'} wrap={'wrap'} style={{margin: 6}}>
          <Flex.Item>
            <ImageBackground source={require('../../assets/images/slot/slot1.png')} resizeMode= 'contain' style={styles.card}>
              <View style={styles.footer}>
                <Text style={{color: 'white'}}>辛巴达黄金之旅</Text>
                <Button size={'small'}>进入游戏</Button>
              </View>
            </ImageBackground>
          </Flex.Item>
          <Flex.Item>
            <ImageBackground source={require('../../assets/images/slot/slot2.png')} resizeMode= 'contain' style={styles.card}>
              <View style={styles.footer}>
                <Text style={{color: 'white'}}>招财8</Text>
                <Button size={'small'}>进入游戏</Button>
              </View>
            </ImageBackground>
          </Flex.Item>
        </Flex>
        <Flex direction={'row'} wrap={'wrap'} style={{margin: 6}}>
          <Flex.Item>
            <ImageBackground source={require('../../assets/images/slot/slot3.png')} resizeMode= 'contain' style={styles.card}>
              <View style={styles.footer}>
                <Text style={{color: 'white'}}>幸运777</Text>
                <Button size={'small'}>进入游戏</Button>
              </View>
            </ImageBackground>
          </Flex.Item>
          <Flex.Item>
            <ImageBackground source={require('../../assets/images/slot/slot4.png')} resizeMode= 'contain' style={styles.card}>
              <View style={styles.footer}>
                <Text style={{color: 'white'}}>爆炸糖2</Text>
                <Button size={'small'}>进入游戏</Button>
              </View>
            </ImageBackground>
          </Flex.Item>
        </Flex>
        <Flex direction={'row'} wrap={'wrap'} style={{margin: 6}}>
          <Flex.Item>
            <ImageBackground source={require('../../assets/images/slot/slot5.png')} resizeMode= 'contain' style={styles.card}>
              <View style={styles.footer}>
                <Text style={{color: 'white'}}>超级幸运星</Text>
                <Button size={'small'}>进入游戏</Button>
              </View>
            </ImageBackground>
          </Flex.Item>
          <Flex.Item>
            <ImageBackground source={require('../../assets/images/slot/slot1.png')} resizeMode= 'contain' style={styles.card}>
              <View style={styles.footer}>
                <Text style={{color: 'white'}}>幸运骰子</Text>
                <Button size={'small'}>进入游戏</Button>
              </View>
            </ImageBackground>
          </Flex.Item>
        </Flex>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    marginRight:6,
    justifyContent: 'flex-end'
  },
  footer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
})
