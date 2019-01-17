import React, {Component} from 'react'
import {View, Text, StyleSheet, findNodeHandle, UIManager} from 'react-native'
import {connect} from 'react-redux'
import {Tab, Tabs, ScrollableTab} from 'native-base'
import Canvas from 'react-native-canvas'
import {Button} from '@ant-design/react-native'
// 时时彩
const SSC_LIST = {
  dataHead: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  sscType: [],
  sscType1: [{
    type: 'distribute',
    name: '号码分布'
  }, {
    type: 'wan',
    name: '万位走势'
  }, {
    type: 'qian',
    name: '千位走势'
  }, {
    type: 'bai',
    name: '百位走势'
  }, {
    type: 'shi',
    name: '十位走势'
  }, {
    type: 'ge',
    name: '个位走势'
  }, {
    type: 'big',
    name: '大小形态',
    dataHead: [1, 2, 3, 4, 5],
  }, {
    type: 'single',
    name: '单双形态',
    dataHead: [1, 2, 3, 4, 5],
  }, {
    type: 'prime',
    name: '质合形态',
    dataHead: [1, 2, 3, 4, 5],
  }, {
    type: 'zero',
    name: '012形态',
    dataHead: [1, 2, 3, 4, 5],
  }],
  sscType2: [
    {type: 'wq', name: '万千'},
    {type: 'wb', name: '万百'},
    {type: 'ws', name: '万十'},
    {type: 'wg', name: '万个'},
    {type: 'qb', name: '千百'},
    {type: 'qs', name: '千十'},
    {type: 'qg', name: '千个'},
    {type: 'bs', name: '百十'},
    {type: 'bg', name: '百个'},
    {type: 'sg', name: '十个'}
  ]
}
// 11选5
const SYXW_LIST = {
  dataHead: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
  sscType: [{
    type: 'distribute',
    name: '号码分布'
  }, {
    type: 'wan',
    name: '万位走势'
  }, {
    type: 'qian',
    name: '千位走势'
  }, {
    type: 'bai',
    name: '百位走势'
  }, {
    type: 'shi',
    name: '十位走势'
  }, {
    type: 'ge',
    name: '个位走势'
  }]
}
// pk10
const PKS_LIST = {
  dataHead: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  sscType: [{
    type: 'first',
    name: '冠军'
  }, {
    type: 'second',
    name: '亚军'
  }, {
    type: 'third',
    name: '季军'
  }, {
    type: 'forth',
    name: '第四名'
  }, {
    type: 'fifth',
    name: '第五名'
  }, {
    type: 'sixth',
    name: '第六名'
  }, {
    type: 'seventh',
    name: '第七名'
  }, {
    type: 'eighth',
    name: '第八名'
  }, {
    type: 'ninth',
    name: '第九名'
  }, {
    type: 'last',
    name: '第十名'
  }]
}
// 快3
const K3_LIST = {
  dataHead: [1, 2, 3, 4, 5, 6],
  sscType: [{
    type: 'distribute',
    name: '号码分布'
  }, {
    type: 'bai',
    name: '百位走势'
  }, {
    type: 'shi',
    name: '十位走势'
  }, {
    type: 'ge',
    name: '个位走势'
  }]
}
// 低频彩、3d
const DPC_LIST = {
  dataHead: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  sscType: [{
    type: 'distribute',
    name: '号码分布'
  }, {
    type: 'bai',
    name: '百位走势'
  }, {
    type: 'shi',
    name: '十位走势'
  }, {
    type: 'ge',
    name: '个位走势'
  }]
}
// 基诺、快乐彩
const KLC_LIST = {
  dataHead: [],
  sscType: [{
    type: 'kaijiang',
    name: '开奖走势'
  }]
}
// 快乐十分
const KLSF_LIST = {
  dataHead: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  sscType: [{
    type: 'first',
    name: '第一位'
  }, {
    type: 'second',
    name: '第二位'
  }, {
    type: 'third',
    name: '第三位'
  }, {
    type: 'forth',
    name: '第四位'
  }, {
    type: 'fifth',
    name: '第五位'
  }, {
    type: 'sixth',
    name: '第六位'
  }, {
    type: 'seventh',
    name: '第七位'
  }, {
    type: 'eighth',
    name: '第八位'
  }]
}
// 获取组件宽高位置信息
let getLayout = ref => {
  const handle = findNodeHandle(ref)
  return new Promise((resolve) => {
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      resolve({x, y, width, height, pageX, pageY})
    })
  })
}

const CATEGORIES_LIST = {
  ssc: SSC_LIST,
  kl8: KLC_LIST,
  pk10: PKS_LIST,
  syx5: SYXW_LIST,
  k3: K3_LIST,
  dpc: DPC_LIST
}
// 不使用原始值的类型，在这里添加例外
const WORD_VALUE = [
  'big',
  'single',
  'prime',
  'zero',
]

class Trend extends Component {
  state = {
    currentList: {},
    min: 0,
    max: 9,
    showList: [],
    curLotteryType: 'wan',  // 当前标签页
    curDataHead: [],  // 当前标签头部内容
    curCategory: 'ssc', // 当前彩种类型
    layout: {}, // canvas‘ layout
    balls: []
  }

  componentDidMount () {
    let {realCategory} = this.props.activeLot
    let list = CATEGORIES_LIST[realCategory]
    if (realCategory === 'ssc') {
      list.sscType = [].concat(list.sscType1)
    }
    this.setState({
      currentList: {...list},
      curLotteryType: 'distribute',
      curDataHead: list.sscType[0].dataHead || list.dataHead,
      curCategory: realCategory
    })
  }

