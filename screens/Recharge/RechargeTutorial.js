import React from 'react'
import { View, Text, Image, ImageBackground, Dimensions, TouchableHighlight } from 'react-native'
import { Modal, Button, Flex } from '@ant-design/react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class RechargeTutorial extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      step: 0
    }
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  onShow = () => {
    this.setState({
      step: 0,
      visible: true
    })
  }

  render() {
    let { step } = this.state

    if (step === 0) {
      return (
        <View>
          <Button type="primary" onPress={this.onShow}>
            充值教程
          </Button>
          <Modal
            alert
            maskClosable
            transparent
            visible={this.state.visible}
            animationType="slide-up"
            onClose={this.onClose}
            style={{backgroundColor: 'transparent', width: 0.9 * width}}
          >
            <Image source={require('../../assets/images/im_info.png')} style={{width: '100%', height: 1.25 * width}}/>
            <View style={{ backgroundColor: '#fff', borderBottomLeftRadius: 6, borderBottomRightRadius: 6, paddingHorizontal: 20, paddingBottom: 20, marginTop: -50 }}>
              <Flex justify="around">
                <Flex.Item>
                  <ImageBackground source={require('../../assets/images/blue_btn.png')} style={{width: 0.32 * width, height: 30, borderRadius: 30, overflow: 'hidden'}}>
                    <Button type="ghost" onPress={() => {
                      this.setState({
                        step: 1
                      })
                    }} style={{borderWidth: 0, height: 30, borderRadius: 30}}>
                      <Text style={{color: '#fff', fontSize: 14}}>教程详细</Text>
                    </Button>
                  </ImageBackground>
                </Flex.Item>
                <Flex.Item>
                  <ImageBackground source={require('../../assets/images/gold_btn.png')} style={{width: 0.32 * width, height: 30, borderRadius: 30, overflow: 'hidden'}}>
                    <Button type="ghost" onPress={this.onClose} style={{borderWidth: 0, height: 30, borderRadius: 30}}>
                      <Text style={{color: '#fff', fontSize: 14}}>立即充值</Text>
                    </Button>
                  </ImageBackground>
                </Flex.Item>
              </Flex>
            </View>
          </Modal>
        </View>
      )
    }

    return (
      <View>
        <Button type="primary" onPress={this.onShow}>
          充值教程
        </Button>
        <Modal
          popup
          maskClosable
          visible={this.state.visible}
          animationType="slide-down"
          onClose={this.onClose}
          style={{backgroundColor: 'transparent', position: 'relative'}}
        >
          <TouchableHighlight style={{position: 'absolute', top: 35, right: 20, width: 24, height: 24}} onPress={() => {
            this.setState({
              visible: false
            }, () => {
              this.setState({
                step: 0
              })
            })
          }}>
            <Image source={require('../../assets/images/recharge/close.png')} style={{width: 24, height: 24}}></Image>
          </TouchableHighlight>
          <View style={{ paddingVertical: 20, alignItems: 'center', height: (step === 8 || step === 9) ? height : 'auto', position: 'relative' }}>
            {
              step === 1 &&
              <View style={{}}>
                <Image source={require('../../assets/images/recharge/step1_01.jpg')} style={{width: 0.5 * width, height: 45, marginLeft: 0.5 * width, marginTop: 50}}></Image>
                <Image source={require('../../assets/images/recharge/step1_02.png')} style={{width: 0.8 * width, height: 0.16 * width, marginLeft: 20}}></Image>
              </View>
            }
            {
              step === 2 &&
              <View>
                <Image source={require('../../assets/images/recharge/step2_01.png')} style={{width: width, height: 0.5 * width, marginTop: 90}}></Image>
              </View>
            }
            {
              step === 3 &&
              <View>
                <Image source={require('../../assets/images/recharge/step3_01.png')} style={{width: width, height: 0.36 * width, marginTop: 150}}></Image>
              </View>
            }
            {
              step === 4 &&
              <View>
                <Image source={require('../../assets/images/recharge/step4_01.png')} style={{width: width, height: 0.4 * width, marginTop: 324}}></Image>
              </View>
            }
            {
              step === 5 &&
              <View>
                <Image source={require('../../assets/images/recharge/step5_01.jpg')} style={{width: 0.94 * width, height: 0.45 * width, marginTop: 160}}></Image>
                <Image source={require('../../assets/images/recharge/step5_02.png')} style={{width: 0.77 * width, height: 0.19 * width, marginLeft: 20}}></Image>
              </View>
            }
            {
              step === 6 &&
              <View>
                <Image source={require('../../assets/images/recharge/step6_01.jpg')} style={{width: 0.94 * width, height: 0.23 * width, marginTop: 160}}></Image>
                <Image source={require('../../assets/images/recharge/step6_02.png')} style={{width: 0.70 * width, height: 0.19 * width, marginLeft: 20}}></Image>
              </View>
            }
            {
              step === 7 &&
              <View>
                <Image source={require('../../assets/images/recharge/step7_01.jpg')} style={{width: 0.94 * width, height: 0.45 * width, marginTop: 200}}></Image>
                <Image source={require('../../assets/images/recharge/step7_02.png')} style={{width: 0.81 * width, height: 0.34 * width, marginLeft: 20}}></Image>
              </View>
            }
            {
              step === 8 &&
              <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%', alignItems: 'center'}}>
                <TouchableHighlight onPress={() => {
                  if (step >= 9) return
                  this.setState({
                    step: step+1
                  })
                }}>
                  <Image source={require('../../assets/images/recharge/nextstep.png')} style={{width: 99, height: 48, marginBottom: 30}}></Image>
                </TouchableHighlight>
                <Image source={require('../../assets/images/recharge/step8_01.png')} style={{width: 0.86 * width, height: 0.34 * width, marginLeft: 20}}></Image>
                <Image source={require('../../assets/images/recharge/step8_02.jpg')} style={{width: 0.94 * width, height: 0.15 * width}}></Image>
              </View>
            }
            {
              step === 9 &&
              <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%', alignItems: 'center'}}>
                <TouchableHighlight onPress={() => {
                  this.setState({
                    visible: false
                  }, () => {
                    this.setState({
                      step: 0
                    })
                  })
                }}>
                  <Image source={require('../../assets/images/recharge/iknow.png')} style={{width: 99, height: 48, marginBottom: 30}}></Image>
                </TouchableHighlight>
                <Image source={require('../../assets/images/recharge/step9_01.png')} style={{width: 0.86 * width, height: 0.34 * width, marginLeft: 20}}></Image>
                <Image source={require('../../assets/images/recharge/step9_02.jpg')} style={{width: 0.94 * width, height: 0.15 * width}}></Image>
              </View>
            }
            {
              step < 8 &&
              <TouchableHighlight onPress={() => {
                if (step >= 9) return
                this.setState({
                  step: step+1
                })
              }}>
                <Image source={require('../../assets/images/recharge/nextstep.png')} style={{width: 99, height: 48, marginTop: 30}}></Image>
              </TouchableHighlight>
            }
          </View>
        </Modal>
      </View>
    )
  }
}