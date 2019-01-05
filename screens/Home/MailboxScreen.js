import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Header from './../../components/Header'
import { List, SwipeAction, SegmentedControl, Toast, Flex } from '@ant-design/react-native'
import { delMessage, chatDetail, replyMessage } from './../../api/member'
import UIListView from '../../components/UIListView'
import WriteEmail from './WriteEmail'

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
      sendApi: '/user/message/sendInboxMessage'
    }
  }

  renderItem = (item, index) => {
    const right = [
      {
        text: '删除',
        onPress: () => console.log('delete'),
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
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}
        >
          <List.Item>
            <Flex>
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
                  {this._formateTime(item.sendTime)}</Text>
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

  _formateTime = val => {
    let date = new Date(val)
    Y = date.getFullYear() + '-'
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    D = date.getDate() + '  '
    h = date.getHours() + ':'
    m = date.getMinutes() + ':'
    s = date.getSeconds()
    return Y + M + D + h + m + s
  }

  componentDidMount() {

  }

  render() {
    let {api, params, KeyName, sendApi, sendParams, SendKeyName, activeTab} = this.state
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
