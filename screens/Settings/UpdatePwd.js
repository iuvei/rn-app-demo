import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'
import {
  List,
  WhiteSpace,
  Button,
  Icon,
  InputItem
} from '@ant-design/react-native'

class UpdatePwd extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.getParam('title', '密码')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      oldPwd: '',
      newPwd: '',
      rePwd: ''
    }
  }

  render() {
    let { oldPwd, newPwd, rePwd } = this.state
    let { userSecurityConfig, userSecurityLevel, navigation } = this.props
    let type = navigation.getParam('type')

    return (
      <View>
        <WhiteSpace size="sm" />
        {
          (userSecurityLevel.isTradePassword && type === 'paypwd' && userSecurityConfig.bankNamePwdSwitch) &&
          <List>
            <List.Item
              thumb={<Icon name="heart" color="#333333" size={20}/>}
              extra={<Button type="warning" size="small" onPress={() => {
                this.props.navigation.navigate('UnbindSet', {title: '解绑资金密码', type: 'paypwd'})
              }}>解绑</Button>}
            >
              <Text style={{color: '#333333', paddingLeft: 6}}>已绑定</Text>
            </List.Item>
          </List>
        }
        <View style={{padding: 12, backgroundColor: '#f0f0f0'}}>
          <Text style={{color: '#a4a4a4', lineHeight: 24}}>提示：为了提高账号的安全性，请勿设置过于简单的密码：1.密码由8至16个字母和数字和特殊字符(#@!~%^&*)组成；2.密码不能是纯数字或纯字母或纯特殊字符；3.密码不能是系统默认密码（a123456）；4.资金密码不能与登录密码相同</Text>
        </View>
        <List>
          {
            (type === 'login' || userSecurityLevel.isTradePassword) &&
            <InputItem
              type="password"
              value={oldPwd}
              onChange={v => this.setState({
                oldPwd: v
              })}
              placeholder="请输入当前密码"
              labelNumber={5}
            >
              当前密码
            </InputItem>
          }
          <InputItem
            type="password"
            value={newPwd}
            onChange={v => this.setState({
              newPwd: v
            })}
            placeholder="请输入新密码"
            labelNumber={5}
          >
            新密码
          </InputItem>
          <InputItem
            type="password"
            value={rePwd}
            onChange={v => this.setState({
              rePwd: v
            })}
            placeholder="请确认新密码"
            labelNumber={5}
          >
            确认新密码
          </InputItem>
        </List>
        <View style={{paddingVertical: 16, alignItems: 'center'}}>
          <Button type="primary" style={{width: 220, height: 40}}>
            <Text>{(type === 'login' || userSecurityLevel.isTradePassword) ? '修改' : '确认'}</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userSecurityLevel, userSecurityConfig } = state.common
  return { userSecurityConfig, userSecurityLevel }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePwd)
