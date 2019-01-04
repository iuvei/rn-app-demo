import React, {Component} from 'react'
import { View, Image, StyleSheet, Text, Platform, ImageBackground, Switch, AsyncStorage } from 'react-native'
import {connect} from 'react-redux'
import {setLoginStatus, setLoginInfo} from '../../actions/common'
import {signIn} from '../../api/basic'
import { Button, Icon, InputItem, Flex, Toast } from '@ant-design/react-native';
import {
  AsetAllBalance,
  AsetUserBankCards
} from './../../actions/member'
import ThirdView from '../../components/ThirdView'
import { createStackNavigator } from 'react-navigation'

class LoginComponent extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      j_username: 'wede01',
      j_password: 'abc12345',
      ua: Platform.OS,
      rememberPwd: false,
      rememberUser: false,
      seePwd: false
    }
    if (this.props.isLogin) this.props.navigation.navigate('Main')
  }

  componentDidMount() {
    AsyncStorage.getItem('j_username').then(v => {
      this.setState({
        j_username: v
      })
    })
    AsyncStorage.getItem('j_password').then(v => {
      this.setState({
        j_password: v
      })
    })
    AsyncStorage.getItem('rememberUser').then(v => {
      this.setState({
        rememberUser: Boolean(v)
      })
    })
    AsyncStorage.getItem('rememberPwd').then(v => {
      this.setState({
        rememberPwd: Boolean(v)
      })
    })
  }

  _toLogin() {
    let {j_username, j_password, ua} = this.state
    signIn({j_username, j_password, ua}).then(res => {
      if (res.code === 0) {
        this.props.setLoginStatus(res.code === 0)
        this.props.setLoginInfo(res.data)
        this.props.AsetAllBalance(res.data.user.userId)
        this.props.AsetUserBankCards(res.data.user.userId)
        this.props.navigation.navigate('Main')
      } else {
        Toast.info(res.message || '网络错误，请重试')
      }
    })
  }

  render() {
    let { j_username, j_password, rememberPwd, rememberUser, seePwd } = this.state

    return (
      <ImageBackground source={require('../../assets/images/login_bg.jpg')} style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <Flex direction="column">
          <Flex.Item>
            <View style={{paddingTop: 88}}>
              <Image source={require('../../assets/images/login_logo.png')} style={{width: 135, height: 105, marginLeft: 'auto', marginRight: 'auto'}}/>
            </View>
            <View style={styles.container}>
              <InputItem
                style={{height: 45, width: 280, backgroundColor: '#ffffff', borderRadius: 5, margin: 0, marginBottom: 18, marginLeft: 0}}
                placeholder="请输入用户名"
                value={j_username}
                extra={<Icon name="close" size={20} color="#1789e6" />}
                labelNumber={3}
                onChangeText={(j_username) => {
                  this.setState({
                    j_username: j_username
                  })
                  if (rememberUser) {
                    AsyncStorage.setItem('j_username', j_username)
                  }
                }}
                onExtraClick={() => {
                  this.setState({
                    j_username: ''
                  })
                }}
              >
                <Icon name="user" size={32} color="#1789e6" style={{paddingLeft: 6}} />
              </InputItem>
              <InputItem
                style={{height: 45, width: 280, backgroundColor: '#ffffff', borderRadius: 5, margin: 0, marginLeft: 0}}
                placeholder="请输入登录密码"
                value={j_password}
                labelNumber={3}
                type={seePwd ? "text" : "password"}
                extra={<Icon name="eye" size={20} color="#1789e6" />}
                onChangeText={(j_password) => {
                  this.setState({
                    j_password: j_password
                  })
                  if (rememberPwd) {
                    AsyncStorage.setItem('j_password', j_password)
                  }
                }}
                onExtraClick={() => {
                  this.setState({
                    seePwd: !seePwd
                  })
                }}
              >
                <Icon name="lock" size={32} color="#1789e6" style={{paddingLeft: 6}} />
              </InputItem>
              <Flex style={{height: 38}}>
                <Flex.Item style={{ paddingRight: 4 }}>
                  <Text style={{textAlign: 'right', color: '#ffffff'}}>记住账号</Text>
                </Flex.Item>
                <View style={{ paddingLeft: 4, paddingRight: 4, width: 60 }}>
                  <Switch
                      value={rememberUser}
                      onValueChange={(v) => {
                        this.setState({
                          rememberUser: v
                        })
                        AsyncStorage.setItem('rememberUser', v ? 'true' : '')
                        if (v) {
                          AsyncStorage.setItem('j_username', j_username)
                        } else {
                          AsyncStorage.removeItem('j_username')
                        }
                      }}
                      trackColor={{true: '#05bde1'}}
                      thumbColor={'#ffffff'}
                    />
                </View>
                <Flex.Item style={{ paddingRight: 4 }}>
                  <Text style={{textAlign: 'right', color: '#ffffff'}}>记住密码</Text>
                </Flex.Item>
                <View style={{ paddingLeft: 4, paddingRight: 4, width: 60 }}>
                  <Switch
                      value={rememberPwd}
                      onValueChange={(v) => {
                        this.setState({
                          rememberPwd: v
                        })
                        AsyncStorage.setItem('rememberPwd', v ? 'true' : '')
                        if (v) {
                          AsyncStorage.setItem('j_password', j_password)
                        } else {
                          AsyncStorage.removeItem('j_password')
                        }
                      }}
                      trackColor={{true: '#05bde1'}}
                      thumbColor={'#ffffff'}
                    />
                </View>
              </Flex>
              <View style={{width: 280}}>
                <Button style={styles.btn} type="primary" onPress={() => this._toLogin()}>登 录</Button>
              </View>
              <Flex style={{width: 280, marginTop: 25}}>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <Text style={{color: '#ffffff'}}>移动端下载</Text>
                </Flex.Item>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <Text style={{textAlign: 'right', color: '#ffffff'}}>线路检测</Text>
                </Flex.Item>
              </Flex>
            </View>
          </Flex.Item>
          <View style={{height: 40, width: 280, flexDirection: 'row'}}>
            <Text style={{color: '#ffffff', flex: 1}} onPress={() => this.props.navigation.navigate('ThirdView', {uri: 'http://www.baidu.com/'})}>在线客服</Text>
            <Text style={{textAlign: 'right', color: '#ffffff', flex: 1}}>1.11版正式发布</Text>
          </View>
        </Flex>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 310,
    height: 290,
    backgroundColor: '#0a84db',
    marginTop: 39,
    borderRadius: 7,
    paddingTop: 38,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 30
  },
  btn: {
    width: 280,
  }
})

const mapStateToProps = (state) => {
  let {isLogin} = state.common
  return ({
    isLogin
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: status => dispatch(setLoginStatus(status)),
    setLoginInfo: data => dispatch(setLoginInfo(data)),
    AsetAllBalance: (data) => {
      dispatch(AsetAllBalance(data))
    },
    AsetUserBankCards: data => dispatch(AsetUserBankCards(data))
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

export default createStackNavigator({
  Login: Login,
  ThirdView: ThirdView
}, {
  initialRouteName: 'Login'
})
