import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  BackHandler,
  ToastAndroid,
  ImageBackground
} from 'react-native'
import { Carousel, NoticeBar, WhiteSpace, Flex, Toast } from '@ant-design/react-native'
import { connect } from 'react-redux'
import { Video } from 'expo'
import Header from './../../components/Header'
import {
  setCustomizeLottery,
  setActiveUsualLot,
  getSystemNews,
  queryActivity
} from './../../actions/common'
import { getHotLotter } from './../../api/lottery'
import { getIconName } from '../../utils/getLotImg'
import { stylesUtil } from '../../utils/ScreenUtil'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      hotLoList: [
        {
          categoryCode: 'ssc',
          lotterCode: 'cqssc',
          lotterName: '重庆时时彩',
          openCode: '9,4,1,2,9',
          openIssue: '20190103070'
        }
      ],
      LotArray: [{
        'countExcept': 0,
        'isOuter': 0,
        'lotterCode': 'cqssc',
        'lotterLabel': 0,
        'lotterName': '重庆时时彩',
        'lotterNumber': 5,
        'lotterTime': '09:50~01:55',
        'maxBonus': 1000000.0,
        'numberRange': '0,1,2,3,4,5,6,7,8,9',
        'openUrl': 'http://www.baidu.com',
        'realCategory': 'ssc',
        'status': 0,
        'type': 0,
        'updateBy': 'dana001'
      }, {
        'countExcept': 0,
        'isOuter': 0,
        'lotterCode': 'flbswmxy28',
        'lotterLabel': 0,
        'lotterName': '菲律宾45秒幸运28 ',
        'lotterNumber': 3,
        'lotterTime': '早上9:05至23:55',
        'maxBonus': 400000.0,
        'numberRange': '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27',
        'openUrl': 'http://www.baidu.com',
        'realCategory': 'xyc',
        'realLotter': 'flbswmklb',
        'status': 0,
        'type': 1,
        'updateBy': 'SYSTEM'
      }, {
        'countExcept': 0,
        'isOuter': 0,
        'lotterCode': 'flbssmpks',
        'lotterLabel': 0,
        'lotterName': '菲律宾30秒PK拾',
        'lotterNumber': 10,
        'lotterTime': '全天开奖',
        'maxBonus': 800000.0,
        'numberRange': '1,2,3,4,5,6,7,8,9,10',
        'openUrl': 'http://www.baidu.com',
        'realCategory': 'pk10',
        'status': 0,
        'type': 0,
        'updateBy': 'SYSTEM'
      }, {
        'countExcept': 0,
        'isOuter': 0,
        'lotterCode': 'mdffklb',
        'lotterLabel': 0,
        'lotterName': '缅甸分分快乐8',
        'lotterNumber': 20,
        'lotterTime': '全天开奖',
        'maxBonus': 400000.0,
        'numberRange': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80',
        'openUrl': 'http://www.baidu.com',
        'realCategory': 'kl8',
        'status': 0,
        'type': 1,
        'updateBy': 'SYSTEM'
      }]
    }
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state
    return {
      header: <Header
        hideLeft={true}/>
    }
  }

  changeTextFun = (val) => {
    this.props.navigation.navigate(val)
    // Toast.info(val+ '正在开发中')
  }

  componentDidMount() {
    this.props.SetCustomizeLottery()
    this.props.getSystemNews()
    this.props.setActiveUsualLot({custom: 0, data: []})
    this._initHotLottery()
    this.props.navigation.setParams({changeTextFun: this.changeTextFun})
    this.props.queryActivity()
    // this.props.navigation.push('Bet', this.state.LotArray[0])
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this.updateImmediateData)
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    this.didBlurSubscription.remove()
    this.setState = () => () => {
    }
  }

  onBackAndroid = () => {
    if (this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false
      }
      this.lastBackPressed = Date.now()
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
      return true
    }
  }

  updateImmediateData = () => {
    // 每次来到首页都更新热门彩种
    this._initHotLottery()
  }

  _initHotLottery() {
    getHotLotter().then((res) => {
      if (res.code === 0) {
        this.setState({
          hotLoList: res.data
        })
      }
    })
  }

  onHorizontalSelectedIndexChange(index) {
    // /* tslint:disable: no-console */
    // console.log('horizontal change to', index);
  }

  setLot() {
    this.props.navigation.navigate('CustomizeGames')
  }

  _onRefresh = () => {
    this.setState({refreshing: true})
    setTimeout(() => {
      Toast.success('刷新成功！')
      this.setState({refreshing: false})
    }, 1000)
  }

  render() {
    let {usualLottery, systemNews} = this.props
    let {hotLoList} = this.state
    let str = ''
    if (systemNews.length > 0) {
      let reg = /<[^>]+>|[&nbsp;]+/g
      systemNews.every((value, index) => {
        str += '[' + value.title + ']'
        str += value.content.replace(reg, '')
        return index < 2
      })
    }
    return (
      <View style={styles.container}>
        <Carousel
          style={styles.wrapper}
          // autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
        >
          <View style={styles.containerHorizontal}>
            <Video
              source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={styles.containerHorizontal}>
            <Image source={require('./../../assets/images/home/banner_01.png')} resizeMode={'contain'}
                   style={styles.carouselImg}/>
          </View>
          <View style={styles.containerHorizontal}>
            <Image source={require('./../../assets/images/home/banner_01.png')} resizeMode={'contain'}
                   style={styles.carouselImg}/>
          </View>
        </Carousel>

        <View>
          <WhiteSpace size="sm"/>
          <NoticeBar
            onPress={() => this.props.navigation.navigate('Broadcast')}
            marqueeProps={{loop: true, style: styles.NoticeBar}}
          >
            {str}
          </NoticeBar>
          <WhiteSpace size="sm"/>
        </View>

        <Carousel
          style={styles.wrapper}
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
        >
          {
            hotLoList.length > 0 && hotLoList.map((item, index) => {
                let codeList = item.openCode.split(',')
                return (
                  <View style={styles.hotItem} key={index}>
                    <Flex onPress={() => this.props.navigation.navigate('Bet', item)}>
                      <View>
                        <Image source={getIconName(item.categoryCode)} resizeMode={'contain'} style={styles.hotItemImg}/>
                      </View>
                      <View style={styles.hotItemCenter}>
                        <Text style={styles.hotItemTitle}>{item.lotterName}</Text>
                        <Text style={styles.hotItemText}>{item.openIssue}期</Text>
                      </View>
                      <View style={styles.hotItemRight}>
                        <Flex wrap="wrap">
                          {
                            codeList.map((v, i) =>
                              codeList.length < 6 ?
                                <View key={i} style={styles.hotItemBall}><Text
                                  style={styles.hotItemLgText}>{v}</Text></View>
                                : codeList.length < 11 ?
                                <View key={i} style={styles.hotItemMidBall}><Text style={styles.hotItemMidText}>{v}</Text></View>
                                : <View key={i} style={styles.hotItemSmallBall}><Text
                                  style={styles.hotItemSmallText}>{v}</Text></View>)
                          }
                        </Flex>
                      </View>
                    </Flex>
                  </View>
                )
              }
            )
          }
        </Carousel>

        <WhiteSpace size="sm"/>

        <View style={styles.favoriteHead}>
          <Flex justify="between">
            <View><Text style={styles.favoriteHeadText}>我的喜爱</Text></View>
            <View><Text style={styles.favoriteHeadText} onPress={() => this.setLot()}>自定义</Text></View>
          </Flex>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <Flex wrap="wrap">
            {
              usualLottery.length > 0 && usualLottery.map((item, index) =>
                <View style={styles.favoriteItem} key={index}>
                  <Flex onPress={() => this.props.navigation.navigate('Bet', item)}>
                    <View>
                      <Image source={getIconName(item.realCategory)} resizeMode={'cover'}
                             style={styles.favoriteItemImg}/>
                    </View>
                    <View style={styles.favoriteItemCenter}>
                      <Text numberOfLines={1} style={styles.favoriteItemTitle}>{item.lotterName}</Text>
                      <Text style={styles.favoriteItemText}>100万派送中</Text>
                    </View>
                  </Flex>
                </View>)
            }
          </Flex>
        </ScrollView>
        <Flex>
          <View style={styles.gameItem}>
            <ImageBackground
              source={require('./../../assets/images/home/ag.png')}
              resizeMode={'contain'} style={{width: 50}}>
              <Text
                style={{width: '100%', height: '100%'}}
                onPress={() => this.props.navigation.navigate('Links', {activeTab: 1})}/>
            </ImageBackground>
          </View>
          <View style={styles.gameItem}>
            <ImageBackground
              source={require('./../../assets/images/home/og.png')}
              resizeMode={'contain'} style={{width: 50}}>
              <Text
                style={{width: '100%', height: '100%'}}
                onPress={() => this.props.navigation.navigate('Links', {activeTab: 1})}/>
            </ImageBackground>
          </View>
          <View style={styles.gameItem}>
            <ImageBackground
              source={require('./../../assets/images/home/eb.png')}
              resizeMode={'contain'} style={{width: 50}}>
              <Text
                style={{width: '100%', height: '100%'}}
                onPress={() => this.props.navigation.navigate('Links', {activeTab: 1})}/>
            </ImageBackground>
          </View>
          <View style={styles.gameItem}>
            <ImageBackground
              source={require('./../../assets/images/home/ob.png')}
              resizeMode={'contain'} style={{width: 50}}>
              <Text
                style={{width: '100%', height: '100%'}}
                onPress={() => this.props.navigation.navigate('Links', {activeTab: 1})}/>
            </ImageBackground>
          </View>
        </Flex>
      </View>
    )
  }
}

