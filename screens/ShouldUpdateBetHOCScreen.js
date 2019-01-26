import React from 'react'
import {
  View, Text, TextInput, StatusBar,
  Button, Slider, SafeAreaView, ScrollView
} from 'react-native'
import {
  Button as RNButton, Tabs, Flex,
  WhiteSpace, WingBlank
} from '@ant-design/react-native'
import { connect } from 'react-redux'
import { scaleSize, setSpText, styleUtil } from '../utils/ScreenUtil'
import BuyPriceHoc from '../HOC/BuyPriceHoc'

/**
 * Slider 组件
 */
class SliderComponent extends React.PureComponent {
  render() {
    return (
      <View style={{backgroundColor: 'pink', marginTop: 10}}>
        <Text> {this.props.sliderValue} </Text>
        <Slider
          key={'slider'}
          value={this.props.sliderValue}
          step={2}
          minimumValue={1700}
          maximumValue={1900}
          minimumTrackTintColor="#1c8de9"
          maximumTrackTintColor="#1e8fea"
          thumbTintColor="#1c8de9"
          onValueChange={e => this.props.setSliderValue(e)}
        />
      </View>
    )
  }
}

class ButtonBallComponent extends React.PureComponent {
  render() {
    let {bs, item} = this.props
    console.log('多少次')
    return (
      <RNButton
        size="small"
        onPress={() => this.props._setViewData(item)}
        style={styleUtil({
          width: 34,
          height: 34,
          borderRadius: 17,
          margin: 6,
          marginRight: 10,
          marginLeft: 10
        })}
      >
        <Text style={{fontSize: setSpText(16)}}>{bs}</Text>
      </RNButton>
    )
  }
}

class BallComponent extends React.PureComponent {

  _setViewData = (item) => {
    let _ViewData = [...this.props.ViewData]
    _ViewData.map(_item => {
      if (_item.title === item.title) item.t = !item.t
    })
    this.props.setViewData(_ViewData)
  }

  render() {
    let {ViewData, tools} = this.props
    console.log('Ball---处理了')
    return (
      <ScrollView>
        {
          ViewData.map(item =>
            <Flex key={item.title}>
              <View style={{
                width: scaleSize(50), alignSelf: 'center',
                alignItems: 'center', justifyContent: 'center'
              }}>
                <Text style={{fontSize: setSpText(14)}}>
                  {item.title} - {item.t ? '是' : '否'}
                </Text>
              </View>
              <View style={{
                flexWrap: 'wrap', flexDirection: 'row',
                justifyContent: 'space-between',
                margin: scaleSize(2),
                flex: 1
              }}>
                {
                  item.b.map(bs =>
                    <ButtonBallComponent
                      _setViewData={this._setViewData}
                      key={`${item.title} - ${bs}`}
                      bs={bs} item={item}/>
                  )
                }
                <Flex style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row', justifyContent: 'space-between'
                }}>
                  {
                    tools.map(t =>
                      <RNButton
                        key={`${t.code}`}
                        size="small"
                        style={{
                          width: scaleSize(30),
                          height: scaleSize(30),
                          borderRadius: scaleSize(15),
                          margin: scaleSize(4),
                          marginRight: scaleSize(10),
                          marginLeft: scaleSize(12)
                        }}>
                        <Text style={{fontSize: setSpText(14)}}>{t.name}</Text>
                      </RNButton>
                    )
                  }
                </Flex>
              </View>
            </Flex>
          )
        }
      </ScrollView>
    )
  }
}

/**
 * Ball - Row 组件
 */
class BallRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderValue: 123
    }
  }

  setSliderValue = sliderValue => this.setState({sliderValue})

  render() {
    return (
      <View style={{flex: 1}}>
        <BallComponent
          ViewData={this.props.ViewData}
          tools={this.props.tools}
          setViewData={this.props.setViewData}/>
        <SliderComponent
          setSliderValue={this.setSliderValue}
          sliderValue={this.state.sliderValue}/>
      </View>
    )
  }
}

const BallRowHocView = BuyPriceHoc(BallRow)

/**
 * Bet Screen组件
 */
class ShouldUpdateBetScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navList: [
        {key: 0, text: `Nav_ I'm text`}
      ],
      ContentTabs: [
        {title: '开奖', code: 'openBall'},
        {title: '投注'},
        {title: '记录', code: 'betHistory'},
        {title: '趋势', code: 'trend'}
      ],
      diffValue: 0
    }
  }

  componentDidMount() {
    // setInterval(() => {
    // this.setState(prevState => ({diffValue: prevState.diffValue + 2}))
    // }, 1000)
  }

  render() {
    let {ContentTabs, diffValue} = this.state
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ededed'}}>
        <View style={{flex: 1, padding: 20, backgroundColor: '#fff'}}>
          <Text>This is Bet Screen {diffValue}</Text>
          <Tabs tabs={ContentTabs}
                style={{background: '#ededed'}}
                onChange={this._onChangeTabs}
                initialPage={1}
                animated={false}>
            <View style={{flex: 1}}>
              <Text>开奖</Text>
            </View>
            <View style={{flex: 1}}>
              {/*<BallRow/>*/}
              <BallRowHocView/>
            </View>
            <View style={{flex: 1}}>
              <Text>记录</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>趋势</Text>
            </View>
          </Tabs>
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(() => {
  return ({
    betScreen: true
  })
}, (dispatch) => {
  return {}
})(ShouldUpdateBetScreen)
