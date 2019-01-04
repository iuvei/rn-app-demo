import React, { PureComponent } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native'
import Header from './../../components/Header'
import { List, SwipeAction, SegmentedControl, Toast, Flex } from '@ant-design/react-native';
import {searchInBox, searchOutBox, delMessage, chatDetail, replyMessage} from './../../api/member'
import UIListView from '../../components/UIListView'

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item, index} = this.props
    let {orderId, ruleName} = item
    return (
      <View style={{padding: 10}}>
        <Text>序号: {index}</Text>
        <Text>RowID: {orderId}</Text>
        <Text note>Data: {ruleName}</Text>
      </View>
    )
  }

}
class MailboxScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header title={'信箱'} navigation={navigation}/>
    }
  }

  constructor(props) {
    super (props)
    this.state = {
      refreshing: false,
      tabs: ['收件箱', '发件箱', '写信'],
      activeTab: '收件箱',
      params: {
        searchType: 'receiveMessage',
        pageNumber: 1,
        pageSize: 20
      },
      chatList: [],
      totalCount: 0,
      KeyName: 'Mailbox',
      api: '/user/message/searchMessage',
    }
  }

  renderItem = (item, index) => {
    const right = [
      {
        text: '删除',
        onPress: () => console.log('delete'),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ];
    let { activeTab } = this.state
    return (
      <List key={index}>
        <SwipeAction
          autoClose
          style={{ backgroundColor: 'transparent' }}
          right={right}
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}
        >
          <List.Item>
            <Flex>
              <View style={styles.leftMsg}>
                <Text numberOfLines={1}>
                  {activeTab === '收件箱' ? <Text style={styles.msgOrigin}>{item.senderName}: </Text> : null}
                  <Text>{item.title}</Text>
                </Text>
                {activeTab === '发件箱' ? <Text style={styles.msgOrigin}>{item.receiveName}(收) </Text> : null}
              </View>
              <View>
                <Text style={styles.startTime}>{this._formateTime(item.sendTime)}</Text>
              </View>
            </Flex>
          </List.Item>
        </SwipeAction>
      </List>
    )
  }

  _initMessageList = () => {
    this.setState({
      chatList: [],
      totalCount: 0,
      formData: {
        searchType: 'receiveMessage',
        pageNumber: 1,
        pageSize: 20
      }
    }, () => {
      if(this.state.activeTab === '收件箱') {
        searchInBox(this.state.formData).then((res) => {
          if (res.code === 0) {
            let {pageColumns, pageInfo} = res.data
            this.setState({
              chatList: pageColumns || [],
              totalCount: pageInfo.total || 0
            })
          }
        })
      } else if(this.state.activeTab === '发件箱') {
        searchOutBox(this.state.formData).then((res) => {
          if (res.code === 0) {
            let {pageColumns, pageInfo} = res.data
            this.setState({
              chatList: pageColumns || [],
              totalCount: pageInfo.total || 0
            })
          }
        })
      }
    })
  }

  _getActiveTab = (val) => {
    this.setState({
      activeTab: val
    },() => this._initMessageList())
  }

  _formateTime = val => {
    let date = new Date(val)
    Y = date.getFullYear() + '-'
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    D = date.getDate() + '  '
    h = date.getHours() + ':'
    m = date.getMinutes() + ':'
    s = date.getSeconds();
    return Y+M+D+h+m+s
  }

  componentDidMount() {
    this._initMessageList()
  }

  render() {
    let {api, params, KeyName} = this.state
    return (
      <View style={styles.container}>
        <View style={{height: 50}}>
          <View style={styles.headerSeg}>
            <SegmentedControl
              style={{width: '70%', height: 30,}}
              values={this.state.tabs}
              onValueChange={this._getActiveTab}
            />
          </View>
        </View>
        <UIListView
          ref={ref => this.BetHistory = ref}
          api={api}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          // 第一个参数 params 第二个子组件的将要请求的第N页
          beforeHttpGet={async ({params, page}, fn) => {
            // 解决父级数据数据源同步问题，然后数据给到子组件本身
            await this.setState({
              params: Object.assign({}, params, {
                pageNumber: page
              })
            })
            let handlerParams = this.state.params
            fn(handlerParams, true)
          }}
          // 返回数据空或者处理后的数据源
          beforeUpdateList={({res}, fn) => {
            let dataList = res.data && res.data.pageColumns ? res.data.pageColumns : []
            let {currentPage, total} = res.data
            let NullData = Math.ceil(total / 20) < currentPage
            // 或在这里增加 其他状态码的处理Alter
            fn(NullData ? [] : {dataList})
          }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerSeg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