const styles = StyleSheet.create(stylesUtil({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingLeft: 10,
    paddingRight: 10
  },
  wrapper: {
    backgroundColor: '#fff'
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginTop: 3
  },
  hotItem: {
    height: 75,
    borderWidth: 1,
    borderColor: '#eaeaea',
    paddingLeft: 10,
    borderRadius: 2
  },
  hotItemImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff'
  },
  hotItemCenter: {
    marginLeft: 10
  },
  hotItemTitle: {
    fontSize: 14
  },
  hotItemText: {
    fontSize: 12,
    color: '#787878',
    paddingBottom: 5
  },
  hotItemRight: {
    maxWidth: 170,
    marginLeft: 10
  },
  hotItemBall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#097bd9'
  },
  hotItemSmallBall: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#097bd9'
  },
  hotItemMidBall: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#097bd9'
  },
  hotItemLgText: {
    lineHeight: 24,
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  hotItemMidText: {
    lineHeight: 18,
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  hotItemSmallText: {
    lineHeight: 14,
    fontSize: 10,
    textAlign: 'center',
    color: 'white'
  },
  carouselImg: {
    width: '100%'
  },
  NoticeBar: {fontSize: 12, color: '#000'},
  favoriteHead: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e6e6e6'
  },
  favoriteHeadText: {
    height: 30,
    lineHeight: 30
  },
  favoriteItem: {
    width: '50%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderLeftWidth: 1,
    borderLeftColor: '#f0f0f0'
  },
  favoriteItemImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
    backgroundColor: '#fff'
  },
  favoriteItemCenter: {},
  favoriteItemTitle: {
    width: 90,
    fontSize: 14
  },
  favoriteItemText: {
    fontSize: 12,
    color: '#787878'
  },
  gameItem: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 50,
    backgroundColor: '#ffffff'
  }
}))

const mapStateToProps = (state) => {
  let {usualLottery, systemNews} = state.common
  return ({
    systemNews,
    usualLottery
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetCustomizeLottery: () => {
      dispatch(setCustomizeLottery())
    },
    setActiveUsualLot: (data) => {
      dispatch(setActiveUsualLot(data))
    },
    getSystemNews: (data) => {
      dispatch(getSystemNews(data))
    },
    queryActivity: () => {
      dispatch(queryActivity())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
