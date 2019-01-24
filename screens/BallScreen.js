import React from 'react'
import {
  ScrollView, PixelRatio, Text,
  TouchableWithoutFeedback, View,
  SafeAreaView, Platform, StatusBar
} from 'react-native'
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native'
import CheckBox from 'react-native-check-box'
import { setSpText, scaleSize, styleUtil, isIphoneX } from '../utils/ScreenUtil'

const Circle = (props) => {
  const size = props.size || 20
  const style = {
    borderRadius: size / 2,
    backgroundColor: '#527fe4',
    width: size,
    height: size,
    margin: 1
  }
  return <View style={style}/>
}

export default class FlexExample extends React.Component {
  static navigationOptions = {
    title: `投注页面 - ${isIphoneX() ? '是' : '否'}`
  }

  state = {
    tools: ['大', '小', '单', '双', '清', '令'],
    ViewData: [
      {
        title: '万位',
        b: [1, 2, 23, 34, 45, 6, 7, 8, 9, 10],
        t: true,
        color: 'green'
      },
      {
        title: '千位',
        b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        t: true,
        color: 'orange'
      }, {
        title: '百位',
        b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        t: true,
        color: 'blue'
      },
      {
        title: '十位',
        b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        t: true,
        color: 'gray'
      }, {
        title: '个位',
        b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        t: true,
        color: 'pink'
      }
    ]
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {Platform.OS === 'ios' && <StatusBar
          backgroundColor={'blue'}
          barStyle="light-content"/>}
        <View style={{
          flex: 1
          // marginTop: 30,
          // width: '100%', flexDirection: 'column'
        }}>
          <Text>{PixelRatio.get()}</Text>
          <View style={{
            flexDirection: 'row'
          }}>
            {
              [1, 2, 3, 4, 5].map(item =>
                <View style={{flex: 1}} key={item}>
                  <CheckBox
                    onClick={() => {
                      // this.setState({
                      //   isChecked: !this.state.isChecked
                      // })
                    }}
                    isChecked={!item.choose}
                    rightText={'百威'}
                  />
                </View>
              )
            }
          </View>
          {
            this.state.ViewData.map(item =>
              <Flex key={item.title}>
                <View style={{
                  width: scaleSize(50), alignSelf: 'center',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <Text style={{fontSize: setSpText(14)}}>{item.title}</Text>
                </View>
                <View style={{
                  flexWrap: 'wrap', flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: scaleSize(2),
                  flex: 1
                }}>
                  {
                    item.b.map(bs =>
                      <Button
                        key={`${bs}`}
                        size="small"
                        // style={{
                        //   width: scaleSize(34),
                        //   height: scaleSize(34),
                        //   borderRadius: scaleSize(17),
                        //   margin: scaleSize(6),
                        //   marginRight: scaleSize(10),
                        //   marginLeft: scaleSize(10)
                        // }}
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
                      </Button>
                    )
                  }
                  <Flex style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row', justifyContent: 'space-between'
                  }}>
                    {
                      this.state.tools.map(t =>
                        <Button
                          key={`${t}`}
                          // type={bs.choose ? 'primary' : 'ghost'}
                          size="small"
                          style={{
                            width: scaleSize(30),
                            height: scaleSize(30),
                            borderRadius: scaleSize(15),
                            margin: scaleSize(4),
                            marginRight: scaleSize(10),
                            marginLeft: scaleSize(12)
                          }}>
                          <Text style={{fontSize: setSpText(14)}}>{t}</Text>
                        </Button>
                      )
                    }
                  </Flex>
                </View>
              </Flex>
            )
          }
        </View>
      </SafeAreaView>
    )
  }
}
