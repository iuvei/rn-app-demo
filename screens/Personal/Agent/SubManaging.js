import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {InputItem, Button, Toast, Flex} from '@ant-design/react-native'
import {connect} from "react-redux"
import {Tab, Tabs, Picker} from 'native-base'
import {setRebate, downRecharge, updateBaijlWater, updateBaijlRebate, canSignContract} from '../../../api/member'

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
      },
      chargeData: {
        money: '',
        tradePassword: '',
        userId: subUserInfo.userId
      },
      updateWater: {
        bjlWater: '',
        bjlWaterType: 2,
        userId: subUserInfo.userId
      },
      updateRebate: {
        bjlRebate: '',
        rebateType: 2,
        userId: subUserInfo.userId
      },
      isCanSign: {}
    }
  }

  async componentDidMount () {
    let res = await canSignContract()
    if (res.code === 0) {
      this.setState({
        isCanSign: res.data
      })
    }
  }

  // 设置返点
  setRebate = () => {
    setRebate(this.state.rebateForm).then(res => {
      Toast.info(res.message)
    })
  }

  // 下级充值
  downRecharge = () => {
    let {chargeData} = this.state
    if (!chargeData.money) {
      Toast.info('请输入金额')
      return false
    }
    if (!chargeData.tradePassword) {
      Toast.info('请输入密码')
      return false
    }
    downRecharge(this.state.chargeData).then(res => {
      if (res.code === 0) {
        this.setState({
          chargeData: {
            ...chargeData,
            money: '',
            tradePassword: ''
          }
        })
      }
      Toast.info(res.message)
    })
  }

  // 重置充值输入
  resetCharge = () => {
    this.setState({
      chargeData: {
        ...this.setState.chargeData,
        money: '',
        tradePassword: ''
      }
    })
  }

  // 设置下级百家乐返水
  updateDownWater = () => {
    let {bjlWater} = this.state.updateWater
    if (!bjlWater) {
      Toast.info('请输入返水！！！')
      return
    }
    updateBaijlWater(this.state.updateWater).then(res => {
      if (res.code === 0) {
        Toast.info('修改成功')
        this.setState({
          updateWater: {
            ...this.state.updateWater,
            bjlWater: ''
          }
        })
      } else if ((res.code + '') === '-3001') {
        Toast.info('暂未开通')
      } else {
        Toast.info(res.message || '修改失败')
      }
    })
  }

  // 设置下级百家乐返点
  updateDownBjlRebate = () => {
    updateBaijlRebate(this.state.updateRebate).then(res => {
      if (res.code === 0) {
        Toast.info('修改成功')
        this.setState({
          updateRebate: {
            ...this.state.updateRebate,
            bjlRebate: ''
          }
        })
      } else if ((res.code + '') === '-3001') {
        Toast.info('暂未开通')
      } else {
        Toast.info(res.message || '修改失败')
      }
    })
  }

  render () {
    let {subUserInfo} = this.props
    let {userPlatform} = subUserInfo
    let {contractStatus, dailyWages} = this.state.isCanSign
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>用户:{subUserInfo.loginName}</Text>
          <Text style={styles.text}>彩票返点:{subUserInfo.backPoint}</Text>
          <Text style={styles.text}>快乐彩返点:{subUserInfo.klcRebate}</Text>
          <Text style={styles.text}>百家乐返点:{userPlatform.bjlBackPoint}</Text>
          <Text style={styles.text}>余额:{subUserInfo.balanceFree}</Text>
          <Text style={styles.text}>
            真人/体育/电子/彩票返水:{`${userPlatform.peopleBackWater}/${userPlatform.sportBackWater}/${userPlatform.electronBackWater}/${userPlatform.lotterBackWater}`}</Text>
        </View>
        <View style={{height: 500}}>
          <Tabs tabStyle={{color: '#0070cc'}} activeTabStyle={{backgroundColor: '#eff5fb'}}>
            <Tab heading={'升点'}>
              <View style={styles.tab}>
                <View style={styles.textArea}>
                  <InputItem
                    clear
                    type="number"
                    value={this.state.rebateForm.rebate}
                    placeholder={'设置彩票返点'}
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
              {
                subUserInfo.downRecharge === 1 ?
                  <View style={styles.tab}>
                    <View style={styles.textArea}>
                      <InputItem
                        clear
                        type="number"
                        value={this.state.chargeData.money}
                        placeholder="请输入金额"
                        onChange={value => {
                          this.setState({
                            chargeData: {
                              ...this.state.chargeData,
                              money: value
                            }
                          })
                        }}
                      >
                        充值金额
                      </InputItem>
                      <InputItem
                        clear
                        type="password"
                        value={this.state.chargeData.tradePassword}
                        placeholder="请输入资金密码"
                        onChange={value => {
                          this.setState({
                            chargeData: {
                              ...this.state.chargeData,
                              tradePassword: value
                            }
                          })
                        }}
                      >
                        资金密码
                      </InputItem>
                    </View>
                    <Flex direction={'row'} justify={'center'}>
                      <Button style={{flex: 3}} type={'primary'} onPress={this.downRecharge}>确定</Button>
                      <View style={{flex: 1}}></View>
                      <Button style={{flex: 3}} type={'warning'} onPress={this.resetCharge}>重置</Button>
                    </Flex>
                  </View> : <View style={styles.warning}>
                    <Text style={styles.warningText}>不能为该下级充值！</Text>
                  </View>
              }
            </Tab>
            <Tab heading={'开户额'}>
              <Text>开户额</Text>
            </Tab>
            <Tab heading={'百家乐信息'}>
              <View style={styles.tab}>
                <View style={styles.textArea}>
                  <InputItem
                    clear
                    type="number"
                    value={this.state.updateWater.bjlWater}
                    placeholder="返水点数"
                    onChange={value => {
                      this.setState({
                        updateWater: {
                          ...this.state.updateWater,
                          bjlWater: value
                        }
                      })
                    }}
                  >
                    <Picker selectedValue={this.state.updateWater.bjlWaterType}
                            onValueChange={value => this.setState({
                              updateWater: {
                                ...this.state.updateWater,
                                bjlWaterType: value
                              }
                            })}
                            mode="dropdown">
                      <Picker.Item label="真人" value={2}/>
                      <Picker.Item label="体育" value={3}/>
                      <Picker.Item label="电子" value={4}/>
                    </Picker>
                  </InputItem>
                </View>
                <Button type={'primary'} onPress={this.updateDownWater}>确定</Button>
              </View>
            </Tab>
            {
              contractStatus === 1 ? <Tab heading={'契约分红'}>
                <View style={styles.tab}>
                  <View style={styles.textArea}>
                    <InputItem
                      clear
                      type="number"
                      value={this.state.chargeData.money}
                      placeholder="请输入金额"
                      onChange={value => {
                        this.setState({
                          chargeData: {
                            ...this.state.chargeData,
                            money: value
                          }
                        })
                      }}
                    >
                      充值金额
                    </InputItem>
                  </View>
                  <Button type={'primary'} onPress={this.downRecharge}>确定</Button>
                </View>
              </Tab> : null
            }
            {
              dailyWages === 1 ? <Tab heading={'契约工资'}>
                <View style={styles.tab}>
                  <View style={styles.textArea}>
                    <InputItem
                      clear
                      type="number"
                      value={this.state.chargeData.money}
                      placeholder="请输入金额"
                      onChange={value => {
                        this.setState({
                          chargeData: {
                            ...this.state.chargeData,
                            money: value
                          }
                        })
                      }}
                    >
                      充值金额
                    </InputItem>
                  </View>
                  <Button type={'primary'} onPress={this.downRecharge}>确定</Button>
                </View>
              </Tab> : null
            }
            <Tab heading={'百家乐返点'}>
              <View style={styles.tab}>
                <View style={styles.textArea}>
                  <InputItem
                    clear
                    type="number"
                    value={this.state.updateRebate.bjlRebate}
                    placeholder="请输入返点数"
                    labelNumber={5}
                    onChange={value => {
                      this.setState({
                        updateRebate: {
                          ...this.state.updateRebate,
                          bjlRebate: value
                        }
                      })
                    }}
                  >
                    百家乐返点
                  </InputItem>
                </View>
                <Button type={'primary'} onPress={this.updateDownBjlRebate}>确定</Button>
              </View>
            </Tab>
          </Tabs>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dedede'
  },
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
  warning: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  warningText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ccc',
    textAlign: 'center'
  },
  tab: {
    height: 500,
    backgroundColor: '#dedede',
    padding: 10
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
