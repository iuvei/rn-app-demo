import React from 'react'
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Toast, Flex, TextareaItem, Modal, WhiteSpace } from '@ant-design/react-native'
import $Toast from '../../plugin/$Toast'
import { chatDetail, replyMessage } from './../../api/member'
import dayjs from 'dayjs'
import { connect } from "react-redux";

class ReplyEmail extends React.Component {
  constructor(props) {
    super (props);
    this.onChange = replyContent => {
      this.setState({ replyContent });
    };
    this.state = {
      main: {},
      replyContent: '',
      chatDetail: []
    }
  }

  componentDidMount() {
    this.getMsgDetail()
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  getMsgDetail = () => {
    let {messageId, messageAddress} = this.props.replyData
    chatDetail({messageId,messageAddress}).then(res => {
      if (res.code === 0) {
        this.setState({
          main: res.data,
          chatDetail: res.data.replyInfoVO
        })
      }
    })
  }

  replyMessage = () => {
    let { replyData } = this.props
    let { replyContent } = this.state
    if (replyData.messageType !== 1) {
      return false
    }
    if (!replyContent) {
      $Toast.info('请输入信息内容')
      return false
    }
    let obj = {
      ...replyData,
      replyContent
    }
    replyMessage(obj).then(res => {
      if (res.code === 0) {
        $Toast.success(res.message)
        let obj = {
          replyTime: +new Date(),
          replyName: this.props.loginInfo.acc.user.loginName || '--',
          replyContent: replyContent
        }
        this.setState((prevState) => {
          return {
            chatDetail: [...prevState.chatDetail,obj],
            replyContent: ''
          }
        })
        // this.props.closeReModal()
      }
    })
  }

  render() {
    let {main, chatDetail} = this.state
    let {replyData} = this.props
    const footerButton1 = [
      { text: '关闭', onPress: () => this.props.closeReModal() },
      { text: '回复', onPress: () => this.replyMessage() },
    ];
    const footerButton2 = [
      { text: '关闭', onPress: () => this.props.closeReModal() }
    ]
    return (
      <Modal
        title="详情"
        transparent
        visible={this.props.show}
        footer={replyData.messageType !== 1 ? footerButton2: footerButton1}
      >
        <View>
        <View>
          <Flex>
            <Text>{main.senderName}</Text>
            <Text style={{paddingLeft: 10}}>{dayjs(main.sendeTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
          </Flex>
          <Text>{main.content}</Text>
        </View>
        <View>
          {
            chatDetail.map((item, index) => {
              return(
                <View key={index}>
                  <Flex>
                    <Text>{item.replyName}</Text>
                    <Text style={{paddingLeft: 10}}>{dayjs(item.replyTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                  </Flex>
                  <Text>{item.replyContent}</Text>
                </View>
              )
            })
          }
        </View>
        <View>
          {
            replyData.messageType !== 1 ? null :
              <View>
                <WhiteSpace size="lg" />
                <Text>回复：</Text>
                <TextareaItem
                  rows={10}
                  placeholder="写点什么呢"
                  value={this.state.replyContent}
                  onChange={this.onChange}
                  onSubmitEditing={Keyboard.dismiss}
                  autoHeight />
              </View>
          }
        </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
  let {loginInfo} = state.common
  return ({
    loginInfo,
  })
}
export default connect(
  mapStateToProps,
)(ReplyEmail)
