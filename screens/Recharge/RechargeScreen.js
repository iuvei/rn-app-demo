import React from 'react'
import { connect } from 'react-redux'
import {ScrollView, StyleSheet, View, Text, Platform} from 'react-native'
import { Drawer, List, Button, Tabs, InputItem, Toast } from '@ant-design/react-native' // , Radio
import { commitRecharge } from '../../api/member'
import {isObject} from 'lodash'
// import {MyIconFont} from '../../components/MyIconFont'
import SvgIcon from '../../components/SvgIcon'
import {minbankCodeMap} from '../../constants/glyphMapHex'
import {setActiveAccount} from '../../actions/common'
import Header from '../../components/Header'
import {platformKey, prependUrl} from '../../api.config'
import { ListItem, Radio, Right, Left } from 'native-base'
import { stylesUtil, styleUtil } from '../../utils/ScreenUtil'
import { isNaN } from 'lodash'

// const RadioItem = Radio.RadioItem

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
      value: undefined,
      activeSections: [0],
      recharge: {},
      channelRealObj: {},
      // activeAccount: {}
      virtualAccounts: [],
      activeTabIndex: 0,
      minRechargeMoney: 50,
      amount: '',
      orderAmount: '',
      rechargeFee: '',
      isLoading: false,
      returnUrl: 'https://www.baidu.com',
      channelType: Platform.OS,
      isQuick: 'N'
    };
  }

  componentDidMount() {
    let recharge = this.props.recharge
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
    this.setState({
      virtualAccounts: [].concat(virtualAccounts),
      realAccounts: [].concat(realAccounts),
      channelRealObj: Object.assign({}, channelRealObj),
      recharge: Object.assign({}, recharge)
    })
  }

  componentWillUnmount() {
  }

  onOpenChange = isOpen => {
    /* tslint:disable: no-console */
    // console.log('是否打开了 Drawer', isOpen.toString());
  };

  onAccordionChange = activeSections => {
    this.setState({ activeSections });
  };
  
  /**
   * 提交充值
   */
  submitFunc = () => {
    let {amount, orderAmount, rechargeFee, minRechargeMoney, isLoading, returnUrl, channelType, isQuick} = this.state
    let {activeAccount} = this.props
    // if (!this.checkBindPay()) return
    let pattern = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/
    let msg = '请输入正确的充值金额，最多两位小数!'
    if (activeAccount.isFloat) {
      pattern = /^(([1-9]\d*)(\.\d[1-9]))$|(0\.\d[1-9])$/
      msg = '请输入正确的充值金额，必须是两位小数，且末尾不能是0!'
    }
    if (!pattern.test(amount)) {
      Toast.info(msg)
    } else {
      if (amount < minRechargeMoney) {
        Toast.info(`最小充值 ${minRechargeMoney} 元`)
        return
      }
      this.setState({
        isLoading: true
      }, () => {
        let {bankCode, payChannelAlias, payChannelCode, coinCode} = activeAccount
        commitRecharge({bankCode, channelType, isQuick, orderAmount, payChannelAlias, payChannelCode, rechargeFee, returnUrl, amount, coinCode}).then((res) => {
          if (res.code === 0) {
            let tmprecinfo = Object.assign({}, res.data, {amount: amount})
            // this.$store.commit('SET_REC_INFO', tmprecinfo)
            this.setState({
              amount: '',
              isLoading: false,
              orderAmount: '',
              rechargeFee: ''
            })
            // if (res.data.submitType === 'url') {
            //   this.goThird(tmprecinfo.url + '?' + tmprecinfo.params)
            //   return
            // }
            // this.splitParams(res.data.params || '')
            let qrCodeSrc = prependUrl + '/capital/capitalBase/queryQrCode?platformKey=' + platformKey + '&payChannelCode=' + activeAccount.payChannelCode + '&bankCode=' + activeAccount.bankCode + '&time=' + new Date().getTime()
            // this.$store.commit('SET_RECHARGE_QRCODE', this.qrCodeSrc)
            // router.push({name: 'rechargeSuccess', params: {value: this.activeAccount.bankCode}})
            this.props.navigation.navigate('RechargeSuccess', {recinfo: tmprecinfo, qrCodeSrc: qrCodeSrc, bankCode: activeAccount.bankCode})
          } else {
            if (res.message.indexOf('}') !== -1) {
              Toast.info(JSON.parse(res.message).Message || '充值服务异常')
            } else {
              Toast.info(res.message || '充值服务异常')
            }
            this.setState({
              amount: '',
              isLoading: false,
              orderAmount: '',
              rechargeFee: ''
            })
          }
        })
      })
    }
  }

  onChange = value => {
    this.setState({ value });
  };

  _renderSectionTitle = section => {
    return <Text></Text>
  }

  _renderHeader = (content, index, isActive, sections) => {
    return (
      <List>
        <List.Item arrow={isActive ? "empty" : "horizontal"} onPress={() => {
          this.setState({
            activeSections: [index,]
          })
        }}>
          <Text>{content.title}</Text>
        </List.Item>
      </List>
    );
  };

  _renderContent = section => {
    return (
      <List key={section.title} renderHeader={section.title}>
        {
          section.content.map((item, index) => {
            return (
              <ListItem selected={this.props.activeAccount.local_id === item.local_id} key={section.title+item.bankCode+index}
                style={styleUtil({height: 44, lineHeight: 44})}
                onPress={() => {
                  this.setState({
                    amount: '',
                    orderAmount: '',
                    rechargeFee: '0'
                  })
                  this.props.setActiveAccount(item)
                }}
              >
                <Left>
                  <SvgIcon icon={minbankCodeMap[String(item.bankCode).toUpperCase()]} size={80}/>
                </Left>
                <Right>
                  <Radio
                    color={"#ccc"}
                    selectedColor={"#198ae7"}
                    selected={this.props.activeAccount.local_id === item.local_id}
                  />
                </Right>
              </ListItem>
            )
            // return <RadioItem
            //   multipleLine
            //   name="rechargeChannels"
            //   extra={<Text>{section.title}</Text>}
            //   checked={this.props.activeAccount.local_id === item.local_id}
            //   key={item.payChannelAlias + index}
            //   onChange={event => {
            //     if (event.target.checked) {
            //       this.setState({
            //         amount: '',
            //         orderAmount: '',
            //         rechargeFee: '0'
            //       });
            //       this.props.setActiveAccount(item);
            //     }
            //   }}>
            //   <View
            //     style={{
            //       flexDirection: 'row',
            //       justifyContent: 'space-between',
            //       alignItems: 'center',
            //       height: 30,
            //       paddingLeft: 20
            //     }}
            //   >
            //     <SvgIcon icon={minbankCodeMap[String(item.bankCode).toUpperCase()]} size={80}/>
            //   </View>
            // </RadioItem>
          })
        }
      </List>
    );
  };

  channelTabsChange = (tab, index) => {
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
      <ScrollView style={styles.container}>
        {
          Object.keys(channelRealObj || {}).map((key) => {
            // return {title: key, content: channelRealObj[key]}
            return this._renderContent({title: key, content: channelRealObj[key]})
          })
          // <Accordion
          //   onChange={this.onAccordionChange}
          //   activeSections={this.state.activeSections}
          //   sections={
          //     Object.keys(channelRealObj || {}).map((key) => {
          //       return {title: key, content: channelRealObj[key]}
          //     })
          //   }
          //   renderSectionTitle={this._renderSectionTitle}
          //   renderHeader={this._renderHeader}
          //   renderContent={this._renderContent}
          // >
          // </Accordion>
        }
      </ScrollView>
    );
    const sidebarVirtual = (
      <ScrollView style={styles.container}>
        <List>
          {
            virtualAccounts.map((item, index) => {
              return (
                <ListItem selected={this.props.activeAccount.local_id === item.local_id} key={item.bankCode+index}
                  style={styleUtil({height: 44, lineHeight: 44})}
                  onPress={() => {
                    this.setState({
                      amount: '',
                      orderAmount: '',
                      rechargeFee: '0'
                    })
                    this.props.setActiveAccount(item)
                  }}
                >
                  <Left>
                    <SvgIcon icon={minbankCodeMap[String(activeAccount.coinCode).toUpperCase()]} size={80}/>
                  </Left>
                  <Right>
                    <Radio
                      color={"#ccc"}
                      selectedColor={"#198ae7"}
                      selected={this.props.activeAccount.local_id === item.local_id}
                    />
                  </Right>
                </ListItem>
              )
              // return <RadioItem
              //   multipleLine
              //   name="rechargeChannels"
              //   checked={this.props.activeAccount.local_id === item.local_id}
              //   key={item.payChannelAlias + index}
              //   onChange={event => {
              //     if (event.target.checked) {
              //       this.setState({
              //         amount: '',
              //         orderAmount: '',
              //         rechargeFee: ''
              //       });
              //       this.props.setActiveAccount(item);
              //     }
              //   }}>
              //   <View
              //     style={{
              //       flexDirection: 'row',
              //       justifyContent: 'space-between',
              //       alignItems: 'center',
              //       height: 30,
              //       paddingLeft: 10
              //     }}
              //   >
              //     <SvgIcon icon={minbankCodeMap[String(activeAccount.coinCode).toUpperCase()]} size={80}/>
              //   </View>
              // </RadioItem>
            })
          }
        </List>
      </ScrollView>
    )
    const tabs = [
      { title: '人民币支付' },
      { title: '币宝数字货币支付' }
    ];
    const infoDesc = (
      <View style={styleUtil({padding: 12, backgroundColor: '#f0f0f0'})}>
        <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单笔最低充值金额为 <Text style={{color: '#f15a23'}}>{minRechargeMoney}</Text> 元{activeAccount.signleLimit > 0 ? <Text>, 最高 <Text style={{color: '#f15a23'}}>{activeAccount.signleLimit}</Text> 元</Text> : null}</Text>
        {activeAccount.feeRate > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值手续费费率 <Text style={{color: '#f15a23'}}>{ activeAccount.feeRate || 0 }%</Text></Text> : null}
        {activeAccount.dayLimit > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单日最高 <Text style={{color: '#f15a23'}}>{ activeAccount.dayLimit }</Text> 元</Text> : null}
        <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值限时：请在 <Text style={{color: '#f15a23'}}>30</Text> 分钟内完成充值</Text>
      </View>
    )

    // 金额输入框
    const inputArea = (
      <View>
        <List>
          <InputItem
            error
            value={amount}
            type="number"
            onChange={value => {
              if (!isNaN(Number(value))) {
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
                    rechargeFee: ''
                  });
                }
              }
            }}
            placeholder="请输入充值金额"
          >
            充值金额
          </InputItem>
        </List>
        <View style={styleUtil({height: 22, backgroundColor: '#f0f0f0'})}></View>
        <List>
          <List.Item
            extra={orderAmount}
          >
            实际到账
          </List.Item>
        </List>
        <View style={styleUtil({height: 22, backgroundColor: '#f0f0f0'})}></View>
        {
          activeAccount.feeRate > 0 &&
          <List>
            <List.Item
              extra={rechargeFee}
            >
              手续费
            </List.Item>
          </List>
        }
        <View style={styleUtil({paddingLeft: 15, paddingTop: 30, paddingRight: 15})}>
          <Button type="primary" loading={isLoading} onPress={this.submitFunc}>下一步</Button>
        </View>
      </View>
    )

    return (
      <View style={styles.container}>
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
                  <List.Item arrow="horizontal" onPress={() => this.drawer && this.drawer.openDrawer()} style={styleUtil({height: 50})}>
                    {activeAccount.bankCode ? <SvgIcon icon={minbankCodeMap[String(activeAccount.bankCode).toUpperCase()]} size={80}/> : null}
                  </List.Item>
                </List>
                {infoDesc}
                {inputArea}
              </View>
              <View>
                <List style={{width: '100%'}}>
                  <List.Item arrow="horizontal" onPress={() => this.drawer && this.drawer.openDrawer()} style={styleUtil({height: 50})}>
                    {activeAccount.coinCode ? <SvgIcon icon={minbankCodeMap[String(activeAccount.coinCode).toUpperCase()]} size={80}/> : null}
                  </List.Item>
                </List>
                {infoDesc}
                {inputArea}
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
  let {recharge} = state.common
  return {activeAccount, recharge}
}

const mapDispatchToProps = (dispatch) => {
  return {
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

