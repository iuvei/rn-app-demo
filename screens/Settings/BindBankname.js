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
import $Toast from '../../plugin/$Toast'
import { bindBankName } from '../../api/member'
import {
  AsetUserSecureLevel,
  AsetUserSecureConfig
} from '../../actions/common'

class BindBankname extends React.Component {
  static navigationOptions = {
    title: '银行卡姓名'
  }

  constructor(props) {
    super(props)
    this.state = {
      bankName: ''
    }
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  submitFunc = () => {
    let { bankName } = this.state
    if (bankName === '') {
      $Toast.info('请先完善相关信息')
      return
    }
    this.setState({
      isLoading: true
    }, () => {
      bindBankName({bankName}).then((res) => {
        if (res.code === 0) {
          this.props.AsetUserSecureLevel()
          $Toast.success('绑定银行卡姓名成功')
        } else {
          $Toast.fail(res.message || '网络异常，请稍后重试')
        }
        this.setState({
          bankName: '',
          isLoading: false
        })
      })
    })
  }

  render() {
    let { bankName, isLoading } = this.state
    let { userSecurityLevel, userSecurityConfig } = this.props

    return (
      <View>
        <WhiteSpace size="sm" />
        {
          (userSecurityLevel.isBankUserName) && <List>
            <List.Item
              thumb={<Icon name="heart" color="#333333" size={20}/>}
              extra={userSecurityConfig.bankNamePwdSwitch && <Button type="warning" size="small" onPress={() => {
                this.props.navigation.navigate('UnbindSet', {title: '解绑银行卡姓名', type: 'userbankname'})
              }}>解绑</Button>}
            >
              <Text style={{color: '#333333', paddingLeft: 6}}>已绑定</Text>
            </List.Item>
          </List>
        }
        { !userSecurityLevel.isBankUserName &&
          <View>
            <List>
              <InputItem
                value={bankName}
                onChange={v => this.setState({
                  bankName: v
                })}
                placeholder="请输入银行卡姓名"
                labelNumber={5}
              >
                银行卡姓名
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
  return { userSecurityLevel, userSecurityConfig }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) },
    AsetUserSecureConfig: (data) => { dispatch(AsetUserSecureConfig(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindBankname)
