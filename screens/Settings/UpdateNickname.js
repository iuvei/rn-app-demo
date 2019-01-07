import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'

class UpdateNickname extends React.Component {
  static navigationOptions = {
    title: '修改昵称'
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>nickname</Text>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { loginInfo } = state.common
  return { loginInfo }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNickname)
