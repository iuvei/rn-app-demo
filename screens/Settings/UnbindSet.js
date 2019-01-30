import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'
import {
  InputItem,
  Picker,
  WhiteSpace,
  List,
  Button,
  Toast,
  Modal
} from '@ant-design/react-native'
import { AsetUserSecureLevel } from '../../actions/common'
import { questions } from '../../data/options'
import { unBindBankName, unBindPayPwd, unBindMiBao, unBindGa, unbindAliName } from '../../api/member'

class UnbindSet extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.getParam('title', '解绑安全设置')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      columns: [{
        label: '密保问题', valueTxt: 'mbq', value: 0
      }, {
        label: '谷歌验证码', valueTxt: 'gacode', value: 1
      }, {
        label: '银行卡姓名', valueTxt: 'yhkxm', value: 2
      }, {
        label: '支付宝姓名', valueTxt: 'zfbxm', value: 3
      }],
      selectType: 0,
      isLoading: false,
      question: '',
      answer: '',
      pwd: '',
      userName: '',
      gaPassword: '',
      alipayName: ''
    }
    props.AsetUserSecureLevel()
  }

  componentWillReceiveProps(nextProps) {
  }

  submitFunc = () => {
    let { pwd, answer, userName, gaPassword, alipayName, question, selectType, columns } = this.state
    let type = this.props.navigation.getParam('type', '')

    if (pwd === '') {
      Toast.info('请完善数据后重试')
      return
    }
    if (columns[selectType].valueTxt === 'mbq') {
      if (question === '' || answer === '') {
        Toast.info('请完善数据后重试')
        return
      }
    }
    if (type !== 'paypwd' && answer === '' && userName === '' && gaPassword === '' && alipayName === '') {
      Toast.info('请完善数据后重试')
      return
    }
    Modal.alert('您确认解绑吗?', '', [
      {
        text: '取消',
        onPress: () => {console.log('cancel')},
        style: 'cancel',
      },
      { text: '确认', onPress: () => {
        switch (type) {
          case 'bankname':
            unBindBankName({ pwd, answer, userName, gaPassword, alipayName, question }).then(res => {
              this.callBack(res)
              // setTimeout(() => {
              //   this.AgetUserBankcards()
              // }, 200)
            })
            break
          case 'paypwd':
            unBindPayPwd({ pwd }).then(res => {
              this.callBack(res)
            })
            break
          case 'security':
            unBindMiBao({ pwd, answer, userName, gaPassword, alipayName, question }).then(res => {
              this.callBack(res)
            })
            break
          case 'ga':
            unBindGa({ pwd, answer, userName, gaPassword, alipayName, question }).then(res => {
              this.callBack(res)
            })
            break
          case 'aliname':
            unbindAliName({ pwd, answer, userName, gaPassword, alipayName, question }).then(res => {
              this.callBack(res)
            })
            break
        }
      } },
    ])
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  callBack = (res) => {
    if (res.code === 0) {
      Toast.success('解绑成功')
      this.props.AsetUserSecureLevel()
      this.setState({
        question: '',
        answer: '',
        pwd: '',
        userName: '',
        gaPassword: '',
        alipayName: ''
      })
    } else {
      Toast.fail(res.message || '网络异常，请稍后重试')
    }
  }

  render() {
    let { columns, pwd, answer, userName, gaPassword, alipayName, question, selectType, isLoading } = this.state

    return (
      <View>
        <WhiteSpace size="sm" />
        <List>
          <Picker
            data={columns}
            cols={1}
            itemStyle={{color: '#333333', fontSize: 14, lineHeight: 26}}
            value={[columns[selectType].value,]}
            onChange={(val) => {
              this.setState({
                selectType: val[0],
                question: '',
                answer: '',
                pwd: '',
                userName: '',
                gaPassword: '',
                alipayName: ''
              })
            }}
          >
            <List.Item
              arrow="horizontal"
            ><Text>选择类型：</Text></List.Item>
          </Picker>
          {
            columns[selectType].valueTxt === 'mbq' &&
            <View>
              <Picker
                data={questions}
                cols={1}
                value={[question,]}
                itemStyle={{color: '#333333', fontSize: 14, lineHeight: 26}}
                onChange={(val) => {
                  this.setState({
                    question: val[0]
                  })
                }}
              >
                <List.Item
                  arrow="horizontal"
                ><Text>密保问题：</Text></List.Item>
              </Picker>
              <InputItem
                value={answer}
                onChange={v => this.setState({
                  answer: v
                })}
                placeholder="请输入密保答案"
                labelNumber={5}
              >
                答案
              </InputItem>
            </View>
          }
          {
            columns[selectType].valueTxt === 'yhkxm' &&
            <InputItem
              value={userName}
              onChange={v => this.setState({
                userName: v
              })}
              placeholder="请输入银行卡姓名"
              labelNumber={5}
            >
              银行卡姓名
            </InputItem>
          }
          {
            columns[selectType].valueTxt === 'zfbxm' &&
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
          }
          {
            columns[selectType].valueTxt === 'gacode' &&
            <InputItem
              value={gaPassword}
              onChange={v => this.setState({
                gaPassword: v
              })}
              placeholder="请输入谷歌验证码"
              labelNumber={5}
            >
              谷歌验证码
            </InputItem>
          }
          <InputItem
            type="password"
            value={pwd}
            onChange={v => this.setState({
              pwd: v
            })}
            placeholder="请输入资金密码"
            labelNumber={5}
          >
            资金密码
          </InputItem>
        </List>
        <View style={{paddingVertical: 16, alignItems: 'center'}}>
          <Button loading={isLoading} type="primary" style={{width: 220, height: 40}} onPress={this.submitFunc}>
            <Text>确认</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userSecurityLevel } = state.common
  return { userSecurityLevel }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => dispatch(AsetUserSecureLevel(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnbindSet)
