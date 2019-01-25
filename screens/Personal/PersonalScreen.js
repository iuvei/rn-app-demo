import React from 'react'
import {Image, ScrollView, View, Text, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native'
import {Button, Flex, Modal, Toast, Grid} from '@ant-design/react-native'
import {Tab, Tabs, Header} from 'native-base'
import {connect} from 'react-redux'
// import RebateDetails from './RebateDetails'
// import {setLoginStatus} from "../../actions/common"
import Headers from './../../components/Header'
import { AsetAllBalance } from "../../actions/member"
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
        <Text style={styleUtil({fontSize: 16, color: '#fff'})}>
          <Text onPress={() => params.openKefu()}>  客服   </Text>
        </Text>
      }
      rightContent={
        <Text style={styleUtil({fontSize: 16, color: '#fff'})}>
          <Text onPress={() => params.changeTextFun('Broadcast')} style={styleUtil({paddingHorizontal: 16})}>公告  </Text>
          <Text onPress={() => params.changeTextFun('Mailbox')} style={styleUtil({paddingHorizontal: 16})}>信箱</Text>
        </Text>
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
          src: require('../../assets/images/personal/tbl1.png')
        },
        {
          name: '开户中心',
          path: 'OpenCenter',
          src: require('../../assets/images/personal/tbl2.png')
        },
        {
          name: '团队报表',
          path: 'TeamReport',
          src: require('../../assets/images/personal/tbl3.png')
        },
        {
          name: '会员管理',
          path: 'MemberManage',
          src: require('../../assets/images/personal/tbl4.png')
        },
        {
          name: '账变记录',
          path: 'TeamAccountHistory',
          src: require('../../assets/images/personal/tbl5.png')
        },
        {
          name: '彩种报表',
          path: 'TeamLotteryReport',
          src: require('../../assets/images/personal/tbl6.png')
        },
        {
          name: '游戏记录',
          path: 'TeamBetHistory',
          src: require('../../assets/images/personal/tbl7.png')
        },
        // {
        //   name: '追号记录',
        //   path: 'TeamChaseHistory',
        //   src: require('../../assets/images/personal/tbl10.png')
        // },
        {
          name: '存取款记录',
          path: 'TeamWithdrawHistory',
          src: require('../../assets/images/personal/tbl8.png')
        },
        {
          name: '百家乐报表',
          path: 'TeamBaccaratReport',
          src: require('../../assets/images/personal/tbl9.png')
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
      lotteryRebate: 0
    }
    props.AsetAllBalance()
  }

  changeTextFun = (val) => {
    this.props.navigation.navigate(val)
  }

  openKefu = async () => {
    let { serviceUrl } = this.props
    let result = await WebBrowser.openBrowserAsync(serviceUrl.url)
    console.log(result)
  }

  componentDidMount () {
    this.props.AsetServiceUrl()
    this.props.navigation.setParams({changeTextFun: this.changeTextFun, openKefu: this.openKefu})
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
        src: require('../../assets/images/personal/icon1.png')
      },
      {
        name: '提现',
        path: 'Withdrawal',
        src: require('../../assets/images/personal/icon2.png')
      },
      {
        name: '转账',
        path: 'TransferScreen',
        src: require('../../assets/images/personal/icon3.png')
      },
      {
        name: '公告',
        path: 'Broadcast',
        src: require('../../assets/images/personal/icon4.png')
      },
      {
        name: '设置',
        path: 'SettingsScreen',
        src: require('../../assets/images/personal/icon5.png')
      }
    ]
    let {agent, order, lotteryRebate} = this.state
    let {loginInfo, balanceInfo, userBalanceInfoFD, userBalanceInfoYE} = this.props
    let {canWithdrawBalance, currentBalance} = balanceInfo.ye || {}
    let {currentBalance: fdBalance} = balanceInfo.fd || {}
    return (
      <View style={styles.container}>
        <ImageBackground resizeMode='cover' source={require('../../assets/images/personal/bg0.png')}
                         style={styleUtil({height: 200})}>
          <View>
            <View style={styleUtil({flexDirection: 'row', justifyContent: 'space-around', height: 90, alignItems: 'center'})}>
              <Image source={require('../../assets/images/personal/avatar.png')}
                     style={styleUtil({width: 80, height: 80})}></Image>
              <View>
                <Text>{loginInfo.acc.user.loginName}</Text>
                <Text>余额： {userBalanceInfoYE.currentBalance}元</Text>
              </View>
              <View style={styleUtil({alignItems: 'flex-end'})}>
                <Button style={styleUtil({height: 32, backgroundColor: '#0f81de', borderRadius: 15})}>
                  <Text style={styleUtil({color: 'white', fontSize: 14})}>彩票返点:{lotteryRebate}</Text>
                </Button>
                <Text onPress={() => this.changeRoute('RebateDetails')}>更多返点></Text>
              </View>
            </View>
            <View style={styleUtil({
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 55,
              borderBottomWidth: 1,
              borderBottomColor: '#0c7edb'
            })}>
              <View style={styleUtil({width: 200, borderRightWidth: 1, borderRightColor: '#0c7edb', alignItems: 'center'})}>
                <Text>{userBalanceInfoYE.canWithdrawBalance}元</Text>
                <Text>可提金额</Text>
              </View>
              <View style={styleUtil({width: 200, alignItems: 'center'})}>
                <Text>{userBalanceInfoFD.currentBalance}元</Text>
                <Text>返点金额</Text>
              </View>
            </View>
            <View style={styleUtil({flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 55})}>
              {
                list.map((item, index) => {
                  return (
                    <TouchableHighlight key={index} onPress={() => this.changeRoute(item.path)}>
                      <View key={index} style={styleUtil({height: 45})}>
                        <Image resizeMode='contain' source={item.src} style={styleUtil({width: 28, height: 26})}></Image>
                        <Text style={{color: '#0c7edb'}}>{item.name}</Text>
                      </View>
                    </TouchableHighlight>
                  )
                })
              }
            </View>
          </View>
        </ImageBackground>
        <View style={{flex: 1}}>
          <Tabs tabStyle={{color: '#0070cc'}} activeTabStyle={{backgroundColor: '#eff5fb'}}>
            <Tab heading={'订单报表'}>
              <ScrollView style={styles.agent}>
                <Grid data={order} columnNum={4} hasLine={false} renderItem={(el, index) => {
                  return (
                    <View style={styleUtil({alignItems: 'center', width: 90})}>
                      <Image source={el.src} style={styleUtil({width: 50, height: 50})}></Image>
                      <Text>{el.name}</Text>
                    </View>
                  )
                }} onPress={(el) => this.changeRoute(el.path)} />
              </ScrollView>
            </Tab>
            <Tab heading={'代理管理'}>
              <ScrollView style={styles.agent}>
                <Grid data={agent} columnNum={4} hasLine={false} renderItem={(el, index) => {
                  return (
                    <View style={styleUtil({alignItems: 'center', width: 90})}>
                      <Image source={el.src} style={styleUtil({width: 50, height: 50})}></Image>
                      <Text>{el.name}</Text>
                    </View>
                  )
                }} onPress={(el) => this.changeRoute(el.path)} />
              </ScrollView>
            </Tab>
          </Tabs>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(stylesUtil({
  container: {
    flex: 1,
  },
  agent: {
    padding: 10
  }
}))

const mapStateToProps = (state) => {
  let {rebateInfo, loginInfo, balanceInfo, serviceUrl} = state.common
  let {userBalanceInfoYE, userBalanceInfoFD} = state.member
  return ({
    rebateInfo,
    loginInfo,
    balanceInfo,
    userBalanceInfoYE,
    userBalanceInfoFD,
    serviceUrl
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetAllBalance: data => dispatch(AsetAllBalance(data)),
    AsetServiceUrl: data => dispatch(AsetServiceUrl(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalScreen)
