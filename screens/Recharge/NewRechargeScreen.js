import React from 'react'
import { connect } from 'react-redux'
import { AsetUserSecureLevel } from '../../actions/common'
import AccountsPanel from './AccountsPanel'
import Header from '../../components/Header'
import InputAmount from './InputAmount'
import { withNavigation } from 'react-navigation'
import {
  Dimensions,
  View,
  ScrollView,
  Text
} from 'react-native'

const height = Dimensions.get('window').height

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
      activeTab: ''
    }
    props.AsetUserSecureLevel()
  }

  tabsChange = (v) =>{
    this.setState({
      activeTab: v
    })
  }
  
  render () {
    let { userSecurityLevel, userBankInfo } = this.props

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
        <AccountsPanel/>
        <ScrollView style={{flex: 1}}>
          <InputAmount navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userBankInfo } = state.member
  let { userSecurityLevel } = state.common
  return { userSecurityLevel, userBankInfo }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) }
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(NewRechargeScreen))
