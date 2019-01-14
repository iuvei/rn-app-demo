import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Header, Tab, Tabs, ScrollableTab} from 'native-base'
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
    name: '大小形态'
  }, {
    type: 'single',
    name: '单双形态'
  }, {
    type: 'prime',
    name: '质合形态'
  }, {
    type: 'zero',
    name: '012形态'
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

class Trend extends Component {
  state = {
    currentList: {},
    min: 0,
    max: 9
  }

  componentDidMount () {
    this.setState({
      currentList: {...SSC_LIST}
    })
  }

  change = (item) => {
    console.log(item)
    Toast.info('change')
  }

  render () {
    let {latelyOpenList} = this.props
    let {currentList} = this.state
    let {dataHead} = currentList || []
    return (
      <View style={styles.container}>
        <Tabs renderTabBar={() => <ScrollableTab/>}>
          {
            currentList?.sscType1?.map((item, index) => {
              return (
                <Tab heading={item.name} key={index}>
                  <View style={styles.table}>
                    <View style={[styles.row, styles.header]}>
                      <Text style={[styles.issue, styles.cell]}>期数</Text>
                      <Text style={[styles.openNumber, styles.cell]}>开奖号码</Text>
                      <View style={[styles.numbers, styles.cell]}>
                        {
                          dataHead.map((number, x) => {
                            return <Text style={styles.number} key={x}>{number}</Text>
                          })
                        }
                      </View>
                    </View>
                    {
                      latelyOpenList.map((item, index) => {
                        let {openIssue, openCode, codelist} = item
                        return (
                          <View style={styles.row} key={index}>
                            <Text style={[styles.issue, styles.cell]}>{openIssue.substring(6)}</Text>
                            <Text style={[styles.openNumber, styles.cell]}>{openCode}</Text>
                            <View style={[styles.numbers, styles.cell]}>
                              {
                                dataHead.map((number, x) => {
                                  let flag = codelist?.includes(number.toString())
                                  return <View style={styles.number} key={x}><Text style={flag ? styles.open : {}}>{number}</Text></View>
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
  },
  open: {
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: 16,
    backgroundColor: '#22ac38',
    borderRadius: 8,
    color: '#fff'
  }
})
