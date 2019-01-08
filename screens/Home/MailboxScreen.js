import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Header from './../../components/Header'
import { List, SwipeAction, SegmentedControl, Toast, Flex } from '@ant-design/react-native'
import { delMessage } from './../../api/member'
import UIListView from '../../components/UIListView'
import WriteEmail from './WriteEmail'
import ReplyEmail from './ReplyEmail'
import dayjs from 'dayjs'

class MailboxScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      header: <Header title={'信箱'} navigation={navigation}/>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      tabs: ['收件箱', '发件箱', '写信'],
      activeTab: '收件箱',
      params: {
        searchType: 'receiveMessage',
        pageNumber: 1,
        pageSize: 20
      },
      sendParams: {
        searchType: 'sendMessage',
        pageNumber: 1,
        pageSize: 20
      },
      chatList: [],
      totalCount: 0,
      KeyName: 'Mailbox',
      SendKeyName: 'SendBox',
      api: '/user/message/searchMessage',
      sendApi: '/user/message/sendInboxMessage',
      replyData: {},
      showDetail: false
    }
  }

  onRefresh = async () => {
    await this.setState({refreshing: true}, () => {
      this.setState({refreshing: false})
    })
  }

  renderItem = (item, index) => {
    const right = [
      {
        text: '删除',
        onPress: () => this.remove(item.messageId),
        style: {backgroundColor: 'red', color: 'white'}
      }
    ]
    let {activeTab} = this.state
    return (
      <List key={index}>
        <SwipeAction
          autoClose
          style={{backgroundColor: 'transparent'}}
          right={right}
        >
          <List.Item>
            <Flex onPress={() => this.showDetail(item)}>
              <View style={styles.leftMsg}>
                <Text numberOfLines={1}>
                  {activeTab === '收件箱' ?
                    <Text style={styles.msgOrigin}>{item.senderName}: </Text> : null}
                  <Text>{item.title}</Text>
                </Text>
                {activeTab === '发件箱' ?
                  <Text style={styles.msgOrigin}>{item.receiveName}(收) </Text> : null}
              </View>
              <View>
                <Text style={styles.startTime}>
                  {dayjs(item.sendTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
              </View>
            </Flex>
          </List.Item>
        </SwipeAction>
      </List>
    )
  }

  _getActiveTab = (val) => {
    this.setState({
      activeTab: val
    })
  }

  remove = (messageId) => {
    let { activeTab } = this.state
    let formData = {
      messageId: messageId.toString(),  // 多个消息id用逗号间隔
      delMessageType: activeTab === '收件箱' ? 'receiveBox' : 'sendBox'  // 发件箱删除默认值sendBox,收件箱删除默认为receiveBox
    }
    delMessage(formData).then((res) => {
      if (res.code === 0) {
        Toast.success(res.message)
        this.onRefresh()
      }
    })
  }

  showDetail = item => {
    let { activeTab } = this.state
    let {messageId, senderId, messageType} = item
    let replyData = {
      messageId: messageId,
      messageType,
      replyUserId: senderId,
      messageAddress: activeTab === '收件箱' ? 'receive' : 'send'
    }
    this.setState({
      showDetail: true,
      replyData
    })
  }

  closeReModal = (showDetail = false) => {
    this.setState({
      showDetail
    })
  }

  componentDidMount() {

  }

  render() {
    let {api, params, KeyName, sendApi, sendParams, SendKeyName, activeTab, refreshing, replyData, showDetail} = this.state
    return (
      <View style={styles.container}>
        <View style={{height: 50}}>
          <View style={styles.headerSeg}>
            <SegmentedControl
              style={{width: '70%', height: 30}}
              values={this.state.tabs}
              onValueChange={this._getActiveTab}
            />
          </View>
        </View>
        {
          activeTab === '收件箱' ? <UIListView
            ref={ref => this.MailBox = ref}
            api={api}
            refresh={refreshing}
            type={'get'}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
          /> :
          activeTab === '发件箱' ? <UIListView
            ref={ref => this.MailBox = ref}
            api={sendApi}
            refresh={refreshing}
            type={'get'}
            KeyName={`KeyName-${SendKeyName}`}
            params={sendParams}
            renderItem={this.renderItem}
          /> : <WriteEmail />
        }
        {showDetail ? <ReplyEmail
          show={showDetail}
          replyData={replyData}
          closeReModal={this.closeReModal}
        /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  headerSeg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftMsg: {
    width: '65%'
  },
  startTime: {
    fontSize: 12,
    color: '#666666'
  },
  msgOrigin: {
    fontSize: 12,
    color: '#666666'
  }
})
export default MailboxScreen
