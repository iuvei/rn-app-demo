import React, {Component} from 'react'
import {Alert, Dimensions, Platform, View, Text} from 'react-native'
import {UltimateListView} from 'react-native-ultimate-listview'
import styles from './styles'
import LoadingSpinner from './loadingSpinner'
// List Item
import FlatListItem from './itemContainer/flatListItem'

const {width, height} = Dimensions.get('window')
export default class ExampleScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: 'list',
      text: ''
    }
  }

  // 获取数据
  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      // This is required to determinate whether the first loading list is all loaded.
      let pageLimit = 24
      const skip = (page - 1) * pageLimit

      // Generate dummy data
      let rowData = Array.from({length: pageLimit}, (value, index) => `item -> ${index + skip}`)

      // Simulate the end of the list if there is no more data returned from the server
      if (page === 10) {
        rowData = []
      }

      // Simulate the network loading in ES7 syntax (async/await)
      await this.sleep(500)
      startFetch(rowData, pageLimit)
    } catch (err) {
      abortFetch() // manually stop the refresh or pagination if it encounters network error
      console.log(err)
    }
  }

  // 点击单元表格
  onPressItem = (type, index, item) => {
    Alert.alert(type, `You're pressing on ${item}`)
  }

  // 惰性
  sleep = time => new Promise(resolve => setTimeout(() => resolve(), time))

  // renderItem
  renderItem = (item, index) => {
    return (
      <FlatListItem item={item} index={index} onPress={this.onPressItem}/>
    )
  }

  // 加载中的
  renderPaginationFetchingView = () => (
    <LoadingSpinner height={height * 0.2} text="正在加载中..."/>
  )

  renderSectionHeaderView = () => (
    <Text>这是什么操作啊</Text>
  )

  renderPaginationAllLoadedView = () => (
    <Text>已经加载全部了</Text>
  )

  render() {
    return (
      <View style={styles.container}>
        <UltimateListView
          ref={ref => this.listView = ref}

          // this is important to distinguish different FlatList, default is numColumns
          key={this.state.layout}
          onFetch={this.onFetch}

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

          // ----Extra Config----
          displayDate
          header={this.renderHeader}
          paginationFetchingView={this.renderPaginationFetchingView}
          // not supported on FlatList
          // sectionHeaderView={this.renderSectionHeaderView}

          // paginationFetchingView={this.renderPaginationFetchingView}
          // paginationAllLoadedView={this.renderPaginationAllLoadedView}
          // paginationWaitingView={this.renderPaginationWaitingView}
          // emptyView={this.renderEmptyView}
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
