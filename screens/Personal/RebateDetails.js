import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Flex} from '@ant-design/react-native'
import {connect} from 'react-redux'

const REBATE_TYPE = {
  0: '彩票返点', 1: '快乐彩返点', 2: '百家乐彩票返点'
}

const WATER_TYPE = {
  0: '彩票返水',
  1: '快乐彩返水',
  2: '百家乐真人返水',
  3: '百家乐体育返水',
  4: '百家乐电子返水',
  5: '百家乐彩票返水'
}

class RebateDetails extends React.Component {
  static navigationOptions = {
    title: '用户返点返水'
  }

  render () {
    let {userRebateVO, userRebackWaterVO} = this.props.rebateInfo
    return (
      <View style={styles.container}>
        {
          userRebateVO.map((item, index) => {
            return (
              <Flex key={index} direction={'row'} justify={'center'} style={styles.line}>
                <Text style={styles.text}>{REBATE_TYPE[item.rebateType]}:</Text>
                <Text style={styles.text}> {item.userRebate}</Text>
              </Flex>
            )
          })
        }
        {
          userRebackWaterVO.map((item, index) => {
            return (
              <Flex key={index} direction={'row'} justify={'center'} style={styles.line}>
                <Text style={styles.text}>{WATER_TYPE[item.rebackWaterType]} :</Text>
                <Text style={styles.text}> {item.userRebackWater}</Text>
              </Flex>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  line: {
    width: 400,
    borderBottomWidth: 0.5,
    borderColor:'#ededed',
    height: 60,
    borderRadius: 1,
    borderStyle: 'dotted',
  },
  text: {
    width: 160,
    fontSize: 16,
    color: '#000'
  }
})

const mapStateToProps = (state) => {
  let {rebateInfo, loginInfo, balanceInfo} = state.common
  return ({
    rebateInfo,
    loginInfo,
    balanceInfo
  })
}

export default connect(
  mapStateToProps
)(RebateDetails)
