import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, Platform, AsyncStorage, ScrollView } from 'react-native'
import { Button, Tabs, Toast } from '@ant-design/react-native' // , Radio
import { commitRecharge } from '../../api/member'
import { AsetUserSecureLevel, setActiveAccount } from '../../actions/common'
import Header from '../../components/Header'
import {platformKey, prependUrl} from '../../api.config'
import { stylesUtil, styleUtil } from '../../utils/ScreenUtil'
import InputAmount from './InputAmount'
import RechargeTutorial from './RechargeTutorial'
import VirtualAccounts from './VirtualAccounts'
import RealAccounts from './RealAccounts'
import ActiveAccountbar from './ActiveAccountbar'


class RechargeScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header
        navigation={navigation}
        hideLeft={true}/>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      activeTabIndex: 0,
      minRechargeMoney: 50,
      isLoading: false,
      returnUrl: 'https://www.baidu.com',
      channelType: Platform.OS,
      isQuick: 'N',
      rechargeTime: 0,
      visibleReal: 0,
      visibleVirtual: 0
    }
    props.AsetUserSecureLevel()
  }

  componentDidMount() {
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.activeAccount.local_id !== this.props.activeAccount.local_id) {
      return false
    }
    return true
  }

  // 处理step步骤
  handleStepNum = () => {
    this.currentIndex = 0
    if (this.userBankCards.length === 0) {
      this.userSecurityLevel.isBindCard = false
    } else {
      this.userSecurityLevel.isBindCard = true
    }
    this.userSecurityLevel.rechargeBankName = this.userSecurityLevel.rechargeBank
    let cidx = 0
    this.stepsIdxs = []
    for (let i = 0; i < this.stepsarr.length; i++) {
      if (this.userSecurityLevel[this.stepsarr[i]]) {
        this.stepsobj[this.stepsarr[i]] = {index: cidx++, value: this.userSecurityLevel[this.stepsItem[i]]}
        this.stepsIdxs.push(this.stepsItem[i])
      }
    }
    for (let idx of this.stepsIdxs) {
      if (!this.userSecurityLevel[idx]) {
        break
      }
      this.currentIndex++
    }
  }

  /**
   * 提交充值
   */
  submitFunc = async () => {
    let {minRechargeMoney, returnUrl, channelType, isQuick} = this.state
    let {activeAccount} = this.props
    let rechargeMoney = await AsyncStorage.getItem('RechargeMoney')
    let {amount, orderAmount, rechargeFee} = JSON.parse(rechargeMoney || JSON.stringify({
      amount: '',
      orderAmount: '',
      rechargeFee: ''}))
    // if (!this.checkBindPay()) return
    let pattern = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/
    let msg = '请输入正确的充值金额，最多两位小数!'
    if (activeAccount.isFloat) {
      pattern = /^(([1-9]\d*)(\.\d[1-9]))$|(0\.\d[1-9])$/
      msg = '请输入正确的充值金额，必须是两位小数，且末尾不能是0!'
    }
    if (!pattern.test(Number(amount))) {
      Toast.info(msg, 1, undefined, false)
    } else {
      if (amount < minRechargeMoney) {
        Toast.info(`最小充值 ${minRechargeMoney} 元`, 1, undefined, false)
        return
      }
      this.setState({
        isLoading: true
      }, () => {
        let {bankCode, payChannelAlias, payChannelCode, coinCode} = activeAccount
        commitRecharge({bankCode, channelType, isQuick, orderAmount, payChannelAlias, payChannelCode, rechargeFee, returnUrl, amount, coinCode}).then((res) => {
          if (res.code === 0) {
            let tmprecinfo = Object.assign({}, res.data, {amount: amount})
            this.setState({
              // amount: '',
              isLoading: false,
              // orderAmount: '',
              // rechargeFee: ''
            })
            let qrCodeSrc = prependUrl + '/capital/capitalBase/queryQrCode?platformKey=' + platformKey + '&payChannelCode=' + activeAccount.payChannelCode + '&bankCode=' + activeAccount.bankCode + '&time=' + new Date().getTime()
            this.props.navigation.navigate('RechargeSuccess', {recinfo: tmprecinfo, qrCodeSrc: qrCodeSrc, bankCode: activeAccount.bankCode})
          } else {
            if (res.message.indexOf('}') !== -1) {
              Toast.info(JSON.parse(res.message).Message || '充值服务异常', 1, undefined, false)
            } else {
              Toast.info(res.message || '充值服务异常', 1, undefined, false)
            }
            this.setState({
              // amount: '',
              isLoading: false,
              // orderAmount: '',
              // rechargeFee: ''
            })
          }
          this.setState({
            rechargeTime: new Date().getTime()
          })
        })
      })
    }
  }

  channelTabsChange = (tab, index) => {
    this.setState({
      activeTabIndex: index,
      minRechargeMoney: index === 0 ? 50 : 100,
      rechargeTime: new Date().getTime()
    })
  }

  goSetTrade = () => {
    this.props.navigation.navigate('UpdatePwd', {title: '资金密码', type: 'paypwd'})
  }

  render() {
    let {activeAccount, userSecurityLevel, userBankInfo} = this.props
    let { activeTabIndex, minRechargeMoney, isLoading, visibleReal, visibleVirtual} = this.state

    if (!userSecurityLevel.isTradePassword && userSecurityLevel.rechargeTradpswd) {
      return (
        <View style={{backgroundColor: '#fff', paddingVertical: 25}}>
          <Text style={{color: '#333', textAlign: 'center'}}>暂未设置资金密码，请<Text onPress={this.goSetTrade} style={{color: '#f15a23', fontSize: 15}}>前往设置</Text></Text>
        </View>
      )
    }
    if (!userSecurityLevel.isBankUserName && userSecurityLevel.rechargeBankName) {
      return (
        <View style={{backgroundColor: '#fff', paddingVertical: 25}}>
          <Text style={{color: '#333', textAlign: 'center'}}>暂未绑定银行卡姓名，请<Text onPress={() => this.props.navigation.navigate('BindBankname')} style={{color: '#f15a23', fontSize: 15}}>前往设置</Text></Text>
        </View>
      )
    }
    if (userSecurityLevel.rechargeBank && userBankInfo.userBankCards.length === 0
    && userBankInfo.userBankCards.find(item=>item.status===0) === undefined) {
      return (
        <View style={{backgroundColor: '#fff', paddingVertical: 25}}>
          <Text style={{color: '#333', textAlign: 'center'}}>暂未绑定银行卡/银行卡审核中，请<Text onPress={() => this.props.navigation.navigate('BankManager')} style={{color: '#f15a23', fontSize: 15}}>前往设置</Text></Text>
        </View>
      )
    }

    let tabs = [
      { title: '人民币支付' },
      { title: '币宝数字货币支付' }
    ];
    let infoDesc = (
      <View>
        <View style={styleUtil({padding: 12, backgroundColor: '#f0f0f0'})}>
          <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单笔最低充值金额为 <Text style={{color: '#f15a23'}}>{minRechargeMoney}</Text> 元{activeAccount.signleLimit > 0 ? <Text>, 最高 <Text style={{color: '#f15a23'}}>{activeAccount.signleLimit}</Text> 元</Text> : null}</Text>
          {activeAccount.feeRate > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值手续费费率 <Text style={{color: '#f15a23'}}>{ activeAccount.feeRate || 0 }%</Text></Text> : null}
          {activeAccount.dayLimit > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单日最高 <Text style={{color: '#f15a23'}}>{ activeAccount.dayLimit }</Text> 元</Text> : null}
          <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值限时：请在 <Text style={{color: '#f15a23'}}>30</Text> 分钟内完成充值</Text>
          { Boolean(activeAccount.isFloat) && <Text style={{color: '#f15a23', lineHeight: 25, fontSize: 12}}>说明：充值金额必须是两位小数，且末尾不能是0</Text> }
        </View>
      </View>
    )

    // 金额输入框
    let inputArea = (
      <View>
        <InputAmount rechargeTime={this.state.rechargeTime}/>
        <View style={styleUtil({paddingLeft: 15, paddingTop: 30, paddingRight: 15})}>
          {
            activeTabIndex === 1 &&
            <RechargeTutorial/>
          }
          <Button type="primary" loading={isLoading} onPress={this.submitFunc} style={{marginTop: 15}}>下一步</Button>
        </View>
      </View>
    )

    return (
      <View style={styles.container}>
        <Tabs tabs={tabs} onChange={this.channelTabsChange}>
          <ScrollView>
            <ActiveAccountbar onpress={() => this.setState({visibleReal: new Date().getTime()})}/>
            <RealAccounts visible={visibleReal} activeTabIndex={!activeTabIndex}/>
            {inputArea}
            {infoDesc}
          </ScrollView>
          <ScrollView>
            <ActiveAccountbar onpress={() => this.setState({visibleVirtual: new Date().getTime()})}/>
            <VirtualAccounts visible={visibleVirtual} activeTabIndex={!activeTabIndex}/>
            {inputArea}
            {infoDesc}
          </ScrollView>
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {activeAccount, userBankInfo} = state.member
  let {recharge, userSecurityLevel} = state.common
  return {activeAccount, recharge, userSecurityLevel, userBankInfo}
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) },
    setActiveAccount: (data) => {
      dispatch(setActiveAccount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeScreen);

const styles = StyleSheet.create(
  stylesUtil({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  icon: {
		color: '#000000',
		fontFamily: 'common-font',
		fontSize: 16,
  },
}))

