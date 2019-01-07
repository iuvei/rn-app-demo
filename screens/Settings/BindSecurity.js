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
  Picker,
  Toast
} from '@ant-design/react-native'
import { AsetUserSecureLevel } from '../../actions/common'
import { bindSecurity } from '../../api/member'
import { questions } from '../../data/options-data'

class BindSecurity extends React.Component {
  static navigationOptions = {
    title: '绑定密保'
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      quesChoosed: [0, 1, 2],
      questionOne: '',
      questionTwo: '',
      questionThree: '',
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      tradePwd: ''
    }
  }

  submitFunc = () => {
    let { questionOne, questionTwo, questionThree, answerOne, answerTwo, answerThree, tradePwd } = this.state
    if (questionOne === '' || questionTwo === '' || questionThree === '' ||
    answerOne === '' || answerTwo === '' || answerThree === '' ||
    tradePwd === '') {
      Toast.info('请先完善相关信息')
      return
    }
    this.setState({
      isLoading: true
    })
    bindSecurity({ questionOne, questionTwo, questionThree, answerOne, answerTwo, answerThree, tradePwd }).then((res) => {
      this.setState({
        isLoading: false
      })
      if (res.code === 0) {
        Toast.success(res.message || '已绑定密保成功')
        this.props.AsetUserSecureLevel()
      } else {
        Toast.fail(res.message || '网络异常，请稍后重试')
      }
    })
  }

  render() {
    let { questionOne, questionTwo, questionThree, answerOne, answerTwo, answerThree, tradePwd, quesChoosed, isLoading } = this.state
    let { userSecurityLevel, userSecurityConfig } = this.props

    return (
      <View>
        <WhiteSpace size="sm" />
        {
          (userSecurityLevel.isQuestion && userSecurityConfig.questionSwitch) ? <List>
            <List.Item
              thumb={<Icon name="heart" color="#333333" size={20}/>}
              extra={<Button type="warning" size="small">解绑</Button>}
            >
              <Text style={{color: '#333333', paddingLeft: 6}}>已绑定</Text>
            </List.Item>
          </List> :
          <View>
            <List>
              <Picker
                data={questions}
                cols={1}
                value={''}
                itemStyle={{color: '#333333', fontSize: 14, lineHeight: 26}}
                onChange={(val) => {
                  this.setState({
                    questionOne: val[0]
                  })
                }}
              >
                <List.Item
                  arrow="horizontal"
                ><Text>问题一：{questionOne}</Text></List.Item>
              </Picker>
              <InputItem
                value={answerOne}
                onChange={v => this.setState({
                  answerOne: v
                })}
                placeholder=""
                labelNumber={4}
              >
                答案
              </InputItem>
              <Picker
                data={questions}
                cols={1}
                itemStyle={{color: '#333333', fontSize: 14, lineHeight: 26}}
                value={''}
                onChange={(val) => {
                  this.setState({
                    questionTwo: val[0]
                  })
                }}
              >
                <List.Item
                  arrow="horizontal"
                ><Text>问题二：{questionTwo}</Text></List.Item>
              </Picker>
              <InputItem
                value={answerTwo}
                onChange={v => this.setState({
                  answerTwo: v
                })}
                placeholder=""
                labelNumber={4}
              >
                答案
              </InputItem>
              <Picker
                data={questions}
                cols={1}
                itemStyle={{color: '#333333', fontSize: 14, lineHeight: 26}}
                value={''}
                onChange={(val) => {
                  this.setState({
                    questionThree: val[0]
                  })
                }}
              >
                <List.Item
                  arrow="horizontal"
                ><Text>问题三：{questionThree}</Text></List.Item>
              </Picker>
              <InputItem
                value={answerThree}
                onChange={v => this.setState({
                  answerThree: v
                })}
                placeholder=""
                labelNumber={4}
              >
                答案
              </InputItem>
              <InputItem
                type="password"
                value={tradePwd}
                onChange={v => this.setState({
                  tradePwd: v
                })}
                placeholder="请输入资金密码"
                labelNumber={4}
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
    AsetUserSecureLevel: (data) => dispatch(AsetUserSecureLevel(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindSecurity)
