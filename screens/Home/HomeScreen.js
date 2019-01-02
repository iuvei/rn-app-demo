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
  SetCustomizeLottery
} from '../../actions/common'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }
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
    this.props.navigation.setParams({ changeTextFun: this.changeTextFun })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setState({
        title: nextProps.title
      })
    }
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
          <View style={styles.hotItem}>
            <Flex>
              <View>
                <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'contain'} style={styles.hotItemImg} />
              </View>
              <View style={styles.hotItemCenter}>
                <Text style={styles.hotItemTitle}>重庆时时彩</Text>
                <Text style={styles.hotItemText}>20181211006期</Text>
              </View>
              <View style={styles.hotItemRight}>
                <Flex wrap="wrap">
                  <View><Text style={styles.hotItemBall}>1</Text></View>
                  <View><Text style={styles.hotItemBall}>2</Text></View>
                  <View><Text style={styles.hotItemBall}>5</Text></View>
                  <View><Text style={styles.hotItemBall}>7</Text></View>
                  <View><Text style={styles.hotItemBall}>9</Text></View>
                  <View><Text style={styles.hotItemBall}>1</Text></View>
                  <View><Text style={styles.hotItemBall}>2</Text></View>
                  <View><Text style={styles.hotItemBall}>5</Text></View>
                  <View><Text style={styles.hotItemBall}>7</Text></View>
                  <View><Text style={styles.hotItemBall}>9</Text></View>
                </Flex>
              </View>
            </Flex>
          </View>
          <View style={styles.hotItem}>
            <Flex>
              <View>
                <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'contain'} style={styles.hotItemImg} />
              </View>
              <View style={styles.hotItemCenter}>
                <Text style={styles.hotItemTitle}>重庆时时彩</Text>
                <Text style={styles.hotItemText}>20181211006期</Text>
              </View>
              <View style={styles.hotItemRight}>
                <Flex wrap="wrap">
                  <View><Text style={styles.hotItemBall}>1</Text></View>
                  <View><Text style={styles.hotItemBall}>2</Text></View>
                  <View><Text style={styles.hotItemBall}>5</Text></View>
                  <View><Text style={styles.hotItemBall}>7</Text></View>
                  <View><Text style={styles.hotItemBall}>9</Text></View>
                </Flex>
              </View>
            </Flex>
          </View>
          <View style={styles.hotItem}>
            <Flex>
              <View>
                <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'contain'} style={styles.hotItemImg} />
              </View>
              <View style={styles.hotItemCenter}>
                <Text style={styles.hotItemTitle}>重庆时时彩</Text>
                <Text style={styles.hotItemText}>20181211006期</Text>
              </View>
              <View style={styles.hotItemRight}>
                <Flex wrap="wrap">
                  <View><Text style={styles.hotItemBall}>1</Text></View>
                  <View><Text style={styles.hotItemBall}>2</Text></View>
                  <View><Text style={styles.hotItemBall}>5</Text></View>
                  <View><Text style={styles.hotItemBall}>7</Text></View>
                  <View><Text style={styles.hotItemBall}>9</Text></View>
                </Flex>
              </View>
            </Flex>
          </View>
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
              <View style={styles.favoriteItem}>
                <Flex>
                  <View>
                    <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'cover'} style={styles.favoriteItemImg} />
                  </View>
                  <View style={styles.favoriteItemCenter}>
                    <Text style={styles.favoriteItemTitle}>重庆时时彩</Text>
                    <Text style={styles.favoriteItemText}>100万派送中</Text>
                  </View>
                </Flex>
              </View>
              <View style={styles.favoriteItem}>
                <Flex>
                  <View>
                    <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'cover'} style={styles.favoriteItemImg} />
                  </View>
                  <View style={styles.favoriteItemCenter}>
                    <Text style={styles.favoriteItemTitle}>重庆时时彩</Text>
                    <Text style={styles.favoriteItemText}>100万派送中</Text>
                  </View>
                </Flex>
              </View>
              <View style={styles.favoriteItem}>
                <Flex>
                  <View>
                    <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'cover'} style={styles.favoriteItemImg} />
                  </View>
                  <View style={styles.favoriteItemCenter}>
                    <Text style={styles.favoriteItemTitle}>重庆时时彩</Text>
                    <Text style={styles.favoriteItemText}>100万派送中</Text>
                  </View>
                </Flex>
              </View>
              <View style={styles.favoriteItem}>
                <Flex>
                  <View>
                    <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'cover'} style={styles.favoriteItemImg} />
                  </View>
                  <View style={styles.favoriteItemCenter}>
                    <Text style={styles.favoriteItemTitle}>重庆时时彩</Text>
                    <Text style={styles.favoriteItemText}>100万派送中</Text>
                  </View>
                </Flex>
              </View>
              <View style={styles.favoriteItem}>
                <Flex>
                  <View>
                    <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'cover'} style={styles.favoriteItemImg} />
                  </View>
                  <View style={styles.favoriteItemCenter}>
                    <Text style={styles.favoriteItemTitle}>重庆时时彩</Text>
                    <Text style={styles.favoriteItemText}>100万派送中</Text>
                  </View>
                </Flex>
              </View>
              <View style={styles.favoriteItem}>
                <Flex>
                  <View>
                    <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'cover'} style={styles.favoriteItemImg} />
                  </View>
                  <View style={styles.favoriteItemCenter}>
                    <Text style={styles.favoriteItemTitle}>重庆时时彩</Text>
                    <Text style={styles.favoriteItemText}>100万派送中</Text>
                  </View>
                </Flex>
              </View>
              <View style={styles.favoriteItem}>
                <Flex>
                  <View>
                    <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'cover'} style={styles.favoriteItemImg} />
                  </View>
                  <View style={styles.favoriteItemCenter}>
                    <Text style={styles.favoriteItemTitle}>重庆时时彩</Text>
                    <Text style={styles.favoriteItemText}>100万派送中</Text>
                  </View>
                </Flex>
              </View>
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
  let {count, btnText} = state.example
  return ({
    count,
    btnText
  })
}

// const mapDispatchToProps = {
//   changeText: changeBtnText
// }
const mapDispatchToProps = (dispatch) => {
  return {
    SetCustomizeLottery: (text) => {
      dispatch(SetCustomizeLottery(text))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)