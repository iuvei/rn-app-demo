import React from 'react'
import { View, Text } from 'react-native'
import { Slider } from '@ant-design/react-native'

class BuyRender extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changingValue: 1800
    }
  }

  componentDidMount() {
  }

  handleChange = value => {
    this.setState({
      changingValue: value
    })
  }

  render() {
    let {changingValue} = this.state
    return (
      <View style={{marginTop: 10, marginBottom: 50}}>
        <View style={{
          // justifyContent: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: 'darkgray',
          alignItems: 'center'
        }}>
          <Text>
            奖金调节
          </Text>
          <View style={{backgroundColor: 'darkcyan', width: 200}}>
            <Slider
              // disabled
              defaultValue={this.state.changingValue}
              min={1700}
              max={1960}
              step={2}
              minimumTrackTintColor="red"
              maximumTrackTintColor="blue"
              onChange={value => this.handleChange(value)}
            />
          </View>
          <View style={{backgroundColor: 'darkcyan', margin: 5, width: 100}}>
            <Text style={{fontSize: 16}}>{changingValue}/3.2%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', height: 40, backgroundColor: 'darkgray', marginTop: 20}}>
          <View style={{flex: 1, backgroundColor: 'darkcyan', margin: 5}}>
            <Text style={{fontSize: 16}}> + -</Text>
          </View>
          <View style={{flex: 2, backgroundColor: 'darkcyan', margin: 5}}>
            <Text style={{fontSize: 16}}>圆角分厘</Text>
          </View>
          <View style={{flex: 3, backgroundColor: 'darkcyan', margin: 5}}>
            <Text style={{fontSize: 16}}>追号</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default BuyRender
