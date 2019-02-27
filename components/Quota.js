import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {getUserQuotaList, updateQuato} from '../api/member'
import {InputItem, SegmentedControl, Flex, Button, Toast} from '@ant-design/react-native'
import {Picker} from 'native-base'

export default class Quota extends React.Component {
  state = {
    quotaList: [],
    childQuotaList: {},
    quotaId: 0,
    quotaNumber: '',
    quotaType: 0
  }

  componentDidMount () {
    this._getUserQuotaList()
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  _getUserQuotaList = async () => {
    let res = await getUserQuotaList()
    let {subUserInfo} = this.props
    if (res.code === 0) {
      let {childUserRebateInfoList, userQuotaInfo} = res.data || {}
      let downuser = childUserRebateInfoList.filter(item => {
        return subUserInfo.loginName === item.loginName && item.rebateType === 0
      })
      this.setState({
        quotaList: userQuotaInfo.userQuotaList || [],
        childQuotaList: downuser[0]
      })
    }
  }

  _updateQuato = () => {
    let {quotaId, quotaNumber, quotaType} = this.state
    if (!quotaNumber) {
      Toast.info('请输入配额', 1, undefined, false)
      return false
    }
    let type = quotaType === 0 ? 'add' : 'sub'
    let {subUserInfo, loginInfo} = this.props
    let params = {
      userId: loginInfo.userId,
      subordinateId: subUserInfo.userId,
      updateQuotaList: [{
        type,
        quotaId,
        quotaNumber
      }]
    }
    updateQuato(params).then(res => {
      if (res.code === 0) {
        Toast.info('修改成功！', 1, undefined, false)
        this._getUserQuotaList()
        this.setState({
          quotaNumber: '',
          quotaType: 0
        })
      } else {
        Toast.info(res.message, 1, undefined, false)
      }
    })
  }

  render () {
    let {quotaList, childQuotaList} = this.state
    let {userQuotas} = childQuotaList || {}
    let downQuota = JSON.parse(userQuotas || '{}')
    if (quotaList.length === 0) {
      return (
        <View>
          <Text style={{color: '#f15a23', fontSize: 14, lineHeight: 32, textAlign: 'center'}}>没有开户权限，请联系管理员处理</Text>
        </View>
      )
    }
    return (
      <View>
        <View style={styles.textArea}>
          <Flex direction={'row'} style={styles.userType}>
            <Text style={{fontSize: 16}}>操作类型</Text>
            <SegmentedControl selectedIndex={this.state.quotaType} values={['增加', '回收']}
                              style={{width: 100, marginLeft: 50}} onChange={e => {
              this.setState({quotaType: e.nativeEvent.selectedSegmentIndex})
            }}/>
          </Flex>
          <Flex direction={'row'} style={styles.userType}>
            <Text style={{fontSize: 16}}>配额区段</Text>
            <Picker selectedValue={this.state.quotaId}
                    onValueChange={value => this.setState({
                      quotaId: value
                    })} style={{width: 180, height: 30, marginLeft: 15, marginRight: 20}}
                    mode="dropdown">
              {
                quotaList.map((item, index) => {
                  let label = item.minRebate + ' ~ ' + item.maxRebate
                  return (
                    <Picker.Item key={index} label={label} value={item.quotaId}/>
                  )
                })
              }
            </Picker>
          </Flex>
          <InputItem
            clear
            type="number"
            value={this.state.quotaNumber}
            placeholder="设置该区段开户额"
            onChange={value => {
              this.setState({
                quotaNumber: value
              })
            }}
          >
            配额数
          </InputItem>
        </View>
        <Button size={'large'} type={'primary'} onPress={this._updateQuato}>确定</Button>
        <View style={styles.table}>
          <View style={styles.column}>
            <Text style={styles.cell}>开户区段</Text>
            <Text style={styles.cell}>剩余开户额</Text>
            <Text style={styles.cell}>已用开户额</Text>
            <Text style={styles.cell}>下级开户额</Text>
          </View>
          {
            quotaList.map((item, index) => {
              return (
                <View key={index} style={styles.column}>
                  <Text style={styles.cell}>{item.minRebate + '~' + item.maxRebate}</Text>
                  <Text style={styles.cell}>{item.number}</Text>
                  <Text style={styles.cell}>{item.usedNumber}</Text>
                  <Text style={styles.cell}>{downQuota?.userQuotaList[index]?.number || 0}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderColor: '#ededed',
    marginBottom: 10
  },
  table: {
    margin: 5,
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#999',
    padding: 2
  },
  userType: {
    marginLeft: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ededed'
  },
})
