import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Toast, Flex, WhiteSpace, WingBlank, Button, InputItem, TextareaItem } from '@ant-design/react-native'
import {downUser, sendMessage} from './../../api/member'

export default class WriteEmail extends React.Component {
  constructor(props) {
    super (props);
    this.onChange = content => {
      this.setState({ content });
    };
    this.state = {
      activeId: 0, // 0上级 1下级 2客服
      Rtabs: [
        {name:'上级', key: 0},
        {name:'下级', key: 1},
        {name:'客服', key: 2}
      ],
      topic: '',
      content: '',
      down_data: []
    }
  }

  setActiveRtab = activeId => {
    this.setState({activeId})
  }

  getDownUser = () => {
    let obj = {
      pageNumber: 1,
      pageSize: 35
    }
    downUser(obj).then((res) => {
      if (res.code === 0) {
        this.setState({
          down_data: res.data || []
        })
      }
    })
  }

  sendEmail = () => {
    let { topic, content } = this.state
    if (!topic || !content) {
      Toast.fail(!topic ? '主题不能为空': '邮件内容不能为空')
      return
    }
    Toast.success('发送成功！')
  }

  componentDidMount() {
    this.getDownUser()
  }

  render() {
    let { activeId, Rtabs, down_data } = this.state
    return (
      <View style={styles.container}>
        <WhiteSpace size="lg" />
        <WingBlank size="md">
          <Flex>
            <View><Text>收件人：</Text></View>
            <View>
              <Flex>
                {
                  Rtabs.map((item, index) => {
                    let d = down_data.length === 0 && item.key === 1
                    return (
                      !d ? <View
                        key={index}
                        style={[styles.defaultBt, activeId === item.key ? styles.activeBt : '']}>
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
                autoHeight count={200} />
            </View>
          </View>
          <WhiteSpace size="lg" />
          <Flex>
            <View>
              <Button
                type="warning"
                onPress={() => {
                  this.setState({
                    topic: '',
                    content: ''
                  })
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  defaultBt: {
    width: 80,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: '#ccc'
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
