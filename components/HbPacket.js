import React, {Component} from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { Modal, Button } from '@ant-design/react-native'
import { getRedEnvelopeTimeConfig, grabRedEnvelope } from './../api/member'
import { connect } from "react-redux";

class HbPacket extends Component {
  constructor(props) {
    super (props);
    this.state = {
      visible: true,
      hb: {},
      // 是否显示有红包tip
      showTips: true,
      // 有没有红包
      hasValuePacket: false,
      // 倒计时
      timedown: 0,
      // 倒计时
      downTime: {
        hour1: 0,
        hour2: 0,
        min1: 0,
        min2: 0,
        sec1: 0,
        sec2: 0
      },
      // 红包金额
      redEnvelopeAmount: '',
    }
    this.onClose = () => {
      this.setState({
        visible: false,
      });
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(np) {
    if(np.isLogin) {
      this.getRedPacketList()
    }
  }

  // 没有红包数据的时候180秒查一次
  getRedPacketList = () => {
    clearTimeout(this.PacketTimer)
    if (!this.state.hasValuePacket) {
      this.WheelTraining()
      this.PacketTimer = setTimeout(() => {
        this.getRedPacketList()
      }, 180000)
    }
  }

  WheelTraining = () => {
    getRedEnvelopeTimeConfig().then((res) => {
      if (res.code === 0 && res.data && Object.keys(res.data).length !== 0) {
        this.setState({
          hb: res.data,
          hasValuePacket: !!res.data['openIssue']
        })
        if (!!res.data['openIssue']) {
          this.setStopTime(res.data['countdown'], Date.now())
        }
      } else {
        this.setState({
          hb: {},
          hasValuePacket: false
        })
      }
    })
  }

  setStopTime = (timedown, standTime) => {
    clearTimeout(this.timeDown_Time)
    let t = timedown - (~~((Date.now() - standTime) / 1000))
    let second = t % 60
    // ~~(minute / 60)
    let midd = (t - second) / 60 || 0
    let hour = ~~(midd / 60) || 0
    let minute = midd - (hour * 60) || 0
    hour = hour >= 10 || hour < 0 ? hour : '0' + hour
    second = second >= 10 || second < 0 ? second : '0' + second
    minute = minute >= 10 || minute < 0 ? minute : '0' + minute
      this.setState({
        timedown: t,
        downTime: {
          hour1: hour.toString()[0],
          hour2: hour.toString()[1],
          min1: minute.toString()[0],
          min2: minute.toString()[1],
          sec1: second.toString()[0],
          sec2: second.toString()[1]
        }
      })
    if (t > 0) {
      this.timeDown_Time = setTimeout(() => {
        this.setStopTime(timedown, standTime)
      }, 1000)
    }
  }

  render() {
    let {downTime, timedown, hasValuePacket, redEnvelopeAmount} = this.state
    let showTimeDown = timedown > 0 && hasValuePacket && !redEnvelopeAmount
    return (
      <View style={{position: 'absolute'}}>
        <Modal
          transparent
          visible={this.state.visible}
          closable
          maskClosable
          onClose={this.onClose}
          style={{backgroundColor: 'none'}}
        >
          <ImageBackground
            source={require('./../assets/images/hb1.png')}
            resizeMode={'cover'}
            style={styles.containerIn}>
            <View style={{ paddingTop: 100 }}>
              <Text style={styles.packetText}>恭喜发财，大吉大利</Text>
            </View>
            <View style={{ paddingVertical: 30 }}>
              <Text>{redEnvelopeAmount}</Text>
              {
                showTimeDown ?
                <Text style={styles.timeDown}>
                  <Text>{ downTime.hour1 }{ downTime.hour2 } : {downTime.min1 }{ downTime.min2 } : { downTime.sec1 }{ downTime.sec2 }</Text>
                </Text> :
                <View style={{ paddingHorizontal: 10 }}>
                  <Button type="warning" onPress={this.onClose}>
                    立即领取
                  </Button>
                </View>
              }
            </View>
          </ImageBackground>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerIn: {width: '100%', height: 290, borderRadius: 5, overflow: 'hidden'},
  packetText: { textAlign: 'center',fontSize: 20, color: '#fbd69e' },
  timeDown: { textAlign: 'center',fontSize: 24, color: '#fbd69e' }
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  let {isLogin} = state.common
  return ({
    isLogin
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HbPacket)