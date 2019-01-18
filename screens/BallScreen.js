import React from 'react'
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native'
import CheckBox from 'react-native-check-box'

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
  state = {
    tools: ['大', '小', '单', '双', '清', '令'],
    ViewData: [
      {
        title: '万位',
        b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
      <View style={{
        flex: 1
        // marginTop: 30,
        // width: '100%', flexDirection: 'column'
      }}>
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
                width: 50, alignSelf: 'center',
                alignItems: 'center', justifyContent: 'center'
              }}>
                <Text>{item.title}</Text>
              </View>
              <View style={{
                flexWrap: 'wrap', flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 2,
                flex: 1
              }}>
                {
                  item.b.map(bs =>
                    <Button
                      key={`${bs}`}
                      size="small"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 17,
                        margin: 6,
                        marginRight: 10,
                        marginLeft: 10
                      }}>{bs}</Button>
                  )
                }
                <Flex style={{
                  width: '100%', flexWrap: 'wrap',
                  flexDirection: 'row', justifyContent: 'space-between'
                }}>
                  {
                    this.state.tools.map(t =>
                      <Button
                        key={`${t}`}
                        // type={bs.choose ? 'primary' : 'ghost'}
                        size="small"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          margin: 4,
                          marginRight: 10,
                          marginLeft: 12
                        }}>{t}</Button>
                    )
                  }
                </Flex>
              </View>
            </Flex>
          )
        }
      </View>
    )
  }
}
