import React, { Component } from 'react'
import { Alert, Dimensions, Platform, View, Text, StyleSheet } from 'react-native'
import { UltimateListView } from 'react-native-ultimate-listview'
import styles from './styles'
import LoadingSpinner from './loadingSpinner'
import { fetch } from '../../services/HttpService'
import PropTypes from 'prop-types'

const TableRow = 10
const {width, height} = Dimensions.get('window')

class ExampleScroll extends Component {

  static defaultProps = {
    type: 'post'
  }

  static propTypes = {
    // basic
    KeyName: PropTypes.string,
    api: PropTypes.string,
    params: PropTypes.object,
    beforeHttpGet: PropTypes.func,
    beforeUpdateList: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      firstLoader: true
    }
  }

  // 获取数据
  // page = 1, startFetch, abortFetch
  getTableList = async (page = 1, startFetch, abortFetch) => {
    let {params, api, type} = this.props
    try {
      // Generate dummy data
      let rowData = []
      // 是否能继续请求
      let isGet = true
      if (typeof this.props.beforeHttpGet === 'function') {
        isGet = false
        await this.props.beforeHttpGet(
          {params, page}, (AfterParams, getStatus) => {
            params = AfterParams
            isGet = getStatus
          }
        )
      } else {
        params = Object.assign({}, params, {
          pageNumber: page
        })
      }
      if (!isGet) {
        startFetch(rowData, params.pageSize || 10)
        return
      }
      await fetch({api, params, type}).then(res => {
        // console.log('to fn', params.pageNumber)
        if (typeof this.props.beforeUpdateList === 'function') {
          this.props.beforeUpdateList({api, params, res}, ({dataList}) => {
            rowData = dataList
          })
        } else {
          try {
            let {pageColumns, pageInfo: {total}} = res.data
            let {pageSize, pageNumber} = params
            rowData = pageNumber > Math.ceil(total / pageSize) ? [] : pageColumns
          } catch {
            console.warn('未能正常渲染数据，请检查数据')
          }
        }
      })
      startFetch(rowData, params.pageSize || 10)
    } catch (err) {
      // manually stop the refresh or pagination if it encounters network error
      // console.log(err)
      abortFetch()
    }
  }

  // 载入加载中
  renderPaginationFetchingView = () => (
    <LoadingSpinner height={height * 0.2} text="正在加载中..."/>
  )

  // 无数据
  renderEmptyView = () => (
    <Text>Null data</Text>
  )

  renderSeparatorView = () => {
    return (
      <View style={{
        backgroundColor: '#ededed',
        height: 0.5
      }}
      />)
  }

  render() {
    return (
      <View style={styles.container}>
        <UltimateListView
          ref={ref => this.listView = ref}

          // this is important to distinguish different FlatList, default is numColumns
          key={this.props.KeyName}
          onFetch={this.getTableList}
          firstLoader={this.firstLoader}
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
          item={this.props.renderItem}

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
          separator={this.renderSeparatorView}

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

export default ExampleScroll
