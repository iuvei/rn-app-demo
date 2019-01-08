import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Slider, Stepper, Button } from '@ant-design/react-native'
import { modeInfo } from '../../data/options'

class BuyRender extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changingValue: 1800,
      afterValue: 0,
      stepValue: 1,
      modeItem: {}
    }
    this.time = 1700
  }

  componentDidMount() {
  }

  handleChange = value => {
    this.setState({
      changingValue: value
    })
  }

  handleAfterChange = value => {
    this.setState({
      afterValue: value
    }, () => {
      this.setState({
        changingValue: value
      })
      this.setState({
        afterValue: 0
      })
    })
  }

  onChangeStep = value => this.setState({stepValue: value})

  render() {
    let {changingValue, stepValue} = this.state
    return (
      <View style={styles.warp}>
        <View style={styles.bonusWarp}>
          <Text>
            奖金调节
          </Text>
          <View style={{width: 200}}>
            <Slider
              // disabled
              // value={this.state.changingValue}
              min={1700}
              max={1960}
              step={2}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="#ededed"
              onChange={value => this.handleChange(value)}
              onAfterChange={value => this.handleAfterChange(value)}
            />
          </View>
          <View style={{width: 100}}>
            <Text style={{fontSize: 16}}>
              {this.state.afterValue || this.state.changingValue}/3.2%
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 100}}>
            <Stepper
              min={1}
              style={styles.stepper}
              defaultValue={stepValue}
              onChange={value => this.onChangeStep(value)}
            />
          </View>
          <View style={{
            flex: 1, flexDirection: 'row', justifyContent: 'space-evenly',
            marginLeft: 10, marginRight: 10
          }}>
            {
              modeInfo.map(m =>
                <Button
                  key={m.money}
                  type="ghost" size="small" style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  marginLeft: 0,
                  marginRight: 2
                }}>{m.name}</Button>
              )
            }
          </View>
          <View style={{width: 80}}>
            <Button
              key={'Zhuihao'}
              type="ghost" size="small" style={{
              height: 28,
              borderRadius: 4
            }}>追号</Button>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 6}}>
          <View style={{flex: 1}}>
            <Text>人民币余额：<Text style={{color: 'blue'}}>125678</Text></Text>
            <Text>注数：
              <Text style={{color: 'blue', marginRight: 5}}>321</Text>
              <Text style={{paddingLeft: 5}}>{'\t'}投注金额：</Text>
              <Text style={{color: 'blue'}}>567896.5678</Text>
            </Text>
          </View>
          <View style={{width: 80, justifyContent: 'center'}}>
            <Button
              key={'fastBuy'}
              type="ghost" size="small"
              style={{height: 28, borderRadius: 4}}>
              快速投注</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default BuyRender

const styles = StyleSheet.create({
  warp: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderColor: '#dfdfdf',
    borderTopWidth: 1
  },
  bonusWarp: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepper: {
    borderRadius: 5
  }
})
