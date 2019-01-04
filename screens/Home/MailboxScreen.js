import React from 'react'
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
      formData: {
        searchType: 'receiveMessage',
        pageNumber: 1,
        pageSize: 20
      },
      chatList: [],
      totalCount: 0,
    }
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      Toast.success('刷新成功！')
      this.setState({refreshing: false});
    }, 1000);
  }

  _contentViewScroll(e){
    console.log(e)
    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight){
      Console.log('上传滑动到底部事件')
    }
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
    const right = [
      {
        text: '删除',
        onPress: () => console.log('delete'),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ];
    let { chatList, activeTab } = this.state
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
        <ScrollView
          onMomentumScrollEnd={(e) => this._contentViewScroll(e)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View>
            {
              chatList.map((item, index) => {
                return(
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
              })
            }
          </View>
        </ScrollView>
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
