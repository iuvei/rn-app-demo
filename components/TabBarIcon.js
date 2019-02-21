import React from 'react';
import { Icon } from 'expo';
import { Text } from 'react-native'
import Colors from '../constants/Colors';
import { connect } from "react-redux";

class TabBarIcon extends React.Component {
  render() {
    let showTips = false
    let {freshMsg, tips} = this.props
    if (freshMsg > 0 && tips) showTips = true
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      >
        {
          showTips ? <Text style={{color: 'red'}}>·</Text>: ''
        }
      </Icon.Ionicons>
    );
  }
}

const mapStateToProps = (state) => {
  let {freshMsg} = state.member
  return ({
    freshMsg
  })
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBarIcon)
