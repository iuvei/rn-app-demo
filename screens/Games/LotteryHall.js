import React from 'react'
import {ScrollView, View, Text, ImageBackground, Image, StyleSheet} from 'react-native'
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native'

export default class LotteryHall extends React.Component {
  render () {
    let list = [
      {
      title: '时时彩',
      desc: '时时开奖 彩种齐全',
      img: require('../../assets/images/hall/ssc.png'),
      bgImg: require('../../assets/images/hall/bg1.png')
    }, {
      title: '11选5',
      desc: '主流彩票 应有尽有',
      img: require('../../assets/images/hall/11x5.png'),
      bgImg: require('../../assets/images/hall/bg2.png')
    }, {
      title: 'PK拾',
      desc: '刺激竞速 快速开奖',
      img: require('../../assets/images/hall/pk10.png'),
      bgImg: require('../../assets/images/hall/bg3.png')
    }, {
      title: '快3',
      desc: '彩种多样 幸运赚不停',
      img: require('../../assets/images/hall/k3.png'),
      bgImg: require('../../assets/images/hall/bg1.png')
    }, {
      title: '基诺',
      desc: '中奖易 趣味多',
      img: require('../../assets/images/hall/jn.png'),
      bgImg: require('../../assets/images/hall/bg2.png')
    }, {
      title: '幸运彩',
      desc: '开奖频率高 赔率高',
      img: require('../../assets/images/hall/xyc.png'),
      bgImg: require('../../assets/images/hall/bg3.png')
    }, {
      title: '快乐十分',
      desc: '玩法简单 引人入胜',
      img: require('../../assets/images/hall/kl10.png'),
      bgImg: require('../../assets/images/hall/bg1.png')
    }, {
      title: '低频彩',
      desc: '彩种多样 幸运赚不停',
      img: require('../../assets/images/hall/dpc.png'),
      bgImg: require('../../assets/images/hall/bg2.png')
    }]
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#f5f5f9'}}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {
          list.map((item, index) => {
            return (
              <View key={index} style={{margin: 8}}>
                <ImageBackground source={item.bgImg}
                                 style={styles.card}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                  </View>
                  <Image source={item.img} style={{width: 100, height: 100}}></Image>
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
