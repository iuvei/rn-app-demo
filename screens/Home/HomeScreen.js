import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl
} from 'react-native'
import { Carousel, NoticeBar, WhiteSpace, Flex } from '@ant-design/react-native';
import {connect} from 'react-redux'
import Header from './../../components/Header'
import {
  setCustomizeLottery,
  setActiveUsualLot
} from './../../actions/common'
import { getHotLotter } from './../../api/lottery'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      hotLoList: [],
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
            <Text onPress={() => params.changeTextFun('分享')}>分享  </Text>
            <Text onPress={() => params.changeTextFun('扫码')}>扫码</Text>
          </Text>
        }/>
    }
  }

  changeTextFun = (val) => {
    alert(val+ '正在开发中')
  }

  componentDidMount() {
    this.props.SetCustomizeLottery()
    this.props.setActiveUsualLot({custom: 0, data: []})
    this._initHotLottery()
    this.props.navigation.setParams({ changeTextFun: this.changeTextFun })
  }

  componentWillReceiveProps(nextProps) {

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
    this.props.navigation.push('CustomizeGames')
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 1000);
  }

  render() {
    let { usualLottery } = this.props
    let { hotLoList } = this.state
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
            onPress={() => alert('click')}
            marqueeProps={{ loop: true, style: { fontSize: 12, color: '#000' } }}
          >
            一、本公司时时彩彩种每期最高奖金限额400000.00元，超出按400000.00元计算，超出的奖金无效并清0；其余高
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
                  <Flex>
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
                              <View key={i}><Text style={styles.hotItemBall}>{v}</Text></View>
                            : codeList.length < 11 ?
                              <View key={i}><Text style={styles.hotItemMidBall}>{v}</Text></View>
                            : <View key={i}><Text style={styles.hotItemSmallBall}>{v}</Text></View>)
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

        <View style={{height: 180}}>
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
                    <Flex onPress={() => alert(item.lotterCode)}>
                      <View>
                        <Image source={this.getIconName(item.realCategory)} resizeMode={'cover'} style={styles.favoriteItemImg} />
                      </View>
                      <View style={styles.favoriteItemCenter}>
                        <Text style={styles.favoriteItemTitle}>{item.lotterName}</Text>
                        <Text style={styles.favoriteItemText}>100万派送中</Text>
                      </View>
                    </Flex>
                  </View>)
              }
            </Flex>
          </ScrollView>
        </View>

        <View style={styles.tabBarInfoContainer}>
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
    lineHeight: 26,
    textAlign: 'center',
    borderRadius: 13,
    color: 'white',
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#097bd9'
  },
  hotItemSmallBall: {
    width: 14,
    height: 14,
    lineHeight: 14,
    fontSize: 10,
    textAlign: 'center',
    borderRadius: 7,
    color: 'white',
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#097bd9'
  },
  hotItemMidBall: {
    width: 18,
    height: 18,
    lineHeight: 18,
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 9,
    color: 'white',
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#097bd9'
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
    fontSize: 14
  },
  favoriteItemText: {
    fontSize: 12,
    color: '#787878'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb'
  },
  gameItem: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 50
  }
})

const mapStateToProps = (state) => {
  let { usualLottery } = state.common
  return ({
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
