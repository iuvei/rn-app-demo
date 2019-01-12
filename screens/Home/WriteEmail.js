import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import {
  Toast, Flex, WhiteSpace, WingBlank,
  Button, InputItem, TextareaItem,
  Modal, Checkbox, List
} from '@ant-design/react-native'
import {downUser, sendMessage} from './../../api/member'
const CheckboxItem = Checkbox.CheckboxItem;

export default class WriteEmail extends React.Component {
  constructor(props) {
    super (props);
    this.onChange = content => {
      this.setState({ content });
    };
    this.state = {
      visible: false,
      checkAll: false,
      messageType: 1, // 1上级 3下级 2客服
      Rtabs: [
        {name:'上级', key: 1},
        {name:'下级', key: 3},
        {name:'客服', key: 2}
      ],
      topic: '',
      content: '',
      down_data: []
    }
  }

  setActiveRtab = messageType => {
    let { down_data } = this.state
    this.setState({
      messageType,
      checkAll: false,
      visible: messageType === 3,
      down_data: messageType === 3 ? down_data : down_data.map(item => {return {...item, checked:false}})
    })
  }

  getDownUser = () => {
    let obj = {
      pageNumber: 1,
      pageSize: 35
    }
    downUser(obj).then((res) => {
      if (res.code === 0 && res.data && res.data.length) {
        let formateData = res.data.map(item =>{
          return {
            ...item,
            checked: false
          }
        })
        this.setState({
          down_data: formateData || []
        })
      }
    })
  }

  _setCheckItem = (key) => {
    this.setState((prevState) => {
      return {
        down_data: prevState.down_data.map((item, index) => {
          return key === index ? {...item, checked: !item.checked} : item
        })
      }
    })
  }

  _setCheckAll = () => {
    this.setState((prevState) => {
      return {
        checkAll: !prevState.checkAll,
        down_data: prevState.down_data.map((item) => {
          return {...item, checked: !prevState.checkAll}
        })
      }
    })
  }

  onClose = () => {
    this.setState((prevState) => {
      return {
        visible: false,
        checkAll: false,
        messageType: 1,
        checkAll: false,
        down_data: prevState.down_data.map((item) => {
          return {...item, checked: false}
        })
      }
    })
  }

  submitDownUser = (visible = false) => {
    let down_data = this.state.down_data.filter(item => item.checked)
    this.setState({
      messageType: down_data.length === 0 ? 1 : 3,
      visible
    })
  }

  sendEmail = () => {
    let { topic, content, messageType, down_data } = this.state
    let downUserId = []
    if (!topic || !content) {
      Toast.fail(!topic ? '主题不能为空': '邮件内容不能为空')
      return
    }
    if (messageType === 3) {
      down_data.forEach(item => {
        if (item.checked) {
          downUserId.push(item.user_id)
        }
      })
    }
    let formData = {
      subUserId: downUserId.length ? downUserId.join(','): '',
      title: topic,
      content: content,
      messageType: messageType
    }
    sendMessage(formData).then((res) => {
      if (res.code === 0) {
        Toast.success(res.message)
        this.resetFormateData()
      } else {
        Toast.info(res.message)
      }
    })
  }

  resetFormateData = () => {
    let { down_data } = this.state
    this.setState({
      messageType: 1,
      topic: '',
      content: '',
      down_data: down_data.map(item => {return {...item, checked:false}})
    })
  }

  componentDidMount() {
    this.getDownUser()
  }

  render() {
    let { messageType, Rtabs, down_data, checkAll } = this.state
    const footerButtons = [
      { text: '取消', onPress: () => this.onClose() },
      { text: '确认', onPress: () => this.submitDownUser() },
    ];
    return (
      <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView behavior='position'  style={styles.container}>
        <WhiteSpace size="lg" />
        <WingBlank size="md">
          <Flex>
            <View><Text>收件人：</Text></View>
            <View>
              <Flex>
                {
                  Rtabs.map((item, index) => {
                    let d = down_data.length === 0 && item.key === 3
                    return (
                      !d ? <View
                        key={index}
                        style={[styles.defaultBt, messageType === item.key ? styles.activeBt : '']}>
                        <Text
                          onPress={() => this.setActiveRtab(item.key)}
                          style={styles.defaultBtText}>{item.name}</Text>
                      </View> : null
                    )
                  })
                }
              </Flex>
            </View>
          </Flex>
          <View>
            <Flex wrap="wrap">
              {
                down_data.map((item, index) => {
                  return item.checked ? (
                    <View
                      style={styles.downActiveBt}
                      key={index}>
                      <Text
                        onPress={() => {this.setState({visible: true})}}
                        style={styles.downActiveBtText}>{item.userName}</Text>
                    </View>
                  ) : null
                })
              }
            </Flex>
          </View>
          <WhiteSpace size="lg" />
          <View>
            <Text>主题：</Text>
            <InputItem
              value={this.state.topic}
              onChange={value => {
                this.setState({
                  topic: value,
                });
              }}
              onSubmitEditing={Keyboard.dismiss}
              placeholder="输入主题" />
          </View>
          <WhiteSpace size="lg" />
          <View>
            <View>
              <Text>内容：</Text>
              <TextareaItem
                rows={10}
                style={{height: 100}}
                placeholder="写点什么呢"
                value={this.state.content}
                onChange={this.onChange}
                onSubmitEditing={Keyboard.dismiss}
                autoHeight />
            </View>
          </View>
          <WhiteSpace size="lg" />
          <Flex>
            <View>
              <Button
                type="warning"
                onPress={() => {
                  this.resetFormateData()
                }}
                style={{width: 150,height: 35, marginLeft: 10}}>重置</Button>
            </View>
            <View>
              <Button
                type="primary"
                onPress={() => this.sendEmail()}
                style={{width: 150,height: 35, marginLeft: 10}}>发送</Button>
            </View>
          </Flex>
        </WingBlank>
        <Modal
          title="下级列表"
          transparent
          visible={this.state.visible}
          footer={footerButtons}
        >
          <View>
            <Checkbox
              checked={checkAll}
              onChange={() => {
                this._setCheckAll()
              }}>全选</Checkbox>
          </View>
          <WhiteSpace size="lg" />
          <View style={{height: 200, width: '100%'}}>
            <ScrollView>
              <List>
                {
                  down_data.map((item, index) => {
                    return (
                      <CheckboxItem
                        checked={item.checked}
                        onChange={() => {
                          this._setCheckItem(index)
                        }}
                        key={index}>{item.userName}</CheckboxItem>
                    )
                  })
                }
              </List>
            </ScrollView>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  defaultBt: {
    width: 80,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: '#ccc'
  },
  downActiveBt: {
    width: 40,
    height: 20,
    borderRadius: 10,
    marginRight: 2,
    marginTop: 5,
    backgroundColor: '#097bd9'
  },
  downActiveBtText: {
    lineHeight: 20,
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'center'
  },
  activeBt: {
    backgroundColor: '#097bd9'
  },
  defaultBtText: {
    lineHeight: 30,
    color: '#ffffff',
    textAlign: 'center'
  },
})
