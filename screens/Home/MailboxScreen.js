import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Header from './../../components/Header'
import { List, SwipeAction, SegmentedControl, Toast, Flex } from '@ant-design/react-native'
import { delMessage, oneKeyRead } from './../../api/member'
import { AsetFreshMsg } from "../../actions/member"
import UIListView from '../../components/UIListView'
import WriteEmail from './WriteEmail'
import ReplyEmail from './ReplyEmail'
import dayjs from 'dayjs'
import { connect } from "react-redux";

class MailboxScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state
    return {
      header: <Header
        title={'信箱'}
        navigation={navigation}
        rightContent={
          <View>
            {
              params && params.activeTab === '收件箱' ? <Text style={{color: '#ffffff'}} onPress={() => params.oneKeyReadRemove()} >一键已读</Text> : null
            }
          </View>
        }/>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
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
      showDetail: false,
      dataList: []
    }
  }

  componentWillUnmount(){
    this.props.AsetFreshMsg()
    this.setState = () => () => {}
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
                  <Text style={item.status === 1 ? {color: '#666'} : {}}>{item.title}</Text>
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
    this.props.navigation.setParams({
      activeTab: val,
      oneKeyReadRemove: this.oneKeyReadRemove
    })
  }

  oneKeyReadRemove = () => {
    let ids = []
    this.state.dataList.forEach(item => {
      if (item.status === 0) {
        ids.push(item.id)
      }
    })
    if (!ids.length) return
    oneKeyRead({messageIds: ids}).then((res) => {
      if (res.code === 0) {
        Toast.success(res.message)
        this.MailBox.listView.refresh()
      }
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
        this.MailBox.listView.refresh()
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
    this.props.navigation.setParams({
      activeTab: this.state.activeTab,
      oneKeyReadRemove: this.oneKeyReadRemove
    })
  }

  render() {
    let {api, params, KeyName, sendApi, sendParams, SendKeyName, activeTab, replyData, showDetail} = this.state
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
            type={'get'}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            beforeUpdateList={({res}, fn) => {
              let dataList = res.data && res.data.pageColumns ? res.data.pageColumns : []
              this.setState(prevState => ({
                dataList: [...prevState.dataList, ...dataList]
              }))
              let {total} = res.data
              let {pageSize, pageNumber} = params
              let NullData = Math.ceil(total / pageSize) < pageNumber
              // 或在这里增加 其他状态码的处理Alter
              fn(NullData ? [] : {dataList})
            }}
          /> :
          activeTab === '发件箱' ? <UIListView
            ref={ref => this.MailBox = ref}
            api={sendApi}
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

const mapStateToProps = (state, props) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    AsetFreshMsg: () => dispatch(AsetFreshMsg())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MailboxScreen)
