import React from 'react'
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native'
import {
  Flex, Tabs, Card, WhiteSpace,
  Checkbox, List, Slider, Stepper,
  Button, WingBlank, TextareaItem
} from '@ant-design/react-native'

const CheckboxItem = Checkbox.CheckboxItem

import { modeInfo } from '../../data/options'

class RowBall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxItem1: true
    }
    this.time = 1700
  }

  componentDidMount() {
    // 渲染视图
    // 计算数据
  }

  render() {
    let {
      tools, activeViewData,
      clickBall, toolsCur, setBuyInfo, addBuyCard,
      balanceInfo, handleText
    } = this.props

    let {currentBalance} = balanceInfo.ye || {}

    let {num, multiple, model, rebateMode, total} = this.props.buyInfo

    let {showBet, showLayout, showBit, showText} = false

    if (Object.keys(activeViewData).length) showBet = true

    if (showBet && activeViewData.layout.length) showLayout = true

    if (showBet && activeViewData.bit) showBit = true

    if (showBet && activeViewData.text) showText = true
    return (
      <View style={{flex: 1}}>
        {
          showLayout || showBit || showText ?
            <ScrollView>
              <View>
                {
                  showBit ? <List style={{marginTop: 12}}>
                    <Text style={{marginTop: 12}}>Multiple options</Text>
                    <CheckboxItem
                      checked={this.state.checkboxItem1}
                      onChange={event => {
                        this.setState({checkboxItem1: event.target.checked})
                      }}
                    >
                      Option 1
                    </CheckboxItem>
                    <CheckboxItem>Option 2</CheckboxItem>
                    <CheckboxItem disabled>Option 3</CheckboxItem>
                    <CheckboxItem disabled checked>
                      Option 4
                    </CheckboxItem>
                  </List> : null
                }
                {
                  showLayout ? activeViewData.layout.map((row, index) => {
                    return (
                      <View key={index} style={styles.warp}>
                        <Flex justify="start">
                          <Text style={{fontSize: 16, marginLeft: 10}}>
                            {row.title}
                          </Text>
                          <View style={styles.ballItem}>
                            {
                              row.balls.map((b, bIdx) =>
                                <Button
                                  key={`${bIdx + '--' + b.title}`}
                                  type={b.choose ? 'primary' : 'ghost'} size="small"
                                  onPress={() =>
                                    clickBall(b, row, activeViewData.layout, index, activeViewData)
                                  }
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    marginLeft: 0,
                                    marginRight: 6
                                  }}>{b.text || b.ball}</Button>
                              )
                            }
                            {
                              tools.map((t, tIdx) =>
                                <Button
                                  key={`${tIdx + '--' + t.code}`}
                                  onPress={() => toolsCur(t, row)}
                                  type="ghost" size="small" style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 15,
                                  marginLeft: 0,
                                  marginRight: 6
                                }}>{t.name}</Button>
                              )
                            }
                          </View>
                        </Flex>
                      </View>
                    )
                  }) : null
                }
                {
                  showText ? <TextareaItem
                    rows={10}
                    onChange={(val) => handleText(val)}
                    value={activeViewData.textarea}
                    placeholder="高度自适应"
                    style={{margin: 6, padding: 10, borderRadius: 6}}
                  /> : null
                }
              </View>
            </ScrollView>
            :
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{marginTop: 100, fontSize: 20}}>
                Loading...
              </Text>
            </View>
        }

        <View style={styles.priceWarp}>
          <View style={styles.bonusWarp}>
            <Text>
              奖金调节
            </Text>
            <View style={{width: 200}}>
              <Slider
                // disabled
                defaultValue={rebateMode}
                value={rebateMode}
                min={1700}
                max={1960}
                step={2}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="#ededed"
                onChange={rebateMode => setBuyInfo({rebateMode})}
              />
            </View>
            {/*num,multiple,model,rebateMode,total*/}
            <View style={{width: 100}}>
              <Text style={{fontSize: 16}}>
                {rebateMode}/3.2%
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 100}}>
              <Stepper
                min={1}
                style={styles.stepper}
                defaultValue={multiple}
                onChange={multiple => setBuyInfo({multiple})}
              />
            </View>
            <View style={{
              flex: 1, flexDirection: 'row', justifyContent: 'space-evenly',
              marginLeft: 10, marginRight: 10
            }}>
              {
                modeInfo.map(m =>
                  <Button
                    key={m.money}
                    type={m.money === model ? 'primary' : 'ghost'}
                    onPress={() => setBuyInfo({model: m.money})}
                    size="small" style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    marginLeft: 0,
                    marginRight: 2
                  }}>{m.name}</Button>
                )
              }
            </View>
            <View style={{width: 80}}>
              <Button
                key={'Zhuihao'}
                type="ghost" size="small" style={{
                height: 28,
                borderRadius: 4
              }}>追号</Button>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 6}}>
            <View style={{flex: 1}}>
              <Text>人民币余额：<Text style={{color: 'blue'}}>{currentBalance}</Text></Text>
              <Text>注数：
                <Text style={{color: 'blue', marginRight: 5}}>{num}</Text>
                <Text style={{paddingLeft: 5}}>{'\t'}投注金额：</Text>
                <Text style={{color: 'blue'}}>{total}</Text>
              </Text>
            </View>
            <View style={{width: 80, justifyContent: 'center'}}>
              <Button
                key={'fastBuy'}
                type="ghost" size="small"
                onPress={() => addBuyCard()}
                style={{height: 28, borderRadius: 4}}>
                快速投注</Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default RowBall

const styles = StyleSheet.create({
  container: {
    flex: 1
    // flexDirection: 'column'
  },
  warp: {
    flex: 1,
    flexDirection: 'row',
    margin: 6,
    borderRadius: 6,
    marginTop: 1,
    height: 70,
    backgroundColor: '#fff'
    // alignItems: 'center'
  },
  left: {
    width: 60,
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ededed',
    borderLeftColor: '#ededed',
    borderLeftWidth: 2
  },
  ballItem: {
    // backgroundColor: 'darkcyan',
    margin: 4,
    marginTop: 2,
    marginBottom: 2,
    // justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  tools: {
    // backgroundColor: 'red',
    justifyContent: 'flex-start'
  },

  priceWarp: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderColor: '#dfdfdf',
    borderTopWidth: 1
  },
  bonusWarp: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepper: {
    borderRadius: 5
  }
})
