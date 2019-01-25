import React from 'react'
import { connect } from 'react-redux'
import {
  setLoginStatus,
  setLoginInfo
} from '../actions/common'
import { AsetAllBalance } from '../actions/member'
import NavigationService from '../navigation/NavigationService'

class GlobalComp extends React.Component {
  constructor(props) {
    super(props)
    this.loopTimer = null
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextprops ===', nextProps)
    if (nextProps.loginInfo.acc) {
      this.loopCheckLogin(nextProps.loginInfo.acc.user.userId)
    }
    if (!nextProps.isLogin && this.props.isLogin) {
      NavigationService.navigate('Login')
    }
  }

  // 登录状态检测
  loopCheckLogin = (userId) => {
    clearTimeout(this.loopTimer)
    // 增加： 当切非当前页面，不再轮询，储存监听
    // if (!this.visibility) {
    //   // this.isHasCheck = true
    //   return
    // }
    // 预防 渲染视图后，频繁切换
    // if (type === 'visibility' && !this.isHasCheck) {
    //   return
    // }
    // 初始化
    // this.isHasCheck = false
    // console.log('loop global', new Date().getTime())
    this.props.AsetAllBalance({userId: userId || this.props.loginInfo.acc.user.userId, cb: (res) => {
      if (res.code === 0) {
        this.loopTimer = setTimeout(() => {
          this.loopCheckLogin()
        }, 30 * 1000)
      }
      if (res.code === -200012 || res.code === -200010 || res.code === -200011 || res.code === -200014 || res.code === -20000) {
        this.props.setLoginStatus(false)
      }
    }})
  }

  render() {
    return (null)
  }
}

const mapStateToProps = (state) => {
  let {isLogin, loginInfo} = state.common
  return ({
    isLogin,
    loginInfo
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: (text) => {
      dispatch(setLoginStatus(text))
    },
    setLoginInfo: (text) => {
      dispatch(setLoginInfo(text))
    },
    AsetAllBalance: (data) => {
      dispatch(AsetAllBalance(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalComp)
