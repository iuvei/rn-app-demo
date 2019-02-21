import React, {Component} from 'react'
import { PanResponder, View, Dimensions, Platform, ImageBackground } from 'react-native'

class FloatBall extends Component {
  constructor (props) {
    super (props)
    this.state = {
      marginLeft: Dimensions.get('window').width - 60,
      marginTop: 150
    }
    this.panResponder = PanResponder.create({

      /***************** 要求成为响应者 *****************/
      // 单机手势是否可以成为响应者
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // 移动手势是否可以成为响应者
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // 拦截子组件的单击手势传递,是否拦截
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      // 拦截子组件的移动手势传递,是否拦截
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,


      /***************** 响应者事件回调处理 *****************/
      // 单击手势监听回调
      onPanResponderGrant: (e, gestureState) => {
        this._onPanResponderGrant(e)
      },
      // 移动手势监听回调
      onPanResponderMove: (e, gestureState) => {
        this._onPanResponderMove(e, gestureState);
      },
      // 手势动作结束回调
      onPanResponderEnd: (evt, gestureState) => {
        this._onPanResponderEnd(evt)
      },
      // 手势释放, 响应者释放回调
      onPanResponderRelease: (e) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        // console.log('onPanResponderRelease==>' + '放开了触摸,手势结束')
      },
      // 手势申请失败,未成为响应者的回调
      onResponderReject: (e) => {
        // 申请失败,其他组件未释放响应者
        // console.log('onResponderReject==>' + '响应者申请失败')
      },

      // 当前手势被强制取消的回调
      onPanResponderTerminate: (e) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消
        // console.log('onPanResponderTerminate==>' + '由于某些原因(系统等)，所以当前手势将被取消')
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    })
  }

  /*
    * 备注: 拖动小圆点的实现方法 - 使用绝对定位
    * 对小圆点设置绝对布局,
    * 通过触发开始的pageXY与moveXY的差值
    * 来变更top,left的大小,
    * position一定要为 absolute
    * */

  // 单点手势开始
  _onPanResponderGrant(e) {

    //1. 开始触发时,获取触摸点绝对位置
    this.touchX = e.nativeEvent.locationX;
    this.touchY = e.nativeEvent.locationY;

  }

  // 移动手势处理
  _onPanResponderMove(evt, g) {

    //2. 根据触发点计算真实的左侧,顶侧位移变化
    let realMarginLeft = g.moveX - this.touchX;
    let realMarginTop = g.moveY - this.touchY;

    this.setState({
      marginLeft: realMarginLeft,
      marginTop: realMarginTop
    })


  }

  // 手势结束
  _onPanResponderEnd(evt) {
    let pxdp = Dimensions.get('window');
    let pageX = evt.nativeEvent.pageX;
    let pageY = evt.nativeEvent.pageY;
    this.setState({
      isHeightShow: false,
    });

    if (pageX <= pxdp.width / 4) {
      pageX = 0;
      this.setState({
        marginLeft: pageX,
      })
    }
    if (pageY <= 55) {
      pageY = 60;
      this.setState({
        marginTop: pageY,
      })
    }
    if (pageX >= pxdp.width * 3 / 4) {
      pageX = pxdp.width - 50;
      this.setState({
        marginLeft: pageX,
      })
    }
    if (pageY >= pxdp.height - 50) {
      pageY = pxdp.height - 120;
      this.setState({
        marginTop: pageY,
      })
    }
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  render() {
    return (
        <View style={{
          width: 40,
          height: 50,
          zIndex: 2,
          position: 'absolute',
          left: this.state.marginLeft,
          top: this.state.marginTop,
        }} {...this.panResponder.panHandlers}
        >
          <ImageBackground
            source={require('./../assets/images/rocket.png')}
            style={{
              width: 40,
              height: 50}}>
            {this.props.children}
          </ImageBackground></View>
    )
  }
}

export default FloatBall
