import React from 'react'
import { connect } from 'react-redux';
import {ScrollView, StyleSheet, View, Text} from 'react-native'
import { Accordion, Drawer, Provider, DatePicker, List, Picker, Button, WhiteSpace, Tabs, Radio, InputItem } from '@ant-design/react-native';
import {getRechargeChannels} from '../../api/member'
import {isObject} from 'lodash'
const data = require('./data.json')
import {MyIconFont} from '../../components/MyIconFont'
import {RechargeChannelIconMap} from '../../constants/glyphMapHex'
import {setActiveAccount} from '../../actions/common'
import Header from '../../components/Header'

const RadioItem = Radio.RadioItem;

class RechargeScreen extends React.Component {
  static navigationOptions = {
    title: 'Recharge',
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      activeSections: [0],
      recharge: {},
      channelRealObj: {},
      // activeAccount: {}
      virtualAccounts: [],
      activeTabIndex: 0,
      minRechargeMoney: 50,
      amount: '0',
      orderAmount: '0',
      rechargeFee: '0',
      isLoading: false
    };
    getRechargeChannels().then(res => {
      if (res.code === 0) {
        let recharge = res.data.recharge
        console.log('recharge', recharge)
        // 人民币渠道集合
        let channelRealObj = {}
        let realAccounts = []
        Object.keys(recharge).forEach((keyTitle) => {
          if (keyTitle !== 'virtual') {
            Object.keys(recharge[keyTitle]).forEach((infomap) => {
              if (isObject(recharge[keyTitle][infomap])) {
                let channelReal = ''
                for (channelReal in recharge[keyTitle][infomap]) {
                  if (recharge[keyTitle][infomap].hasOwnProperty(channelReal)) {
                    for (let i = 0; i < recharge[keyTitle][infomap][channelReal].length; i++) {
                      if (Object.keys(this.props.activeAccount).length === 0 && i === 0) {
                        this.props.setActiveAccount(recharge[keyTitle][infomap][channelReal][i]);
                      }
                      recharge[keyTitle][infomap][channelReal][i]['local_id'] =  channelReal + '_' + i + '_' + new Date().getTime()
                      realAccounts.push(recharge[keyTitle][infomap][channelReal][i])
                    }
                    channelRealObj[channelReal] = recharge[keyTitle][infomap][channelReal]
                  }
                }
              }
            })
          }
        })
        // 数字货币充值渠道集合
        let virtualAccounts = []
        if (recharge && recharge.virtual && recharge.virtual.virtualInfoMap) {
          let channelVirtual = ''
          for (channelVirtual in recharge.virtual.virtualInfoMap) {
            if (recharge.virtual.virtualInfoMap.hasOwnProperty(channelVirtual)) {
              recharge.virtual.virtualInfoMap[channelVirtual].forEach((accountVirtual, idx) => {
                accountVirtual['local_id'] = channelVirtual + '_' + idx + '_' + new Date().getTime()
                virtualAccounts.push(accountVirtual)
              })
            }
          }
        }
        console.log('channelRealObj', channelRealObj)
        this.setState({
          virtualAccounts: [].concat(virtualAccounts),
          realAccounts: [].concat(realAccounts),
          channelRealObj: Object.assign({}, channelRealObj),
          recharge: Object.assign({}, recharge)
        })
      }
    })
  }

  onOpenChange = isOpen => {
    /* tslint:disable: no-console */
    console.log('是否打开了 Drawer', isOpen.toString());
  };

  onAccordionChange = activeSections => {
    this.setState({ activeSections });
  };
  
    /**
     * 提交充值
     */
    submitFunc = () => {
      let {amount, orderAmount, rechargeFee, minRechargeMoney, isLoading} = this.state
      let {activeAccount} = this.props
      // if (!this.checkBindPay()) return
      let pattern = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/
      let msg = '请输入正确的充值金额，最多两位小数!'
      if (this.activeAccount.isFloat) {
        pattern = /^(([1-9]\d*)(\.\d[1-9]))$|(0\.\d[1-9])$/
        msg = '请输入正确的充值金额，必须是两位小数，且末尾不能是0!'
      }
      if (!pattern.test(this.formData.amount)) {
        Toast.fail(msg)
      } else {
        if (this.formData.amount < this.minRechargeMoney) {
          Toast.fail(`最小充值 ${this.minRechargeMoney} 元`)
          return
        }
        console.log(this.formData)
        this.isLoading = true
        this.formData = Object.assign(this.formData, {
          bankCode: this.activeAccount.bankCode || '',
          accountId: this.activeAccount.accountNumber || '',
          payChannelAlias: this.activeAccount.payChannelAlias,
          coinCode: this.activeAccount.coinCode || '',
          payChannelCode: this.activeAccount.payChannelCode
        })
        let {bankCode, channelType, isQuick, orderAmount, payChannelAlias, payChannelCode, rechargeFee, returnUrl, customerIp, amount, coinCode} = this.formData
        commitRecharge({bankCode, channelType, isQuick, orderAmount, payChannelAlias, payChannelCode, rechargeFee, returnUrl, customerIp, amount, coinCode}).then((res) => {
          if (res.code === ERR_OK) {
            this.isLoading = false
            let tmprecinfo = Object.assign({}, res.data, {amount: this.formData.amount})
            this.$store.commit('SET_REC_INFO', tmprecinfo)
            this.formData.amount = ''
            if (res.data.submitType === 'url') {
              this.goThird(tmprecinfo.url + '?' + tmprecinfo.params)
              return
            }
            if (res.data.submitType === 'html') {
              router.push({name: 'rechargeSuccess', params: {value: this.activeAccount.bankCode}})
              return
            }
            this.splitParams(res.data.params || '')
            this.qrCodeSrc = '/qm/capital/capitalBase/queryQrCode?platformKey=' + platformKey + '&payChannelCode=' + this.activeAccount.payChannelCode + '&bankCode=' + this.activeAccount.bankCode + '&time=' + new Date().getTime()
            this.$store.commit('SET_RECHARGE_QRCODE', this.qrCodeSrc)
            router.push({name: 'rechargeSuccess', params: {value: this.activeAccount.bankCode}})
          } else {
            if (res.message.indexOf('}') !== -1) {
              Toast.fail(JSON.parse(res.message).Message || '充值服务异常')
            } else {
              Toast.fail(res.message || '充值服务异常')
            }
            this.formData.amount = ''
            this.isLoading = false
          }
        })
      }
    }

  onChange = value => {
    this.setState({ value });
  };

  _renderSectionTitle = section => {
    return <Text></Text>
  }

  _renderHeader = section => {
    return (
      <View style={{height: 24, paddingLeft: 20}}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    console.log('section', section)
    return (
      <View>
        <List>
          {
            section.content.map((item, index) => {
              return <RadioItem
                multipleLine
                name="rechargeChannels"
                checked={this.props.activeAccount.local_id === item.local_id}
                key={item.payChannelAlias + index}
                onChange={event => {
                  if (event.target.checked) {
                    this.setState({
                      amount: '0',
                      orderAmount: '0',
                      rechargeFee: '0'
                    });
                    this.props.setActiveAccount(item);
                  }
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 30,
                    paddingLeft: 50
                  }}
                >
                  <MyIconFont name={'icon_'+RechargeChannelIconMap[item.bankCode]} size={30}/>
                </View>
              </RadioItem>
            })
          }
        </List>
      </View>
    );
  };

  channelTabsChange = (tab, index) => {
    console.log(tab, index, this.state.virtualAccounts)
    this.setState({
      activeTabIndex: index,
      minRechargeMoney: index === 0 ? 50 : 100
    })
    if (index === 1) {
      this.props.setActiveAccount(this.state.virtualAccounts[0])
    } else {
      this.props.setActiveAccount(this.state.realAccounts[0])
    }
  }

  render() {
    let {channelRealObj, activeTabIndex, virtualAccounts, minRechargeMoney, orderAmount, amount, rechargeFee, isLoading} = this.state
    let {activeAccount} = this.props
    const sidebar = (
      <ScrollView style={[styles.container]}>
        {
          <Accordion
            onChange={this.onAccordionChange}
            activeSections={this.state.activeSections}
            sections={
              Object.keys(channelRealObj || {}).map((key) => {
                return {title: key, content: channelRealObj[key]}
              })
            }
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          >
          </Accordion>
        }
      </ScrollView>
    );
    const sidebarVirtual = (
      <ScrollView style={[styles.container]}>
        <List>
          {
            virtualAccounts.map((item, index) => {
              return <RadioItem
                multipleLine
                name="rechargeChannels"
                checked={this.props.activeAccount.local_id === item.local_id}
                key={item.payChannelAlias + index}
                onChange={event => {
                  if (event.target.checked) {
                    this.setState({
                      amount: '0',
                      orderAmount: '0',
                      rechargeFee: '0'
                    });
                    this.props.setActiveAccount(item);
                  }
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 30,
                    paddingLeft: 10
                  }}
                >
                  <MyIconFont name={'icon_'+RechargeChannelIconMap[String(activeAccount.coinCode).toLowerCase()]} size={30}/>
                </View>
              </RadioItem>
            })
          }
        </List>
      </ScrollView>
    )
    const tabs = [
      { title: '人民币支付' },
      { title: '币宝数字货币支付' }
    ];
    const style = {
      paddingVertical: 40,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ddd',
      flexDirection: 'row',
      flex: 1
    };
    const infoDesc = (
      <View style={{padding: 12, backgroundColor: '#f0f0f0'}}>
        <Text style={{color: '#a4a4a4', lineHeight: 25}}>充值金额：单笔最低充值金额为 <Text style={{color: '#f15a23'}}>{minRechargeMoney}</Text> 元{activeAccount.signleLimit > 0 ? <Text>, 最高 <Text style={{color: '#f15a23'}}>{activeAccount.signleLimit}</Text> 元</Text> : null}</Text>
        {activeAccount.feeRate > 0 ? <Text style={{color: '#a4a4a4', lineHeight: 25}}>充值手续费费率 <Text style={{color: '#f15a23'}}>{ activeAccount.feeRate || 0 }%</Text></Text> : null}
        {activeAccount.dayLimit > 0 ? <Text style={{color: '#a4a4a4', lineHeight: 25}}>充值金额：单日最高 <Text style={{color: '#f15a23'}}>{ activeAccount.dayLimit }</Text> 元</Text> : null}
        <Text style={{color: '#a4a4a4', lineHeight: 25}}>充值限时：请在 <Text style={{color: '#f15a23'}}>30</Text> 分钟内完成充值</Text>
      </View>
    )

    // 金额输入框
    const inputArea = (
      <View>
        <List>
          <InputItem
            error
            value={amount}
            onChange={value => {
              if (activeAccount.feeRate > 0) {
                let fee = Number(value) * activeAccount.feeRate / 100
                this.setState({
                  amount: String(value),
                  orderAmount: String(Number(Number(value) - fee).toFixed(2)),
                  rechargeFee: String(Number(fee).toFixed(2))
                });
              } else {
                this.setState({
                  amount: String(value),
                  orderAmount: String(value),
                  rechargeFee: '0'
                });
              }
            }}
            placeholder="请输入充值金额"
          >
            充值金额
          </InputItem>
        </List>
        <View style={{height: 22, backgroundColor: '#f0f0f0'}}></View>
        <List>
          <List.Item
            extra={orderAmount}
          >
            实际到账
          </List.Item>
        </List>
        <View style={{height: 22, backgroundColor: '#f0f0f0'}}></View>
        <List>
          <List.Item
            extra={rechargeFee}
          >
            手续费
          </List.Item>
        </List>
        <View style={{paddingLeft: 15, paddingTop: 30, paddingRight: 15}}>
          <Button type="primary" loading={isLoading}>下一步</Button>
        </View>
      </View>
    )

    return (
      <View style={styles.container}>
        <Header hideLeft={true}/>
        <Drawer
          sidebar={activeTabIndex === 0 ? sidebar : sidebarVirtual}
          position="right"
          open={false}
          drawerRef={el => (this.drawer = el)}
          onOpenChange={this.onOpenChange}
          drawerBackgroundColor="#ccc"
        >
          <View style={{ flex: 1 }}>
            <Tabs tabs={tabs} onChange={this.channelTabsChange}>
              <View>
                <List style={{width: '100%'}}>
                  <List.Item arrow="horizontal" onPress={() => this.drawer && this.drawer.openDrawer()}>
                    {activeAccount.bankCode ? <MyIconFont name={'icon_'+RechargeChannelIconMap[activeAccount.bankCode]} size={30}/> : null}
                  </List.Item>
                </List>
                {infoDesc}
                {inputArea}
              </View>
              <View>
                <List style={{width: '100%'}}>
                  <List.Item arrow="horizontal" onPress={() => this.drawer && this.drawer.openDrawer()}>
                    {activeAccount.coinCode ? <MyIconFont name={'icon_'+RechargeChannelIconMap[String(activeAccount.coinCode).toLowerCase()]} size={30}/> : null}
                  </List.Item>
                </List>
                {infoDesc}
              </View>
            </Tabs>
          </View>
        </Drawer>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {activeAccount} = state.member
  return {activeAccount}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveAccount: (data) => {
      dispatch(setActiveAccount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  icon: {
		color: '#000000',
		fontFamily: 'common-font',
		fontSize: 16,
	},
})

