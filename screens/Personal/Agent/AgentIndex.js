import React from 'react'
import {View, Text, StyleSheet, ImageBackground,} from 'react-native'
import {Flex, Icon, Picker} from '@ant-design/react-native'
import Echarts from '../../../components/Echarts'
import {connect} from 'react-redux'
import {getTeamNumInfo, teamEcharts, getTeamStatistics} from '../../../api/member'
import dayjs from 'dayjs'

const TIME_TYPE = [
  {label: '今天', value: 1},
  {label: '最近一周', value: 7},
  {label: '最近一个月', value: 30}
]

// 操作类型
const OPERATION_TYPE = [
  {label: '投注', value: 'tz'},
  {label: '充值', value: 'cz'},
  {label: '提现', value: 'tx'},
  {label: '返点', value: 'fd'},
  {label: '返水', value: 'fs'},
  {label: '派奖', value: 'pj'},
  {label: '注册', value: 'xz'},
]

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
      timeLength: [1],
      timeLabel: '今天',
      typeLabel: '投注'
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

  onTimeChange = async (value) => {
    let end = dayjs().format('YYYY-MM-DD')
    let start = dayjs().subtract(value, 'day').format('YYYY-MM-DD')
    let temp = TIME_TYPE.filter(item => {
      return item.value === value[0]
    })
    await this.setState({
      timeLength: value,
      timeLabel: temp[0].label,
      formData: {
        ...this.state.formData,
        startTime: start,
        endTime: end
      }
    })
    this._getTeamChart()
  }

  onTypeChange = async value => {
    let temp = OPERATION_TYPE.filter(item => {
      return value[0] === item.value
    })
    await this.setState({
      typeLabel: temp[0].label,
      formData: {...this.state.formData, type: value[0]}})
    this._getTeamChart()
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  render () {
    let {teamInfo, teamStatistics, teamEcharts, timeLength, timeLabel, typeLabel} = this.state
    let {isConnected} = this.props
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
            <Text style={{color: 'white', fontSize: 22}}>{teamSumCurrent || '0'}</Text>
            <Text style={{color: 'white', fontSize: 14}}>团队余额(元)</Text>
          </View>
          <View style={styles.float}>
            <View>
              <Text style={styles.textColor}>{teamSumChildUser}人</Text><Text style={styles.textColor}>团队</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text style={styles.textColor}>{teamAgentSum}人</Text><Text style={styles.textColor}>代理</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text style={styles.textColor}>{teamMemberSum}人</Text><Text style={styles.textColor}>玩家</Text>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text style={styles.textColor}>{teamOnline}人</Text><Text style={styles.textColor}>在线</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.bottomPart}>
          <ImageBackground resizeMode={'cover'} source={require('../../../assets/images/personal/agent/chartBg.png')}
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
            </View>
            <View style={styles.balanceInfo}>
              <View style={styles.pics}>
                <Text style={styles.text}>派奖</Text>
                <Text style={styles.text}>{teamStatistics.dayDownIncomeMoney}</Text>
              </View>
              <View style={styles.pics}>
                <Text style={styles.text}>返点</Text>
                <Text style={styles.text}>{teamStatistics.dayDownCommMoney}</Text>
              </View>
              <View style={styles.pics}>
                <Picker value={timeLength} cols={1} data={TIME_TYPE} onChange={this.onTimeChange}>
                  <Flex style={{ backgroundColor: '#fff', borderRadius: 3}}>
                    <Text style={{
                      textAlign: 'center',
                      lineHeight: 18,
                      color: '#222',
                      width: 50,
                      fontSize: 12,
                      overflow: 'hidden',
                      height: 18
                    }}>{timeLabel}</Text>
                    <Icon name="down" size={16} color="#222"/>
                  </Flex>
                </Picker>
                <Picker cols={1} data={OPERATION_TYPE} onChange={this.onTypeChange}>
                  <Flex style={{backgroundColor: '#fff', borderRadius: 3, marginTop: 4}}>
                    <Text style={{
                      textAlign: 'center',
                      lineHeight: 18,
                      width: 50,
                      color: '#222',
                      fontSize: 12,
                      overflow: 'hidden',
                      height: 18
                    }}>{typeLabel}</Text>
                    <Icon name="down" size={16} color="#222"/>
                  </Flex>
                </Picker>
              </View>
            </View>
            {
              isConnected ? <Echarts option={option} height={300}/> :
              <View style={{height: 300}}>
                <Text style={{fontSize: 30, textAlign: 'center', color: '#ddd'}}>网络错误，请稍后重试!</Text>
              </View>
            }
          </ImageBackground>
        </View>
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
  textColor: {
    color: '#4dd3df'
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
    flex: 1
  },
  picker: {
    backgroundColor: 'white',
    width: 90,
    height: 20,
    borderRadius: 5,
    marginBottom: 5
  },
  bottomPart: {
    flex: 4,
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 24
  },
  chartBg: {
    paddingTop: 10,
    borderRadius: 10
  },
  text: {
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  let {loginInfo, isConnected} = state.common
  return ({
    loginInfo,
    isConnected
  })
}

export default connect(
  mapStateToProps
)(AgentIndex)
