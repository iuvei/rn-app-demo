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
  ToastAndroid
} from 'react-native'
import { Carousel, NoticeBar, WhiteSpace, Flex, Toast } from '@ant-design/react-native';
import {connect} from 'react-redux'
import Header from './../../components/Header'
import {
  setCustomizeLottery,
  setActiveUsualLot,
  getSystemNews,
  queryActivity
} from './../../actions/common'
import { getHotLotter } from './../../api/lottery'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      hotLoList: [
        {
          categoryCode: "ssc",
          lotterCode: "cqssc",
          lotterName: "重庆时时彩",
          openCode: "9,4,1,2,9",
          openIssue: "20190103070"
        }
      ],
    }
    this.getIconName = value => {
        switch (value) {
          case 'ssc':
            return require('./../../assets/images/home/ssc_icon.png')
            break
          case 'syx5':
            return require('./../../assets/images/home/syxw_icon.png')
            break
          case 'kl8':
            return require('./../../assets/images/home/klc_icon.png')
            break
          case 'pk10':
            return require('./../../assets/images/home/pks_icon.png')
            break
          case 'k3':
            return require('./../../assets/images/home/ks_icon.png')
            break
          case 'kl10':
            return require('./../../assets/images/home/kls_icon.png')
            break
          case 'xyc':
            return require('./../../assets/images/home/xyc_icon.png')
            break
          case 'dpc':
            return require('./../../assets/images/home/dpc_icon.png')
            break
          default:
            return require('./../../assets/images/home/ssc_icon.png')
        }
      };
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      header: <Header
        hideLeft={true}
        rightContent={
          <Text style={{fontSize: 16, color: "#fff"}}>
            <Text onPress={() => params.changeTextFun('Broadcast')}>公告  </Text>
            <Text onPress={() => params.changeTextFun('Mailbox')}>信箱</Text>
          </Text>
        }/>
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
    this.props.navigation.setParams({ changeTextFun: this.changeTextFun })
    this.props.queryActivity()
    // this.props.navigation.push('Bet')
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    this.didBlurSubscription = this.props.navigation.addListener('didFocus', this.updateImmediateData)
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    this.didBlurSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {

  }

  onBackAndroid = () => {
    if (this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
  }

  updateImmediateData = () => {
    // 每次来到首页都更新热门彩种
    this._initHotLottery()
  }

  _initHotLottery() {
    getHotLotter().then((res) => {
      this.setState({
        hotLoList: res.data
      })
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
    this.setState({refreshing: true});
    setTimeout(() => {
      Toast.success('刷新成功！')
      this.setState({refreshing: false});
    }, 1000);
  }

  render() {
    let { usualLottery, systemNews } = this.props
    let { hotLoList } = this.state
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
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
        >
          <View
            style={styles.containerHorizontal}
          >
            <Image source={require('./../../assets/images/home/banner_01.png')} resizeMode={'contain'} style={styles.carouselImg} />
          </View>
          <View
            style={styles.containerHorizontal}
          >
            <Image source={require('./../../assets/images/home/banner_01.png')} resizeMode={'contain'} style={styles.carouselImg} />
          </View>
        </Carousel>

        <View>
          <WhiteSpace size="sm" />
          <NoticeBar
            onPress={() => this.props.navigation.navigate('Broadcast')}
            marqueeProps={{ loop: true, style: { fontSize: 12, color: '#000' } }}
          >
            {str}
          </NoticeBar>
          <WhiteSpace size="sm" />
        </View>

        <Carousel
          style={styles.wrapper}
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
        >
          {
            hotLoList.map((item, index) =>{
              let codeList = item.openCode.split(',')
              return (
                <View style={styles.hotItem} key={index}>
                  <Flex onPress={() => this.props.navigation.navigate('Bet', item)}>
                    <View>
                      <Image source={this.getIconName(item.categoryCode)} resizeMode={'contain'} style={styles.hotItemImg} />
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
                              <View key={i} style={styles.hotItemBall}><Text style={styles.hotItemLgText}>{v}</Text></View>
                              : codeList.length < 11 ?
                              <View key={i} style={styles.hotItemMidBall}><Text style={styles.hotItemMidText}>{v}</Text></View>
                              : <View key={i} style={styles.hotItemSmallBall}><Text style={styles.hotItemSmallText}>{v}</Text></View>)
                        }
                      </Flex>
                    </View>
                  </Flex>
                </View>
              )}
            )
          }
        </Carousel>

        <WhiteSpace size="sm" />

        <View style={styles.favoriteHead}>
          <Flex justify="between" style={{fontSize: 13}}>
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
              usualLottery.map((item, index) =>
                <View style={styles.favoriteItem} key={index}>
                  <Flex onPress={() => this.props.navigation.navigate('Bet', item)}>
                    <View>
                      <Image source={this.getIconName(item.realCategory)} resizeMode={'cover'} style={styles.favoriteItemImg} />
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
            <Image source={require('./../../assets/images/home/ag.png')} resizeMode={'contain'} style={{width: 50}} />
          </View>
          <View style={styles.gameItem}>
            <Image source={require('./../../assets/images/home/og.png')} resizeMode={'contain'} style={{width: 50}} />
          </View>
          <View style={styles.gameItem}>
            <Image source={require('./../../assets/images/home/eb.png')} resizeMode={'contain'} style={{width: 50}} />
          </View>
          <View style={styles.gameItem}>
            <Image source={require('./../../assets/images/home/ob.png')} resizeMode={'contain'} style={{width: 50}} />
          </View>
        </Flex>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingLeft: 10,
    paddingRight: 10
  },
  wrapper: {
    backgroundColor: '#fff',
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
    borderRadius: 2,
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
    width: 26,
    height: 26,
    borderRadius: 13,
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
    lineHeight: 26,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  hotItemMidText: {
    lineHeight: 18,
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
  hotItemSmallText: {
    lineHeight: 14,
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
  },
  carouselImg: {
    width: '100%'
  },
  favoriteHead: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e6e6e6'
  },
  favoriteHeadText: {
    height: 30,
    lineHeight:30
  },
  favoriteItem: {
    width: '50%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderLeftWidth: 1,
    borderLeftColor: '#f0f0f0',
  },
  favoriteItemImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
    backgroundColor: '#fff'
  },
  favoriteItemCenter: {

  },
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
})

const mapStateToProps = (state) => {
  let { usualLottery, systemNews } = state.common
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
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
