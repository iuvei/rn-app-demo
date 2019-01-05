import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tabs, Card, WhiteSpace, Button, WingBlank } from '@ant-design/react-native'

export default class BetScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state
    return {
      title: params.lotName
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {title: '开奖'},
        {title: '投注'},
        {title: '记录'},
        {title: '趋势'}
      ],
      tabs2: [
        {title: '五星复式', value: 'wxfs'},
        {title: '五星单式', value: 'wxds'},
        {title: '四星复式', value: 'sxfs'},
        {title: '四星单式', value: 'sxds'}
      ],
      actPlay: {title: '五星复式', value: 'wxfs'}
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    setTimeout(() => {
      let data = [
        {title: '三星复式', value: 'sanxfs'},
        {title: '三星单式', value: 'sanxds'},
        {title: '二星复式', value: 'exfs'},
        {title: '二星单式', value: 'exds'}
      ]
      this.setState({
        tabs2: [].concat(this.state.tabs2, data)
      })
    }, 3000)
  }

  _onPlayTabs = (tab, number) => {
    console.log(number)
    this.setState({actPlay: tab})
  }

  _onChangeTabs = (tab, number) => {
    console.log(tab, number)
  }

  render() {
    let {tabs, tabs2, actPlay} = this.state
    return (
      <View style={styles.container}>
        <Tabs
          style={{height: 10, padding: 0, margin: 0}}
          tabs={tabs2} initialPage={0} tabBarPosition="top"
          onTabClick={(tab, index) => this._onPlayTabs(tab, index)}
          tabBarUnderlineStyle={{height: 0}}
          renderTab={(tab, index) => (
            <Button
              style={{padding: 0, margin: 0}}
              size="small"
              type={tab.value === actPlay.value ? 'primary' : 'ghost'}
              onPress={() => this._onPlayTabs(tab, index)}>
              {tab.title}
            </Button>
          )}
        />
        <WingBlank size="lg" style={{borderTop: 0}}>
          <Card style={{borderTop: 0}}>
            <Card.Body style={{borderTop: 0}}>
              <View>
                <Text style={{marginLeft: 16}}>Card Content</Text>
              </View>
            </Card.Body>
          </Card>
        </WingBlank>
        {/* Tabs Nav */}
        <Tabs tabs={tabs}
              onChange={this._onChangeTabs}
              animated={false}>
          <View style={styles.tabs}>
            <Text>Content of First Tab</Text>
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
            <View style={{
              backgroundColor: '#ededed',
              height: 0.5,
              width: '100%'
            }}
            />
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
    backgroundColor: '#fff'
  },
  tabs: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#fff',
    paddingRight: 20
  }
})
