import React from 'react'
import {
  View, Text,
  StyleSheet
} from 'react-native'
import {
  Tabs, Card, WhiteSpace,
  Button, WingBlank
} from '@ant-design/react-native'

class RowBall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RowData: [
        {
          title: '万位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '千位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '百位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '十位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '个位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '万位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '千位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '百位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '十位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        },
        {
          title: '个位',
          data: [
            {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
            {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
          ]
        }
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.RowData.map((row, index) => {
            return (
              <View key={index} style={styles.warp}>
                <View style={styles.left}>
                  <Text style={{fontSize: 16, marginLeft: 10}}>
                    {row.title}
                  </Text>
                </View>
                <View stley={styles.right}>
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
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}

export default RowBall

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column'
  },
  warp: {
    flex: 1,
    flexDirection: 'row',
    margin: 6,
    borderRadius: 6,
    marginTop: 1,
    height: 70,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  left: {
    width: 60,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    borderLeftColor: '#ededed',
    borderLeftWidth: 2
  },
  ballItem: {
    // backgroundColor: 'darkcyan',
    margin: 4,
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  }
})
