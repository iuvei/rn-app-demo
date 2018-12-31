import React, {Component} from 'react'
import {
  View, Image, Button,
  StyleSheet, Text,
  TextInput, Platform,
  ImageBackground
} from 'react-native'
import {connect} from 'react-redux'
import {setLoginStatus} from '../../actions/common'
import {signIn} from '../../api/basic'
// import { Ionicons } from '@expo/vector-icons'
import { Grid, Icon, InputItem, Switch, List, Flex } from '@ant-design/react-native';

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
        <View style={{paddingTop: 88}}>
          <Image source={require('../../assets/images/login_logo.png')} style={{width: 135, height: 105, margin: 'auto'}}/>
        </View>
        <View style={styles.container}>
          <InputItem
            style={{height: 45, width: 280, backgroundColor: '#ffffff', borderRadius: 5, margin: 0, marginBottom: 18}}
            placeholder="请输入用户名"
            value={j_username}
            clear
            labelNumber={2}
            onChangeText={(j_username) => this.setState({
              formData: Object.assign({}, this.state.formData, {j_username})
            })}
          >
            <Icon name="account-book" size="32" color="#1789e6" />
          </InputItem>
          <InputItem
            style={{height: 45, width: 280, backgroundColor: '#ffffff', borderRadius: 5, margin: 0}}
            placeholder="请输入登录密码"
            value={j_password}
            labelNumber={2}
            extra={<Icon name="account-book" size="32" color="#1789e6" />}
            secureTextEntry
            onChangeText={(j_password) => this.setState({
              formData: Object.assign({}, this.state.formData, {j_password})
            })}
          >
            <Icon name="account-book" size="32" color="#1789e6" />
          </InputItem>
          <Flex style={{height: 38}}>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <Text style={{textAlign: 'right'}}>忘记密码</Text>
            </Flex.Item>
            <View style={{ paddingLeft: 4, paddingRight: 4, width: 60 }}>
              <Switch
                  checked={this.state.rememberPwd}
                  onChange={this.onSwitchChange}
                />
            </View>
          </Flex>
          <View style={{width: 280}}>
            <Button
              style={styles.btn}
              onPress={() => this._toLogin()}
              title=' 登 陆 '/>
          </View>
        </View>
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
    margin: 'auto',
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
    setLoginStatus: status => dispatch(setLoginStatus(status))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)

