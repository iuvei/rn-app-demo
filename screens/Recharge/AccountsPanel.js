import React from 'react'
import { connect } from 'react-redux'
import { setActiveAccount } from '../../actions/common'
import {
  View,
  Text, TouchableWithoutFeedback,
  Image
} from 'react-native'
import {
  Accordion,
  Flex, WingBlank
} from '@ant-design/react-native'
import { Icon } from 'expo'

class BankItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bankpngs: {
        "ABC": require('../../assets/images/banks/nongyeyinhang.png'),
        "AILPAY": require('../../assets/images/banks/alipay.png'),
        "ALIPAY": require('../../assets/images/banks/alipay.png'),
        "ALIPAY_QR": require('../../assets/images/banks/alipay.png'),
        "BCB": require('../../assets/images/banks/bcb.png'),
        "BCCB": require('../../assets/images/banks/beijingyinhang.png'),
        "BHBC": require('../../assets/images/banks/bohaiyinhang.png'),
        "BJRCB": require('../../assets/images/banks/beijingnongcunshangyeyinhang.png'),
        "BOB": require('../../assets/images/banks/beijingyinhang.png'),
        "BOC": require('../../assets/images/banks/zhongguoyinhang.png'),
        "BOCOM": require('../../assets/images/banks/jiaotongyinhang.png'),
        "BOS": require('../../assets/images/banks/shanghaiyinhang.png'),
        "BTC": require('../../assets/images/banks/btc.png'),
        "CCB": require('../../assets/images/banks/jiansheyinhang.png'),
        "CEB": require('../../assets/images/banks/guangdayinhang.png'),
        "CGB": require('../../assets/images/banks/guangfayinhang.png'),
        "CIB": require('../../assets/images/banks/xingyeyinhang.png'),
        "CITIC": require('../../assets/images/banks/zhongxinyinhang.png'),
        "CMB": require('../../assets/images/banks/zhaoshangyinhang.png'),
        "CMBC": require('../../assets/images/banks/minshengyinhang.png'),
        "CZB": require('../../assets/images/banks/zheshangyinhang.png'),
        "DC": require('../../assets/images/banks/dc.png'),
        "DNS": require('../../assets/images/banks/dns.png'), // 无图
        "ETC": require('../../assets/images/banks/etc.png'),
        "ETH": require('../../assets/images/banks/eth.png'),
        "GDB": require('../../assets/images/banks/guangfayinhang.png'),
        "HXB": require('../../assets/images/banks/huaxiayinhang.png'),
        "ICBC": require('../../assets/images/banks/gongshangyinhang.png'),
        "JD": require('../../assets/images/banks/jingdongEqia.png'),
        "JDPAY": require('../../assets/images/banks/jingdongzhifu.png'),
        "LTC": require('../../assets/images/banks/ltc.png'),
        "NBCB": require('../../assets/images/banks/ningboyinhang.png'),
        "NJCB": require('../../assets/images/banks/nanjingyinhang.png'),
        "PAB": require('../../assets/images/banks/pinganyinhang.png'),
        "PSBC": require('../../assets/images/banks/youchuyinhang.png'),
        "SPDB": require('../../assets/images/banks/pufayinhang.png'),
        "SRCB": require('../../assets/images/banks/shanghainongshangyinhang.png'),
        "SXCCB": require('../../assets/images/banks/shaoxinyinhang.png'),
        "UNIONPAY": require('../../assets/images/banks/zhongguoyinlian.png'),
        "USDX": require('../../assets/images/banks/usdx.png'),
        "WECHAT": require('../../assets/images/banks/weixinzhifu.png'),
        "WECHAT_QR": require('../../assets/images/banks/weixinzhifu.png'),
        "WXPAY": require('../../assets/images/banks/weixinzhifu.png'),
        "WXPAY_QR": require('../../assets/images/banks/weixinzhifu.png'),
      }
    }
  }

  render() {
    let { account, activeId } = this.props

    return (
      <View style={{paddingHorizontal: 4, width: 98, height: 30, borderWidth: 1, borderColor: activeId === (account.payChannelCode + account.bankCode) ? '#ffac1e' : '#fff'}}>
        <Image source={this.state.bankpngs[String(account.bankCode || account.coinCode).toUpperCase()] || require('../../assets/images/banks/jd.png')}
          style={{width: 90, height: 30}}/>
      </View>
    )
  }
}

class AccountsPanel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeSections: [0],
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(np) {
    if (np.curPage !== this.props.curPage) {
      this.setState({
        activeSections: [0]
      })
    }
  }

  onChange = activeSections => {
    let {tabs, curPage} = this.props
    this.setState({activeSections})
    if (activeSections.length > 0 && activeSections[0] >= 0) {
      this.props.setActiveAccount(tabs[curPage].arr[activeSections[0]].accounts[0])
    }
  }

  _renderSectionTitle = section => {
    return (
      <View style={{height: 0}}>
        <Text></Text>
      </View>
    )
  }

  _renderHeader = (section, index) => {
    return (
      <Flex
        style={{
          backgroundColor: '#fff',
          height: 40,
          borderBottomColor: '#f0f0f0',
          borderBottomWidth: 0.5,
          paddingHorizontal: 16
        }}>
        <View style={{flex: 1}}>
          <Text style={{lineHeight: 40, color: '#333', width: '50%'}}>{section.title}</Text>
        </View>
        <Text style={{width: 90, textAlign: 'right'}}>
          <Icon.Ionicons
            style={{textAlign: 'right'}}
            color={this.state.activeSections[0] === index ? '#666' : '#cacaca'}
            name={this.state.activeSections[0] === index ? 'ios-arrow-down' : 'ios-arrow-forward'}
            size={20}>
          </Icon.Ionicons>
        </Text>
      </Flex>
    )
  }

  _renderContent = (section, activeSections) => {
    let activeId = this.props.activeAccount.payChannelCode + this.props.activeAccount.bankCode
    if (section.index !== activeSections[0]) {
      return <View key={section.index}></View>
    }
    return <WingBlank style={{marginBottom: 5}}>
      <Flex wrap="wrap" justify="between">
        {
          section.accounts.map((account, idx) => {
            return <TouchableWithoutFeedback
              key={idx}
              onPress={() => this.props.setActiveAccount(account)}>
              <View key={section.title + account.payChannelCode + idx}
                    style={{marginTop: 4}}>
                  {/* <View style={{paddingHorizontal: 4, width: 98, height: 30, borderWidth: 1, borderColor: activeId === (account.payChannelCode + account.bankCode) ? '#ffac1e' : '#fff'}}>
                    <Image source={this.state.bankpngs[String(account.bankCode || account.coinCode).toUpperCase()] || require('../../assets/images/banks/jd.png')}
                      style={{width: 90, height: 30}}/>
                  </View> */}
                  <BankItem account={account} activeId={activeId} />
              </View>
            </TouchableWithoutFeedback>
          })
        }
      </Flex>
    </WingBlank>
  }

  render() {
    let { activeSections } = this.state
    let { tabs, curPage } = this.props

    return (
      <View>
        {
          tabs[curPage].arr.length > 0 &&
          <Accordion
            ref={ref => this.AccordionComp = ref}
            duration={50}
            activeSections={activeSections}
            sections={tabs[curPage].arr}
            onChange={this.onChange}
            renderHeader={this._renderHeader}
            renderSectionTitle={this._renderSectionTitle}
            renderContent={(section) => this._renderContent(section, activeSections)}
          />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPanel)
