import React from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, Animated, Easing } from 'react-native'
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
      top: new Animated.Value(0),
      list: [
        {
          title: '优惠活动',
          text: '回馈新老客户',
          route: 'Activity',
          params:{},
          src: require('./../../assets/images/found/huodong.png'),
          rotation: new Animated.Value(0),
        },
        {
          title: '趣味游戏',
          text: '趣味休闲小游戏',
          route: 'Links',
          params: {activeTab: 2},
          src: require('./../../assets/images/found/youxi.png'),
          rotation: new Animated.Value(0),
        },
        {
          title: '开奖公告',
          text: '实时公布开奖号',
          route: '',
          params:{},
          src: require('./../../assets/images/found/gonggao.png'),
          rotation: new Animated.Value(0),
        },
        // {
        //   title: '积分商城',
        //   text: '小惊喜大回报',
        //   route: '',
        //   params:{},
        //   src: require('./../../assets/images/found/jifen.png'),
        //   rotation: new Animated.Value(0),
        // },
        {
          title: '幸运选号',
          text: '狠狠提高中奖率',
          route: '',
          params:{},
          src: require('./../../assets/images/found/xuanhao.png'),
          rotation: new Animated.Value(0),
        },
        {
          title: '应用分享',
          text: '与朋友分享娱乐',
          route: '',
          params:{},
          src: require('./../../assets/images/found/yingyong.png'),
          rotation: new Animated.Value(0),
        }
        // {
        //   title: '抢红包',
        //   text: '手气旺抢红包',
        //   route: '',
        //   params:{},
        //   src: require('./../../assets/images/found/hongbao.png'),
        //   rotation: new Animated.Value(0),
        // }
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
      this.props.navigation.navigate(item.route, item.params)
    } else {
      Toast.info(item.title + '~敬请期待！', 0.3)
    }
  }

  _animateFun = () => {
    var timing = Animated.timing;
    Animated.parallel([...this.state.list.map((property, index) => {
      return timing(property["rotation"], {
        toValue: 1,
        duration: 600,
        delay: index*600 + 1000,
        easing: Easing.linear
      });
    }),timing(
      this.state.top,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce
      }
    )]).start();
  }

  componentWillMount() {
    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this._getPlatformReward)
  }

  componentDidMount() {
    // this._getPlatformReward();
    this._animateFun()
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.setState = () => () =>{}
  }


  render() {
    let { list } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.findHeader}>
          <Flex justify="center">
            <View>
              <Text style={styles.findHeadText}>黄金海岸2累积派发奖金</Text>
              <Animated.View style={{
                top: this.state.top.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [-100, 10, 0]
                })
              }}>
                <Flex justify="center">
                  <View>
                    <Text style={styles.findHeadNumber}>¥</Text>
                  </View>
                  <View>
                    <Text style={styles.findHeadNumber}>{this._moneyShow(this.state.accumulateBouns)}</Text>
                  </View>
                </Flex>
              </Animated.View>
            </View>
          </Flex>
        </View>
        <ImageBackground
          resizeMode={'cover'}
          source={require('./../../assets/images/found/find_bg.jpg')}
          style={{width: '100%', height: '95%'}}>
        <ScrollView>
          <WhiteSpace size="md" />
          <Flex wrap="wrap">
            {
              list.map((item, index) => {
                return (
                  <View style={[styles.findItem]} key={index}>
                    <Flex onPress={() => this._actionFun(item)}>
                      <ImageBackground
                        resizeMode={'contain'}
                        source={require('./../../assets/images/found/cloud.png')}
                        style={styles.listBlock}>
                        <View>
                          <Animated.Image
                            source={item.src}
                            resizeMode={'contain'}
                            style={{width: 91, height: 90, transform: [{
                                rotateZ: item["rotation"].interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0deg', '360deg']
                                })
                              }]}}/>
                          <Text style={styles.listTitle}>{item.title}</Text>
                        </View>
                      </ImageBackground>
                    </Flex>
                  </View>
                )
              })
            }
          </Flex>
        </ScrollView>
        </ImageBackground>
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
    backgroundColor: '#00afbf',
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
    color: '#ffffff',
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  findHeadNumber: {
    fontSize: 24,
    color: '#ffffff',
  },
  findItem: {
    width: '33%',
    //以下是阴影属性：
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: '#f4f3f3',
    //注意：这一句是可以让安卓拥有灰色阴影
    elevation: 1,
  },
  listBlock: {
    marginLeft: 10
  },
  listTitle: {
    fontSize: 14,
    color: '#333333',
    width: '100%',
    textAlign: 'center'
  },
  listText: {
    marginTop: 5,
    fontSize: 10,
    color: '#8d8b8e'
  }
})
