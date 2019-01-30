import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import {
  DatePicker,
  Flex,
  Icon,
  ActionSheet
} from '@ant-design/react-native'
import dayjs from 'dayjs'
import { shortcutsDays } from '../data/options'

const today = dayjs().format('YYYY-MM-DD')
const BUTTONS = [
  '今天',
  '三天',
  '七天',
  '取消',
]

export default class QueryDate extends React.Component {
  constructor(props) {
    super(props)
    this.showActionSheet = () => {
      ActionSheet.showActionSheetWithOptions(
        {
          options: BUTTONS,
          cancelButtonIndex: 3,
        },
        buttonIndex => {
          if (buttonIndex < 3) {
            let startTime = dayjs(shortcutsDays[buttonIndex].value().startTime).format('YYYY-MM-DD')
            let endTime = dayjs(shortcutsDays[buttonIndex].value().endTime).format('YYYY-MM-DD')
            this.setState({
              buttonIndex: buttonIndex,
              startTime: startTime,
              endTime: endTime
            })
            props.handleDate({startTime, endTime})
          }
        }
      )
    }
    this.state = {
      buttonIndex: 0,
      startTime: today,
      endTime: today
    }
    props.handleDate({startTime: today, endTime: today})
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  render() {
    let { startTime, endTime, buttonIndex } = this.state

    return (
      <View>
        <Flex style={styles.wrapper} justify={'around'} align="center">
          <Flex.Item>
            <DatePicker
              value={new Date(startTime)}
              mode="date"
              minDate={new Date(2015, 7, 6)}
              maxDate={new Date(2026, 11, 3)}
              onChange={v => {
                let tmp = dayjs(v).format('YYYY-MM-DD')
                this.setState({
                  startTime: tmp
                })
                this.props.handleDate({startTime: tmp, endTime})
              }}
              format="YYYY-MM-DD"
            >
              <TouchableHighlight>
                <Flex style={{borderRightWidth: 0.5, borderRightColor: '#cacaca', paddingRight: 6}}>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', lineHeight: 25, color: '#111', fontSize: 12}}>{startTime}</Text>
                  </View>
                  <View style={{width: 30, alignItems: 'center'}}>
                    <Icon name="down" size={16} color="#cacaca"/>
                  </View>
                </Flex>
              </TouchableHighlight>
            </DatePicker>
          </Flex.Item>
          <Flex.Item>
            <DatePicker
              value={new Date(endTime)}
              mode="date"
              minDate={new Date(2015, 7, 6)}
              maxDate={new Date(2026, 11, 3)}
              onChange={v => {
                let tmp = dayjs(v).format('YYYY-MM-DD')
                this.setState({
                  endTime: dayjs(v).format('YYYY-MM-DD')
                })
                this.props.handleDate({endTime: tmp, startTime})
              }}
              format="YYYY-MM-DD"
            >
              <TouchableHighlight>
                <Flex style={{borderRightWidth: 0.5, borderRightColor: '#cacaca', paddingRight: 6}}>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center', lineHeight: 25, color: '#111', fontSize: 12}}>{endTime}</Text>
                  </View>
                  <View style={{width: 30, alignItems: 'center'}}>
                    <Icon name="down" size={16} color="#cacaca"/>
                  </View>
                </Flex>
              </TouchableHighlight>
            </DatePicker>
          </Flex.Item>
          <Flex.Item>
            <View>
              <Text style={{textAlign: 'center', lineHeight: 25, color: '#111', fontSize: 12}} onPress={this.showActionSheet} style={{textAlign: 'center'}}>{BUTTONS[buttonIndex]}</Text>
            </View>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: 30,
    borderWidth: 0.5,
    borderColor: '#cacaca',
    borderRadius: 4,
    paddingVertical: 2,
  }
})
