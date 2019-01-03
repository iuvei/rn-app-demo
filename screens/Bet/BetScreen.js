import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Tabs} from '@ant-design/react-native'
import {DatePicker} from 'native-base'

export default class BetScreen extends React.Component {
  static navigationOptions = {
    title: '彩种'
  }

  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {title: 'First Tab'},
        {title: 'Second Tab'},
        {title: 'Third Tab'},
        {title: 'Four Tab'}
      ],
      chosenDate: new Date()
    }
  }

  setDate = (newDate) => {
    this.setState({chosenDate: newDate})
  }

  _onChangeTabs = (tab, number) => {
    // console.log(tab, number)
  }

  render() {
    let {tabs} = this.state
    return (
      <View style={styles.container}>
        <Text>我是彩种页面</Text>
        <Tabs tabs={tabs}
              onChange={this._onChangeTabs}
              animated={false}>
          <View style={styles.tabs}>
            <Text>Content of First Tab</Text>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText="Select date"
              textStyle={{color: 'green'}}
              placeHolderTextStyle={{color: '#d3d3d3'}}
              onDateChange={this.setDate}
            />
            <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
          </View>
          <View style={styles.tabs}>
            <Text>Content of Second Tab</Text>
            {/*<ScrollScreen/>*/}
          </View>
          <View style={styles.tabs}>
            <Text>Content of Third Tab</Text>
          </View>
          <View style={styles.tabs}>
            <Text>Content of Four Tab</Text>
          </View>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  tabs: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#fff'
  }
})
