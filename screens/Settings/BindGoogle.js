import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
} from 'react-native'
import {
  WhiteSpace,
  List,
  InputItem,
  Button,
  Toast,
  Icon
} from '@ant-design/react-native'
import { bindGoogleAuto, googleAuthImg } from '../../api/member'
import {
  AsetUserSecureLevel,
  AsetUserSecureConfig
} from '../../actions/common'
import { AsetGaKey } from '../../actions/member'
import ThirdView from '../../components/ThirdView'
import { createStackNavigator } from 'react-navigation'

class BindGoogleComp extends React.Component {
  static navigationOptions = {
    title: '绑定谷歌验证码'
  }

  constructor(props) {
    super(props)
    this.state = {
      gaCode: '',
      password: '',
      isLoading: false,
      gaKey: ''
    }
    props.AsetGaKey()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      gaKey: nextProps.gaKey
    })
  }

  submitFunc = () => {
    let { gaCode, password, gaKey } = this.state
    if (gaCode === '' || password === '') {
      Toast.info('请完善数据后重试')
      return
    }
    this.setState({
      isLoading: true
    }, () => {
      bindGoogleAuto({ gaCode, password, gaKey }).then((res) => {
        if (res.code === 0) {
          setTimeout(() => {
            this.props.AsetUserSecureLevel()
          }, 100)
          Toast.success('绑定成功')
        } else {
          this.props.AsetGaKey()
          Toast.fail(res.message + '，已刷新二维码，请重新扫码！')
        }
        this.setState({
          isLoading: false,
          gaCode: '',
          password: '',
          gaKey: ''
        })
      })
    })
  }

  openBrowser = () => {
    this.props.navigation.navigate('ThirdView', {uri: 'https://support.google.com/accounts/answer/1066447'})
  }

  render() {
    let { gaCode, password, isLoading, gaKey } = this.state
    let { userSecurityLevel, userSecurityConfig } = this.props

    return (
      <View>
        <WhiteSpace size="sm" />
        {
          userSecurityLevel.isGoogle && <List>
            <List.Item
              thumb={<Icon name="heart" color="#333333" size={20}/>}
              extra={userSecurityConfig.gaSwitch && <Button type="warning" size="small" onPress={() => {
                this.props.navigation.navigate('UnbindSet', {title: '解绑谷歌', type: 'google'})
              }}>解绑</Button>}
            >
              <Text style={{color: '#333333', paddingLeft: 6}}>已绑定</Text>
            </List.Item>
          </List>
        }
        { (!userSecurityLevel.isGoogle && gaKey !== '') && <View>
            <View style={{padding: 14, alignItems: 'center'}}>
              <Text style={{color: '#333', lineHeight: 24}}>用Google身份验证器扫描下方二维码绑定后输入谷歌动态密码</Text>
              <Text style={{color: '#1689e6', lineHeight: 24}} onPress={this.openBrowser}>点击查看谷歌验证器使用说明</Text>
            </View>
            <View style={{height: 200, alignItems: 'center'}}>
              <Image style={{width: 150, height: 150, marginTop: 25}} source={{uri: googleAuthImg + '&gaKey=' + gaKey + '&time=' + new Date().getTime()}}/>
            </View>
            <List>
              <InputItem
                value={gaCode}
                onChange={v => this.setState({
                  gaCode: v
                })}
                placeholder="请输入谷歌动态密码"
                labelNumber={6}
              >
                谷歌动态密码
              </InputItem>
              <InputItem
                value={password}
                onChange={v => this.setState({
                  password: v
                })}
                type="password"
                placeholder="请输入资金密码"
                labelNumber={6}
              >
                资金密码
              </InputItem>
            </List>
            <View style={{paddingVertical: 16, alignItems: 'center'}}>
              <Button type="primary" loading={isLoading} style={{width: 220, height: 40}} onPress={this.submitFunc}>
                <Text>确认</Text>
              </Button>
            </View>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userSecurityLevel, userSecurityConfig } = state.common
  let { gaKey } = state.member
  return { userSecurityLevel, userSecurityConfig, gaKey }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) },
    AsetUserSecureConfig: (data) => { dispatch(AsetUserSecureConfig(data)) },
    AsetGaKey: (data) => { dispatch(AsetGaKey(data)) }
  }
}

const BindGoogle = connect(mapStateToProps, mapDispatchToProps)(BindGoogleComp)

export default createStackNavigator({
  BindGoogle: BindGoogle,
  ThirdView: ThirdView
}, {
  initialRouteName: 'BindGoogle',
  headerMode: 'none'
})
