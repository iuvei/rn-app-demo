import React from 'react'
import { connect } from 'react-redux'
import { setActiveAccount } from '../../actions/common'
import {
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

class BankItem extends React.Component {
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

  shouldComponentUpdate(np) {
    let activeId = np.activeAccount.payChannelCode + np.activeAccount.bankCode
    let itemId = this.props.account.payChannelCode + this.props.account.bankCode
    let lastId = this.props.activeAccount.payChannelCode + this.props.activeAccount.bankCode
    if (activeId === itemId || itemId === lastId) {
      return true
    }
    return false
  }

  render() {
    let { account, activeAccount } = this.props
    let activeId = activeAccount.payChannelCode + activeAccount.bankCode

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.setActiveAccount(account)}>
        <View
          style={{marginTop: 4}}>
            <View style={{paddingHorizontal: 4, width: 98, height: 30, borderWidth: 1, borderColor: activeId === (account.payChannelCode + account.bankCode) ? '#ffac1e' : '#fff'}}>
              <Image source={this.state.bankpngs[String(account.bankCode || account.coinCode).toUpperCase()] || require('../../assets/images/banks/jd.png')}
                style={{width: 90, height: 30}}/>
            </View>
        </View>
      </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispatchToProps)(BankItem)