import React from 'react'
import {View, Text, StyleSheet, ImageBackground} from 'react-native'
import {Picker} from 'native-base'
import Echarts from 'native-echarts'
import {connect} from 'react-redux'
import {getTeamNumInfo, teamEcharts, getTeamStatistics} from '../../../api/member'
import dayjs from 'dayjs'

class AgentIndex extends React.Component {
  static navigationOptions = {
    title: '代理首页'
  }

  constructor (props) {
    super(props)
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    this.state = {
      KeyName: 'AgentIndex',
      api: '/order/getOrderStatistics',
      teamInfo: {},
      formData: {
        userName: '',
        currencyCode: 'CNY',
        startTime: start,
        endTime: end,
        type: 'tz',
        gameType: -1
      },
      userId: this.props.loginInfo.userId,
      teamStatistics: {},
      teamEcharts: {},
      timeLength: 1
    }
  }

  componentDidMount () {
    this._getTeamNum()
    this._getTeamChart()
  }

  _getTeamNum = async () => {
    getTeamNumInfo({userId: this.state.userId, currency: 'CNY'}).then(res => {
      if (res.code === 0) {
        this.setState({
          teamInfo: res.data
        })
      }
    })
  }

  _getTeamChart = async () => {
    let echartsObj = {
      userId: this.state.userId, // 用户id
      endTime: this.state.formData.endTime, // 结束时间
      startTime: this.state.formData.startTime,
      accountType: 1, // 账户类型
      currency: 'CNY', // 币种代码
      type: this.state.formData.type
    }
    let chart = await teamEcharts(echartsObj)
    let balanceInfo = await getTeamStatistics(echartsObj)
    if (balanceInfo.code === 0) {
      this.setState({
        teamStatistics: balanceInfo.data
      })
    }
    if (chart.code === 0) {
      this.setState({
        teamEcharts: chart.data
      })
    }
  }

  onTimeChange = async value => {
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(value, 'day').format('YYYY-MM-DD')
    await this.setState({
      timeLength: value,
      formData: {
        ...this.state.formData,
        startTime: start,
        endTime: end
      }
    })
    this._getTeamChart()
  }

  onTypeChange = async value => {
    await this.setState({formData: {...this.state.formData, type: value}})
    this._getTeamChart()
  }

  render () {
    let {teamInfo, teamStatistics, teamEcharts} = this.state
    let {teamAgentSum, teamMemberSum, teamOnline, teamSumChildUser, teamSumCurrent} = teamInfo
    let option = {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: []
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
          start: 1,
          end: 35
        }
      ],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: teamEcharts.time,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      series: {
        type: 'line',
        lineStyle: {
          color: '#fff',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'red' // 0% 处的颜色
            }, {
              offset: 1, color: 'blue' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        },
        smooth: true,
        data: teamEcharts.data
      }
    }
    return (
      <View style={styles.container}>
        <ImageBackground resizeMode={'cover'} source={require('../../../assets/images/personal/agent/balanceBg.png')}
                         style={styles.balanceBg}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 20}}>{teamSumCurrent}元</Text>
            <Text style={{color: 'white', fontSize: 14}}>团队余额</Text>
          </View>
          <View style={styles.float}>
            <View>
              <Text>{teamSumChildUser}人</Text><Text>团队</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text>{teamAgentSum}人</Text><Text>代理</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text>{teamMemberSum}人</Text><Text>玩家</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text>{teamOnline}人</Text><Text>在线</Text>
            </View>
          </View>
        </ImageBackground>
        <ImageBackground resizeMode={'contain'} source={require('../../../assets/images/personal/agent/chartBg.png')}
                         style={styles.chartBg}>
          <View style={styles.balanceInfo}>
            <View style={styles.pics}>
              <Text style={styles.text}>充值量</Text>
              <Text style={styles.text}>{teamStatistics.dayDownRechargeMoney}</Text>
            </View>
            <View style={styles.pics}>
              <Text style={styles.text}>提现量</Text>
              <Text style={styles.text}>{teamStatistics.dayDownDrawMoney}</Text>
            </View>
            <View style={styles.pics}>
              <Text style={styles.text}>代购量</Text>
              <Text style={styles.text}>{teamStatistics.dayDownEnsureConsumpMoney}</Text>
            </View>
            <View style={styles.pics}>
              <Text style={styles.text}>派奖</Text>
              <Text style={styles.text}>{teamStatistics.dayDownIncomeMoney}</Text>
            </View>
            <View style={styles.pics}>
              <Text style={styles.text}>返点</Text>
              <Text style={styles.text}>{teamStatistics.dayDownCommMoney}</Text>
            </View>
            <View style={styles.pics}>
              <Picker selectedValue={this.state.timeLength} onValueChange={this.onTimeChange}
                      mode="dialog" style={styles.picker}>
                <Picker.Item label="今天" value={1}/>
                <Picker.Item label="最近一周" value={7}/>
                <Picker.Item label="最近一个月" value={30}/>
              </Picker>
              <Picker selectedValue={this.state.formData.type}
                      onValueChange={this.onTypeChange}
                      mode="dialog" style={styles.picker}>
                <Picker.Item label="投注" value={'tz'}/>
                <Picker.Item label="充值" value={'cz'}/>
                <Picker.Item label="提现" value={'tx'}/>
                <Picker.Item label="返点" value={'fd'}/>
                <Picker.Item label="返水" value={'fs'}/>
                <Picker.Item label="派奖" value={'pj'}/>
                <Picker.Item label="注册" value={'xz'}/>
              </Picker>
            </View>
          </View>
          <Echarts option={option} height={300}/>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceBg: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  float: {
    position: 'absolute',
    bottom: -25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  balanceInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  divider: {
    width: 0,
    height: 30,
    borderWidth: 0.5,
    borderColor: '#dedede'
  },
  pics: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 50,
    width: '27%'
  },
  picker: {
    backgroundColor: 'white',
    width: 90,
    height: 20,
    borderRadius: 5,
    marginBottom: 5
  },
  chartBg: {
    width: '98%',
    flex: 4,
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 24
  },
  text: {
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  let {loginInfo} = state.common
  return ({
    loginInfo
  })
}

export default connect(
  mapStateToProps
)(AgentIndex)
