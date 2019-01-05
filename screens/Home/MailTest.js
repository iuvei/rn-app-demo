import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import UIListView from '../../components/UIListView'
// List Item
import { Button, WingBlank } from '@ant-design/react-native'

const TableRow = 20

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item: {title, status, sendTime, content}, index} = this.props
    return (
      <View style={{padding: 10}}>
        <Text>序号: {index}</Text>
        <Text>title: {title}</Text>
        <Text note>status: {status}</Text>
        <Text note>sendTime: {sendTime}</Text>
        <Text note>content: {content}</Text>
      </View>
    )
  }

}

class MailTest extends React.Component {
  static navigationOptions = {
    title: '游戏记录'
  }

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      KeyName: 'MailTest',
      api: '/user/message/searchMessage',
      params: {
        searchType: 'receiveMessage',
        pageNumber: 1,
        pageSize: 20
      }
    }
  }

  // renderItem
  // item, index, separators
  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        onPress={(Type, Item) =>
          this.onPressItem(Type, Item)
        }/>
    )
  }

  // 点击单元表格
  onPressItem = (type, item) => {
    let Row = this.MailTest.listView.getRows().slice()
    Row.find(rows => rows.orderId === item.orderId).ruleName = '自定义'
    this.MailTest.listView.updateDataSource(Row)
  }

  onSearch = async () => {
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false})
    })
  }

  render() {
    let {api, params, KeyName, isShow} = this.state
    return (
      <View style={styles.container}>
        <WingBlank>
          <Button
            type="ghost"
            onPress={() => this.onSearch()}
            style={{marginTop: 4}}>查询</Button>
        </WingBlank>
        {isShow ? null :
          <UIListView
            ref={ref => this.MailTest = ref}
            api={api}
            type={'get'}
            KeyName={`KeyName-${KeyName}`}
            params={params}
            renderItem={this.renderItem}
            // 第一个参数 params 第二个子组件的将要请求的第N页
            // beforeHttpGet={async ({params, page}, fn) => {
            //   // 解决父级数据数据源同步问题，然后数据给到子组件本身
            //   await this.setState({
            //     params: Object.assign({}, params, {
            //       pageNumber: page
            //     })
            //   })
            //   let handlerParams = this.state.params
            //   fn(handlerParams, true)
            // }}
            // 返回数据空或者处理后的数据源
            // beforeUpdateList={
            //   ({res}, fn) => {
            //     let {pageColumns, pageInfo: {currentPage, lastPage}} = res.data
            //     console.log(currentPage > lastPage, currentPage, lastPage)
            //     fn({dataList: currentPage > lastPage ? [] : pageColumns})
            //   }}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff'
  },
  spa: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
})

export default MailTest
