import React, { PureComponent } from 'react'
import {View, Text, ImageBackground, StyleSheet} from 'react-native'
import {Flex, Button, Toast} from '@ant-design/react-native'
import {getBjlComputerGameType, bjlGameLogin, bjlGameTry} from './../../api/lottery'
import { AsetUserPlatfrom } from "../../actions/common";
import { connect } from "react-redux";
import UIListView from './../../components/UIListView'

class FlatListItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      imgs: {
        1: require('../../assets/images/slot/slot1.png'),
        2: require('../../assets/images/slot/slot2.png'),
        3: require('../../assets/images/slot/slot3.png'),
        4: require('../../assets/images/slot/slot4.png'),
        5: require('../../assets/images/slot/slot2.png'),
      }
    }
  }

  loginGame = (item) => {
    let {partnerCode, gameCode, gameTypeCode} = item
    bjlGameLogin({
      partnerCode,
      gameCode,
      gameTypeCode
    }).then(res => {
      if (res.code === 0) {
        this.props.navigation.navigate('ThirdGameScreen', {uri: res.data.url})
      } else if (res.code === -3) {
        Toast.info('百家乐平台开户失败', 0.3)
      } else {
        Toast.info(res.message, 0.3)
      }
    })
  }

  render() {
    let {imgs} = this.state
    let {item, index} = this.props
    return (
      <Flex.Item onPress={() => this.props.onPressFunc(item)}>
        <ImageBackground source={imgs[index%5 + 1]} resizeMode= 'contain' style={styles.card}>
          <View style={styles.footer}>
            <Text style={{color: 'white'}}>{item.gameNameCn}</Text>
            <Button size={'small'} onPress={() => this.loginGame(item)}>进入游戏</Button>
            {/*{*/}
              {/*!item.isTry ? <Button size={'small'}>立即试玩</Button> : <Button size={'small'}>进入游戏</Button>*/}
            {/*}*/}
          </View>
        </ImageBackground>
      </Flex.Item>
    )
  }

}

class Slot extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      KeyName: 'bjlComputerGameList',
      api: '/user/bjl/getBjlComputerGameList',
      params: {
        pageNumber: 1,
        pageSize: 24,
        userId: props.userId,
        gameName: '',
        partnerCode: '',
        gameTypeCn: ''
      },
      game: {
        'all': '全部',
        '0002': 'PT',
        '0006': 'MG',
        '0003': 'BBIN',
        '0004': 'AG',
        '0010': 'UC8'
      },
    }
  }

  renderItem = (item, index) => {
    return (
      <FlatListItem
        item={item}
        index={index}
        onPressFunc={(Item) => {
          this.onPressItem(Item)
        }}/>
    )
  }

  // 点击单元表格
  onPressItem = (item) => {

  }

  render () {
    let {api, params, KeyName} = this.state
    return (
      <View style={styles.container}>
        <UIListView
          ref={ref => this.bjlComputerGameList = ref}
          api={api}
          numColumns={2}
          KeyName={`KeyName-${KeyName}`}
          params={params}
          renderItem={this.renderItem}
          beforeUpdateList={({res}, fn) => {
            let dataList = res.data && res.data.gameList ? res.data.gameList : []
            let {pageNumber, pageSize, total} = res.data
            let NullData = Math.ceil(total / pageSize) < pageNumber
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
    backgroundColor: '#f0f0f0',
  },
  card: {
    height: 180,
    marginRight:3,
    marginLeft:3,
    justifyContent: 'flex-end'
  },
  footer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
})

const mapStateToProps = (state, props) => {
  let { userPlatformInfo, userId } = state.common
  return {
    userId,
    userPlatformInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserPlatfrom: (data) => { dispatch(AsetUserPlatfrom(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slot)
