import React from 'react'
import { connect } from 'react-redux'
import { AsetUserSecureLevel } from '../../actions/common'
import AccountsPanel from './AccountsPanel'
import Header from '../../components/Header'
import InputAmount from './InputAmount'
import {
  Dimensions,
  View,
  ScrollView
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
  }

  tabsChange = (v) =>{
    this.setState({
      activeTab: v
    })
  }
  
  render () {
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

export default connect(mapStateToProps, mapDispatchToProps)(NewRechargeScreen)
