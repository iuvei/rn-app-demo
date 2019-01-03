import React, {Component} from 'react'
import {
  View, Image,
  StyleSheet, Text, Platform,
  ImageBackground, Switch
} from 'react-native'
import {connect} from 'react-redux'
import {setLoginStatus, setLoginInfo} from '../../actions/common'
import {signIn} from '../../api/basic'
// import { Ionicons } from '@expo/vector-icons'
import { Button, Icon, InputItem, Flex } from '@ant-design/react-native';
import {
  AsetAllBalance,
  AsetUserBankCards
} from './../../actions/member'

class LoginComponent extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      formData: {
        j_username: 'wede01',
        j_password: 'abc12345',
        ua: ''
      },
      rememberPwd: false
    }
    if (this.props.isLogin) this.props.navigation.navigate('Main')
  }

  componentDidMount() {
    // 配置平台
    // console.log(Platform)
    this.setState({
      formData: Object.assign({},
        this.state.formData,
        {ua: Platform.OS})
    })
  }

  _toLogin() {
    let {formData} = this.state
    signIn(formData).then(res => {
      if (res.code === 0) {
        this.props.setLoginStatus(res.code === 0)
        this.props.setLoginInfo(res.data)
        this.props.AsetAllBalance(res.data.user.userId)
        this.props.AsetUserBankCards(res.data.user.userId)
        this.props.navigation.navigate('Main')
      }
    })
  }

  onSwitchChange = (v) => {
    this.setState({
      rememberPwd: v
    })
  }

  render() {
    let { j_username, j_password } = this.state.formData

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
                extra={<Icon name="account-book" size="32" color="#1789e6" />}
                labelNumber={2}
                onChangeText={(j_username) => this.setState({
                  formData: Object.assign({}, this.state.formData, {j_username})
                })}
                onExtraClick={() => this.setState({
                  formData: Object.assign({}, this.state.formData, {j_username: ''})
                })}
              >
                <Icon name="account-book" size="32" color="#1789e6" />
              </InputItem>
              <InputItem
                style={{height: 45, width: 280, backgroundColor: '#ffffff', borderRadius: 5, margin: 0, marginLeft: 0}}
                placeholder="请输入登录密码"
                value={j_password}
                labelNumber={2}
                type="password"
                extra={<Icon name="account-book" size="32" color="#1789e6" />}
                onChangeText={(j_password) => this.setState({
                  formData: Object.assign({}, this.state.formData, {j_password})
                })}
              >
                <Icon name="account-book" size="32" color="#1789e6" />
              </InputItem>
              <Flex style={{height: 38}}>
                <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <Text style={{textAlign: 'right', color: '#ffffff'}}>记住密码</Text>
                </Flex.Item>
                <View style={{ paddingLeft: 4, paddingRight: 4, width: 60 }}>
                  <Switch
                      value={this.state.rememberPwd}
                      onValueChange={this.onSwitchChange}
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
            <Text style={{color: '#ffffff', flex: 1}}>在线客服</Text>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

