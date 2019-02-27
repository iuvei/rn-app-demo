import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { styleUtil } from '../../utils/ScreenUtil'

class RechargeDescinfo extends React.PureComponent {

  render () {
    let { activeAccount } = this.props

    return (
      <View style={styleUtil({padding: 12, backgroundColor: '#f0f0f0'})}>
        <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单笔最低充值金额为 <Text style={{color: '#f15a23'}}>{activeAccount.coinCode ? 100 : 50}</Text> 元{activeAccount.signleLimit > 0 ? <Text>, 最高 <Text style={{color: '#f15a23'}}>{activeAccount.signleLimit}</Text> 元</Text> : null}</Text>
        {activeAccount.feeRate > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值手续费费率 <Text style={{color: '#f15a23'}}>{ activeAccount.feeRate || 0 }%</Text></Text> : null}
        {activeAccount.dayLimit > 0 ? <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值金额：单日最高 <Text style={{color: '#f15a23'}}>{ activeAccount.dayLimit }</Text> 元</Text> : null}
        <Text style={styleUtil({color: '#a4a4a4', lineHeight: 25})}>充值限时：请在 <Text style={{color: '#f15a23'}}>30</Text> 分钟内完成充值</Text>
        { Boolean(activeAccount.isFloat) && <Text style={{color: '#f15a23', lineHeight: 25, fontSize: 12}}>说明：充值金额必须是两位小数，且末尾不能是0</Text> }
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {activeAccount} = state.member
  return {activeAccount}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeDescinfo)
