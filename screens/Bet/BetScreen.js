import React from 'react'
import {
  View, Text,
  StyleSheet, Image, ScrollView
} from 'react-native'
import {
  Tabs, Card, WhiteSpace,
  Button, WingBlank
} from '@ant-design/react-native'
import DownTime from './DownTime'
import PlayNav from './PlayNav'
import RowBall from './RowBall'
import BuyRender from './BuyRender'

export default class BetScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const params = navigation.state.params || {}
    return {
      title: params.title || '重庆时时彩'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      ContentTabs: [
        {title: '开奖'},
        {title: '投注'},
        {title: '记录'},
        {title: '趋势'}
      ],
      playTabs: [
        {title: '五星复式', value: 'wxfs'},
        {title: '五星单式', value: 'wxds'},
        {title: '四星复式', value: 'sxfs'},
        {title: '四星单式', value: 'sxds'}
      ],
      actPlay: {title: '五星复式', value: 'wxfs'},
      ballOpen: ['5', '9', '3', '2', '1']
    }
  }

  componentDidMount() {
    setTimeout(() => {
      let data = [
        {title: '三星复式', value: 'sanxfs'},
        {title: '三星单式', value: 'sanxds'},
        {title: '二星复式', value: 'exfs'},
        {title: '二星单式', value: 'exds'}
      ]
      this.setState({
        playTabs: [].concat(this.state.playTabs, data)
      })
    }, 300)
  }

  _onPlayTabs = (tab, number) => {
    this.setState({actPlay: tab})
  }

  _onChangeTabs = (tab, number) => {
  }

  render() {
    let {ContentTabs, playTabs, actPlay} = this.state
    return (
      <View style={styles.container}>

        {/* playNav Container */}
        <PlayNav
          playTabs={playTabs}
          _onPlayTabs={this._onPlayTabs}
          actPlay={actPlay}/>

        {/* down Container*/}
        <DownTime ballOpen={this.state.ballOpen}/>

        {/* Tabs Nav */}
        <Tabs tabs={ContentTabs}
              style={{background: '#ededed'}}
              onChange={this._onChangeTabs}
              initialPage={1}
              animated={false}>
          <View style={styles.tabs}>
            <Text>Content of First Tab</Text>
          </View>
          <View style={{margin: 4}}>
            <ScrollView>
              <RowBall/>
            </ScrollView>
          </View>
          <View style={styles.tabs}>
            <Text>Content of Third Tab</Text>
          </View>
          <View style={styles.tabs}>
            <Text>Content of Four Tab</Text>
            <View style={{
              backgroundColor: '#ededed',
              height: 0.5,
              width: '100%'
            }}
            />
            <Text>Content of Four Tab</Text>
          </View>
        </Tabs>

        {/*投注信息*/}
        <BuyRender/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
  tabs: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingRight: 20
  }
})