  // item {from: 起始页签index, i: 到达页签index}
  change = ({i}) => {
    let {sscType, dataHead} = this.state.currentList
    let type = sscType[i]?.type || 'wan'
    let result = []
    let curDataHead = sscType[i]?.dataHead || dataHead
    this.setState({
      showList: result,
      curLotteryType: type,
      curDataHead
    })
  }

  // 不同彩种不同类型使用不同的处理方式 待完善
  buildCode = (codeList) => {
    let {curLotteryType} = this.state
    let len = codeList.length
    switch (curLotteryType) {
      case 'distribute':
        break
      case 'wan':
        codeList = codeList.slice(len - 5, len - 4)
        break
      case 'qian':
        codeList = codeList.slice(len - 4, len - 3)
        break
      case 'bai':
        codeList = codeList.slice(len - 3, len - 2)
        break
      case 'shi':
        codeList = codeList.slice(len - 2, len - 1)
        break
      case 'ge':
        codeList = codeList.slice(len - 1, len)
        break
      case 'big':
        codeList = codeList.map(item => item > 4 ? '大' : '小')
        break
      case 'single':
        codeList = codeList.map(item => item % 2 === 0 ? '双' : '单')
        break
      case 'prime':
        codeList = codeList.map(item => [1, 2, 3, 5, 7].includes(parseInt(item)) ? '质' : '合')
        break
      case 'zero':
        codeList = codeList.map(item => item % 3)
        break
    }

    return codeList
  }

  handleCanvas = (canvas) => {
    canvas.height = 26 * 51
    canvas.width = 580
    const ctx = canvas.getContext('2d')
    setTimeout(() => {
      this.print()
      getLayout(this.refs.table).then(res => {
        ctx.lineWidth = 1
        ctx.strokeStyle = 'purple'
        this.state.balls.forEach(({pageX, pageY}, index) => {
          if (index === 0) {
            ctx.moveTo(pageX + 8, pageY - 300 + 8)
          } else {
            ctx.lineTo(pageX + 8, pageY - 300 + 8)
          }
        })
        ctx.stroke()
      })
    }, 500)
  }

  layout = (e, flag) => {
    this.setState({
      layout: e.layout
    })
  }

  print = async () => {
    let result = []
    let {curLotteryType} = this.state
    for (let i = 0; i < 50; i++) {
      result.push(getLayout(this.refs[curLotteryType + i]))
    }
    let temp = await Promise.all(result)
    await this.setState({
      balls: temp
    })
  }

  render () {
    let {latelyOpenList} = this.props
    let {currentList, curDataHead, curLotteryType} = this.state
    let {dataHead} = currentList || []
    return (
      <View style={styles.container}>
        <Tabs onChangeTab={this.change} renderTabBar={() => <ScrollableTab/>}>
          {
            currentList?.sscType?.map((item, index) => {
              return (
                <Tab heading={item.name} key={index}>
                  <View style={styles.table}>
                    <View style={[styles.row, styles.header]} ref={'table'}>
                      <Text style={[styles.issue, styles.cell]}>期数</Text>
                      <Text style={[styles.openNumber, styles.cell]}>开奖号码</Text>
                      <View style={[styles.numbers, styles.cell]}>
                        {
                          curDataHead.map((number, x) => {
                            return <Text style={styles.number} key={x}>{number}</Text>
                          })
                        }
                      </View>
                    </View>
                    {
                      latelyOpenList.map((item, index) => {
                        let {openIssue, openCode, codelist} = item
                        codelist = this.buildCode(codelist)
                        let openRef = curLotteryType + index
                        return (
                          <View style={styles.row} key={index}>
                            <Text style={[styles.issue, styles.cell]}>{openIssue.substring(6)}</Text>
                            <Text style={[styles.openNumber, styles.cell]}>{openCode}</Text>
                            <View style={[styles.numbers, styles.cell]}>
                              {
                                WORD_VALUE.includes(curLotteryType) ?
                                  codelist.map((value, x) => {
                                    return <View key={x} style={styles.number}>
                                      <Text style={styles.open}>{value}</Text>
                                    </View>
                                  }) :
                                  curDataHead.map((number, x) => {
                                    number = number.toString()
                                    let flag = codelist?.includes(number)
                                    return <View key={x} style={styles.number}>
                                      <Text ref={flag ? openRef : ''}
                                        style={flag ? (codelist.indexOf(number) === codelist.lastIndexOf(number)
                                          ? [styles.open, styles.single] : [styles.open, styles.multi]) : styles.open}>{number}</Text>
                                    </View>
                                  })
                              }
                            </View>
                          </View>
                        )
                      })
                    }
                    {
                      ['wan', 'qian', 'bai', 'shi', 'ge'].includes(curLotteryType) ? <Canvas style={styles.canvas} ref={this.handleCanvas}/> : null
                    }
                  </View>
                </Tab>
              )
            }) ||
            <Tab heading={'empty'}></Tab>
          }
        </Tabs>

      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {classic: {latelyOpenList}} = state
  return {latelyOpenList}
}

export default connect(mapStateToProps)(Trend)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  table: {
    // position: 'relative'
  },
  header: {
    backgroundColor: '#efefef'
  },
  row: {
    flexDirection: 'row',
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5
  },
  cell: {
    textAlign: 'center',
  },
  issue: {
    flex: 2,
    borderRightWidth: 0.5
  },
  openNumber: {
    flex: 4,
    borderRightWidth: 0.5
  },
  numbers: {
    flex: 6,
    flexDirection: 'row'
  },
  number: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 16,
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  open: {
    width: 16,
    height: 16,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
    borderRadius: 8,
  },
  multi: {
    backgroundColor: '#dd127b',
    color: '#fff'
  },
  single: {
    backgroundColor: '#22ac38',
    color: '#fff'
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
})
