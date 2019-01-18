import React, {Component} from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { Toast, Flex, Modal, List, Radio } from '@ant-design/react-native'
import FloatBall from './FloatBall'
import { connect } from "react-redux";
import {
  setShowFloatBall,
  setCurrentApiUrl
} from './../actions/common'
import { lineDetection } from './../api/basic'
const RadioItem = Radio.RadioItem;

class LinesPanel extends Component {
  constructor(props) {
    super (props);
    this.state = {
      show: false,
      open: true,
      activeId: 1,
      listTimes: [],
      speedList: []
    }
  }

  showModal = (show = false) => {
    if(show) {
      this.setState({
        speedList: [],
        open: true,
      }, () => this.updateLinesPannel())
    }
    this.setState({show})
  }

  submit = () => {
    let { activeId, listTimes, open} = this.state
    let show = false
    let apiUrl = listTimes.filter(item => item.key === activeId)[0].url
    this.props.setShowFloatBall(open)
    this.props.setCurrentApiUrl(apiUrl)
    this.setState({show})
    Toast.success('设置成功！', 0.5)
  }

  updateLinesPannel = () => {
    let arr = []
    lineDetection().then(res => {
      if (res.code === 0) {
        for (let i = 0; i < res.data.lineList.length; i++) {
          arr.push({
            url: res.data.lineList[i],
            key: i + 1
          })
        }
        this.setState({
          listTimes: arr
        })
      }
    })
  }

  setLineSpeed = (key, times) => {
    this.setState((prevState) => ({
      speedList: [...prevState.speedList, {key, times}]
    }))
  }

  getTimes = (key) => {
    let rst = this.state.speedList.filter(item => item.key === key)
    return rst.length ? rst[0].times : '测速中'
  }

  render() {
    let { showFloatBall } = this.props
    let { listTimes, show, activeId, open } = this.state
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
              // { text: '取消', onPress: () => this.showModal() },
              { text: '确定', onPress: () => this.submit() }
              ]}
          >
            <View>
              <View>
                <Text>
                  <Text>当前路线：</Text>
                  <Text>{activeId}</Text>
                </Text>
                <Flex justify="space-between">
                  <View><Text style={styles.tips}>关闭悬浮球(设置中修改)</Text></View>
                  <View>
                    <Flex>
                      <View style={[styles.defaultBt,!open ? styles.activeBtn : '']}>
                        <Text
                          onPress={() => this.setState({open: false})}
                          style={{color: 'white'}}>关</Text>
                      </View>
                      <View style={[styles.defaultBt,open ? styles.activeBtn : '']}>
                        <Text
                          onPress={() => this.setState({open: true})}
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
                      listTimes.map(item => {
                        let startTime = new Date().getTime()
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
                              <Image
                                source={{uri: item.url}}
                                style={{width: 0, height: 0}}
                                onError={() =>
                                  this.setLineSpeed(item.key, new Date().getTime()-startTime)} />
                              <Text style={{color: this.getTimes(item.key) < 150 ? 'green' : 'red'}}>{this.getTimes(item.key)}ms</Text>
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
