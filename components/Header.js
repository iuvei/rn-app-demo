import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native'
import { stylesUtil } from '../utils/ScreenUtil'
import { connect } from "react-redux";

class Header extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    /**
     * 参数
     * @param hideLeft optional 是否隐藏left back-btn
     * @param title optional 头部标题
     * @param bg optional 头部背景色
     * @param color optional 文字颜色
     * @param rightContent optional 右侧内容
     * @param navigation 必传
     */
    const {hideLeft, title, bg, color, rightContent, leftContent, isConnected} = this.props
    return (
      <View style={[styles.headerContainer, bg || null]}>
        {
          leftContent ? leftContent :
            (!hideLeft &&
              <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
                                onPress={() => this.props.navigation.goBack()}>
                <Image source={require('./../assets/images/i_goback.png')} resizeMode={'contain'}
                       style={styles.headerLeftImg}/>
                <Text style={{color: 'white', fontSize: 16}}>{this.props.leftText}</Text>
              </TouchableOpacity>)
        }
        {!isConnected ?
          <View style={styles.headerCenterContainer}>
            <Text style={[styles.headerCenterText, color || null]}>网络已断开连接</Text>
          </View> :
          title ?
          <View style={styles.headerCenterContainer}>
            <Text style={[styles.headerCenterText, color || null]}>{title || this.props.centerText}</Text>
          </View> :
          <View style={styles.headerCenterContainer}>
            <Image source={require('./../assets/images/logo.png')} resizeMode={'contain'} style={styles.logo}/>
          </View>
        }
        <View style={styles.rightContainer}>
          {
            rightContent ? rightContent : null
          }
        </View>
        {
          !hideLeft && <View style={{height: 25, width: 25, justifyContent: 'center', flex: 1, zIndex: 1}}/>
        }
      </View>
    )
  }
}

Header.defaultProps = {
  leftText: '返回',
  centerText: '天祥国际'
}

const styles = StyleSheet.create(stylesUtil({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#6d96f7',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    paddingTop: 20
  },
  headerLeftImg: {
    width: 25,
    height: 25
  },
  logo: {
    width: 40
  },
  headerCenterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    flex: 4
  },
  headerCenterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8f8f8'
  },
  rightContainer: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
    bottom: 15
  }
}))

const mapStateToProps = (state) => {
  let {isConnected} = state.common
  return ({
    isConnected
  })
}

export default connect(
  mapStateToProps
)(Header)
