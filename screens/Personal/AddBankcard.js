import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import {
  Provider,
  InputItem,
  Icon,
  Picker,
  List
} from '@ant-design/react-native'
import {
  Button
} from 'native-base'
import {
  Ionicons
} from '@expo/vector-icons'
import { AsetSysBanklist } from '../../actions/common'

const data = require('../../data/address.json')

class AddBankcard extends React.Component {
  static navigationOptions = {
    title: '新增银行卡'
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      address: [],
      curBank: [],
      bankBranch: '',
      bankCard: '',
      bankAddress: '',
      regbankCardNumber: '',
      pwd: '',
      bankCode: '',
      bankWebsite: '',
      isDefault: 1
    }
    props.AsetSysBanklist()
  }

  render() {
    let { sysBankList } = this.props
    let { bankAddress, bankWebsite, bankCard, regbankCardNumber, bankBranch, pwd } = this.state

    return (
      <Provider>
        <View style={{paddingHorizontal: 15, paddingVertical: 10, flex: 1, backgroundColor: '#f0f0f0'}}>
          <View style={styles.inputItem}>
            <Picker
              data={sysBankList.map((item, index) => {
                return {...item, value: index, label: item.bankName}
              })}
              cols={1}
              value={''}
              onChange={(v) => {
                this.setState({
                  curBank: v,
                  bankBranch: sysBankList[v].bankName,
                  bankCode: sysBankList[v].bankCode
                })
              }}
              extra={<Ionicons name="ios-arrow-dropright" size={20} color="#999999"/>}
            >
              <List.Item style={{paddingLeft: 0, marginLeft: 0, width: '100%', height: 44, lineHeight: 43}}>
                <InputItem
                  value={bankBranch}
                  placeholder="请选择开户银行"
                  editable={false}
                  style={{borderBottomWidth: 0}}
                >
                  <Icon name="bank" color="#016fca" size={24}/>
                </InputItem>
              </List.Item>
            </Picker>
          </View>
          <View style={styles.inputItem}>
            <Picker
              data={data}
              cols={3}
              value={''}
              onChange={(v) => {
                this.setState({
                  bankAddress: v.join('-'),
                  address: v
                })
              }}
              extra={<Ionicons name="ios-arrow-dropright" size={20} color="#999999"/>}
            >
              <List.Item style={{paddingLeft: 0, marginLeft: 0, width: '100%', height: 44, lineHeight: 43}}>
                <InputItem
                  value={bankAddress}
                  placeholder="请选择省份城市"
                  editable={false}
                  style={{borderBottomWidth: 0}}
                >
                  <Icon name="table" color="#016fca" size={24}/>
                </InputItem>
              </List.Item>
            </Picker>
          </View>
          <View style={styles.inputItem}>
            <InputItem
              value={bankWebsite}
              style={{borderBottomWidth: 0}}
              onChange={(v) => {
                this.setState({
                  bankWebsite: v
                })
              }}
              placeholder="请输入开户网点"
            >
              <Ionicons name="md-locate" color="#016fca" size={24}/>
            </InputItem>
          </View>
          <View style={styles.inputItem}>
            <InputItem
              value="XX持卡人姓名XX"
              style={{borderBottomWidth: 0}}
              editable={false}
            >
              <Icon name="user" color="#016fca" size={24}/>
            </InputItem>
          </View>
          <View style={styles.inputItem}>
            <InputItem
              value={bankCard}
              style={{borderBottomWidth: 0}}
              placeholder="请输入银行卡号"
              type="number"
              onChange={(v) => this.setState({
                bankCard: v
              })}
            >
              <Ionicons name="md-card" color="#016fca" size={24}/>
            </InputItem>
          </View>
          <View style={styles.inputItem}>
            <InputItem
              value={regbankCardNumber}
              style={{borderBottomWidth: 0}}
              placeholder="请再次输入银行卡号"
              type="number"
              onChange={(v) => this.setState({
                regbankCardNumber: v
              })}
            >
              <Ionicons name="md-card" color="#016fca" size={24}/>
            </InputItem>
          </View>
          <View style={styles.inputItem}>
            <InputItem
              value={pwd}
              style={{borderBottomWidth: 0}}
              placeholder="请输入资金密码"
              type="password"
              onChange={(v) => this.setState({
                pwd: v
              })}
            >
              <Icon name="lock" color="#016fca" size={24}/>
            </InputItem>
          </View>
          <Button full small rounded info>
            <Text style={{color: '#ffffff'}}>添加银行卡</Text>
          </Button>
        </View>
      </Provider>
    )
  }  
}

const mapStateToProps = (state, props) => {
  let {sysBankList} = state.common
  return {
    sysBankList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetSysBanklist: data => dispatch(AsetSysBanklist(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBankcard)

const styles = StyleSheet.create({
  inputItem: {
    marginBottom: 6,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    borderRadius: 4,
    height: 44,
    lineHeight: 44,
    overflow: 'hidden'
  }
})
