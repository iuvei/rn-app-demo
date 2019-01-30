import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import UIListView from '../../../components/UIListView'
import {Button, WingBlank, Flex, SearchBar, Modal} from '@ant-design/react-native'
import {connect} from "react-redux"
import dayjs from 'dayjs'
import SubManaging from "./SubManaging"
import {AsetSubUserInfo} from "../../../actions/member"
import {formatTime} from '../../../utils/MathUtils'

class FlatListItem extends PureComponent {
  constructor (props) {
    super(props)
  }

  render () {
    let {item, onPress, showSub} = this.props
    let {loginName, balanceFree, proxy, backPoint, lasttime, teamNum} = item
    return (
      <View style={{padding: 10, flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <Flex direction={'row'}>
            <Text style={{marginRight: 10}}>账号: <Text onPress={() => onPress(loginName, 1)}
                                                      style={{color: '#1789e6'}}>{loginName}</Text></Text>
            <Text style={{
              borderWidth: 1,
              borderColor: '#1789e6',
              color: '#1789e6',
              paddingLeft: 6,
              paddingRight: 6,
              borderRadius: 4
            }}>{proxy === 1 ? '代理' : '玩家'}</Text>
            <Text>({teamNum})</Text>
          </Flex>
          <Flex direction={'row'}>
            <Text style={{marginRight: 10}}>彩票返点: {backPoint}</Text>
            <Text>余额: {balanceFree}</Text>
          </Flex>
          <Text>{lasttime ? '上次登录:' + formatTime(lasttime) : '未登录'}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Button size={'small'} onPress={() => showSub(item)}>管理</Button>
        </View>
      </View>
    )
  }
}

class MemberManage extends React.Component {
  static navigationOptions = {
    title: '会员管理'
  }

  constructor (props) {
    super(props)
    let {loginInfo} = this.props
    this.state = {
      isShow: false,
      KeyName: 'MemberManage',
      api: '/user/memberList',
      userList: [],
      params: {
        pageNumber: 1,
        pageSize: 10,
        type: 1,
        userId: loginInfo.userId,
        minMoney: '',
        maxMoney: '',
        loginname: loginInfo.acc.user.loginName
      }
    }
  }

  componentDidMount () {

  }

  // renderItem
  // item, index, separators
  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        showSub={this.onOpen}
        onPress={this.onSearch}/>
    )
  }

  onSearch = async (value, type) => {
    if (type === 1) {
      await this.setState({
        userList: [...this.state.userList, this.state.params.loginname]
      })
    } else {
      await this.setState({
        userList: []
      })
    }
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false, params: {...this.state.params, loginname: value, type}})
    })
  }

  // 返回上一级
  goBack = async () => {
    let {userList} = this.state
    let name = userList.pop()
    await this.setState({isShow: true}, () => {
      this.setState({isShow: false, params: {...this.state.params, loginname: name, type: 1}, userList})
    })
  }

  onOpen = async (downInfo) => {
    await this.props.setDownUserInfo(downInfo)
    this.props.navigation.navigate('SubManaging', {isSon: this.state.userList.length === 0})
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  render () {
    let {api, params, KeyName, isShow, userList} = this.state
    return (
      <View style={styles.container}>
        <WingBlank>
          <SearchBar value={params.loginname}
                     onChange={value => this.setState({params: {...this.state.params, loginname: value}})}
                     placeholder="搜索" onSubmit={value => this.onSearch(value, 0)}/>
        </WingBlank>
        {isShow ? null :
          <View style={{flex: 1, backgroundColor: 'white', borderRadius: 8}}>
            <UIListView
              ref={ref => this.MemberManage = ref}
              api={api}
              KeyName={`KeyName-${KeyName}`}
              params={params}
              renderItem={this.renderItem}
              beforeUpdateList={({res, params}, fn) => {
                let dataList = res.data && res.data.data ? res.data.data : []
                let {totalCount} = res.data
                let NullData = Math.ceil(totalCount / 10) < params.pageNumber
                fn(!NullData ? {dataList} : [])
              }}
            />
            {
              userList.length > 0 ?
                <Button type={'primary'} style={{margin: 10}} onPress={this.goBack}>返回上级</Button> : null
            }
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    paddingTop: 0,
  },
  spa: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
})


const mapDispatchToProps = (dispatch) => {
  return {
    setDownUserInfo: data => dispatch(AsetSubUserInfo(data))
  }
}

export default connect(
  (state) => {
    let {loginInfo} = state.common
    return ({
      loginInfo
    })
  }, mapDispatchToProps
)(MemberManage)
