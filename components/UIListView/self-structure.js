import React, {Component} from 'react'
import {Alert, Dimensions, Platform, View, Text} from 'react-native'
import {UltimateListView} from 'react-native-ultimate-listview'
import styles from './styles'
import LoadingSpinner from './loadingSpinner'
// List Item
import FlatListItem from './itemContainer/flatListItem'
import {fetch} from '../../services/HttpService'

const TableRow = 10
const {width, height} = Dimensions.get('window')
export default class ExampleScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      KeyName: 'BetHistory',
      api: '/order/getOrderStatistics',
      params: {
        userId: '',
        orderId: '',
        proxyType: 0, // 0自己、1直接下级、2所有下级，默认0
        orderType: 0, // 0彩票,1游戏
        orderIssue: '', // 期号
        lotterCode: '', // 必传
        startTime: '2018-12-13',
        endTime: '2019-01-01',
        status: '',
        pageNumber: 1,
        isAddition: 0, // 是否追号：0 否、1 是
        pageSize: TableRow,
        isOuter: '' // 0 否 1 是
      }
    }
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  // 获取数据
  // page = 1, startFetch, abortFetch
  getTableList = async (page = 1, startFetch, abortFetch) => {
    // console.log(page, startFetch, abortFetch)
    try {
      // This is required to determinate whether the first loading list is all loaded.
      // let pageLimit = 11
      // const skip = (page - 1) * pageLimit

      // Generate dummy data
      // let rowData = Array.from({length: pageLimit}, (value, index) => `item -> ${index + skip}`)
      let rowData = []

      await this.setState({
        params: Object.assign({}, this.state.params, {pageNumber: page})
      })
      let {api, params} = this.state
      await fetch({api, params, type: 'post'}).then(res => {
        // pageNumber, pageSize
        let {pageNumber, pageSize, totalCount} = res.data
        if (Math.ceil(totalCount / pageSize) < pageNumber) {
          rowData = []
        } else if (res.code === 0) {
          rowData = res.data.orderInfoList
        } else {
          rowData = []
        }
      })
      // Simulate the end of the list if there is no more data returned from the server
      // if (page == 3) {
      //   rowData = []
      // }

      // Simulate the network loading in ES7 syntax (async/await)

      // await this.sleep(500)
      startFetch(rowData, 10)
    } catch (err) {
      // manually stop the refresh or pagination if it encounters network error
      abortFetch()
    }
  }

  // 点击单元表格
  onPressItem = (type, index, item) => {
    Alert.alert(type, `You're pressing on ${item}`)
  }

  // 惰

  // renderItem
  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        onPress={this.onPressItem}/>
    )
  }

  // 载入加载中
  renderPaginationFetchingView = () => (
    <LoadingSpinner height={height * 0.2} text="正在加载中..."/>
  )

  // 无数据
  renderEmptyView = () => (
    <Text>Null data</Text>
  )

  render() {
    return (
      <View style={styles.container}>
        <UltimateListView
          ref={ref => this.listView = ref}

          // this is important to distinguish different FlatList, default is numColumns
          key={this.state.KeyName}
          onFetch={this.getTableList}

          // this is required when you are using FlatList
          keyExtractor={(item, index) => `${index} - ${item}`}

          // RefreshView
          dateTitle={'最近更新时间：'}
          refreshableTitlePull={'下拉刷新'}
          refreshableTitleRefreshing={'正在为您加载...'}
          refreshableTitleRelease={'松手即可为您加载'}
          refreshableTit={'正在加载...'}

          // basic or advanced
          refreshableMode={Platform.OS === 'ios' ? 'advanced' : 'basic'}

          // this takes three params (item, index, separator)
          item={this.renderItem}

          // to use grid layout, simply set gridColumn > 1
          numColumns={1}
          // spinnerColor={'red'}
          waitingSpinnerText={'加载中...'}
          allLoadedText={'已为您加载所有数据'}

          // ----Extra Config----
          displayDate
          // header={this.renderHeader}
          paginationFetchingView={this.renderPaginationFetchingView}
          // not supported on FlatList
          // sectionHeaderView={this.renderSectionHeaderView}

          // paginationFetchingView={this.renderPaginationFetchingView}
          // paginationAllLoadedView={this.renderPaginationAllLoadedView}
          // paginationWaitingView={this.renderPaginationWaitingView}
          emptyView={this.renderEmptyView}
          // separator={this.renderSeparatorView}

          // new props on v3.2.0
          arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
          dateStyle={{color: 'lightgray'}}
          refreshViewStyle={Platform.OS === 'ios' ? {height: 80, top: -80} : {height: 80}}
          refreshViewHeight={80}
        />
      </View>
    )
  }
}
