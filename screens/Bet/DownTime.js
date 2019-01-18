import React, { Component } from 'react'
import {
  View, Text,
  Image, StyleSheet
} from 'react-native'
import { Button } from '@ant-design/react-native'
import { getIconName } from '../../utils/getLotImg'

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
      <View style={{
        flexDirection: 'row',
        margin: 6,
        borderRadius: 6,
        marginTop: 1,
        backgroundColor: '#fff'
      }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image
            source={getIconName(realCategory)}
            style={{width: 60, height: 60}}
          />
        </View>
        {/*backgroundColor: 'darkcyan'*/}
        <View style={{flex: 4, margin: 5, marginLeft: 0}}>
          <Text style={{fontSize: 12}}>
            <Text style={{color: 'blue'}}>{prevOpenResult.openIssue || '000000000'}</Text>
            期开奖结果
          </Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'flex-start',
            padding: 2, flexWrap: 'wrap'
          }}>
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
          <Text style={{fontSize: 12}}>
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

const styles = StyleSheet.create({
  lotBall3: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 6
  },
  lotBall5: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 6
  },
  lotBall10: {
    padding: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 2
  },
  lotBall20: {
    padding: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 2
  },
  lotBallTxt: {
    fontSize: 12
  }
})
