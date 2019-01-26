import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from '@ant-design/react-native'
import { stylesUtil } from '../../utils/ScreenUtil'
import { showOpenCodeListRule } from './../../data/options'

class LatelyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeClass: []
    }
  }

  // 计算 activeClass
  _showOpenCodeListRule = (code) => {
    let rst = showOpenCodeListRule(code)
    this.setState({
      activeClass: rst
    })
  }

  getBallsClassName = (rowId, index) => {
    if (this.state.activeClass.length === 0) {
      return 'primary'
    }

    let flag = !!this.state.activeClass.includes(index)
    if (rowId === 0) {
      return flag ? 'primary' : 'ghost'
    } else {
      return flag ? 'primary' : 'ghost'
    }
  }

  getLhCodeResult = (arr) => {
    let res = 0
    if (this.props.activePlay.code.indexOf('lo1_lh') > -1) {
      res = arr[this.state.activeClass[0]] > arr[this.state.activeClass[1]] ? '龙' : arr[this.state.activeClass[0]] < arr[this.state.activeClass[1]] ? '虎' : '和'
    } else {
      this.state.activeClass.forEach(i => {
        res += Number(arr[i])
      })
    }
    return res
  }

  getEndCodeResult = (arr) => {
    let resArr = []
    let ballsNum = 5
    if (this.state.activeClass && this.state.activeClass.length !== 5) {
      resArr = [
        arr[this.state.activeClass[0]] >= ballsNum ? '大' : '小',
        arr[this.state.activeClass[1]] >= ballsNum ? '大' : '小',
        arr[this.state.activeClass[0]] % 2 === 0 ? '双' : '单',
        arr[this.state.activeClass[1]] % 2 === 0 ? '双' : '单'
      ]
      return resArr
    }
  }

  componentDidMount() {
    this._showOpenCodeListRule(this.props.activePlay.code)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activePlay.code !== this.props.activePlay.code) {
      this._showOpenCodeListRule(nextProps.activePlay.code)
    }
  }

  render() {
    let {latelyOpenList, activePlay} = this.props
    return (
      <View style={styles.container}>
        {
          latelyOpenList.length ?
            latelyOpenList.map((list, idx) =>
              <View key={list.openIssue+'_'+idx} style={styles.listItem}>
                <Text>第 {list.openIssue} 期</Text>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  {
                    list.codelist.map((b, bIdx) =>
                      <Button
                        key={`${list.openIssue}-${bIdx}-${b}`}
                        type={this.getBallsClassName(idx, bIdx)} size="small"
                        style={styles.ballItem}>
                        <Text style={{fontSize: 13}}>{b}</Text>
                      </Button>
                    )
                  }
                  {
                    Object.keys(activePlay).length > 0 ? (activePlay.code === 'lo1_dxds_q2' || activePlay.code === 'lo1_dxds_h2') &&
                      this.getEndCodeResult(list.codelist).map((v, i) =>
                        <Button key={v + i} type='warning' size="small" style={styles.ballItem}>{v}</Button>
                    ): ''
                  }
                  {
                    Object.keys(activePlay).length > 0 ? (activePlay.code.indexOf('lo1_lh') > -1 || (activePlay.code.indexOf('lo1_hz') > -1) || activePlay.code === 'lo1_dxds_hz') &&
                      <Button type='warning' size="small" style={styles.ballItem}>{this.getLhCodeResult(list.codelist)}</Button> : ''
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
  let {classic: {latelyOpenList, activePlay}} = state
  return {latelyOpenList, activePlay}
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
