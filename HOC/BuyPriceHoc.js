import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { connect } from 'react-redux'

export default (Comp) => {
  class BuyPriceHoc extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    // 接受显示的数据
    // 更改后触发方法
    componentWillReceiveProps() {
    }

    componentDidMount() {
    }

    render() {
      return (
        <Comp
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  // const mapStateToProps = (state) => {
  //   return ({
  //     ...state.classic
  //   })
  // }
  // mapStateToProps

  return connect()(BuyPriceHoc)
}
