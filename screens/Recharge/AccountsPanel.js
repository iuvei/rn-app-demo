import React from 'react'
import { connect } from 'react-redux'
import { setActiveAccount } from '../../actions/common'
import {
  View,
  Text, TouchableWithoutFeedback,
  Image, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import {
  Accordion,
  Flex, WingBlank
} from '@ant-design/react-native'
import { isObject } from 'lodash'
// import { minbankCodeMap } from '../../constants/glyphMapHex'
// import SvgIcon from '../../components/SvgIcon'
import { Icon } from 'expo'
import InputAmount from './InputAmount'
import { setSpText, stylesUtil } from '../../utils/ScreenUtil'
import { withNavigation } from 'react-navigation'

class AccountsPanel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [{title: '', value: '', arr: []}],
      activeSections: [0],
      curPage: 0,
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

  componentDidMount() {
    let {recharge} = this.props
    let tmp_tabs = []
    Object.keys(recharge).forEach((keyTitle) => {
      let arr = []
      Object.keys(recharge[keyTitle]).forEach(infomap => {
        if (isObject(recharge[keyTitle][infomap])) {
          Object.keys(recharge[keyTitle][infomap]).forEach(key => {
            arr.push({title: key, accounts: recharge[keyTitle][infomap][key]})
          })
        }
      })
      tmp_tabs.push({title: recharge[keyTitle].modelName, value: keyTitle, arr})
    })
    this.props.setActiveAccount(tmp_tabs[0].arr[0].accounts[0])
    this.setState({
      tabs: tmp_tabs
    })
  }

  onChange = activeSections => {
    let {tabs, curPage} = this.state
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
        <View style={{flex: 1}}><Text
          style={{lineHeight: 40, color: '#333', width: '50%'}}>{section.title}</Text></View>
        <Text style={{width: 90, textAlign: 'right'}}><Icon.Ionicons style={{textAlign: 'right'}}
                                                                     color={this.state.activeSections[0] === index ? '#666' : '#cacaca'}
                                                                     name={this.state.activeSections[0] === index ? 'ios-arrow-down' : 'ios-arrow-forward'}
                                                                     size={20}></Icon.Ionicons></Text>
      </Flex>
    )
  }

  tabsChange = (d, t) => {
    this.setState({
      activeSections: [0],
      curPage: t
    })
    this.props.setActiveAccount(d.arr[0].accounts[0])
  }

  _renderContent = (section) => {
    let activeId = this.props.activeAccount.payChannelCode + this.props.activeAccount.bankCode
    return <WingBlank style={{marginBottom: 5}}>
      <Flex wrap="wrap" justify="between">
        {
          section.accounts.map((account, idx) => {
            return <TouchableWithoutFeedback
              key={idx}
              onPress={() => this.props.setActiveAccount(account)}>
              <View key={section.title + account.payChannelCode + idx}
                    style={{marginTop: 4}}>
                {/* <SvgIcon
                  icon={minbankCodeMap[String(account.bankCode || account.coinCode).toUpperCase()]}
                  // width={90} height={34}
                  width={80} height={30}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderWidth: 1,
                    borderColor: activeId === (account.payChannelCode + account.bankCode) ? '#ffac1e' : '#fff',
                    paddingHorizontal: 5
                  }}/> */}
                  <View style={{paddingHorizontal: 4, width: 98, height: 30, borderWidth: 1, borderColor: activeId === (account.payChannelCode + account.bankCode) ? '#ffac1e' : '#fff'}}>
                    <Image source={this.state.bankpngs[String(account.bankCode || account.coinCode).toUpperCase()] || require('../../assets/images/banks/jd.png')}
                      style={{width: 90, height: 30}}/>
                  </View>
              </View>
            </TouchableWithoutFeedback>
          })
        }
      </Flex>
    </WingBlank>
  }

  render() {
    let {tabs, activeSections, curPage} = this.state

    return (
      <View>
        <View style={styles.warp}>
          <Flex>
            <View style={styles.playNav}>
              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {
                    tabs.map((d, index) => {
                      return <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={() => this.tabsChange(d, index)}
                        style={[styles.btnDefault, index === curPage ? styles.btnActive : null]}>
                        <Text
                          style={[styles.btnDefaultText, index === curPage ? styles.btnActive : null]} numberOfLines={1}
                        >{d.title}</Text>
                      </TouchableOpacity>
                    })
                  }
                </ScrollView>
              </View>
            </View>
          </Flex>
        </View>
        {
          tabs[curPage].arr.length > 0 &&
          <ScrollView style={{marginBottom: 5}}>
            <Accordion
              duration={50}
              activeSections={activeSections}
              sections={tabs[curPage].arr}
              onChange={this.onChange}
              renderHeader={this._renderHeader}
              renderSectionTitle={this._renderSectionTitle}
              renderContent={this._renderContent}
            />
            <InputAmount navigation={this.props.navigation}/>
          </ScrollView>
        }
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {recharge} = state.common
  let {activeAccount} = state.member
  return {recharge, activeAccount}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveAccount: (data) => {
      dispatch(setActiveAccount(data))
    }
  }
}

const styles = StyleSheet.create(stylesUtil({
    warp: {backgroundColor: '#ffffff', justifyContent: 'center', paddingLeft: 2},
    playNav: {
      marginTop: 2
    },
    btnDefault: {
      height: 50,
      lineHeight: 50,
      borderBottomColor: '#ffffff',
      borderBottomWidth: 2,
      paddingLeft: 4,
      paddingRight: 4,
      // borderRadius: 20,
      marginRight: 5
    },
    btnActive: {
      borderBottomColor: '#00bbcc',
      color: '#00bbcc'
    },
    Touchable: {
      height: 26,
      lineHeight: 26
    },
    btnDefaultText: {
      fontSize: 13,
      lineHeight: 50,
      height: 50,
      paddingLeft: 4,
      paddingRight: 4,
      color: '#333',
      textAlign: 'center'
    },
    btnActiveText: {
      color: '#00bbcc'
    }
  })
)

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AccountsPanel))
