import React from 'react'
import {
  View, Text,
  StyleSheet, Image, ScrollView
} from 'react-native'
import {
  Tabs, Card, WhiteSpace,
  Button, WingBlank
} from '@ant-design/react-native'
import { connect } from 'react-redux'

import DownTime from './DownTime'
import PlayNav from './PlayNav'
import RowBall from './RowBall'
// import BuyPrice from './BuyPrice'
import LatelyList from './LatelyList'
import { DownTimeHoc, RowBallHoc } from '../../HOC'
import { setNavParams, getGamesPlay } from '../../actions/classic'
import { modeInfo } from '../../data/options'

const DownTimeHocView = DownTimeHoc(DownTime)
const RowBallHocView = RowBallHoc(RowBall)
// const BuyPriceHocView = BuyPriceHoc(BuyPrice)
const selfRoute = [
  {name: '时时彩', code: 'lo1', mapCode: ['ssc']},
  {name: '11选5', code: 'lo2', mapCode: ['syx5']},
  {name: '快三', code: 'lo3', mapCode: ['k3']},
  {name: 'PK拾', code: 'lo4', mapCode: ['pk10']},
  {name: '快乐十分', code: 'lo5', mapCode: ['kl10']},
  {name: '基诺', code: 'lo6', mapCode: ['kl8']},
  {name: '幸运彩', code: 'lo7', mapCode: ['xyc']},
  {name: '低频彩', code: 'lo8', mapCode: ['dpc']}
]

class BetScreen extends React.Component {
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
      title: params.lotterName
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
      ballOpen: ['5', '9', '3', '2', '1'],
      changingValue: 1800,
      afterValue: 0,
      stepValue: 1,
      modeItem: {}
    }
    this.time = 1700
  }

  // 当下已经知道这个彩种了，首先渲染这个视图数据
  // 绑定球的点击监听数据、注数的监听
  // 获取这个彩种的玩法数据，奖金数据数据初始化，和联动他的数据
  // 投注下单
  componentWillMount() {
  }

  componentDidMount() {
    // 获取当前彩种的赔率
    let {params, params: {lotterCode, realCategory, isOuter}} = this.props.navigation.state
    let {code} = selfRoute.find(lot => lot.mapCode.includes(realCategory))
    this.props.navParams(
      Object.assign({}, params, {lotType: code})
    )
    this.props.getGamesPlay({
      lotterCode,
      isOuter,
      userId: this.props.userId
    })
  }

  componentWillUnmount() {
    this.setState = () => () => {
    }
  }

  _onChangeTabs = (tab, number) => {
  }

  render() {
    let {ContentTabs, playTabs, actPlay} = this.state
    let {params} = this.props.navigation.state
    return (
      <View style={styles.container}>
        {/* playNav Container */}
        <PlayNav/>

        {/* down Container */}
        <DownTimeHocView
          ballOpen={this.state.ballOpen}
          activeLot={params}
        />
        {/* Tabs Nav */}
        <Tabs tabs={ContentTabs}
              style={{background: '#ededed'}}
              onChange={this._onChangeTabs}
              initialPage={1}
              animated={false}>
          <View>
            <ScrollView>
              <LatelyList/>
            </ScrollView>
          </View>
          <View style={{flex: 1}}>
            <RowBallHocView activeLot={params}/>
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
        {/*<BuyPriceHocView/>*/}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let {userId} = state.common
  return ({
    userId
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    navParams: params => dispatch(setNavParams(params)),
    getGamesPlay: params => dispatch(getGamesPlay(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BetScreen)

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
