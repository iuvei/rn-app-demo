import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Flex, Button } from '@ant-design/react-native'

import { stylesUtil } from '../../../utils/ScreenUtil'

class BetBallContainer extends PureComponent {
  render() {
    let {
      row, clickBall, activeViewData, rectangle, tools, toolsCur,
      index
    } = this.props
    return (
      <View style={styles.BetView}>
        <Flex key={row.title}>
          <View style={[
            styles.BetTitleView,
            row.title.length === 3 ? {width: 44} : {}
          ]}>
            <Text style={styles.BetTitleText}>{row.title}</Text>
          </View>
          <View style={[
            styles.BetBallsView,
            row.balls.length > 3 ? {justifyContent: 'space-between'} : {}
          ]}>
            {
              row.balls.map((b, bIdx) =>
                <Button
                  key={`${bIdx + '--' + b.title}`}
                  type={b.choose ? 'primary' : 'ghost'} size="small"
                  onPress={() => clickBall(b, row, activeViewData.layout, index, activeViewData)}
                  style={rectangle ? styles.ballSquare : styles.ballCircle}>
                  <Text style={styles.ballText}>
                    {b.text || b.ball}
                    {b.rate ? '~' + b.rate : null}
                  </Text>
                </Button>
              )
            }
          </View>
        </Flex>
        {
          activeViewData.tools ? <Flex style={styles.ToolsFlex}>
            {
              tools.map((t, tIdx) =>
                <Text
                  style={styles.ToolsText}
                  key={`${tIdx + '--' + t.code}`}
                  onPress={() => toolsCur(t, row)}
                >{t.name}</Text>
              )
            }
          </Flex> : null
        }
      </View>
    )
  }
}

export default BetBallContainer

const styles = StyleSheet.create(stylesUtil({
  BetView: {
    flex: 1, fontSize: 16, padding: 4,
    margin: 10, marginBottom: 2,
    borderRadius: 6, backgroundColor: '#fff'
  },
  BetTitleView: {width: 38, marginLeft: 8, justifyContent: 'center'},
  BetTitleText: {justifyContent: 'center', textAlign: 'center'},
  BetBallsView: {
    flexWrap: 'wrap', flexDirection: 'row',
    // 还可以
    // justifyContent: 'space-between',
    margin: 2, flex: 1
  },
  ballSquare: {
    width: 120, height: 40, margin: 6,
    paddingLeft: 10, paddingRight: 10
  },
  ballCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 6
  },
  ballText: {fontSize: 16},
  ToolsFlex: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ToolsText: {
    flex: 1, fontSize: 14,
    height: 30,
    lineHeight: 30,
    color: '#666',
    textAlign: 'center',
    // backgroundColor: 'red',
    justifyContent: 'center'
  }
}))
