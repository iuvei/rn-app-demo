import React from 'react'
import {
  View, Text,
  StyleSheet, Image, ScrollView
} from 'react-native'
import {
  Tabs, Card, WhiteSpace,
  Button, WingBlank
} from '@ant-design/react-native'
import DownTime from './DownTime'
import PlayNav from './PlayNav'
import RowBall from './RowBall'
import BuyRender from './BuyRender'

import { DownTimeHoc } from '../../HOC'

const DownTimeHocView = DownTimeHoc(DownTime)

export default class BetScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const params = navigation.state.params || {
      countExcept: 0,
      isOuter: 0,
      lotterCode: 'cqssc',
      lotterLabel: 0,
      lotterName: '重庆时时彩',
      lotterNumber: 5,
      lotterTime: '09:50~01:55',
      maxBonus: 1000000,
      numberRange: '0,1,2,3,4,5,6,7,8,9',
      openUrl: 'http://www.baidu.com',
      realCategory: 'ssc',
      status: 0,
      type: 0,
      updateBy: 'dana001'
    }
    return {
      title: params.lotterName || '重庆时时彩'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      ContentTabs: [
        {title: '开奖'},
        {title: '投注'},
        {title: '记录'},
        {title: '趋势'}
      ],
      playTabs: [
        {title: '五星复式', value: 'wxfs'},
        {title: '五星单式', value: 'wxds'},
        {title: '四星复式', value: 'sxfs'},
        {title: '四星单式', value: 'sxds'}
      ],
      actPlay: {title: '五星复式', value: 'wxfs'},
      ballOpen: ['5', '9', '3', '2', '1']
    }
  }

  // 当下已经知道这个彩种了，首先渲染这个视图数据
  // 绑定球的点击监听数据、注数的监听
  // 获取这个彩种的玩法数据，奖金数据数据初始化，和联动他的数据
  // 投注下单

  componentDidMount() {
    setTimeout(() => {
      let data = [
        {title: '三星复式', value: 'sanxfs'},
        {title: '三星单式', value: 'sanxds'},
        {title: '二星复式', value: 'exfs'},
        {title: '二星单式', value: 'exds'}
      ]
      this.setState({
        playTabs: [].concat(this.state.playTabs, data)
      })
    }, 300)
  }

  componentWillUnmount() {
    this.setState = () => () => {
    }
  }

  _onPlayTabs = (tab, number) => {
    this.setState({actPlay: tab})
  }

  _onChangeTabs = (tab, number) => {
  }

  render() {
    let {ContentTabs, playTabs, actPlay} = this.state
    return (
      <View style={styles.container}>

        {/* playNav Container */}
        <PlayNav
          playTabs={playTabs}
          _onPlayTabs={this._onPlayTabs}
          actPlay={actPlay}/>

        {/* down Container*/}
        {/*<DownTime ballOpen={this.state.ballOpen}/>*/}
        <DownTimeHocView ballOpen={this.state.ballOpen}/>

        {/* Tabs Nav */}
        <Tabs tabs={ContentTabs}
              style={{background: '#ededed'}}
              onChange={this._onChangeTabs}
              initialPage={1}
              animated={false}>
          <View style={styles.tabs}>
            <Text>Content of First Tab</Text>
          </View>
          <View style={{margin: 4}}>
            <ScrollView>
              <RowBall/>
            </ScrollView>
          </View>
          <View style={styles.tabs}>
            <Text>Content of Third Tab</Text>
          </View>
          <View style={styles.tabs}>
            <Text>Content of Four Tab</Text>
            <View style={{
              backgroundColor: '#ededed',
              height: 0.5,
              width: '100%'
            }}
            />
            <Text>Content of Four Tab</Text>
          </View>
        </Tabs>

        {/*投注信息*/}
        <BuyRender/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
  tabs: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingRight: 20
  }
})
