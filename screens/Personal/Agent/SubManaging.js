import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {InputItem, Button, Toast} from '@ant-design/react-native'
import {connect} from "react-redux"
import {Tab, Tabs, Header} from 'native-base'
import {setRebate} from '../../../api/member'

class SubManaging extends Component {
  static navigationOptions = {
    title: '下级管理'
  }

  constructor (props) {
    super(props)
    let {loginInfo, subUserInfo} = this.props
    this.state = {
      rebateForm: {
        rebateType: 0,
        rebate: '',
        subordinateId: subUserInfo.userId,
        userId: loginInfo.userId
      }
    }
  }

  // 设置返点
  setRebate = () => {
    setRebate(this.state.rebateForm).then(res => {
      Toast.info(res.message)
    })
  }

  render () {
    let {subUserInfo} = this.props
    let {userPlatform} = subUserInfo
    return (
      <View>
        <View style={styles.info}>
          <Text style={styles.text}>用户:{subUserInfo.loginName}</Text>
          <Text style={styles.text}>彩票返点:{subUserInfo.backPoint}</Text>
          <Text style={styles.text}>快乐彩返点:{subUserInfo.klcRebate}</Text>
          <Text style={styles.text}>百家乐返点:{userPlatform.bjlBackPoint}</Text>
          <Text style={styles.text}>余额:{subUserInfo.balanceFree}</Text>
          <Text
            style={styles.text}>真人/体育/电子/彩票返水:{`${userPlatform.peopleBackWater}/${userPlatform.sportBackWater}/${userPlatform.electronBackWater}/${userPlatform.lotterBackWater}`}</Text>
        </View>
        <View style={{height: 500}}>
          <Tabs tabStyle={{color: '#0070cc'}} activeTabStyle={{backgroundColor: '#eff5fb'}}>
            <Tab heading={'升点'}>
              <View style={{height: 300, padding: 10}}>
                <View style={styles.textArea}>
                  <InputItem
                    clear
                    type={'number'}
                    value={this.state.rebateForm.rebate}
                    onChange={value => {
                      this.setState({
                        rebateForm: {
                          ...this.state.rebateForm,
                          rebate: value
                        }
                      })
                    }}
                  >
                    彩票返点
                  </InputItem>
                </View>
                <Button type={'primary'} onPress={this.setRebate}>确定</Button>
              </View>
            </Tab>
            <Tab heading={'充值'}>

            </Tab>
            <Tab heading={'开户额'}>

            </Tab>
            <Tab heading={'百家乐信息'}>

            </Tab>
            <Tab heading={'契约分红'}>

            </Tab>
            <Tab heading={'百家乐返点'}>

            </Tab>
          </Tabs>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  text: {
    color: '#ccc',
    marginRight: 10
  },
  textArea: {
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: '#ededed',
    marginBottom: 30
  }
})

export default connect(
  (state) => {
    let {subUserInfo} = state.member
    let {loginInfo} = state.common
    return ({
      subUserInfo,
      loginInfo
    })
  }
)(SubManaging)
