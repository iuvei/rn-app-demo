import React from 'react'
import {connect} from 'react-redux'
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TouchableHighlight
} from 'react-native'
import {
  Button,
  Icon,
  Text
} from 'native-base'
// import {MyIconFont} from '../../components/MyIconFont'
import SvgIcon from '../../components/SvgIcon'
import {minbankCodeMap} from '../../constants/glyphMapHex'
import {
  AsetUserBankCards
} from '../../actions/member'

class BankManager extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: '银行卡管理'
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
    props.AsetUserBankCards(props.loginInfo.acc.user.userId)
  }

  render() {
    let {userBankCards} = this.props.userBankInfo

    if (userBankCards.length === 0) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{height: 60, backgroundColor: '#ffffff', width: '100%'}}></View>
          <Image source={require('../../assets/images/nobank.jpg')} style={{height: 330, width: '100%'}} />
          <View style={{width: '100%', backgroundColor: '#f7f7f7', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Button onPress={() => this.props.navigation.navigate('AddBankcard')} iconLeft bordered>
              <Icon name='add' />
              <Text>添加银行卡</Text>
            </Button>
          </View>
        </View>
      )
    } else {
      let banks = userBankCards.map((item, idx) => {
        let bgimg = null
        let statustxt = ''
        switch (idx%3) {
          case 0:
            bgimg = require('../../assets/images/bankitembg1.png')
            break
          case 1:
            bgimg = require('../../assets/images/bankitembg2.png')
            break
          case 2:
            bgimg = require('../../assets/images/bankitembg3.png')
            break
          default:
            bgimg = require('../../assets/images/bankitembg3.png')
            break
        }
        switch (item.status) {
          case -1:
            statustxt = '已删除'
            break
          case 0:
            statustxt = '有效'
            break
          case 1:
            statustxt = '审核中'
            break
          case 2:
            statustxt = '已注销'
            break
        }
        return (
          <View style={styles.bankItem} key={item.bankCard}>
            <ImageBackground style={{width: '100%', height: 115}} source={bgimg}>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginLeft: 25, marginTop: 12, width: 40, height: 40, borderRadius: 40, backgroundColor: '#ffffff', alignItems: 'center'}}>
                  <SvgIcon icon={minbankCodeMap[String(item.bankCode).toUpperCase()]+'_min'} size={30} style={{marginTop: 5}} />
                </View>
                <Text style={{marginTop: 16, marginLeft: 16, color: '#ffffff'}}>{item.bankName}</Text>
              </View>
              <Text style={styles.statuBtn}>{statustxt}</Text>
              <Text style={{marginLeft: 28, marginTop: 16, color: '#ffffff', fontSize: 16}}>{String(item.bankCard).slice(0, 4) + '  ****  ****  ' + String(item.bankCard).slice(-4)}</Text>
              <Text style={styles.bankTypeTxt}>{item.bankType ? '信用卡' : '借记卡'}</Text>
            </ImageBackground>
          </View>
        )
      })

      return (
        <ScrollView>
          <View>
            {banks}
          </View>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('AddBankcard')}>
            <View style={{...styles.bankItem, backgroundColor: '#ffffff', borderRadius: 5, alignItems: 'center', marginBottom: 50}}>
              <Image source={require('../../assets/images/addIconPng.png')} style={{width: 72, height: 72, marginTop: 8}}/>
              <Text style={{fontSize: 14, color: '#333333'}}>添加银行卡</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      )
    }
  }
}

const mapStateToProps = (state, props) => {
  let {loginInfo} = state.common
  let {userBankInfo} = state.member
  return {
    loginInfo,
    userBankInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserBankCards: data => dispatch(AsetUserBankCards(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankManager)

const styles = StyleSheet.create({
  bankItem: {
    width: '92%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 115,
    marginTop: 10,
    position: 'relative',
  },
  statuBtn: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 50,
    lineHeight: 25,
    borderWidth: 0.5,
    borderColor: '#ffffff',
    borderRadius: 5,
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center'
  },
  bankTypeTxt: {
    position: 'absolute',
    right: 32,
    bottom: 14,
    fontSize: 12,
    color: '#ffffff'
  }
})
