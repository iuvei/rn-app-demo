import React from 'react'
import {Image, ScrollView, View, Text, StyleSheet, ImageBackground, TouchableHighlight, StatusBar, Platform} from 'react-native'
import {Button, Flex, Grid, Tabs} from '@ant-design/react-native'
import {connect} from 'react-redux'
// import RebateDetails from './RebateDetails'
// import {setLoginStatus} from "../../actions/common"
import Headers from './../../components/Header'
import { AsetAllBalance, AsetFreshMsg, AsetMyDaywageRule, AsetMyDividendRule } from "../../actions/member"
import { WebBrowser } from 'expo'
import { AsetServiceUrl } from '../../actions/common'
import { styleUtil, stylesUtil } from '../../utils/ScreenUtil'

const REBATE_TYPE = {
  0: '彩票返点', 1: '快乐彩返点', 2: '百家乐彩票返点'
}

const WATER_TYPE = {
  0: '彩票返水',
  1: '快乐彩返水',
  2: '百家乐真人返水',
  3: '百家乐体育返水',
  4: '百家乐电子返水',
  5: '百家乐彩票返水'
}

class PersonalScreen extends React.Component {

  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state
    return {
      header: <Headers
      title={'个人中心'}
      leftContent={
        <Text style={styles.leftText}>
          <Text onPress={() => params.openKefu()}>  客服    </Text>
        </Text>
      }
      rightContent={
        <View>
          <Text style={styles.navBarRight}>
            <Text onPress={() => params.changeTextFun('Broadcast')} style={styles.navBarRightItem}>公告  </Text>
            <Text onPress={() => params.changeTextFun('Mailbox')} style={styles.navBarRightItem}>信箱</Text>
          </Text>
          {
            params && params.freshMsg > 0 && <Button type="primary" size="small" style={styles.navBarTip}><Text onPress={() => params.changeTextFun('Mailbox')} style={styles.navBarTipText}>{params.freshMsg > 99 ? 99 : params.freshMsg}</Text></Button>
          }
        </View>
      }
    />
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      agent: [
        {
          name: '代理首页',
          path: 'AgentIndex',
          condition: true,
          src: require('../../assets/images/personal/tbl1.png')
        },
        {
          name: '开户中心',
          path: 'OpenCenter',
          condition: true,
          src: require('../../assets/images/personal/tbl2.png')
        },
        {
          name: '团队报表',
          path: 'TeamReport',
          condition: true,
          src: require('../../assets/images/personal/tbl3.png')
        },
        {
          name: '会员管理',
          path: 'MemberManage',
          condition: true,
          src: require('../../assets/images/personal/tbl4.png')
        },
        {
          name: '账变记录',
          path: 'TeamAccountHistory',
          condition: true,
          src: require('../../assets/images/personal/tbl5.png')
        },
        {
          name: '彩种报表',
          path: 'TeamLotteryReport',
          condition: true,
          src: require('../../assets/images/personal/tbl6.png')
        },
        {
          name: '游戏记录',
          path: 'TeamBetHistory',
          condition: true,
          src: require('../../assets/images/personal/tbl7.png')
        },
        // {
        //   name: '追号记录',
        //   path: 'TeamChaseHistory',
        //   condition: true,
        //   src: require('../../assets/images/personal/tbl10.png')
        // },
        {
          name: '存取款记录',
          path: 'TeamWithdrawHistory',
          condition: true,
          src: require('../../assets/images/personal/tbl8.png')
        },
        {
          name: '百家乐报表',
          path: 'TeamBaccaratReport',
          condition: true,
          src: require('../../assets/images/personal/tbl9.png')
        },
        {
          name: '契约工资',
          path: 'ContractDaywage',
          condition: props.daywagePower,
          src: require('../../assets/images/personal/tbl1.png')
        },
        {
          name: '契约分红',
          path: 'ContractDividend',
          condition: props.dividendPower,
          src: require('../../assets/images/personal/tbl2.png')
        }
      ],
      order: [
        {
          name: '游戏记录',
          path: 'BetHistory',
          src: require('../../assets/images/personal/tbl1.png')
        },
        {
          name: '追号记录',
          path: 'ChaseHistory',
          src: require('../../assets/images/personal/tbl2.png')
        },
        {
          name: '个人彩票报表',
          path: 'LotteryReport',
          src: require('../../assets/images/personal/tbl3.png')
        },
        {
          name: '存取款记录',
          path: 'WithdrawHistory',
          src: require('../../assets/images/personal/tbl4.png')
        },
        {
          name: '个人账变记录',
          path: 'AccountChangeHistory',
          src: require('../../assets/images/personal/tbl5.png')
        },
        {
          name: '返点记录',
          path: 'RebateHistory',
          src: require('../../assets/images/personal/tbl6.png')
        },
        {
          name: '百家乐报表',
          path: 'BaccaratReport',
          src: require('../../assets/images/personal/tbl7.png')
        },
        {
          name: '转账报表',
          path: 'TransferHistory',
          src: require('../../assets/images/personal/tbl1.png')
        },
        {
          name: '百家乐转账',
          path: 'BaccaratTransfer',
          src: require('../../assets/images/personal/tbl2.png')
        },
        {
          name: '活动记录',
          path: 'ActivityHistory',
          src: require('../../assets/images/personal/tbl3.png')
        }
      ],
      lotteryRebate: 0,
      page: 0
    }
    props.AsetAllBalance()
    props.AsetMyDaywageRule()
    props.AsetMyDividendRule()
  }

  changeTextFun = (val) => {
    this.props.navigation.navigate(val)
  }

  openKefu = async () => {
    let { serviceUrl } = this.props
    let result = await WebBrowser.openBrowserAsync(serviceUrl.url)
    console.log(result)
  }

  updateImmediateData = async () => {
    let result = await this.props.AsetFreshMsg()
    this.props.navigation.setParams({changeTextFun: this.changeTextFun, openKefu: this.openKefu, freshMsg: this.props.freshMsg})
  }

  componentDidMount () {
    // this._navListener = this.props.navigation.addListener('didFocus', () => {
    //   StatusBar.setTranslucent(false);
    //   (Platform.OS === 'android') && StatusBar.setBackgroundColor('red');
    // });
    this.props.AsetServiceUrl()
    this.updateImmediateData()
    let {userRebateVO} = this.props.rebateInfo
    let lotteryRebate = 0
    userRebateVO?.forEach(item => {
      if (item.rebateType === 0) {
        lotteryRebate = item.userRebate
      }
    })
    this.setState({
      lotteryRebate
    })
  }

  componentWillReceiveProps(nextProps) {
    let {freshMsg} = this.props
    if (freshMsg !== nextProps.freshMsg) {
      this.props.navigation.setParams({changeTextFun: this.changeTextFun, openKefu: this.openKefu, freshMsg: nextProps.freshMsg})
    }
  }

  componentWillUnmount(){
    // this._navListener.remove();
    this.setState = () => () => {}
  }

  changeRoute = (path) => {
    if (path) {
      this.props.navigation.navigate(path)
    }
  }

  render () {
    let list = [
      {
        name: '充值',
        path: 'Recharge',
        src: require('../../assets/images/personal/cunkuan.png')
      },
      {
        name: '提现',
        path: 'Withdrawal',
        src: require('../../assets/images/personal/tikuan.png')
      },
      {
        name: '转账',
        path: 'TransferScreen',
        src: require('../../assets/images/personal/zhuanzhang.png')
      },
      // {
      //   name: '公告',
      //   path: 'Broadcast',
      //   src: require('../../assets/images/personal/icon4.png')
      // },
      {
        name: '设置',
        path: 'SettingsScreen',
        src: require('../../assets/images/personal/icon5.png')
      }
    ]
    let {agent, order, lotteryRebate} = this.state
    let {loginInfo, userBalanceInfoFD, userBalanceInfoYE} = this.props
    return (
      <View style={styles.container}>
        <ImageBackground resizeMode="stretch" source={require('../../assets/images/personal/bg0.png')}
                         style={styleUtil({height: 200})}>
          <View>
            <View style={styleUtil({flexDirection: 'row', justifyContent: 'space-around', height: 90, alignItems: 'center'})}>
              <Flex>
                <Image source={require('../../assets/images/personal/avatar.png')}
                      style={styleUtil({width: 55, height: 55})}></Image>
                <View style={styleUtil({paddingLeft: 14})}>
                  <Text style={styleUtil({color: '#fff', fontSize: 14})}>{loginInfo.acc.user.loginName}</Text>
                  <Text style={styleUtil({color: '#fff', fontSize: 14})}>余额： {Number(userBalanceInfoYE.currentBalance).toFixed(2)}元</Text>
                </View>
              </Flex>
              <View style={styleUtil({alignItems: 'flex-end'})}>
                {/* <Button style={styleUtil({height: 28, backgroundColor: '#fff', borderRadius: 15})}> */}
                  <Text style={styleUtil({color: '#fff', fontSize: 14})}>彩票返点：{lotteryRebate}</Text>
                {/* </Button> */}
                <Text style={styleUtil({color: '#fff', fontSize: 12})} onPress={() => this.changeRoute('RebateDetails')}>更多返点></Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styleUtil({
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: -105,
          backgroundColor: '#fff',
          borderRadius: 8,
          // borderColor: '#f3f3f3',
        })}>
          <View style={styleUtil({
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 55,
            borderBottomWidth: 1,
            borderBottomColor: '#f3f3f3'
          })}>
            <View style={styleUtil({width: '50%', borderRightWidth: 1, borderRightColor: '#f3f3f3', alignItems: 'center'})}>
              <Text style={styleUtil({color: '#333', fontSize: 14})}>{Number(userBalanceInfoYE.canWithdrawBalance).toFixed(2)}元</Text>
              <Text style={styleUtil({color: '#333', fontSize: 14})}>可提金额</Text>
            </View>
            <View style={styleUtil({width: '50%', alignItems: 'center'})}>
              <Text style={styleUtil({color: '#333', fontSize: 14})}>{Number(userBalanceInfoFD.currentBalance).toFixed(2)}元</Text>
              <Text style={styleUtil({color: '#333', fontSize: 14})}>返点金额</Text>
            </View>
          </View>
          <Flex justify="around" align="center" style={styleUtil({height: 55})}  wrap="wrap">
            {
              list.map((item, index) => {
                return (
                  <TouchableHighlight key={index} onPress={() => this.changeRoute(item.path)}>
                    <View key={index} style={styleUtil({height: 45})}>
                      <Image resizeMode='contain' source={item.src} style={styleUtil({width: 28, height: 26})}></Image>
                      <Text style={{color: '#000'}}>{item.name}</Text>
                    </View>
                  </TouchableHighlight>
                )
              })
            }
          </Flex>
        </View>
        <View style={{flex: 1}}>
          <Tabs
            tabs={[
              {title: '订单报表', index: 0},
              {title: '代理管理', index: 1}
            ]}
            page={this.state.page}
            onChange={(t) => {
              this.setState({
                page: t.index
              })
            }}
            renderTabBar={() => {
            return <Flex style={styleUtil({marginTop: 25, marginBottom: 10, width: 260, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#00bbcc', padding: 1, borderRadius: 18})}>
              <Flex.Item><TouchableHighlight onPress={() => this.setState({page: 0})} style={{borderRadius: 18}}>
                  <View style={styleUtil({backgroundColor: this.state.page === 0 ? '#fff' : '#00bbcc', borderRadius: 17, height: 34})}>
                    <Text style={styleUtil({textAlign: 'center', color: this.state.page === 0 ? '#00bbcc' : '#fff', lineHeight: 34})}>订单报表</Text></View>
                </TouchableHighlight>
              </Flex.Item>
              {
                loginInfo.proxy === 1 &&
                <Flex.Item><TouchableHighlight onPress={() => this.setState({page: 1})}  style={{borderRadius: 18}}>
                  <View style={styleUtil({backgroundColor: this.state.page === 1 ? '#fff' : '#00bbcc', borderRadius: 17, height: 34})}>
                    <Text style={styleUtil({textAlign: 'center', color: this.state.page === 1 ? '#00bbcc' : '#fff', lineHeight: 34})}>代理管理</Text></View>
                  </TouchableHighlight>
                </Flex.Item>
              }
            </Flex>
          }}>
              <ScrollView style={styles.agent}>
                <Grid data={order} columnNum={4} hasLine={false} renderItem={(el, index) => {
                  return (
                    <View style={styleUtil({alignItems: 'center', width: 90})}>
                      <Image source={el.src} style={styleUtil({width: 50, height: 50, marginBottom: 5})}></Image>
                      <Text>{el.name}</Text>
                    </View>
                  )
                }} onPress={(el) => this.changeRoute(el.path)} />
              </ScrollView>
            {
              loginInfo.proxy === 1 &&
              <ScrollView style={styles.agent}>
                <Grid data={agent} columnNum={4} hasLine={false} renderItem={(el, index) => {
                  return (
                    el.condition && <View style={styleUtil({alignItems: 'center', width: 90})}>
                      <Image source={el.src} style={styleUtil({width: 50, height: 50, marginBottom: 5})}></Image>
                      <Text>{el.name}</Text>
                    </View>
                  )
                }} onPress={(el) => this.changeRoute(el.path)} />
              </ScrollView>
            }
          </Tabs>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(stylesUtil({
  navBarRight: {fontSize: 16, color: '#fff'},
  navBarRightItem: {paddingHorizontal: 16},
  leftText: {fontSize: 16, color: '#fff'},
  navBarTip: {
    position: 'absolute',
    padding: 0,
    width: 22,
    height: 22,
    borderWidth: 0,
    backgroundColor: 'red',
    borderRadius: 11,
    right: -5,
    top: -8
  },
  navBarTipText: {color: 'white', fontSize: 10, textAlign: 'center'},
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  agent: {
    padding: 10,
    flex: 1
  }
}))

const mapStateToProps = (state) => {
  let {rebateInfo, loginInfo, balanceInfo, serviceUrl} = state.common
  let {userBalanceInfoYE, userBalanceInfoFD, freshMsg, daywagePower, dividendPower} = state.member
  return ({
    rebateInfo,
    loginInfo,
    balanceInfo,
    userBalanceInfoYE,
    userBalanceInfoFD,
    serviceUrl,
    freshMsg,
    dividendPower,
    daywagePower
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetAllBalance: data => dispatch(AsetAllBalance(data)),
    AsetServiceUrl: data => dispatch(AsetServiceUrl(data)),
    AsetMyDaywageRule: () => dispatch(AsetMyDaywageRule()),
    AsetMyDividendRule: () => dispatch(AsetMyDividendRule()),
    AsetFreshMsg: () => dispatch(AsetFreshMsg())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalScreen)
