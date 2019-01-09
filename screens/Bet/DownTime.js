import React, { Component } from 'react'
import {
  View, Text,
  Image
} from 'react-native'
import { Button } from '@ant-design/react-native'

class DownTime extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.initTime()
  }

  componentWillUnmount() {
  }

  logFn = () => {
    console.log('我是一个数据')
  }

  render() {
    let {
      prevOpenResult, prevOpenResult: {openList}, openIssue,
      downTime: {h1, h2, m1, m2, s1, s2}
    } = this.props
    return (
      <View style={{
        flexDirection: 'row',
        margin: 6,
        borderRadius: 6,
        marginTop: 1,
        height: 70,
        backgroundColor: '#fff'
      }}>
        {/* backgroundColor: 'darkcyan' */}
        <View style={{flex: 1, margin: 5}}>
          <Image
            source={require('../../assets/images/hall/icon1.png')}
            style={{width: 60, height: 60}}
          />
        </View>
        {/*backgroundColor: 'darkcyan'*/}
        <View style={{flex: 4, margin: 5}}>
          <Text style={{fontSize: 12}}>
            <Text style={{color: 'blue'}}>{prevOpenResult.openIssue || '000000000'}</Text>
            期开奖结果
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 2}}>
            {
              openList.length ? openList.map((b, bIdx) =>
                <Button
                  key={`${bIdx}-${b}`}
                  type="ghost" size="small" style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginLeft: 0,
                  marginRight: 6
                }}>{b}</Button>
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
