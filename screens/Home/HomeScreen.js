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
  ImageBackground,
  TouchableHighlight
} from 'react-native'
import {
  Carousel, NoticeBar, Button,
  WhiteSpace, Flex, Toast, Icon,
  Modal, InputItem, List
} from '@ant-design/react-native'
import $Toast from '../../plugin/$Toast'
import { connect } from 'react-redux'
import Header from './../../components/Header'
import {
  setCustomizeLottery,
  setActiveUsualLot,
  getSystemNews,
  queryActivity,
  AgetRecharge,
  setPasswordRule,
  AsetUserSecureLevel,
  AsetUserSecureConfig,
  setLoginStatus
} from './../../actions/common'
import { AsetFreshMsg, AsetDayWagePower, AsetDividendPower, AsetUserBankCards } from '../../actions/member'
import { getHotLotter } from './../../api/lottery'
import { getIconName } from '../../utils/getLotImg'
import { stylesUtil } from '../../utils/ScreenUtil'
import { checkEnvironment } from '../../actions/classic'
import {updateLoginPwd, savePayPwd, modifyPayPwd} from '../../api/member'
import {loginOut, getPasswordRule} from '../../api/basic'

class HomeScreen extends React.Component {
  static navigationOptions = {
    // header:
    //   <Header hideLeft={true}
    //           rightContent={<TouchableHighlight
    //             style={{marginRight: 14, marginTop: 4}}>
    //             <View>
    //               <Icon name="share-apple" size="md" color="#fff"/>
    //             </View>
    //           </TouchableHighlight>}
    //   />
    header: <Header hideLeft={true}/>
  }

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
        'lotterCode': 'txffc',
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
      }],
      ispwdLoading: false,
      pwdvisible: false,
      pwdType: '',
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        rePwd: ''
      },
      messgae: '密码有且只能有 数字 字母，密码最小长度 8 位'
    }
    getPasswordRule().then(res => {
      if (res.code === 0 && res.data) {
        if (res.data.bandUserPassword) {
          this.showBindPwd({type: 'login', messgae: res.data.passwordParamDto.messgae})
        } else if (res.data.bandUserPayPassword) {
          this.showBindPwd({type: 'paypwd', messgae: res.data.passwordParamDto.messgae})
        }
      }
    })
  }

  componentDidMount() {
    this.props.SetCustomizeLottery()
    this.props.getSystemNews()
    this.props.setActiveUsualLot({custom: 0, data: []})
    this._initHotLottery()
    this.props.queryActivity()
    this.props.AgetRecharge()
    this.props.setPasswordRule()
    this.props.AsetFreshMsg()
    this.props.AsetDayWagePower()
    this.props.AsetDividendPower()
    this.props.AcheckEnvironment()
    // this.props.navigation.push('Bet', this.state.LotArray[0])
    this.props.AsetUserBankCards(this.props.userId)
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

  // 弹窗绑定登录密码
  showBindPwd = ({type, messgae}) => {
    this.setState({
      pwdvisible: true,
      pwdType: type,
      messgae
    })
  }

  /** @description
   * 绑定密码确认按钮点击
   */
  submitFunc = () => {
    let { pwdForm: { oldPwd, newPwd, rePwd}, pwdType } = this.state
    let typeStr = pwdType
    let pattern = new RegExp(this.props.passwordRule.passwordParamDto.validator) // /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{8,16}/i
    if (!pattern.test(newPwd)) {
      $Toast.info('请输入符合规则的密码')
      return
    }
    if (newPwd !== rePwd) {
      $Toast.info('新密码和确认密码必须相同')
      return
    }
    if (typeStr === 'login' || this.props.userSecurityLevel.isTradePassword) {
      if (oldPwd === '' || newPwd === '' || rePwd === '') {
        $Toast.info('请输入密码')
        return
      }
      this.setState({
        ispwdLoading: true
      }, () => {
        switch (typeStr) {
          case 'login':
            // let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
            updateLoginPwd({ oldPwd, newPwd, rePwd }).then(res => {
              this.props.AsetUserSecureLevel()
              this.props.setPasswordRule()
              if (res.code === 0) {
                $Toast.success(res.message || '修改成功')
                this.setState(prevState => ({
                  ispwdLoading: false,
                  pwdvisible: false,
                  pwdType: '',
                  pwdForm: {
                    oldPwd: '',
                    newPwd: '',
                    rePwd: ''
                  }
                }))
                setTimeout(() => {
                  loginOut().then((res) => {
                    if (res.code === 0) {
                      this.props.setLoginStatus(false)
                      // this.props.navigation.navigate('AppLoading')
                    }
                  })
                }, 100)
              } else {
                $Toast.fail(res.message || '网络异常，请稍后重试')
                this.setState(prevState => ({
                  ispwdLoading: false,
                  pwdForm: {
                    oldPwd: '',
                    newPwd: '',
                    rePwd: ''
                  }
                }))
              }
            })
            break
          case 'paypwd':
            modifyPayPwd({ oldPwd, newPwd, rePwd }).then(res => {
              if (res.code === 0) {
                $Toast.success(res.message || '修改成功')
                this.props.AsetUserSecureLevel()
                this.props.setPasswordRule()
                this.setState(prevState => ({
                  ispwdLoading: false,
                  pwdvisible: false,
                  pwdType: '',
                  pwdForm: {
                    oldPwd: '',
                    newPwd: '',
                    rePwd: ''
                  }
                }))
              } else {
                $Toast.fail(res.message || '网络异常，请稍后重试')
                this.setState(prevState => ({
                  ispwdLoading: false,
                  pwdForm: {
                    oldPwd: '',
                    newPwd: '',
                    rePwd: ''
                  }
                }))
              }
            })
            break
        }
      })
    } else {
      this.setState({
        ispwdLoading: true
      }, () => {
        savePayPwd({newPwd, rePwd}).then(res => {
          if (res.code === 0) {
            this.props.AsetUserSecureLevel()
            this.props.setPasswordRule()
            $Toast.success('绑定成功')
            this.setState(prevState => ({
              ispwdLoading: false,
              pwdvisible: false,
              pwdType: '',
              pwdForm: {
                oldPwd: '',
                newPwd: '',
                rePwd: ''
              }
            }))
            // setTimeout(() => {
            // }, 4000)
          } else {
            $Toast.fail(res.message || '网络异常，请稍后重试')
            this.setState(prevState => ({
              ispwdLoading: false,
              pwdForm: {
                oldPwd: '',
                newPwd: '',
                rePwd: ''
              }
            }))
          }
        })
      })
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
      $Toast.success('刷新成功！')
      this.setState({refreshing: false})
    }, 1000)
  }

  openCodeFun = (value, {lotterNumber}) => {
    if (!value) {
      return <View style={styles.hotItemRight}>
        <Flex wrap="wrap">
          <Text>暂无开奖球数据！</Text>
        </Flex>
      </View>
    }
    let codeList = value.split(',')
    return <View style={styles.hotItemRight}>
      <Flex wrap="wrap">
        {
          codeList.map((v, i) =>
            <Button
              key={`${i}-${v}`}
              type="primary" size="small"
              style={styles['lotBall' + (lotterNumber || 5)]}>
              <Text style={styles['lotBallTxt' + (lotterNumber || 5)]}>{v}</Text>
            </Button>
          )
        }
      </Flex>
    </View>
  }

  render() {
    let {usualLottery, systemNews, userSecurityLevel} = this.props
    let {hotLoList, pwdForm: { oldPwd, newPwd, rePwd }, pwdType, pwdvisible, ispwdLoading, messgae} = this.state
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
          dots={false}
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
        >
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
          <NoticeBar
            style={styles.noticeWrap}
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
          dotActiveStyle={{backgroundColor: '#00b4cc'}}
          afterChange={this.onHorizontalSelectedIndexChange}
        >
          {
            hotLoList.length > 0 && hotLoList.map((item, index) => {
                return (
                  <View style={styles.hotItem} key={index}>
                    <Flex onPress={() => this.props.navigation.navigate('Bet', item)}>
                      <View>
                        <Image source={getIconName(item.realCategory)} resizeMode={'contain'}
                               style={styles.hotItemImg}/>
                      </View>
                      <View style={styles.hotItemCenter}>
                        <Text style={styles.hotItemTitle}>{item.lotterName}</Text>
                        {
                          item.openIssue && <Text style={styles.hotItemText}>{item.openIssue}期</Text>
                        }
                      </View>
                      {
                        this.openCodeFun(item.openCode, item)
                      }
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
            <View>
              <Flex>
                <Image source={require('./../../assets/images/home/collect.png')} style={styles.favoriteIcon}
                       resizeMode={'contain'}/>
                <Text style={styles.favoriteHeadText}>我的喜爱</Text>
              </Flex>
            </View>
            <TouchableHighlight
              style={styles.favoriteHeadR}
              underlayColor={'#ffffff'}
              onPress={() => this.props.navigation.navigate('CustomizeGames')}>
              <Icon name={'right'} color={'#00b4cc'}/>
            </TouchableHighlight>
          </Flex>
        </View>

        <ScrollView
          style={{backgroundColor: '#ffffff'}}
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
          {
            usualLottery.length === 0 && <Text style={styles.nullData}>数据加载中···</Text>
          }
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
        {
          pwdvisible &&
          <Modal
            popup
            maskClosable={false}
            closable={false}
            visible={pwdvisible}
            onClose={() => {
              this.setState({
                pwdvisible: false
              })
            }}
          >
            <View style={{width: '100%', paddingTop: 20}}>
              <Text style={{textAlign: 'center', lineHeight: 26, color: '#333', fontSize: 18}}>{pwdType === 'login' ? '请您修改登录密码' : '请您修改资金密码'}</Text>
              <List style={{width: '100%'}}>
                <List.Item>
                  <Text>{messgae}</Text>
                </List.Item>
                {
                  (pwdType === 'login' || userSecurityLevel.isTradePassword) &&
                  <InputItem
                    type="password"
                    value={oldPwd}
                    autoFocus={true}
                    style={{width: 250, color: '#666'}}
                    onChange={v => this.setState(prevState => ({
                      pwdForm: {...prevState.pwdForm, oldPwd: v}
                    }))}
                    placeholder="请输入当前密码"
                    labelNumber={5}
                  >
                    当前密码
                  </InputItem>
                }
                <InputItem
                  type="password"
                  value={newPwd}
                  onChange={v => this.setState(prevState => ({
                    pwdForm: {...prevState.pwdForm, newPwd: v}
                  }))}
                  style={{width: 250, color: '#666'}}
                  placeholder="请输入新密码"
                  labelNumber={5}
                >
                  新密码
                </InputItem>
                <InputItem
                  type="password"
                  value={rePwd}
                  onChange={v => this.setState(prevState => ({
                    pwdForm: {...prevState.pwdForm, rePwd: v}
                  }))}
                  style={{width: 250, color: '#666'}}
                  placeholder="请确认新密码"
                  labelNumber={5}
                >
                  确认新密码
                </InputItem>
              </List>
            </View>
            <Button type="primary" style={{width: '70%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, height: 40, marginTop: 20}}
              loading={ispwdLoading} onPress={() => this.submitFunc()}>
              <Text>确认</Text>
            </Button>
          </Modal>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let {usualLottery, systemNews, userId, passwordRule, userSecurityLevel} = state.common
  return ({
    systemNews,
    usualLottery,
    userId,
    passwordRule,
    userSecurityLevel
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
    AgetRecharge: () => {
      dispatch(AgetRecharge())
    },
    setPasswordRule: () => {
      dispatch(setPasswordRule())
    },
    AsetDayWagePower: () => dispatch(AsetDayWagePower()),
    AsetDividendPower: () => dispatch(AsetDividendPower()),
    AsetFreshMsg: () => {
      dispatch(AsetFreshMsg())
    },
    AcheckEnvironment: () => dispatch(checkEnvironment()),
    AsetUserBankCards: data => dispatch(AsetUserBankCards(data)),
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) },
    AsetUserSecureConfig: (data) => { dispatch(AsetUserSecureConfig(data)) },
    setLoginStatus: (data) => { dispatch(setLoginStatus(data)) }
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
    // backgroundColor: '#fff'
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginTop: 3
  },
  hotItem: {
    height: 88,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eaeaea',
    paddingHorizontal: 0,
    borderRadius: 6,
    justifyContent: 'center'
  },
  hotItemImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff'
  },
  hotItemCenter: {
    marginLeft: 0
  },
  hotItemTitle: {
    fontSize: 14
  },
  hotItemText: {
    fontSize: 12,
    color: '#787878',
    paddingBottom: 5
  },
  hotItemRightTenBall: {
    maxWidth: 130,
    marginLeft: 10
  },
  hotItemRight: {
    width: 200,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 2, flexWrap: 'wrap',
    paddingLeft: 2
  },
  hotItemBall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#00b4cc'
  },
  hotItemSmallBall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#00b4cc'
  },
  hotItemMidBall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 3,
    marginBottom: 3,
    backgroundColor: '#00b4cc'
  },
  hotItemLgText: {
    height: 24,
    width: 24,
    lineHeight: 24,
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  hotItemMidText: {
    height: 20,
    width: 20,
    lineHeight: 20,
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  hotItemSmallText: {
    height: 14,
    width: 14,
    lineHeight: 14,
    fontSize: 10,
    textAlign: 'center',
    color: 'white'
  },
  lotBall3: {
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 4,
    marginRight: 6
  },
  lotBall5: {
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 4
  },
  lotBall10: {
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 4,
    marginBottom: 2
  },
  lotBall20: {
    padding: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 1,
    marginBottom: 1
  },
  lotBallTxt3: {
    fontSize: 14
  },
  lotBallTxt5: {
    fontSize: 14
  },
  lotBallTxt10: {
    fontSize: 12
  },
  lotBallTxt20: {
    fontSize: 10
  },
  carouselImg: {
    width: '100%'
  },
  noticeWrap: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  NoticeBar: {
    fontSize: 12,
    color: '#000'
  },
  favoriteHead: {
    paddingLeft: 10,
    paddingRight: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#ffffff'
  },
  favoriteIcon: {
    width: 16,
    marginRight: 5
  },
  favoriteHeadText: {
    height: 30,
    lineHeight: 30,
    fontSize: 14
  },
  favoriteHeadR: {},
  favoriteHeadTextR: {
    height: 30,
    lineHeight: 30,
    fontSize: 14,
    textAlign: 'center',
    color: '#00b4cc'
  },
  favoriteItem: {
    width: '50%',
    height: 60,
    backgroundColor: '#fff'
  },
  favoriteItemImg: {
    width: 65,
    height: 65,
    marginLeft: 10
  },
  favoriteItemCenter: {},
  favoriteItemTitle: {
    width: 90,
    fontSize: 14
  },
  favoriteItemText: {
    fontSize: 12,
    color: '#00b4cc'
  },
  gameItem: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 50,
    backgroundColor: '#ffffff'
  },
  nullData: {
    paddingVertical: 40,
    textAlign: 'center',
    color: '#666666'
  }
}))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
