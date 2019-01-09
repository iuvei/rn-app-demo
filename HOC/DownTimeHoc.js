import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '@ant-design/react-native'
import { connect } from 'react-redux'

export default (Comp) => {
  class DownTimeHoc extends Component {
    constructor(props) {
      super(props)
      this.state = {keyboardOn: false}
    }

    componentWillMount() {
      // console.log('包裹组件 WillMount')
    }

    componentDidMount() {
      // console.log('包裹组件 DidMount')
      console.log(this.props)
    }

    initTime = () => {
      console.log('来自在这里执行一堆的方法')
    }

    render() {
      return (
        <View>
          <Comp
            {...this.props}
            {...this.state}
            initTime={this.initTime}
            ref={ref => this.instance = ref}
          />
          <Button
            onPress={() => {
              console.log('you just clicked log fn')
              this.instance.logFn()
            }}>提交</Button>
        </View>
      )
    }
  }

  const mapStateToProps = (state, props) => {
    return {toProps: 1}
  }

  return connect(mapStateToProps)(DownTimeHoc)
}
