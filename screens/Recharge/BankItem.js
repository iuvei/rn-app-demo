import React from 'react'
import { connect } from 'react-redux'
import { setActiveAccount } from '../../actions/common'
import {
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { bankpngs } from '../../constants/Images'

class BankItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bankpngs: bankpngs
    }
  }

  // shouldComponentUpdate(np) {
  //   let activeId = np.activeAccount.payChannelCode + np.activeAccount.bankCode
  //   let itemId = this.props.account.payChannelCode + this.props.account.bankCode
  //   let lastId = this.props.activeAccount.payChannelCode + this.props.activeAccount.bankCode
  //   if (activeId === itemId || itemId === lastId || activeId !== lastId) { //  仅仅是被点击的和上次被点击过的 item 需要重新渲染
  //     return true
  //   }
  //   return false
  // }

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