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
  Toast
} from '@ant-design/react-native'
import { modifyNickName } from '../../api/member'
import { setLoginInfo } from '../../actions/common'
import {
  getLoginUser
} from '../../api/basic'

class UpdateNickname extends React.Component {
  static navigationOptions = {
    title: '修改昵称'
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      nickName: ''
    }
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  submitFunc = () => {
    let { nickName } = this.state
    if (nickName === '') {
      return
    }
    if (String(nickName).length > 8) {
      Toast.info('昵称最长为8个字符')
      return
    }
    this.setState({
      isLoading: true
    }, () => {
      modifyNickName({nickName}).then(res => {
        if (res.code === 0) {
          Toast.success(res.message || '修改昵称成功')
          getLoginUser().then(res => {
            if (res.code === 0) {
              this.props.setLoginInfo(res.data)
            }
          })
        } else {
          Toast.fail(res.message || '网络异常，请稍后重试')
        }
        this.setState({
          isLoading: false,
          nickName: ''
        })
      })
    })
  }

  render() {
    let { nickName, isLoading } = this.state
    let { loginInfo } = this.props

    return (
      <View>
        <WhiteSpace size="sm" />
        <List>
          <InputItem
            value={loginInfo.acc.user.nickName}
            editable={false}
            labelNumber={5}
          >
            当前昵称
          </InputItem>
          <InputItem
            value={nickName}
            onChange={v => this.setState({
              nickName: v
            })}
            placeholder="请输入新昵称"
            labelNumber={5}
          >
            新昵称
          </InputItem>
        </List>
        <View style={{paddingVertical: 16, alignItems: 'center'}}>
          <Button type="primary" loading={isLoading} style={{width: 220, height: 40}} onPress={this.submitFunc}>
            <Text>修改</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { loginInfo } = state.common
  return { loginInfo }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginInfo: data => dispatch(setLoginInfo(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNickname)
