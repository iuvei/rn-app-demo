import React, {Component} from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import { Modal, Button, Toast } from '@ant-design/react-native'
import { getRedEnvelopeTimeConfig, grabRedEnvelope } from './../api/member'
import { connect } from "react-redux";

class HbPacket extends Component {
  constructor(props) {
    super (props);
    this.state = {
      visible: true,
      hb: {},
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
  }

  componentDidMount() {}
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  componentWillReceiveProps(np) {
    if(np.isLogin) {
      this.getRedPacketList()
    } else {
      clearTimeout(this.PacketTimer)
      clearTimeout(this.timeDown_Time)
      this.setState({
        hasValuePacket: false,
        redEnvelopeAmount: '',
        visible: false,
        hb: {},
        timedown: 0
      })
    }
  }

  onClose = () => {
    this.setState({
      visible: false,
      hasValuePacket: false
    }, () => this.getRedPacketList());
  }
  // 没有红包数据的时候60秒查一次
  getRedPacketList = () => {
    clearTimeout(this.PacketTimer)
    if (!this.state.hasValuePacket) {
      this.WheelTraining()
      this.PacketTimer = setTimeout(() => {
        this.getRedPacketList()
      }, 60*1000)
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
    if (t === 0 && this.state.hasValuePacket) {
      this.setState({
        visible: true
      })
    }
  }

  getSendRedPacket = () => {
    grabRedEnvelope({openIssue: this.state.hb.openIssue}).then((res) => {
      if (res.code === 0) {
        this.setState({
          redEnvelopeAmount: res.data['redEnvelopeAmount'],
          timedown: 0
        })
        setTimeout(() => {
          this.setState({
            hasValuePacket: false,
            redEnvelopeAmount: '',
            visible: false,
            hb: {}
          })
          this.getRedPacketList()
        }, 2500)
      } else {
        this.setState({
          hasValuePacket: false,
          redEnvelopeAmount: '',
          visible: false,
          hb: {}
        })
        this.getRedPacketList()
      }
      if(res.code !== 0) Toast.fail(res.message, 0.2, undefined, false)
    })
  }

  render() {
    let {downTime, timedown, hasValuePacket, redEnvelopeAmount} = this.state
    let showTimeDown = timedown > 0 && hasValuePacket && !redEnvelopeAmount
    let showBtn = !redEnvelopeAmount
    return (
      <View style={{position: 'absolute'}}>
        <Modal
          transparent
          visible={this.state.visible}
          closable
          maskClosable
          onClose={() => this.onClose()}
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
              <Text style={styles.packetText}>{redEnvelopeAmount}</Text>
              {
                showTimeDown ?
                <Text style={styles.timeDown}>
                  <Text>{ downTime.hour1 }{ downTime.hour2 } : {downTime.min1 }{ downTime.min2 } : { downTime.sec1 }{ downTime.sec2 }</Text>
                </Text> :
                <View style={{ paddingHorizontal: 20 }}>
                  {
                    showBtn && <Button type="warning" style={{backgroundColor: '#fbd69e'}} onPress={() => this.getSendRedPacket()}>
                      <Text style={{color: '#c62f4d'}}>立即领取</Text>
                    </Button>
                  }
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
