/**
 * @author YASIN
 * @version [React Native PABank V01,17/3/10]
 * @date 17/3/10
 * @description CusProgressBar
 */

import React, {Component, PropTypes} from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'

export default class ProgressBar extends Component {
  // static propTypes = {
  //   ...View.propTypes,
  //   //当前进度
  //   progress: PropTypes.number,
  //   //second progress进度
  //   buffer: PropTypes.number,
  //   //进度条颜色
  //   progressColor: PropTypes.string,
  //   //buffer进度条颜色
  //   bufferColor: PropTypes.string,
  //   //进度动画时长
  //   progressAniDuration: PropTypes.number,
  //   //buffer动画时长
  //   bufferAniDuration: PropTypes.number
  // }
  static defaultProps = {
    //进度条颜色
    progressColor: 'green',
    //buffer进度条颜色
    bufferColor: 'white',
    //进度条动画时长
    progressAniDuration: 1000,
    //buffer进度条动画时长
    bufferAniDuration: 1000
  }

  // 构造
  constructor (props) {
    super(props)
    this._progressAni = new Animated.Value(0)
    this._bufferAni = new Animated.Value(0)
  }

  componentWillReceiveProps (nextProps) {
    this._progress = nextProps.progress
    this._buffer = nextProps.buffer
  }

  componentWillMount () {
    this._progress = this.props.progress
    this._buffer = this.props.buffer
  }

  render () {
    let color = this.props.progressColor
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this._onLayout.bind(this)}
      >
        <Animated.View
          ref="progress"
          style={{
            position: 'absolute',
            width: this._progressAni,
            backgroundColor: color
          }}
        />
        <Animated.View
          ref="buffer"
          style={{
            position: 'absolute',
            width: this._bufferAni,
            backgroundColor: this.props.bufferColor
          }}
        />
      </View>
    )
  }

  _onLayout ({nativeEvent: {layout: {width, height}}}) {
    //防止多次调用,当第一次获取后,后面就不再去获取了
    if (width > 0 && this.totalWidth !== width) {
      //获取progress控件引用
      let progress = this._getProgress()
      //获取buffer控件引用
      let buffer = this._getBuffer()
      //获取父布局宽度
      this.totalWidth = width
      //给progress控件设置高度
      progress.setNativeProps({
        style: {
          height: height
        }
      })
      //给buffer控件设置高度
      buffer.setNativeProps({
        style: {
          height: height
        }
      })
      //开始执行进度条动画
      this._startAniProgress(this.progress)
      //开始执行buffer动画
      this._startAniBuffer(this.buffer)
    }
  }

  _startAniProgress (progress) {
    if (this._progress >= 0 && this.totalWidth != 0) {
      Animated.timing(this._progressAni, {
        toValue: progress * this.totalWidth,
        duration: this.props.progressAniDuration,
        easing: Easing.linear
      }).start()
    }
  }

  _startAniBuffer (buffer) {
    if (this._buffer >= 0 && this.totalWidth != 0) {
      Animated.timing(this._bufferAni, {
        toValue: buffer * this.totalWidth,
        duration: this.props.bufferAniDuration,
      }).start()
    }
  }

  _getProgress () {
    if (typeof this.refs.progress.refs.node !== 'undefined') {
      return this.refs.progress.refs.node
    }
    return this.refs.progress._component
  }

  _getBuffer () {
    if (typeof this.refs.buffer.refs.node !== 'undefined') {
      return this.refs.buffer.refs.node
    }
    return this.refs.buffer._component
  }
}

Object.defineProperty(ProgressBar.prototype, 'progress', {
  set (value) {
    if (value >= 0 && this._progress != value) {
      this._progress = value
      this._startAniProgress(value)
    }
  },
  get () {
    return this._progress
  },
  enumerable: true,
})

Object.defineProperty(ProgressBar.prototype, 'buffer', {
  set (value) {
    if (value >= 0 && this._buffer != value) {
      this._buffer = value
      this._startAniBuffer(value)
    }
  },
  get () {
    return this._buffer
  },
  enumerable: true,
})

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: '#bbb'
  }
})
