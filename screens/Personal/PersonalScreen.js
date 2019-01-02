import React from 'react'
import {Image, ScrollView, View, Text, StyleSheet, ImageBackground} from 'react-native'
import {Button, Flex} from '@ant-design/react-native'
import {Tab, Tabs, Header} from 'native-base'

export default class PersonalScreen extends React.Component {
  static navigationOptions = {
    title: '个人'
  }

  render () {
    let list = [
      {
        name: '充值',
        src: require('../../assets/images/personal/icon1.png')
      },
      {
        name: '提现',
        src: require('../../assets/images/personal/icon2.png')
      },
      {
        name: '转账',
        src: require('../../assets/images/personal/icon3.png')
      },
      {
        name: '公告',
        src: require('../../assets/images/personal/icon4.png')
      },
      {
        name: '设置',
        src: require('../../assets/images/personal/icon5.png')
      }
    ]
    let agent = [
      {
        name: '代理首页',
        src: require('../../assets/images/personal/tbl1.png')
      },
      {
        name: '开户中心',
        src: require('../../assets/images/personal/tbl2.png')
      },
      {
        name: '团队报表',
        src: require('../../assets/images/personal/tbl3.png')
      },
      {
        name: '会员管理',
        src: require('../../assets/images/personal/tbl4.png')
      },
      {
        name: '账变记录',
        src: require('../../assets/images/personal/tbl5.png')
      },
      {
        name: '彩种报表',
        src: require('../../assets/images/personal/tbl6.png')
      },
      {
        name: '游戏记录',
        src: require('../../assets/images/personal/tbl7.png')
      },
      {
        name: '追号记录',
        src: require('../../assets/images/personal/tbl1.png')
      },
      {
        name: '存取款记录',
        src: require('../../assets/images/personal/tbl2.png')
      },
      {
        name: '百家乐报表',
        src: require('../../assets/images/personal/tbl3.png')
      }
    ]
    let order = [
      {
        name: '游戏记录',
        src: require('../../assets/images/personal/tbl1.png')
      },
      {
        name: '追号记录',
        src: require('../../assets/images/personal/tbl2.png')
      },
      {
        name: '个人彩票报表',
        src: require('../../assets/images/personal/tbl3.png')
      },
      {
        name: '存取款记录',
        src: require('../../assets/images/personal/tbl4.png')
      },
      {
        name: '个人账变记录',
        src: require('../../assets/images/personal/tbl5.png')
      },
      {
        name: '返点记录',
        src: require('../../assets/images/personal/tbl6.png')
      },
      {
        name: '百家乐报表',
        src: require('../../assets/images/personal/tbl7.png')
      },
      {
        name: '转账报表',
        src: require('../../assets/images/personal/tbl1.png')
      },
      {
        name: '百家乐转账报表',
        src: require('../../assets/images/personal/tbl2.png')
      },
      {
        name: '活动记录',
        src: require('../../assets/images/personal/tbl3.png')
      }
    ]
    return (
      <View style={styles.container}>
        <ImageBackground resizeMode='cover' source={require('../../assets/images/personal/bg0.png')}
                         style={{height: 230}}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', height: 120, alignItems: 'center'}}>
              <Image source={require('../../assets/images/personal/avatar.png')}
                     style={{width: 80, height: 80}}></Image>
              <View>
                <Text>user001</Text>
                <Text>余额： 9999.99元</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Button style={{height: 32, backgroundColor: '#0f81de', borderRadius: 15}}>
                  <Text style={{color: 'white', fontSize: 14}}>彩票返点:14.6</Text>
                </Button>
                <Text>更多返点></Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 55,
              borderBottomWidth: 1,
              borderBottomColor: '#0c7edb'
            }}>
              <View style={{width: 200, borderRightWidth: 1, borderRightColor: '#0c7edb', alignItems: 'center'}}>
                <Text>8000.00元</Text>
                <Text>可提金额</Text>
              </View>
              <View style={{width: 200, alignItems: 'center'}}>
                <Text>8000.00元</Text>
                <Text>返点金额</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 55}}>
              {
                list.map((item, index) => {
                  return (
                    <View key={index} style={{height: 45}}>
                      <Image resizeMode='contain' source={item.src} style={{width: 28, height: 26}}></Image>
                      <Text style={{color: '#0c7edb'}}>{item.name}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </ImageBackground>
        <View style={{height: 360}}>
          <Tabs tabStyle={{color: '#0070cc'}} activeTabStyle={{backgroundColor: '#eff5fb'}}>
            <Tab heading={'订单报表'}>
              <ScrollView style={styles.agent} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {
                  order.map((item, index) => {
                    return (
                      <View key={index} style={{alignItems: 'center',width: 90, marginBottom: 10}}>
                        <Image source={item.src} style={{width: 50, height: 50}}></Image>
                        <Text>{item.name}</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </Tab>
            <Tab heading={'代理管理'}>
              <ScrollView style={styles.agent} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {
                  agent.map((item, index) => {
                    return (
                      <View key={index} style={{alignItems: 'center', width: 90, marginBottom: 10}}>
                        <Image source={item.src} style={{width: 50, height: 50}}></Image>
                        <Text>{item.name}</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </Tab>
          </Tabs>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  agent: {
    height: 200,
    padding: 10
  }
})
