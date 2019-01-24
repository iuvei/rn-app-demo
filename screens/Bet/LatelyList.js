import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from '@ant-design/react-native'
import { stylesUtil } from '../../utils/ScreenUtil'

class LatelyList extends Component {

  render() {
    let {latelyOpenList} = this.props
    return (
      <View style={styles.container}>
        {
          latelyOpenList.length ?
            latelyOpenList.map(list =>
              <View key={list.openIssue} style={styles.listItem}>
                <Text>第 {list.openIssue} 期</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  {
                    list.codelist.map((b, bIdx) =>
                      <Button
                        key={`${list.openIssue}-${bIdx}-${b}`}
                        type='primary' size="small"
                        style={styles.ballItem}>
                        <Text style={{fontSize: 13}}>{b}</Text>
                      </Button>
                    )
                  }
                </View>
              </View>
            ) :
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
              }}>正在获取中</Text>
            </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {classic: {latelyOpenList}} = state
  return {latelyOpenList}
}
export default connect(
  mapStateToProps
)(LatelyList)

const styles = StyleSheet.create(stylesUtil({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ededed'
  },
  listItem: {
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ededed'
  },
  ballItem: {
    width: 30, height: 30,
    marginBottom: 2,
    borderRadius: 15,
    marginLeft: 3
  }
}))
