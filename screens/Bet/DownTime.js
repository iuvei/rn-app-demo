import React, { Component } from 'react'
import {
  View, Text,
  Image, StyleSheet
} from 'react-native'
import { Button } from '@ant-design/react-native'
import { getIconName } from '../../utils/getLotImg'
import { stylesUtil } from '../../utils/ScreenUtil'
// import Progress from '../../components/ProgressBar'
// import _ from 'lodash'

class DownTime extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  // componentWillReceiveProps(np) {
  //   let downTime = this.props.downTime
  //   if (!_.isEqual(downTime, np.downTime)) {
  //     let {h1, h2, m1, m2, s1, s2} = np.downTime
  //     let length = ((h1 * 10 + h2 * 1) * 3600 + (m1 * 10 + m2 * 1) * 60 + s1 * 10 + s2 * 1)
  //     if (length > 100) {
  //       length = 100
  //     }
  //     this.refs.progressBar.progress = length / 100
  //   }
  // }

  componentWillUnmount() {
    this.setState = () => () => {
    }
  }

  logFn = () => {
    // console.log('我是一个数据')
  }

  render() {
    let {
      prevOpenResult, prevOpenResult: {openList}, openIssue,
      downTime: {h1, h2, m1, m2, s1, s2},
      navParams: {realCategory, lotterNumber}
    } = this.props
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.lotImageView}>
            <Image
              source={getIconName(realCategory)}
              style={styles.lotImage}
            />
          </View>
          <View style={styles.openResultView}>
            <Text style={styles.openResultText}>
              <Text style={{color: '#00bbcc'}}>{prevOpenResult.openIssue || '000000000'}</Text>
              <Text style={styles.stopTimeText}> 期开奖结果</Text>
            </Text>
            <View style={styles.openListView}>
              {
                openList.length ? openList.map((b, bIdx) =>
                    <Button
                      key={`${bIdx}-${b}`}
                      type="primary" size="small"
                      style={styles['lotBall' + (lotterNumber || 5)]}>
                      <Text style={styles['lotBallTxt' + (lotterNumber || 5)]}>{b}</Text>
                    </Button>
                  ) :
                  <View style={styles.stopTimeView}>
                    <Text style={styles.stopTimeText}>正在开奖中...</Text>
                  </View>
              }
            </View>
            <Text style={styles.stopTimeText}>
              <Text style={{color: '#00bbcc'}}>{openIssue.currentIssue} </Text>
              距离封单
              <Text style={{color: '#f3564d'}}>
                {` ${h1}${h2}:${m1}${m2}:${s1}${s2}`}
              </Text>
            </Text>
          </View>
        </View>
        {/*<Progress ref="progressBar" progressColor="yellow" />*/}
      </View>
    )
  }
}

export default DownTime

const styles = StyleSheet.create(stylesUtil({
  container: {
    flexDirection: 'row',
    margin: 6,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  lotImageView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  lotImage: {width: 60, height: 60},
  openResultView: {flex: 4, margin: 5, marginLeft: 0},
  openResultText: {fontSize: 12},
  openListView: {
    flexDirection: 'row', justifyContent: 'flex-start',
    padding: 2, flexWrap: 'wrap', paddingLeft: 2
  },
  lotBall3: {
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 6
  },
  lotBall5: {
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 6
  },
  lotBall10: {
    padding: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 1
  },
  lotBall20: {
    padding: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 1,
    marginBottom: 1
  },
  lotBallTxt5: {
    fontSize: 14
  },
  lotBallTxt10: {
    fontSize: 12
  },
  lotBallTxt20: {
    fontSize: 12
  },
  stopTimeText: {fontSize: 12, color: '#333'},
  stopTimeView: {
    norHeight: 30,
    justifyContent: 'center'
  }
}))
