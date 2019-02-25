import React from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView
} from 'react-native'
import {
  Ionicons
} from '@expo/vector-icons'
import { List, WhiteSpace, Button, Modal, Toast, Icon } from '@ant-design/react-native'
import {
  AsetUserSecureLevel,
  AsetUserSecureConfig,
  setLoginStatus,
  setShowFloatBall,
  AsetSoundType,
  AsetAudioSwitch
} from '../actions/common'
import { loginOut } from '../api/basic'
import { WebBrowser, Constants } from 'expo'
import { host, DEV } from '../api.config'
import AudioPlay from '../components/AudioPlay'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '设置'
  }

  constructor(props) {
    super(props)
    this.state = {
      audioChecked: true,
      soundType: {type: ''}
    }
    props.AsetUserSecureLevel()
    props.AsetUserSecureConfig()
  }

  signOut = () => {
    Modal.alert('再玩一会呗?', '', [
      {
        text: '好呀~',
        onPress: () => {console.log('cancel')},
        style: 'cancel',
      },
      { text: '下次吧', onPress: () => {
        loginOut().then((res) => {
          if (res.code === 0) {
            Toast.success('退出成功')
            this.props.setLoginStatus(false)
            this.props.navigation.navigate('AppLoading')
          } else {
            if (res.code === -200012 || res.code === -200010 || res.code === -200011 || res.code === -200014 || res.code === -20000) {
              this.props.setLoginStatus(false)
              // this.props.navigation.navigate('AppLoading')
            } else {
              Toast.fail('退出失败')
            }
          }
        })
      } },
    ])
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(host+'/app/#/download')
    console.log(result)
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  render() {
    let { audioChecked } = this.state

    return (
      <ScrollView style={{flex: 1}}>
        <WhiteSpace size="sm" />
        <List>
          <List.Item
            thumb={<Icon name="edit" size={20} color="#333333"/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('UpdateNickname')}
          >
            <Text style={styles.itemTxt}>修改昵称</Text>
          </List.Item>
          <List.Item
            thumb={<Icon name="star" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('UpdatePwd', {title: '登录密码', type: 'login'})}
          >
            <Text style={styles.itemTxt}>修改登录密码</Text>
          </List.Item>
          <List.Item
            thumb={<Icon name="hdd" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('UpdatePwd', {title: '资金密码', type: 'paypwd'})}
          >
            <Text style={styles.itemTxt}>资金密码</Text>
          </List.Item>
          <List.Item
            thumb={<Icon name="alipay-circle" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('BindAliname')}
          >
            <Text style={styles.itemTxt}>支付宝</Text>
          </List.Item>
          <List.Item
            thumb={<Icon name="key" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('BindSecurity')}
          >
            <Text style={styles.itemTxt}>密码保护</Text>
          </List.Item>
          <List.Item
            thumb={<Icon name="google" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('BindGoogle')}
          >
            <Text style={styles.itemTxt}>谷歌验证</Text>
          </List.Item>
          <List.Item
            thumb={<Icon name="smile" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('BindBankname')}
          >
            <Text style={styles.itemTxt}>银行卡姓名</Text>
          </List.Item>
          <List.Item
            thumb={<Ionicons name="md-card" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={() => this.props.navigation.navigate('BankManager')}
          >
            <Text style={styles.itemTxt}>银行卡管理</Text>
          </List.Item>
        </List>
        <WhiteSpace size="sm" />
        <List>
          <List.Item
            thumb={<Ionicons name="ios-musical-notes" color="#333333" size={20}/>}
            extra={
              <Switch
                value={audioChecked}
                onValueChange={(v) => {
                  this.setState({
                    audioChecked: v,
                  })
                  this.props.AsetAudioSwitch(v)
                  this.props.AsetSoundType({type: ''})
                }}
                trackColor={{true: '#05bde1'}}
                thumbColor={'#ffffff'}
              />
            }
          >
            <Text style={styles.itemTxt}>倒计时音效开关</Text>
          </List.Item>
        </List>
        <WhiteSpace size="sm" />
        <List>
          <List.Item
            thumb={<Ionicons name="ios-basketball" color="#333333" size={20}/>}
            extra={
              <Switch
                value={this.props.showFloatBall}
                onValueChange={(v) => {
                  this.props.setShowFloatBall(v)
                }}
                trackColor={{true: '#05bde1'}}
                thumbColor={'#ffffff'}
              />
            }
          >
            <Text style={styles.itemTxt}>显示悬浮球</Text>
          </List.Item>
        </List>
        <WhiteSpace size="sm" />
        <List>
          <List.Item
            thumb={<Icon name="book" color="#333333" size={20}/>}
            extra={<Text>{'v' + Constants.manifest.version}</Text>}>
            <Text style={styles.itemTxt}>版本信息 {DEV?'Base':null} </Text>
          </List.Item>
          <List.Item
            thumb={<Ionicons name="md-download" color="#333333" size={20}/>}
            arrow="horizontal"
            onPress={this._handlePressButtonAsync}
          >
            <Text style={styles.itemTxt}>APP下载</Text>
          </List.Item>
        </List>
        <View style={{paddingHorizontal: 22, paddingVertical: 32}}>
          <Button type="warning" onPress={this.signOut}>退出登录</Button>
        </View>
        <AudioPlay soundType={this.state.soundType}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { showFloatBall } = state.common
  return ({
    showFloatBall
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserSecureLevel: (data) => { dispatch(AsetUserSecureLevel(data)) },
    AsetUserSecureConfig: (data) => { dispatch(AsetUserSecureConfig(data)) },
    setLoginStatus: (data) => { dispatch(setLoginStatus(data)) },
    setShowFloatBall: (data) => { dispatch(setShowFloatBall(data)) },
    AsetAudioSwitch: (data) => { dispatch(AsetAudioSwitch(data)) },
    AsetSoundType: (data) => { dispatch(AsetSoundType(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

const styles = StyleSheet.create({
  itemTxt: {
    color: '#333333',
    fontSize: 14,
    paddingLeft: 8
  }
})
