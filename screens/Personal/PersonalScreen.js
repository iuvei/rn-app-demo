import React from 'react'
import {Image, ScrollView, View, Text, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native'
import {Button, Flex, Grid, Tabs} from '@ant-design/react-native'
import {connect} from 'react-redux'
// import RebateDetails from './RebateDetails'
// import {setLoginStatus} from "../../actions/common"
import Headers from './../../components/Header'
import { AsetAllBalance, AsetFreshMsg } from "../../actions/member"
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
            params && params.freshMsg > 0 && <View style={styles.navBarTip}><Text onPress={() => params.changeTextFun('Mailbox')} style={styles.navBarTipText}>{params.freshMsg > 99 ? 99 : params.freshMsg}</Text></View>
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
      lotteryRebate: 0,
      page: 0
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

  updateImmediateData = async () => {
    let result = await this.props.AsetFreshMsg()
    this.props.navigation.setParams({changeTextFun: this.changeTextFun, openKefu: this.openKefu, freshMsg: this.props.freshMsg})
  }

  componentDidMount () {
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
    let {loginInfo, userBalanceInfoFD, userBalanceInfoYE} = this.props
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
          <Tabs
            tabs={[
              {title: '订单报表'},
              {title: '代理管理'}
            ]}
            page={this.state.page}
            renderTabBar={() => {
            return <Flex style={styleUtil({marginTop: 16, marginBottom: 10, width: 260, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#6d96f7', height: 32, borderWidth: 1, borderColor: '#6d96f7', borderRadius: 17})}>
              <Flex.Item><TouchableHighlight onPress={() => this.setState({page: 0})}>
                  <View style={{backgroundColor: this.state.page === 0 ? '#fff' : '#6d96f7', borderRadius: 17, height: 32}}>
                    <Text style={styleUtil({textAlign: 'center', color: this.state.page === 0 ? '#6d96f7' : '#fff', lineHeight: 32})}>订单报表</Text></View>
                </TouchableHighlight>
              </Flex.Item>
              <Flex.Item><TouchableHighlight onPress={() => this.setState({page: 1})}>
                <View style={{backgroundColor: this.state.page === 1 ? '#fff' : '#6d96f7', borderRadius: 17, height: 32}}>
                  <Text style={styleUtil({textAlign: 'center', color: this.state.page === 1 ? '#6d96f7' : '#fff', lineHeight: 32})}>代理管理</Text></View>
                </TouchableHighlight>
              </Flex.Item>
            </Flex>
          }}>
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
            {
              loginInfo.proxy === 1 &&
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
    width: 16,
    height: 14,
    backgroundColor: 'red',
    borderRadius: 8,
    right: -5,
    top: -5
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
  let {userBalanceInfoYE, userBalanceInfoFD, freshMsg} = state.member
  return ({
    rebateInfo,
    loginInfo,
    balanceInfo,
    userBalanceInfoYE,
    userBalanceInfoFD,
    serviceUrl,
    freshMsg
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetAllBalance: data => dispatch(AsetAllBalance(data)),
    AsetServiceUrl: data => dispatch(AsetServiceUrl(data)),
    AsetFreshMsg: () => dispatch(AsetFreshMsg())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalScreen)
