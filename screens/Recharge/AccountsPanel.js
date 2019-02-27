import React from 'react'
import { connect } from 'react-redux'
import { setActiveAccount } from '../../actions/common'
import {
  View,
  Text,
  Image, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage
} from 'react-native'
import {
  Tabs,
  Accordion,
  List,
  Flex
} from '@ant-design/react-native'

import { isObject } from 'lodash'
import { minbankCodeMap } from '../../constants/glyphMapHex'
import SvgIcon from '../../components/SvgIcon'
import { Icon } from 'expo'
import { setSpText, stylesUtil } from '../../utils/ScreenUtil'

class AccountsPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: [{title: '', value: '', arr: []}],
      activeSections: [0],
      curPage: 0
    }
  }

  componentDidMount () {
    let { recharge } = this.props
    let tmp_tabs = []
    Object.keys(recharge).forEach((keyTitle) => {
      let arr = []
      Object.keys(recharge[keyTitle]).forEach(infomap =>{
        if (isObject(recharge[keyTitle][infomap])) {
          Object.keys(recharge[keyTitle][infomap]).forEach(key => {
            arr.push({title: key, accounts: recharge[keyTitle][infomap][key]})
          })
        }
      })
      tmp_tabs.push({title: recharge[keyTitle].modelName, value: keyTitle, arr })
    })
    this.props.setActiveAccount(tmp_tabs[0].arr[0].accounts[0])
    this.setState({
      tabs: tmp_tabs
    })
    // 人民币渠道集合
    // let channelRealObj = {}
    // let realAccounts = []
    // Object.keys(recharge).forEach((keyTitle) => {
    //   if (keyTitle !== 'virtual') {
    //     Object.keys(recharge[keyTitle]).forEach((infomap) => {
    //       if (isObject(recharge[keyTitle][infomap])) {
    //         let channelReal = ''
    //         for (channelReal in recharge[keyTitle][infomap]) {
    //           if (recharge[keyTitle][infomap].hasOwnProperty(channelReal)) {
    //             for (let i = 0; i < recharge[keyTitle][infomap][channelReal].length; i++) {
    //               if (Object.keys(this.props.activeAccount).length === 0 && i === 0) {
    //                 this.props.setActiveAccount(recharge[keyTitle][infomap][channelReal][i])
    //               }
    //               recharge[keyTitle][infomap][channelReal][i]['local_id'] =  channelReal + '_' + i + '_' + new Date().getTime()
    //               realAccounts.push(recharge[keyTitle][infomap][channelReal][i])
    //             }
    //             channelRealObj[channelReal] = recharge[keyTitle][infomap][channelReal]
    //           }
    //         }
    //       }
    //     })
    //   }
    // })
    // this.setState({
    //   realAccounts: [].concat(realAccounts),
    //   channelRealObj: Object.assign({}, channelRealObj),
    // })
  }

  onChange = activeSections => {
    let { tabs, curPage } = this.state
    this.setState({ activeSections })
    if (activeSections.length > 0 && activeSections[0] >= 0) {
      this.props.setActiveAccount(tabs[curPage].arr[activeSections[0]].accounts[0])
    }
  }

  _renderSectionTitle = section => {
    return (
      <View style={{height: 0}}>
        <Text></Text>
      </View>
    )
  }

  _renderHeader = (section, index) => {
    return (
      <Flex
        style={{backgroundColor: '#fff', height: 40, borderBottomColor: '#f0f0f0', borderBottomWidth: 0.5, paddingHorizontal: 16}}>
        <View style={{flex: 1}}><Text style={{lineHeight: 40, color: '#333', width: '50%'}}>{section.title}</Text></View>
        <Text style={{width: 90, textAlign: 'right'}}><Icon.Ionicons style={{textAlign: 'right'}} color={this.state.activeSections[0] === index ? '#666' : '#cacaca'}
          name={this.state.activeSections[0] === index ? "ios-arrow-down" : "ios-arrow-forward"} size={20}></Icon.Ionicons></Text>
      </Flex>
    )
  }

  _renderContent = section => {
    let activeId = this.props.activeAccount.payChannelCode+this.props.activeAccount.bankCode
    return (
      <View style={{backgroundColor: '#fff', paddingHorizontal: 5, marginTop: 5, marginBottom: 5}}>
        <Flex justify="around">
          {
            section.accounts.map((account, idx) => {
              return  <Flex.Item key={section.title + account.payChannelCode + idx}
                onPress={() => {
                  this.props.setActiveAccount(account)
                }}>
                <SvgIcon
                  icon={minbankCodeMap[String(account.bankCode || account.coinCode).toUpperCase()]}
                  width={80} height={30}
                  style={{marginLeft: 'auto', marginRight: 'auto', borderWidth: 1, borderColor: activeId === (account.payChannelCode+account.bankCode) ? '#ffac1e' : '#fff', paddingHorizontal: 5}}/>
              </Flex.Item>
            })
          }
        </Flex>
      </View>
    )
  }

  tabsChange = (d, t) => {
    this.setState({
      activeSections: [0],
      curPage: t
    })
    this.props.setActiveAccount(d.arr[0].accounts[0])
  }

  render () {
    let { tabs, activeSections, curPage } = this.state
    console.log(tabs)
    return (
      <View>
        <View style={styles.warp}>
          <Flex>
            <View style={styles.playNav}>
              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {
                    tabs.map((d, index) => {
                      return <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={() => this.tabsChange(d, index)}
                        style={[styles.btnDefault, index === curPage ? styles.btnActive : null]}>
                        <Text
                          style={[styles.btnDefaultText, index === curPage ? styles.btnActive : null]} numberOfLines={1}
                          >{d.title}</Text>
                      </TouchableOpacity>
                    })
                  }
                </ScrollView>
              </View>
            </View>
          </Flex>

        </View>
        {
          tabs[curPage].arr.length > 0 &&
          <View style={{marginBottom: 5}}>
            <Accordion
              duration={50}
              activeSections={activeSections}
              sections={tabs[curPage].arr}
              onChange={this.onChange}
              renderHeader={this._renderHeader}
              renderSectionTitle={this._renderSectionTitle}
              renderContent={this._renderContent}
            />
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { recharge } = state.common
  let { activeAccount } = state.member
  return { recharge, activeAccount }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveAccount: (data) => { dispatch(setActiveAccount(data)) }
  }
}

const styles = StyleSheet.create(stylesUtil({
  warp: {backgroundColor: '#ffffff', justifyContent: 'center', height: 34, paddingLeft: 2},
  playNav: {
    marginTop: 2,
  },
  btnDefault: {
    height: 30,
    lineHeight: 30,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 2,
    paddingLeft: 4,
    paddingRight: 4,
    // borderRadius: 20,
    marginRight: 5
  },
  btnActive: {
    borderBottomColor: '#00bbcc',
    color: '#00bbcc'
  },
  Touchable: {
    height: 26,
    lineHeight: 26
  },
  btnDefaultText: {
    fontSize: 13,
    lineHeight: 26,
    paddingLeft: 4,
    paddingRight: 4,
    color: '#333',
    textAlign: 'center'
  },
  btnActiveText: {
    color: '#00bbcc'
  }
})
)

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPanel)
