import React from 'react'
import _ from 'lodash'
import {
  View, Text, StyleSheet, ScrollView, KeyboardAvoidingView
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
      sliderMode: '0.0',
      checkboxItem1: true,
      bonusPrize: {}
    }
    this.time = 1700
  }

  componentDidMount() {
    // 渲染视图
    // 计算数据
    // 改变数据时
  }

  componentWillReceiveProps(np) {
    let oldInfo = this.props.buyInfo

    if (!_.isEqual(this.props.activeGamesPlay, np.activeGamesPlay)
      && Object.keys(np.activeGamesPlay)) {
      this.changeBonusPrize(np)
    }

    if (!_.isEqual(this.props.buyInfo, np.buyInfo)) {
      if (!_.isEqual(oldInfo.model, np.buyInfo.model)) {
        this.changeBonusPrize(np)
      }
      if (!_.isEqual(oldInfo.rebateMode, np.buyInfo.rebateMode)) {
        this.changeBonusPrize(np)
        this.changeModePoint(np)
      }
    }
  }

  changeBonusPrize = (nextProps) => {
    let {model, rebateMode} = nextProps.buyInfo
    let {minRuleMode, bonusPrize, maxRuleMode} = nextProps.activeGamesPlay
    let bonus = bonusPrize || {}
    if (!Object.keys(bonus).length) {
      this.setState({
        bonusPrize: Object.assign({}, this.state.bonusPrize, {
          resmin: 0,
          resmax: 0
        })
      })
      return
    }

    // 有多个区间，去除0的最大数值，然后去计算
    // 单个区间的时候，取最大和最小，显示最小
    // 最低返点，最大返点，用户大于最大返点=最大返点 ，如果用户
    let arr = []
    let item = {}
    for (let b in bonus) {
      if (bonus[b].indexOf('/') > -1) {
        item = {
          min: parseFloat(bonus[b].split('/')[0]) || 0,
          max: parseFloat(bonus[b].split('/')[1]) || 0
        }
      } else {
        item = {
          min: parseFloat(bonus[b]) || 0
        }
      }
      arr.push(item)
    }
    arr.sort((a, b) => {
      return a.min - b.min
    })
    let startArr = arr[0]
    let endArr = arr[arr.length - 1]
    let {resmin, resmax} = {}
    let {chaseMin, chaseMax} = {}
    let tmpX = (maxRuleMode - minRuleMode)
    resmin = ((tmpX !== 0 ? (startArr.min + (startArr.max - startArr.min) / tmpX * (rebateMode - minRuleMode)) : startArr.min) * model).toFixed(4)
    resmax = ((tmpX !== 0 ? (endArr.min + (endArr.max - endArr.min) / tmpX * (rebateMode - minRuleMode)) : endArr.min) * model).toFixed(4)
    chaseMin = (rebateMode / (minRuleMode / startArr.min)).toFixed(4)
    chaseMax = (rebateMode / (minRuleMode / endArr.min)).toFixed(4)
    let bonusLen = Object.keys(bonus).length > 1
    if (bonusLen) {
      this.setState({
        bonusPrize: Object.assign({}, this.state.bonusPrize, {
          bonus: bonusLen,
          resmin,
          resmax,
          chaseMin,
          chaseMax
        })
      })
    } else {
      this.setState({
        bonusPrize: Object.assign({}, this.state.bonusPrize, {
          bonus: bonusLen,
          chaseMin,
          resmin
        })
      })
    }
  }

  changeModePoint = (np) => {
    let {userRebate, buyInfo} = np
    // let maxRebate = (curMaxMode - 1700) / 20
    let {rebateMode} = buyInfo
    let sliderMode = '0.0'
    if (np.activeGamesPlay.minRuleMode && userRebate !== 1700) {
      sliderMode = ((userRebate - rebateMode) / 20).toFixed(1)
    }
    this.setState({
      sliderMode
    })
  }

  render() {
    let {
      tools, activeViewData,
      clickBall, toolsCur, setBuyInfo, addBuyCard,
      balanceInfo, handleText,
      curMaxMode, lotterMinMode,
      isKlcYxyLot
    } = this.props
    let {bonusPrize} = this.state

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


                    {
                      activeViewData.bit.map((item, key) => {
                        return (
                          <CheckboxItem
                            key={key}
                            checked={item.choose}
                            onChange={() => {
                              // console.log('稍后处理')
                            }}
                          >{item.name}</CheckboxItem>
                        )
                      })
                    }

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
                  showText ? <View>
                      <Text style={{padding: 8, paddingBottom: 0}}>
                        请在下方的输入框内输入或粘贴投注内容，每注请使用
                        <Text>逗号</Text>、
                        <Text>空格</Text>或'
                        <Text>;</Text>'分割开。
                      </Text>
                      <TextareaItem
                        rows={10}
                        onChange={(val) => handleText(val)}
                        value={activeViewData.textarea}
                        placeholder="请输入投注号码"
                        style={{margin: 6, padding: 10, borderRadius: 6}}
                      />
                    </View>
                    : null
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
          {
            !isKlcYxyLot ? <View style={styles.bonusWarp}>
              <Text>
                奖金调节
              </Text>
              <View style={{width: 200}}>
                <Slider
                  // disabled
                  defaultValue={rebateMode}
                  value={rebateMode}
                  min={lotterMinMode}
                  max={curMaxMode}
                  step={2}
                  disabled={curMaxMode === 1700 || curMaxMode === lotterMinMode}
                  minimumTrackTintColor="blue"
                  maximumTrackTintColor="#ededed"
                  onAfterChange={rebateMode => setBuyInfo({rebateMode})}
                />
              </View>
              {/*num,multiple,model,rebateMode,total*/}
              <View style={{width: 100}}>
                <Text style={{fontSize: 16}}>
                  {/*<template v-if="bonusPrize.resmax">*/}
                  {/*<Icon type="social-yen" />*/}
                  {/*<span>当前奖金*/}
                  {/*<em> {{ bonusPrize.resmin }}</em> ~*/}
                  {/*<em>{{ bonusPrize.resmax }}</em> 元*/}
                  {/*</span>*/}
                  {/*</template>*/}
                  {/*<template v-else>*/}
                  {/*<template v-if="bonusPrize.resmin">*/}
                  {/*<Icon type="social-yen" />*/}
                  {/*<span>当前奖金 <em>{{ bonusPrize.resmin || '00000.0000' }}</em> 元</span>*/}
                  {/*</template>*/}
                  {/*</template>*/}
                  {rebateMode}/{this.state.sliderMode}
                </Text>
              </View>
            </View> : null
          }
          <Text>
            当前奖金：
            {

              bonusPrize.bonus ? `${bonusPrize.resmin} ~ ${bonusPrize.resmax}`
                : (bonusPrize.resmin || '00000.0000')
            }
          </Text>
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
                type="ghost" size="small"
                onPress={() => addBuyCard()}
                style={{
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
                onPress={() => addBuyCard(true)}
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
    borderRadius: 6,
    margin: 10,
    marginBottom: 0,
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
