import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {SegmentedControl, InputItem, Flex, Button, Toast, PickerView} from '@ant-design/react-native'
import {Picker} from 'native-base'
import {addDown, addSignup} from '../../../api/member'

const TableRow = 20
const DATE_LENGTH = [
  {value: 1, label: '1天'},
  {value: 1, label: '3天'},
  {value: 1, label: '7天'},
]
class OpenCenter extends React.Component {
  static navigationOptions = {
    title: '开户中心'
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      api: '/user/signupLinkList',
      userName: '',
      userRebate: '',
      isProxy: 0,
      availableTimes: ''
    }
  }

  onChange = e => {
    this.setState({
      selectedIndex: e.nativeEvent.selectedSegmentIndex
    })
  }
  _addDown = () => {
    let {userName, userRebate, isProxy} = this.state
    let {systemMaxRebate, systemMinRebate, userRebateVO} = this.props.rebateInfo
    maxRebate = userRebateVO[0].userRebate < systemMaxRebate ? userRebateVO[0].userRebate : systemMaxRebate
    if (!userName) {
      Toast.info(`请输入账号`)
      return false
    }
    if (!userRebate) {
      Toast.info(`请输入彩票返点`)
      return false
    }
    if (userName.length > 10 || userName.length < 6) {
      Toast.info('请输入大小写字母开头，5-10个字符')
      return false
    }
    if (userRebate > systemMaxRebate) {
      Toast.info(`返点数不能大于${systemMaxRebate}`)
      return false
    }
    if (userRebate < systemMinRebate) {
      Toast.info(`返点数不能小于${systemMinRebate}`)
      return false
    }
    let obj = {
      type: 'post',
      formData: {
        loginname: userName,
        isProxy,
        rebate: userRebate
      }
    }
    addDown(obj).then(res => {
      Toast.info(res.message)
      this.setState({
        userName: '',
        userRebate: ''
      })
    })
  }

  normalRender = () => {
    return (
      <View>
        <View style={styles.normal}>
          <Flex direction={'row'} style={styles.userType}>
            <Text style={{fontSize: 16}}>玩家类型</Text>
            <SegmentedControl selectedIndex={this.state.isProxy} values={['玩家', '代理']} style={{width: 100, marginLeft: 50}} onChange={e => {
              this.setState({isProxy: e.nativeEvent.selectedSegmentIndex})
            }}/>
          </Flex>
          <InputItem
            clear
            value={this.state.userName}
            onChange={userName => {
              this.setState({
                userName,
              })
            }}
            placeholder="5-10位数字或字母，字母开头"
          >
            开户账号
          </InputItem>
          <InputItem
            clear
            last
            type={'number'}
            value={this.state.userRebate}
            onChange={userRebate => {
              this.setState({
                userRebate,
              })
            }}
            placeholder="范围5-14"
          >
            彩票返点
          </InputItem>
        </View>
        <Button size={'large'} type={'primary'} onPress={this._addDown}>确定</Button>
        <View style={{marginTop: 20}}>
          <Text style={styles.hint}>温馨提示</Text>
          <Text style={styles.hint}>自动注册的会员初始密码为“<Text style={{color: 'orange'}}>a123456</Text>”。</Text>
          <Text style={styles.hint}>
            为提高服务器效率，系统将自动清理注册一个月没有充值，或两个月未登录，并且金额低于<Text style={{color: 'orange'}}>10</Text>元的账户。
          </Text>
        </View>
      </View>

    )
  }

  linkRender = () => {
    return (
      <View>
        <View style={styles.normal}>
          <Flex direction={'row'} style={styles.userType}>
            <Text style={{fontSize: 16}}>玩家类型</Text>
            <SegmentedControl selectedIndex={this.state.isProxy} values={['玩家', '代理']} style={{width: 100, marginLeft: 50}} onChange={e => {
              this.setState({isProxy: e.nativeEvent.selectedSegmentIndex})
            }}/>
          </Flex>
          <Flex direction={'row'} style={styles.userType}>
            <Text style={{fontSize: 16}}>链接有效期</Text>
            <Picker mode="dropdown" style={{width: 180, height: 30, marginLeft: 15, marginRight: 20}}>
              <Picker.Item label="1天" value={24} />
              <Picker.Item label="3天" value={24 * 3} />
              <Picker.Item label="7天" value={ 24 * 7} />
              <Picker.Item label="30天" value={ 24 * 30} />
              <Picker.Item label="永久有效" value={0} />
            </Picker>
          </Flex>

          <InputItem
            clear
            type={'number'}
            value={this.state.availableTimes}
            onChange={availableTimes => {
              this.setState({
                availableTimes
              })
            }}
            placeholder="请输入数字"
          >
            使用次数
          </InputItem>
          <InputItem
            clear
            last
            type={'number'}
            value={this.state.userRebate}
            onChange={userRebate => {
              this.setState({
                userRebate,
              })
            }}
            placeholder="范围5-14"
          >
            彩票返点
          </InputItem>
        </View>
        <Button size={'large'} type={'primary'} onPress={this._addDown}>生成链接</Button>
        <View style={{marginTop: 20}}>
          <Text style={styles.hint}>温馨提示</Text>
          <Text style={styles.hint}>生成链接不会立即扣减配额，只有用户使用该链接注册成功的时候，才会扣减配额；</Text>
          <Text style={styles.hint}>请确保您的配额充足，配额不足将造成用户注册不成功！</Text>
        </View>
      </View>
    )
  }

  manageRender = () => {
    return (
      <View>
        <Text>link manage</Text>
      </View>
    )
  }
  render () {
    let contain = ''
    switch (this.state.selectedIndex) {
      case 0:
        contain = this.normalRender()
        break
      case 1:
        contain = this.linkRender()
        break
      case 2:
        contain = this.manageRender()
        break
      default:
        contain = this.normalRender()
    }
    return (
      <View style={styles.container}>
        <SegmentedControl values={['普通开户', '链接开户', '链接管理']} style={styles.segmented} onChange={this.onChange}/>
        {contain}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F0F0F0'
  },
  normal: {
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: '#ededed',
    marginBottom: 30
  },
  userType: {
    marginLeft: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ededed'
  },
  segmented: {
    margin: 12,
    borderRadius: 20,
    fontSize: 16,
    height: 40
  },
  hint: {
    fontSize: 12,
    color: '#aaa'
  }
})

const mapStateToProps = (state) => {
  let {rebateInfo, loginInfo, balanceInfo} = state.common
  return ({
    rebateInfo,
    loginInfo,
    balanceInfo
  })
}

export default connect(mapStateToProps)(OpenCenter)
