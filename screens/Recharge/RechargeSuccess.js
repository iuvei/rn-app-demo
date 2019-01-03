import React from 'react'
import Header from '../../components/Header'
import { Text, Image, ScrollView, View, WebView, Dimensions } from 'react-native';
import { List, WhiteSpace } from '@ant-design/react-native';
import { Card, Button, Icon, Left, Body, Right, CardItem } from 'native-base'

const height = Dimensions.get('window').height

export default class RechargeSuccess extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log('nav options', this.props.navigation)
  }

  render() {
    const {bankCode, qrCodeSrc, recinfo} = this.props.navigation.state.params
    let {accountName, amount, bankCard, orderAmount, postScript, submitType, url, params, qrCode} = recinfo
    let isQrCode = (bankCode === 'WECHAT_QR' || bankCode === 'ALIPAY_QR' || bankCode === 'WXPAY_QR') && qrCodeSrc

    submitType = 'url'

    return (
      <ScrollView style={{backgroundColor: '#f0f0f0'}}>
        {
          isQrCode && (<View>
            <Card>
              <CardItem>
                <Left>
                  {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
                  <Body>
                    <Text>请您扫码完成充值</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: qrCodeSrc}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
            </Card>
          </View>)
        }
        {
          submitType === 'url' &&
          <View style={{height: height}}>
            <WebView
              // source={{uri: url + '?' + params}}
              source={{uri: 'http://www.baidu.com/'}}
              startInLoadingState={true}
            />
          </View>
        }
        {
          submitType === 'person' && (<List>
            <List.Item extra={accountName} arrow="empty">
              姓名
            </List.Item>
            <List.Item extra={amount+'元'} arrow="empty">
              充值金额
            </List.Item>
            <List.Item extra={<View>
                <Text>{bankCard}</Text>
                <Button iconLeft dark small>
                  <Icon name='cog' />
                  <Text>复制</Text>
                </Button>
              </View>} arrow="empty">
              账号
            </List.Item>
            <List.Item extra={<View style={{width: '90%'}}>
                <Text>{postScript}</Text>
                <Button iconLeft dark small>
                  <Icon name='cog' />
                  <Text>复制</Text>
                </Button>
              </View>} arrow="empty">
              附言
            </List.Item>
          </List>)
        }
        <WhiteSpace size="xl" />
        {
          submitType === 'qr' && <View>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text>请您扫码完成充值</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: 'data:image/png;base64,'+qrCode}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
            </Card>
          </View>
        }
        <List>
          <List.Item arrow="horizontal" onPress={() => {}}>
            充值记录
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => {}}>
            进入游戏
          </List.Item>
          <List.Item arrow="horizontal" onPress={() => {}}>
            联系客服
          </List.Item>
          {
            submitType === 'url' && <List.Item
              arrow="horizontal"
              onPress={() => {}}>
              前往第三方支付
            </List.Item>
          }
        </List>
        <View style={{padding: 12, lineHeight: 24}}>
          <Text style={{color: '#a4a4a4', fontSize: 14}}>充值注意事项：</Text>
          <Text style={{color: '#a4a4a4', fontSize: 14, paddingLeft: 20}}>1.充值时务必填写银行收款人姓名、卡号或邮箱、附言缺一不可。如果是支付宝充值，务必填写支付宝实名认证的真实姓名，填写错误或未填写将不会自动到账。</Text>
          <Text style={{color: '#a4a4a4', fontSize: 14, paddingLeft: 20}}>2.工行充值平台只支持“网银同行汇款”，不支持任何“跨行转账”“ATM机转账”“手机银行”“工行E支付转账”等此类充值一律不给到账处理。</Text>
          <Text style={{color: '#a4a4a4', fontSize: 14, paddingLeft: 20}}>3.平台收款卡“不定时”更换，请每次转账前在本页面查看银行账号。如充值过期卡号，损失有客户自行承担。</Text>
        </View>
      </ScrollView>
    )
  }
}