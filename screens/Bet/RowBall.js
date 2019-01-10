import React from 'react'
import {
  View, Text,
  StyleSheet
} from 'react-native'
import {
  Flex, Tabs, Card, WhiteSpace,
  Checkbox, List,
  Button, WingBlank, TextareaItem
} from '@ant-design/react-native'

const CheckboxItem = Checkbox.CheckboxItem

class RowBall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxItem1: true
    }
  }

  componentDidMount() {
    // 渲染视图
    // 计算数据
  }

  render() {
    let {tools, RowData} = this.props
    return (
      <View>
        <View>
          {
            RowData.map((row, index) => {
              return (
                <View key={index} style={styles.warp}>
                  <Flex justify="start">
                    <Text style={{fontSize: 16, marginLeft: 10}}>
                      {row.title}
                    </Text>
                    <View style={styles.ballItem}>
                      {
                        row.data.map((b, bIdx) =>
                          <Button
                            key={`${bIdx + '--' + b.title}`}
                            type="ghost" size="small" style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            marginLeft: 0,
                            marginRight: 6
                          }}>{b.text}</Button>
                        )
                      }
                      {
                        tools.map((t, tIdx) =>
                          <Button
                            key={`${tIdx + '--' + t.code}`}
                            type="ghost" size="small" style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            marginLeft: 0,
                            marginRight: 6
                          }}>{t.name}</Button>
                        )
                      }
                    </View>
                  </Flex>
                </View>
              )
            })
          }
        </View>
        <View>
          <List style={{marginTop: 12}}>
            <Text style={{marginTop: 12}}>Multiple options</Text>
            <CheckboxItem
              checked={this.state.checkboxItem1}
              onChange={event => {
                this.setState({checkboxItem1: event.target.checked})
              }}
            >
              Option 1
            </CheckboxItem>
            <CheckboxItem>Option 2</CheckboxItem>
            <CheckboxItem disabled>Option 3</CheckboxItem>
            <CheckboxItem disabled checked>
              Option 4
            </CheckboxItem>
          </List>
        </View>
        <View>
          <TextareaItem
            rows={10}
            placeholder="高度自适应"
            style={{margin: 6, padding: 10, borderRadius: 6}}
          />
        </View>
      </View>
    )
  }
}

export default RowBall

const styles = StyleSheet.create({
  container: {
    flex: 1
    // flexDirection: 'column'
  },
  warp: {
    flex: 1,
    flexDirection: 'row',
    margin: 6,
    borderRadius: 6,
    marginTop: 1,
    height: 70,
    backgroundColor: '#fff'
    // alignItems: 'center'
  },
  left: {
    width: 60,
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ededed',
    borderLeftColor: '#ededed',
    borderLeftWidth: 2
  },
  ballItem: {
    // backgroundColor: 'darkcyan',
    margin: 4,
    marginTop: 2,
    marginBottom: 2,
    // justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  tools: {
    // backgroundColor: 'red',
    justifyContent: 'flex-start'
  }
})
