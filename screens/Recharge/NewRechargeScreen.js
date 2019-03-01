import React from 'react'
import { connect } from 'react-redux'
import { AsetUserSecureLevel, AddBankcardSuccessRoute, setActiveAccount } from '../../actions/common'
import AccountsPanel from './AccountsPanel'
import Header from '../../components/Header'
import { withNavigation } from 'react-navigation'
import {Tab, Tabs, ScrollableTab, Spinner} from 'native-base'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { setSpText, stylesUtil } from '../../utils/ScreenUtil'
import {
  Flex
} from '@ant-design/react-native'
import { isObject } from 'lodash'
import InputAmount from './InputAmount'

class TopTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curPage: 0
    }
  }

  render() {
    let { tabs, tabsChange } = this.props
    let { curPage } = this.state

    return (
      <View style={styles.warp}>
        <Flex>
          <Tabs tabBarUnderlineStyle={{backgroundColor: '#00bbcc',borderColor: '#00bbcc'}} onChangeTab={tabsChange} locked={true} renderTabBar={() => <ScrollableTab/>}>
            {
              tabs.map((d, index) => {
                return <Tab heading={d.title} tabStyle={{backgroundColor: '#fff'}}  activeTabStyle={{backgroundColor: '#fff'}}
                            textStyle={{color: '#000'}} activeTextStyle={{color: '#00bbcc', borderColor: '#00bbcc'}} key={index} />
              }) ||
              <Tab heading={'empty'}></Tab>
            }
          </Tabs>
        </Flex>
      </View>
    )
  }
}

class NewRechargeScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header
        navigation={navigation}
        hideLeft={true}/>
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      tabs: [{title: '', value: '', arr: []}],
      curPage: 0
    }
    props.AsetUserSecureLevel()
  }

  goSetTrade = () => {
    this.props.navigation.navigate('UpdatePwd', {title: '资金密码', type: 'paypwd'})
  }

  componentDidMount() {
    let {recharge} = this.props
    let tmp_tabs = []
    Object.keys(recharge).forEach((keyTitle) => {
      let arr = []
      Object.keys(recharge[keyTitle]).forEach(infomap => {
        if (isObject(recharge[keyTitle][infomap])) {
          Object.keys(recharge[keyTitle][infomap]).forEach((key, index) => {
            arr.push({title: key, accounts: recharge[keyTitle][infomap][key], index })
          })
        }
      })
      tmp_tabs.push({title: recharge[keyTitle].modelName, value: keyTitle, arr})
    })
    this.props.setActiveAccount(tmp_tabs[0].arr[0].accounts[0])
    this.setState({
      tabs: tmp_tabs
    })
    this.props.AddBankcardSuccessRoute('Recharge')
  }

  componentWillUnmount() {
    this.setState = () => () => {}
  }

  tabsChange = ({i}) => {
    let d = this.state.tabs[i]
    this.setState({
      curPage: i
    })
    this.props.setActiveAccount(d.arr[0].accounts[0])
  }

  render () {
    let { userSecurityLevel, userBankInfo } = this.props
    let { tabs, curPage } = this.state

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

    return (
      <View style={{flex: 1}}>
        <TopTabs tabs={tabs} tabsChange={this.tabsChange} />
        <ScrollView style={{marginBottom: 5}}>
          <AccountsPanel tabs={tabs} curPage={curPage} />
          <InputAmount navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userBankInfo } = state.member
  let { userSecurityLevel, recharge } = state.common
  return { userSecurityLevel, userBankInfo, recharge }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) },
    AddBankcardSuccessRoute: (data) => { dispatch(AddBankcardSuccessRoute(data)) },
    setActiveAccount: (data) => { dispatch(setActiveAccount(data)) }
  }
}

const styles = StyleSheet.create(stylesUtil({
    warp: {backgroundColor: '#ffffff', justifyContent: 'center'},
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(NewRechargeScreen))
