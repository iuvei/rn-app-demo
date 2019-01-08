import React from 'react'
import {View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native'
import { WhiteSpace, Flex, Toast } from '@ant-design/react-native';
import Header from './../../components/Header'
import { getPlatformReward } from './../../api/basic'

export default class FoundScreen extends React.Component {
  static navigationOptions = {
    header: <Header hideLeft={true}/>
  }

  constructor(props) {
    super(props)
    this.state = {
      accumulateBouns: '99,999,888,789',
      list: [
        {
          title: '开奖公告',
          text: '实时公布开奖号',
          route: '',
          src: require('./../../assets/images/found/open.png')
        },
        {
          title: '优惠活动',
          text: '回馈新老客户',
          route: 'Activity',
          src: require('./../../assets/images/found/activity.png')
        },
        {
          title: '趣味游戏',
          text: '趣味休闲小游戏',
          route: '',
          src: require('./../../assets/images/found/game.png')
        },
        {
          title: '积分商城',
          text: '小惊喜大回报',
          route: '',
          src: require('./../../assets/images/found/shop.png')
        },
        {
          title: '幸运选号',
          text: '狠狠提高中奖率',
          route: '',
          src: require('./../../assets/images/found/lucky.png')
        },
        {
          title: '应用分享',
          text: '与朋友分享娱乐',
          route: '',
          src: require('./../../assets/images/found/share.png')
        },
        {
          title: '抢红包',
          text: '手气旺抢红包',
          route: '',
          src: require('./../../assets/images/found/packet.png')
        }
      ]
    }
  }

  _moneyShow (val) {
    val += ''
    let x = val.split('.')
    let x1 = x[0]
    let x2 = x.length > 1 ? '.' + x[1] : ''
    let rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
  }

  _getPlatformReward = () => {
    getPlatformReward().then(res => {
      if (res.code === 0) {
        this.setState({
          accumulateBouns: String(res.data.bonus)
        })
      } else {
        let time = (new Date()).getTime()
        let num = 109135811
        let inittime = (new Date('2018-10-01')).getTime()
        let sec = (time - inittime) / 1000
        this.setState({
          accumulateBouns: String(Math.floor(num + sec * 3))
        })
      }
    }).catch(() => {
      let time = (new Date()).getTime()
      let num = 109135811
      let inittime = (new Date('2018-10-01')).getTime()
      let sec = (time - inittime) / 1000
      this.setState({
        accumulateBouns: String(Math.floor(num + sec * 3))
      })
    })
  }

  _actionFun = (item) =>{
    if (item.route) {
      this.props.navigation.push(item.route)
    } else {
      Toast.info(item.title + '正在开发中！')
    }
  }

  componentDidMount() {
    this._getPlatformReward()
  }

  render() {
    let { list } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.findHeader}>
          <ImageBackground source={require('./../../assets/images/found/find_bg.png')} style={{width: '100%', height: '100%'}}>
            <Flex justify="center">
              <View style={styles.findHeaderContent}>
                <Text style={styles.findHeadText}>天祥国际累积派发奖金</Text>
                <Flex justify="center">
                  <View>
                    <Text style={styles.findHeadNumber}>¥</Text>
                  </View>
                  <View>
                    <Text style={styles.findHeadNumber}>{this._moneyShow(this.state.accumulateBouns)}</Text>
                  </View>
                </Flex>
              </View>
            </Flex>
          </ImageBackground>
        </View>
        <WhiteSpace size="md" />
        <ScrollView>
          <Flex wrap="wrap">
            {
              list.map((item, index) => {
                return (
                  <View style={styles.findItem} key={index}>
                    <Flex style={{height: 70}} onPress={() => this._actionFun(item)}>
                      <View style={styles.listBlock}>
                        <Text style={styles.listTitle}>{item.title}</Text>
                        <Text style={styles.listText}>{item.text}</Text>
                      </View>
                      <View>
                        <Image
                          source={item.src}
                          resizeMode={'contain'}
                          style={{width: 60, marginLeft: 10}}/>
                      </View>
                    </Flex>
                  </View>
                )
              })
            }
          </Flex>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  findHeader: {
    height: 94
  },
  findHeaderContent: {
    width: '90%',
    height: 86,
    borderRadius: 10,
    backgroundColor: '#e7f4ff',
    marginTop: 8,
    //以下是阴影属性：
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#d7d6d6',
    //注意：这一句是可以让安卓拥有灰色阴影
    elevation: 4,
  },
  findHeadText: {
    color: '#016fca',
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  findHeadNumber: {
    fontSize: 24,
    color: '#016fca',
  },
  findItem: {
    width: '45%',
    marginLeft: '3%',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#d7d6d6',
    borderRadius: 10,
    marginBottom: 10,
    //以下是阴影属性：
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: '#f4f3f3',
    //注意：这一句是可以让安卓拥有灰色阴影
    elevation: 1,
  },
  listBlock: {
    width: 80,
    paddingLeft: 10
  },
  listTitle: {
    fontSize: 14,
    color: '#333333'
  },
  listText: {
    marginTop: 5,
    fontSize: 10,
    color: '#8d8b8e'
  }
})
