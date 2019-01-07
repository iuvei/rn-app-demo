import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'
import {
  WhiteSpace,
  List,
  InputItem,
  Button,
  Toast,
  Icon
} from '@ant-design/react-native'
import { bindAliName } from '../../api/member'
import {
  AsetUserSecureLevel,
  AsetUserSecureConfig
} from '../../actions/common'

class BindAliname extends React.Component {
  static navigationOptions = {
    title: '支付宝'
  }

  constructor(props) {
    super(props)
    this.state = {
      alipayName: '',
      alipayAccount: ''
    }
  }

  submitFunc = () => {
    let { alipayName, alipayAccount } = this.state
    if (alipayName === '' || alipayAccount === '') {
      Toast.info('请先完善相关信息')
      return
    }
    bindAliName({ alipayName, alipayAccount }).then(res => {
      if (res.code === 0) {
        Toast.success(res.message)
      } else {
        Toast.fail(res.message)
      }
      this.props.AsetUserSecureLevel()
      this.props.AsetUserSecureConfig()
    })
  }

  render() {
    let { alipayName, alipayAccount } = this.state
    let { userSecurityLevel, userSecurityConfig } = this.props

    return (
      <View>
        <WhiteSpace size="sm" />
        {
          (userSecurityLevel.alipay && userSecurityConfig.alipaySwitch) ? <List>
            <List.Item
              thumb={<Icon name="heart" color="#333333" size={20}/>}
              extra={<Button type="warning" size="small">解绑</Button>}
            >
              <Text style={{color: '#333333', paddingLeft: 6}}>已绑定</Text>
            </List.Item>
          </List> :
          <View>
            <List>
              <InputItem
                value={alipayName}
                onChange={v => this.setState({
                  alipayName: v
                })}
                placeholder="请输入支付宝姓名"
                labelNumber={5}
              >
                支付宝姓名
              </InputItem>
              <InputItem
                value={alipayAccount}
                onChange={v => this.setState({
                  alipayAccount: v
                })}
                placeholder="请输入支付宝账号"
                labelNumber={5}
              >
                支付宝账号
              </InputItem>
            </List>
            <View style={{paddingVertical: 16, alignItems: 'center'}}>
              <Button type="primary" style={{width: 220, height: 40}} onPress={this.submitFunc}>
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
  return { userSecurityLevel, userSecurityConfig }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) },
    AsetUserSecureConfig: (data) => { dispatch(AsetUserSecureConfig(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindAliname)
