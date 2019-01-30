import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import {
  Picker,
  Flex,
  Icon,
} from '@ant-design/react-native'

export default class QueryPickerOne extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pickered: [props.data[0]]
    }
    props.handlePickerBack({[props.queryName]:props.data[0].value})
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  render() {
    let { pickered }= this.state
    let { data, queryName } = this.props

    return (
      <Picker
        data={data}
        cols={1}
        value={''}
        itemStyle={{color: '#333333', fontSize: 14, lineHeight: 32}}
        onChange={(val) => {
          let arr = data.filter(item => {
            return item.value === val[0]
          })
          this.setState({
            pickered: [].concat(arr)
          })
          this.props.handlePickerBack({[queryName]:val[0]})
        }}
      >
        <TouchableHighlight>
          <Flex style={{backgroundColor: '#1182df', borderRadius: 3}}>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center', lineHeight: 25, color: '#fff', fontSize: 12, overflow: 'hidden', height: 25}}>{pickered[0].label}</Text>
            </View>
            <View style={{width: 30, alignItems: 'center'}}>
              <Icon name="down" size={16} color="#fff"/>
            </View>
          </Flex>
        </TouchableHighlight>
      </Picker>
    )
  }
}

const styles = StyleSheet.create({
})
