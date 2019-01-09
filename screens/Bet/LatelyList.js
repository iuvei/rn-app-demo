import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class LatelyList extends Component {

  render() {
    let {latelyOpenList} = this.props
    return (
      <View style={styles.container}>
        {
          latelyOpenList.map(list =>
            <View key={list.openIssue} style={styles.listItem}>
              <Text>期号：{list.openIssue}</Text>
              <Text>开奖号码：{list.openCode.toString()}</Text>
            </View>
          )
        }
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {classic: {latelyOpenList}} = state
  return {latelyOpenList}
}

export default connect(mapStateToProps)(LatelyList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ededed'
  },
  listItem: {
    backgroundColor: '#fff',
    margin: 10,
    marginBottom: 0,
    borderRadius: 8,
    padding: 10
  }
})
