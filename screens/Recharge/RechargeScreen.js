import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Provider, DatePicker, List, Picker } from '@ant-design/react-native';
const data = require('./data.json')

export default class RechargeScreen extends React.Component {
  static navigationOptions = {
    title: 'Recharge'
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
    }
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>这是充值模版</Text>
        <Provider>
          <List>
            <Picker
              data={data}
              cols={3}
              value={this.state.value}
              onChange={this.onChange}
            >
              <List.Item arrow="horizontal" onPress={this.onPress}>
                省市选择
              </List.Item>
            </Picker>
            {/* <DatePicker
              value={this.state.value}
              mode="date"
              minDate={new Date(2015, 7, 6)}
              maxDate={new Date(2026, 11, 3)}
              onChange={this.onChange}
              format="YYYY-MM-DD"
            >
              <List.Item arrow="horizontal">Select Date</List.Item>
            </DatePicker> */}
          </List>
        </Provider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})

