import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  View,
  Text
} from 'react-native'
import {
  Tabs,
  WhiteSpace,
  Button,
  InputItem,
  Flex,
  Checkbox
} from '@ant-design/react-native'

const tabs = [
  { title: '利润率追号', value: 'a_zh' },
  { title: '同倍追号', value: 'b_zh' },
  { title: '翻倍追号', value: 'c_zh' },
]

class ChaseScreen extends React.Component {
  static navigationOptions = {
    title: '追号'
  }

  constructor(props) {
    super(props)
    this.state = {
      buyCardData: props.navigation.getParam('buyCardData', []),
      buyCardInfo: props.navigation.getParam('buyCardInfo', {}),
      activeTab: 'a_zh',

      chaseIssueTotal: '10',
      startMultiple: '1',
      bigMultiple: '100',
      lowIncome: '50',
      middleIssue: '1',
      nextType: 'cheng',
      nextMultiple: '2',
      total: '0.000',
      winStop: true
    }
  }

  componentDidMount() {
    console.log(this.state)
  }

  render() {
    let { chaseIssueTotal, startMultiple, bigMultiple, lowIncome, middleIssue, nextType, nextMultiple, winStop, total, activeTab } = this.state
    let topContent = <View>
      <Flex justify="around">
        <Flex.Item>
          <InputItem labelNumber={5} value={chaseIssueTotal} onChange={v => {
            this.setState({chaseIssueTotal: v})
          }}>追号期数</InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem labelNumber={5} value={startMultiple} onChange={v => {
            this.setState({startMultiple: v})
          }}>起始倍数</InputItem>
        </Flex.Item>
      </Flex>
      {
        activeTab === 'a_zh' &&
        <Flex justify="around">
          <Flex.Item>
            <InputItem labelNumber={5} value={bigMultiple} onChange={v => {
              this.setState({bigMultiple: v})
            }}>最大倍投</InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem labelNumber={5} value={lowIncome} onChange={v => {
              this.setState({lowIncome: v})
            }}>最大收益率</InputItem>
          </Flex.Item>
        </Flex>
      }
      <Flex justify="around">
        <Flex.Item alignItems="center">
          <Checkbox checked={winStop} onChange={v => this.setState({winStop: v})}>中奖后停止追号</Checkbox>
        </Flex.Item>
        <Flex.Item alignItems="center">
          <Button type="primary" size="small">
            生成追号单
          </Button>
        </Flex.Item>
      </Flex>
      {
        activeTab === 'c_zh' &&
        <Flex justify="around">
          <Flex.Item>
            <Flex justify="around">
              <Flex.Item alignItems="center">
                <Text>隔</Text>
              </Flex.Item>
              <Flex.Item alignItems="center">
                <InputItem value={middleIssue} onChange={v => {
                  this.setState({middleIssue: v})
                }}></InputItem>
              </Flex.Item>
              <Flex.Item alignItems="center">
                <Text>期</Text>
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item>
            <Flex>
              <Flex.Item>
                <Button size="small" type="ghost">+</Button>
              </Flex.Item>
              <Flex.Item>
                <Button size="small" type="primary">x</Button>
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <InputItem value={nextMultiple} onChange={v => {
              this.setState({nextMultiple: v})
            }}></InputItem>
          </Flex.Item>
        </Flex>
      }
    </View>
    let listContent = <View>
      <Text>list</Text>
    </View>

    return (
      <View style={{flex: 1}}>
        <WhiteSpace size="sm" />
        <Tabs
          onChange={v => {
            this.setState({
              activeTab: v.value
            })
          }}
          tabs={tabs}>
          <ScrollView style={{ backgroundColor: 'orange', flex: 1 }}>{topContent}{listContent}</ScrollView>
        </Tabs>
        <View style={{height: 50, alignItems: 'center', backgroundColor: 'pink', justifyContent: 'center'}}>
          <Button type="ghost" style={{width: '50%', height: 40}}>立即追号</Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChaseScreen)
