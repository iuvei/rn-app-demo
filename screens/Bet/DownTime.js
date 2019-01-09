import React, { Component } from 'react'
import {
  View, Text,
  Image
} from 'react-native'
import { Button } from '@ant-design/react-native'

class DownTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    // console.log('bei包裹组件 WillMount')
  }

  componentDidMount() {
    // console.log('被包裹组件')
    this.props.initTime()
  }

  logFn = () => {
    console.log('我是一个数据')
  }

  render() {
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
            <Text style={{color: 'blue'}}>20181214048</Text>
            期开奖结果
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            {
              this.props.ballOpen.map(b =>
                <Button
                  key={b}
                  type="ghost" size="small" style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginLeft: 0,
                  marginRight: 6
                }}>{b}</Button>
              )
            }
          </View>
          <Text style={{fontSize: 12}}>
            <Text style={{color: 'blue'}}>20181214048</Text>
            距离封单
            <Text style={{color: 'red'}}>00:00:49</Text>
          </Text>
        </View>
      </View>
    )
  }
}

export default DownTime
