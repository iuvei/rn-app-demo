import React, { Component } from 'react'
import {
  View, Text,
  Image, StyleSheet
} from 'react-native'
import { Button } from '@ant-design/react-native'
import { getIconName } from '../../utils/getLotImg'
import { stylesUtil } from '../../utils/ScreenUtil'

class DownTime extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  logFn = () => {
    console.log('我是一个数据')
  }

  render() {
    let {
      prevOpenResult, prevOpenResult: {openList}, openIssue,
      downTime: {h1, h2, m1, m2, s1, s2},
      navParams: {realCategory, lotterNumber}
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.lotImageView}>
          <Image
            source={getIconName(realCategory)}
            style={styles.lotImage}
          />
        </View>
        <View style={styles.openResultView}>
          <Text style={styles.openResultText}>
            <Text style={{color: 'blue'}}>{prevOpenResult.openIssue || '000000000'}</Text>
            <Text>期开奖结果</Text>
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
              ) : <Text>正在开奖中...</Text>
            }
          </View>
          <Text style={styles.stopTimeText}>
            <Text style={{color: 'blue'}}>{openIssue.currentIssue}</Text>
            距离封单
            <Text style={{color: 'red'}}>
              {`${h1}${h2}:${m1}${m2}:${s1}${s2}`}
            </Text>
          </Text>
        </View>
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
  lotBallTxt10: {
    fontSize: 12
  },
  lotBallTxt20: {
    fontSize: 12
  },
  stopTimeText: {fontSize: 12}
}))
