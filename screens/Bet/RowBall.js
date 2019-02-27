import React from 'react'
import _ from 'lodash'
import {
  View, Text, StyleSheet, ScrollView, Keyboard, KeyboardAvoidingView
} from 'react-native'
import {
  Stepper, Modal,
  Button, TextareaItem
} from '@ant-design/react-native'

import CheckBox from 'react-native-check-box'

import { modeInfo } from '../../data/options'
import { withNavigation } from 'react-navigation'
import { scaleSize, stylesUtil, styleUtil } from '../../utils/ScreenUtil'
import SliderComponent from './BetPage/SliderComponent'
import BetBallContainer from './BetPage/BetBallContainer'
import ModeComponent from './BetPage/ModeComponent'
import SimpleStepper from '../../components/SimpleStepper/SimpleStepper.js'

class RowBall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderMode: '0.0',
      checkboxItem1: true,
      showFullTextArea: false,
      multiple: 1
    }
    this.time = 1700
  }

  componentDidMount() {
    // 渲染视图
    // 计算数据
    // 改变数据时
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.setState = () => () => {
    }
  }
  _keyboardDidShow = () => {
    this.setState({
      showKeyboard: true
    })
  }

  _keyboardDidHide = () => {
    this.setState({
      showKeyboard: false
    })
  }

  valueChanged = (value) => {
    const nextValue = Number(Number(value).toFixed(0))
    this.setState({ multiple: nextValue })
    this.props.setBuyInfo({multiple: nextValue})
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

  // 计算返点
  changeBonusPrize = (nextProps) => {
    let {model, rebateMode} = nextProps.buyInfo
    let {minRuleMode, bonusPrize, maxRuleMode} = nextProps.activeGamesPlay
    let bonus = bonusPrize || {}
    if (!Object.keys(bonus).length) {
      this.props.setBonusPrize({
        resmin: 0,
        resmax: 0
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
      this.props.setBonusPrize({
        bonus: bonusLen,
        resmin,
        resmax,
        chaseMin,
        chaseMax
      })
    } else {
      this.props.setBonusPrize({
        bonus: bonusLen,
        chaseMin,
        resmin
      })
    }
  }

  // 改变模式
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
      tools, activeViewData: {rectangle, moreTitle}, activeViewData,
      clickBall, toolsCur, setBuyInfo, addBuyCard, doAllIn,
      balanceInfo, handleText, buyInfo, closeAllIn,
      curMaxMode, isShowAllIn, confirmAllIn,
      isKlcYxyLot, bonusPrize,
      userBalanceInfoYE, openIssue,
      activeGamesPlay: {lotterMinMode}
    } = this.props

    let {currentBalance} = balanceInfo.ye || {}

    let {num, multiple, model, rebateMode, total} = buyInfo

    let {showBet, showLayout, showBit, showText} = false

    if (Object.keys(activeViewData).length) showBet = true

    if (showBet && activeViewData.layout.length) showLayout = true

    if (showBet && activeViewData.bit) showBit = true

    if (showBet && activeViewData.text) showText = true

    const footerButtons = [
      { text: '取消', onPress: () => closeAllIn() },
      { text: '确认', onPress: () => confirmAllIn() },
    ]
    // 当前渲染格式
    return (
      <View style={this.state.showFullTextArea ? {} : {flex: 1}}>
        {
          showLayout || showBit || showText ?
            <ScrollView>
              <View>
                {
                  showBit ? <View style={styles.BitWarp}>
                    {
                      activeViewData.bit.map((item, key) => {
                        return (
                          <View style={styles.BitView} key={key}>
                            <CheckBox
                              onClick={() => {
                                // this.setState({
                                //   isChecked: !this.state.isChecked
                                // })
                                this.props.toHandCheckBox(item)
                                // activeViewData.checkbox
                                // item.position
                              }}
                              isChecked={item.choose}
                              rightText={item.name}
                            />
                          </View>
                        )
                      })
                    }
                  </View> : null
                }
                {
                  showLayout ? activeViewData.layout.map((row, index) => {
                    return (
                      <BetBallContainer
                        key={index}
                        index={index}
                        row={row}
                        clickBall={clickBall}
                        activeViewData={activeViewData}
                        rectangle={rectangle}
                        tools={tools}
                        toolsCur={toolsCur}
                      />
                    )
                  }) : null
                }
                {
                  showText ? <View>
                      <Text style={styles.TextAreaTips}>
                        请在下方的输入框内输入或粘贴投注内容，每注请使用
                        <Text>逗号</Text>、
                        <Text>空格</Text>或'
                        <Text>;</Text>'分割开。
                      </Text>
                      <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
                        <TextareaItem
                          rows={4}
                          onChange={(val) => handleText(val)}
                          onFocus={() => {
                            this.setState({
                              showFullTextArea: true
                            })
                          }}
                          onBlur={() => {
                            this.setState({
                              showFullTextArea: false
                            })
                          }}
                          value={activeViewData.textarea}
                          keyboardType={'number-pad'}
                          placeholder="请输入投注号码"
                          style={styles.TextAreaItem}
                        />
                      </KeyboardAvoidingView>
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
              <Text style={{marginTop: 50, fontSize: 16, color: '#00bbcc'}}>
                加载中...
              </Text>
            </View>
        }
        <KeyboardAvoidingView behavior={'padding'} enabled>
        <View style={styleUtil({...styles.priceWarp, paddingBottom: this.state.showKeyboard ? 220 :0, paddingTop: 5})}>
          <View style={styles.features}>
            <View style={styles.StepperView}>
              {/* <Stepper
                min={1}
                max={999999}
                style={styles.stepper}
                value={multiple}
                onChange={multiple => {
                  if (Number(multiple) > 0 && isInteger(Number(multiple)) && Number(multiple) < 1000000) {
                    setBuyInfo({multiple: Number(multiple)})
                  }
                }}
              /> */}
              <SimpleStepper
                value={this.state.multiple}
                valueChanged={value => this.valueChanged(value)}
                minimumValue={0} maximumValue={99999}
                initialValue={1} padding={0}
                tintColor="#00bbcc" imageHeight={28} />
            </View>
            <View style={styles.ModeView}>
              {
                modeInfo.map(modeItem =>
                  <ModeComponent
                    key={modeItem.value}
                    setBuyInfo={setBuyInfo}
                    model={model} modeItem={modeItem}/>
                )
              }
            </View>
            {
              !isKlcYxyLot &&
              <View style={styles.chaseView}>
                <Button
                  key={'Zhuihao'}
                  type="ghost" size="small"
                  onPress={() => {
                    addBuyCard(false, () => {
                      this.props.navigation.navigate('ChaseScreen', {
                        orderList: [this.props.buyCardData[this.props.buyCardData.length - 1]],
                        buyCardInfo: this.props.buyInfo
                      })
                    })
                  }}
                  style={{height: scaleSize(28), borderRadius: 4}}>
                  <Text style={styleUtil({fontSize:12})}>追号</Text>
                </Button>
              </View>
            }
          </View>
          {
            !isKlcYxyLot ? <SliderComponent
              rebateMode={rebateMode}
              lotterMinMode={lotterMinMode}
              curMaxMode={curMaxMode}
              setBuyInfo={setBuyInfo}
              sliderMode={this.state.sliderMode}
            /> : null
          }
          {
            !isKlcYxyLot ? <Text style={styles.BonusText}>注数：
              <Text style={styles.BuyInfoDefaultText}>{num}</Text>
              {'\t'}  当前奖金：
              {
                bonusPrize.bonus ? `${bonusPrize.resmin} ~ ${bonusPrize.resmax}`
                  : (bonusPrize.resmin || '00000.0000')
              }
            </Text> : <Text style={styles.BonusText}>注数：<Text style={styles.BuyInfoDefaultText}>{num}</Text></Text>
          }
          {/*<KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>*/}
          <View style={styles.BuyInfoView}>
            <View style={{flex: 1}}>
              <Text style={styles.BuyInfoDefaultText}>
                人民币余额：
                <Text style={{...styles.BuyInfoActiveText, color: '#00bbcc'}}>{userBalanceInfoYE.currentBalance}</Text>
              </Text>
              <Text style={styles.BuyInfoDefaultText}>
                <Text>投注金额：</Text>
                <Text style={{...styles.BuyInfoDefaultText, color: '#ff0000'}}>{total}</Text>
              </Text>
            </View>
            <View style={styles.fastBuyView}>
              <Button
                key={'allIn'}
                type="ghost" size="small"
                onPress={() => doAllIn(true)}
                style={[styles.fastBuyText,{height:scaleSize(28), marginRight: 4}]}>
                一键梭哈</Button>
              <Button
                key={'fastBuy'}
                type="ghost" size="small"
                onPress={() => addBuyCard(true)}
                style={[styles.fastBuyText,{height:scaleSize(28)}]}>
                快速投注</Button>
            </View>
          </View>
          <Modal
            title="投注提示"
            transparent
            visible={isShowAllIn}
            footer={footerButtons}
          >
            <View style={{marginTop: 15, padding: 5}}>
              <Text>你确认加入第 <Text style={{color: 'red'}}>{openIssue.currentIssue}</Text> 期？</Text>
              <Text>是否追号：<Text style={{color: 'red'}}>否</Text></Text>
              <Text>订单笔数：<Text style={{color: 'red'}}>1</Text></Text>
              <Text>当前倍数：<Text style={{color: 'red'}}>{buyInfo.multiple}</Text></Text>
              <Text>投注总数：<Text style={{color: 'red'}}>{buyInfo.num}</Text></Text>
              <Text>当前币种：<Text style={{color: 'red'}}>人民币</Text></Text>
              <Text>投注总额：<Text style={{color: 'red'}}>{buyInfo.total * buyInfo.model}元</Text></Text>
            </View>
          </Modal>
          {/*</KeyboardAvoidingView>*/}
        </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default withNavigation(RowBall)

const styles = StyleSheet.create(stylesUtil({
  container: {
    flex: 1
  },
  BitWarp: {
    // marginTop: 12,
    flexDirection: 'row'
    // justifyContent: 'space-between',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  BitView: {flex: 1, padding: 6},

  TextAreaTips: {padding: 10, paddingBottom: 0},
  TextAreaItem: {margin: 10, padding: 10, borderRadius: 6},

  priceWarp: {
    backgroundColor: '#fff',
    borderColor: '#dfdfdf',
    borderTopWidth: 1
  },
  BonusText: {color: '#333', paddingHorizontal: 10},
  features: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  StepperView: {
    padding: 0,
    width: 120
  },
  stepper: {borderRadius: 5},
  ModeView: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-evenly',
    marginBottom: 0
  },

  chaseView: {width: 80},
  BuyInfoView: {
    flexDirection: 'row', marginTop: 6, borderTopWidth: 1,
    borderColor: '#dfdfdf', padding: 10
  },
  BuyInfoDefaultText: {color: '#333'},
  BuyInfoActiveText: {color: '#0a7cda'},
  fastBuyView: {width: 140, justifyContent: 'center', flexDirection: 'row', paddingLeft: 10, paddingRight: 10},
  fastBuyText: {borderRadius: 4}
}))
