import React from 'react'
import { connect } from 'react-redux'
import {Audio} from 'expo'

// 播放属性 {type: ''}
class AudioPlay extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    let { soundType } = nextProps
    this.playAudio(soundType)
  }

  playAudio = async (soundType) => {
    const soundObject = new Audio.Sound()
    if (soundType.type && this.props.audioSwitch) {
      try {
        switch(soundType.type) {
          case 'changeAccount':
            await soundObject.loadAsync(require('../assets/audio/changeAccount.mp3'))
            break
          case 'income':
            await soundObject.loadAsync(require('../assets/audio/income.mp3'))
            break
          case 'message':
            await soundObject.loadAsync(require('../assets/audio/message.mp3'))
            break
          case 'stopOrder':
            await soundObject.loadAsync(require('../assets/audio/stopOrder.mp3'))
            break
          case 'beep':
            await soundObject.loadAsync(require('../assets/audio/beep.mp3'))
            break
          case 'ding':
            await soundObject.loadAsync(require('../assets/audio/ding.mp3'))
            break
          case 'coin':
            await soundObject.loadAsync(require('../assets/audio/coin.mp3'))
            break
          default:
            await soundObject.loadAsync(require('../assets/audio/message.mp3'))
            break
        }
        await soundObject.playAsync()
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }
  }

  render() {
    return (null)
  }
}

const mapStateToProps = (state, props) => {
  let { audioSwitch, soundType } = state.common
  return ({
    audioSwitch,
    soundType
  })
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlay)
