import React, {Component} from 'react'
import {
  View, Image, Button,
  StyleSheet, Text,
  TextInput, Platform
} from 'react-native'
import {connect} from 'react-redux'
import {fetch} from '../services/HttpService'
import {setLoginStatus} from '../actions/common'

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {
        j_username: 'johnny',
        j_password: 'zhong123',
        ua: ''
      }
    }
  }

  componentDidMount() {
    // 配置平台
    console.log(Platform)
    this.setState({
      formData: Object.assign({}, this.state.formData, {ua: Platform.OS})
    })
  }

  _toLogin() {
    let {formData} = this.state
    fetch({
      api: '/user/j_acegi_security_check',
      params: formData
    }).then(res => {
      this.props.setLoginStatus(res.code === 0)
      console.log(res)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={
            __DEV__
              ? require('../assets/images/robot-dev.png')
              : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
        <Text>{null}</Text>
        <Text>登陆平台{this.state.formData.ua}</Text>
        <Text style={styles.title12}>12,{this.state.formData.j_username}终于等到你！</Text>
        <Text style={styles.title13}>13,{this.state.formData.j_password}终于等到你！</Text>
        <Text style={styles.title}>终于等到你！</Text>
        {/*<Text style={styles.title14}>14,终于等到你！</Text>*/}
        {/*<Text style={styles.title15}>15,终于等到你！</Text>*/}
        {/*<Text style={styles.title16}>16,终于等到你！</Text>*/}
        {/*<Text style={styles.title17}>17,终于等到你！</Text>*/}
        {/*<Text style={styles.title18}>18,终于等到你！</Text>*/}
        <Text style={styles.title19}>19,终于等到你！</Text>
        <Text style={styles.title20}>20,终于等到你！</Text>
        <Text style={styles.title21}>21,终于等到你！</Text>
        <Text style={styles.title22}>22,终于等到你！</Text>
        <Text>{null}</Text>
        <Text>{null}</Text>
        <TextInput
          style={{height: 40, width: 150}}
          placeholder="请输入 User!"
          onChangeText={(j_username) => this.setState({
            formData: Object.assign({}, this.state.formData, {j_username})
          })}
        />
        <TextInput
          style={{height: 40, width: 150}}
          placeholder="请输入 Pass!"
          onChangeText={(j_password) => this.setState({
            formData: Object.assign({}, this.state.formData, {j_password})
          })}
        />
        <Button
          style={styles.btn}
          onPress={() => this._toLogin()}
          title=' 登 陆 '/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 30
  },
  title12: {fontSize: 12},
  title13: {fontSize: 13},
  title14: {fontSize: 14},
  title15: {fontSize: 15},
  title16: {fontSize: 16},
  title17: {fontSize: 17},
  title18: {fontSize: 18},
  title19: {fontSize: 19},
  title20: {fontSize: 20},
  title21: {fontSize: 21},
  title22: {fontSize: 22},
  btn: {
    marginTop: 30
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

