import React, {Component} from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Toast, Flex, Modal, List, Radio } from '@ant-design/react-native'
import FloatBall from './FloatBall'
import { connect } from "react-redux";
import {
  setShowFloatBall,
  setCurrentApiUrl
} from './../actions/common'

const RadioItem = Radio.RadioItem;

class LinesPanel extends Component {
  constructor(props) {
    super (props);
    this.state = {
      show: false,
      close: props.showFloatBall,
      activeId: 1,
      list: [
        {key: 1, speed: 23 },
        {key: 2, speed: 153 },
        {key: 4, speed: 13 },
        {key: 5, speed: 8 }
      ]
    }
  }

  showModal = (show = false) => {
    this.setState({show})
  }

  submit = () => {
    let show = false
    this.props.setShowFloatBall(this.state.close)
    this.setState({show})
    Toast.success('设置成功！')
  }

  render() {
    let { showFloatBall } = this.props
    let { list, show, activeId, close } = this.state
    return (
      showFloatBall ?
        <View>
          <FloatBall>
            <Text style={styles.text} onPress={() => this.showModal(true)}>加速</Text>
          </FloatBall>
          <Modal
            title="路线"
            transparent
            visible={show}
            footer={[
              { text: '取消', onPress: () => this.showModal() },
              { text: '确定', onPress: () => this.submit() }
              ]}
          >
            <View>
              <View>
                <Text>
                  <Text>当前路线：</Text>
                  <Text>1</Text>
                </Text>
                <Flex justify="space-between">
                  <View><Text style={styles.tips}>关闭悬浮球(设置中修改)</Text></View>
                  <View>
                    <Flex>
                      <View style={[styles.defaultBt,!close ? styles.activeBtn : '']}>
                        <Text
                          onPress={() => this.setState({close: false})}
                          style={{color: 'white'}}>关</Text>
                      </View>
                      <View style={[styles.defaultBt,close ? styles.activeBtn : '']}>
                        <Text
                          onPress={() => this.setState({close: true})}
                          style={{color: 'white'}}>开</Text>
                      </View>
                    </Flex>
                  </View>
                </Flex>
              </View>
              <View style={{height: 180, width: '100%'}}>
                <ScrollView>
                  <List style={{ marginTop: 12 }}>
                    {
                      list.map(item => {
                        return (
                          <RadioItem
                            key={item.key}
                            checked={activeId === item.key}
                            onChange={event => {
                              if (event.target.checked) {
                                this.setState({ activeId: item.key });
                              }
                            }}
                          >
                            <Flex justify="space-between">
                              <Text>路线{item.key}</Text>
                              <Text style={{color: item.speed < 150 ? 'green' : 'red'}}>{item.speed}ms</Text>
                            </Flex>
                          </RadioItem>
                        )
                      })
                    }
                  </List>
                </ScrollView>
              </View>
              <View>
              </View>
            </View>
          </Modal>
        </View>
        : null
    )
  }
}

const styles = StyleSheet.create({
  text: {lineHeight: 40, textAlign: 'center', color: '#ffffff'},
  tips: {fontSize: 12, color: '#666666'},
  defaultBt: {fontSize: 10, paddingLeft: 10, paddingRight: 10, color: '#ffffff', backgroundColor: '#a2a2a2'},
  activeBtn: {backgroundColor: '#016fca'}
})

const mapStateToProps = (state) => {
  let { showFloatBall, currentApiUrl } = state.common
  return ({
    showFloatBall,
    currentApiUrl
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setShowFloatBall: (data) => {
      dispatch(setShowFloatBall(data))
    },
    setCurrentApiUrl: (data) => {
      dispatch(setCurrentApiUrl(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinesPanel)
