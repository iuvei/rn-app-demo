import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Tab, Tabs, ScrollableTab} from 'native-base'
import {Toast} from '@ant-design/react-native'

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
    curLotteryType: 'wan',
    curDataHead: [],
  }

  componentDidMount () {
    SSC_LIST.sscType = [].concat(SSC_LIST.sscType1)
    this.setState({
      currentList: {...SSC_LIST},
      curLotteryType: 'distribute',
      curDataHead: SSC_LIST.sscType[0].dataHead || SSC_LIST.dataHead
    })
  }

  // item {from: 起始页签index, i: 到达页签index}
  change = ({i}) => {
    let {sscType, dataHead} = this.state.currentList
    let type = sscType[i].type || 'wan'
    let result = []
    let curDataHead = sscType[i].dataHead || dataHead
    this.setState({
      showList: result,
      curLotteryType: type,
      curDataHead
    })
  }

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
        codeList = codeList.map(item => item % 2 === 0 ? '双' : '单' )
        break
      case 'prime':
        codeList = codeList.map(item => [1,2,3,5,7].includes(parseInt(item)) ? '质' : '合')
        break
      case 'zero':
        codeList = codeList.map(item => item % 3)
        break
    }

    return codeList
    // if (lottery.type === 6 || this.lottery.type === 7) {
    //   codeList = [codeList[pksDic.indexOf(curLotteryType)]]
    // } else if (['distribute', 'big', 'single', 'prime', 'zero', ...lhh].includes(this.curLotteryType)) {
    //   codeList = this.buildCode(codeList, this.titleName)
    // }
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
                    <View style={[styles.row, styles.header]}>
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
                                      <Text style={flag ? (codelist.indexOf(number) === codelist.lastIndexOf(number)
                                        ? [styles.open, styles.single] : [styles.open, styles.multi]) : styles.open}>{number}</Text>
                                    </View>
                                  })
                              }
                            </View>
                          </View>
                        )
                      })
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
    backgroundColor: '#ededed'
  },
  listItem: {
    backgroundColor: '#fff',
    margin: 10,
    marginBottom: 0,
    borderRadius: 8,
    padding: 10
  },
  table: {},
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
    flex: 2,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  open: {
    width: 16,
    height: 16,
    textAlign: 'center',
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
  }
})
