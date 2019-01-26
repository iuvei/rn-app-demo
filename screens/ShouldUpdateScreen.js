import React from 'react'
import _ from 'lodash'
import { View, Text, TextInput, Button, Slider } from 'react-native'

class ShouldScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      diffValue: 0,
      text: '我是输入的数据',
      list: [
        {key: 0, text: `I'm text`}
      ],
      sliderValue: 1800
    }
  }

  componentDidMount() {
    // this.setState(prevState => ({diffValue: prevState.diffValue + 2}))
  }

  submitBtn = () => {
    this.setState({
      list: [...this.state.list, {
        key: this.state.list.length,
        text: this.state.text
      }]
    })
  }

  render() {
    return (
      <View style={{flex: 1, padding: 40}}>
        <Text>
          diffValue: {this.state.diffValue}
        </Text>
        <ShowText list={this.state.list}/>
        <TextInput
          style={{backgroundColor: '#ededed', padding: 10}}
          value={this.state.text} onChangeText={e => {
          this.setState({text: e})
        }}/>
        <Button title={'Submit Btn'} onPress={() => this.submitBtn()}/>

        <View style={{padding: 20, marginTop: 20}}>
          <Text>{this.state.HocValue}</Text>
        </View>
        <View style={{padding: 20, marginTop: 20}}>
          <Text>{this.state.sliderValue}</Text>
        </View>
        <Slider
          key={'slider'}
          value={this.state.sliderValue}
          step={2}
          minimumValue={1700}
          maximumValue={1900}
          minimumTrackTintColor="#1c8de9"
          maximumTrackTintColor="#1e8fea"
          thumbTintColor="#1c8de9"
          onValueChange={sliderValue => this.setState({sliderValue})}
        />
      </View>
    )
  }
}

class ShowText extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let update = _.isEqual(nextProps.list, this.props.list)
    console.log(!update)
    return !update
  }

  render() {
    return (
      <View style={{padding: 20}}>
        {
          this.props.list.map(item =>
            <Text key={item.key}>{item.key} === {item.text}</Text>
          )
        }
      </View>
    )
  }
}

export default ShouldScreen
