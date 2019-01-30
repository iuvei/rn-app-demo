import React from 'react'
import { connect } from 'react-redux'
import { List } from '@ant-design/react-native'
import { minbankCodeMap } from '../../constants/glyphMapHex'
import { styleUtil } from '../../utils/ScreenUtil'
import SvgIcon from '../../components/SvgIcon'

class ActiveAccountbar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let { activeAccount } = this.props

    return (
      <List style={{width: '100%'}}>
        <List.Item arrow="horizontal" style={styleUtil({height: 50})} onPress={this.props.onpress}>
          {activeAccount.bankCode ? <SvgIcon icon={minbankCodeMap[String(activeAccount.bankCode).toUpperCase()]} size={80}/> :
            <SvgIcon icon={minbankCodeMap[String(activeAccount.coinCode).toUpperCase()]} size={80}/>}
        </List.Item>
      </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAccountbar)
