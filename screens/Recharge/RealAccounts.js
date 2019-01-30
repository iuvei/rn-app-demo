import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Dimensions,
  View,
  TouchableHighlight
} from 'react-native'
import { Button, Modal } from '@ant-design/react-native'
import { setActiveAccount } from '../../actions/common'
import { minbankCodeMap } from '../../constants/glyphMapHex'
import { styleUtil } from '../../utils/ScreenUtil'
import SvgIcon from '../../components/SvgIcon'
import { isObject } from 'lodash'
const height = Dimensions.get('window').height

class RealAccounts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      realAccounts: [],
      channelRealObj: {},
      visible: false
    }
  }

  componentDidMount() {
    let { recharge } = this.props
    // 人民币渠道集合
    let channelRealObj = {}
    let realAccounts = []
    Object.keys(recharge).forEach((keyTitle) => {
      if (keyTitle !== 'virtual') {
        Object.keys(recharge[keyTitle]).forEach((infomap) => {
          if (isObject(recharge[keyTitle][infomap])) {
            let channelReal = ''
            for (channelReal in recharge[keyTitle][infomap]) {
              if (recharge[keyTitle][infomap].hasOwnProperty(channelReal)) {
                for (let i = 0; i < recharge[keyTitle][infomap][channelReal].length; i++) {
                  if (Object.keys(this.props.activeAccount).length === 0 && i === 0) {
                    this.props.setActiveAccount(recharge[keyTitle][infomap][channelReal][i])
                  }
                  recharge[keyTitle][infomap][channelReal][i]['local_id'] =  channelReal + '_' + i + '_' + new Date().getTime()
                  realAccounts.push(recharge[keyTitle][infomap][channelReal][i])
                }
                channelRealObj[channelReal] = recharge[keyTitle][infomap][channelReal]
              }
            }
          }
        })
      }
    })
    this.setState({
      realAccounts: [].concat(realAccounts),
      channelRealObj: Object.assign({}, channelRealObj),
    })
  }

  componentWillReceiveProps(nextProps) {
    let { activeTabIndex, visible } = nextProps
    if (activeTabIndex && visible !== this.props.visible) {
      this.setState({
        visible: visible > 0
      })
    }
    if (activeTabIndex && !this.props.activeTabIndex) {
      this.props.setActiveAccount(this.state.realAccounts[0])
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.activeAccount.local_id !== this.props.activeAccount.local_id) {
      return false
    }
    return true
  }
  
  _renderContent = section => {
    return (
      <View key={section.title}>
        {
          section.content.map((item, index) => {
            return (
              <TouchableHighlight key={section.title+item.bankCode+index}
                onPress={() => {
                  this.props.setActiveAccount(item)
                }}
              >
                <View
                  style={styleUtil({height: 60, lineHeight: 60, backgroundColor: '#fff'})}
                >
                  <SvgIcon icon={minbankCodeMap[String(item.bankCode).toUpperCase()]} size={80}/>
                </View>
              </TouchableHighlight>
            )
          })
        }
      </View>
    )
  }

  render() {
    let { channelRealObj } = this.state
    let { activeAccount } = this.props

    return (
      <View>
        <Modal
          popup
          visible={this.state.visible}
          animationType="slide-up"
          onClose={() => this.setState({visible: false})}
        >
          <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
            <ScrollView style={{height: 0.5 * height, backgroundColor: '#fff'}}>
              {
                Object.keys(channelRealObj || {}).map((key) => {
                  return this._renderContent({title: key, content: channelRealObj[key]})
                })
              }
            </ScrollView>
            <Button type="ghost" onPress={() => this.setState({visible: false})} style={{marginTop: 20}}>
              关闭
            </Button>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {activeAccount} = state.member
  let {recharge} = state.common
  return {activeAccount, recharge}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveAccount: (data) => {
      dispatch(setActiveAccount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealAccounts)
