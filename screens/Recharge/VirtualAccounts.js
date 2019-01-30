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
const height = Dimensions.get('window').height

class VirtualAccounts extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      virtualAccounts: [],
      visible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let { activeTabIndex, visible } = nextProps
    if (!activeTabIndex && visible !== this.props.visible) {
      this.setState({
        visible: visible > 0
      })
    }
    if (!activeTabIndex && this.props.activeTabIndex) {
      this.props.setActiveAccount(this.state.virtualAccounts[0])
    }
  }

  componentDidMount() {
    let { recharge } = this.props
    // 数字货币充值渠道集合
    let virtualAccounts = []
    if (recharge && recharge.virtual && recharge.virtual.virtualInfoMap) {
      let channelVirtual = ''
      for (channelVirtual in recharge.virtual.virtualInfoMap) {
        if (recharge.virtual.virtualInfoMap.hasOwnProperty(channelVirtual)) {
          recharge.virtual.virtualInfoMap[channelVirtual].forEach((accountVirtual, idx) => {
            accountVirtual['local_id'] = channelVirtual + '_' + idx + '_' + new Date().getTime()
            virtualAccounts.push(accountVirtual)
          })
        }
      }
    }
    this.setState({
      virtualAccounts: [].concat(virtualAccounts)
    })
  }

  render() {
    let { virtualAccounts } = this.state

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
              <View>
                {
                  virtualAccounts.length > 0 && virtualAccounts.map((item, index) => {
                    return (
                      <TouchableHighlight key={item.coinCode+index}
                        onPress={() => {
                          this.props.setActiveAccount(item)
                        }}
                      >
                        <View
                          style={styleUtil({height: 60, lineHeight: 60, backgroundColor: '#fff'})}
                        >
                            <SvgIcon icon={minbankCodeMap[String(item.coinCode).toUpperCase()]} size={80}/>
                        </View>
                      </TouchableHighlight>
                    )
                  })
                }
              </View>
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
  let {recharge} = state.common
  return {recharge}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveAccount: (data) => {
      dispatch(setActiveAccount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VirtualAccounts)
