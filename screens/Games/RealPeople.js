import React from 'react'
import {ScrollView, View, Text, ImageBackground, Image, StyleSheet, Dimensions} from 'react-native'
import {Button, Flex, Toast} from '@ant-design/react-native'
import { connect } from "react-redux";
import { AsetUserPlatfrom } from "../../actions/common"
import { toLiveGame } from "./../../api/member"

class RealPeople extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      list: {
        AG:{
          name: 'AG平台',
          status: true,
          icon: require('../../assets/images/realPeople/ag-ico.png'),
          bgImgL: require('../../assets/images/realPeople/ag.png')
        },OG:{
          name: 'OG平台',
          status: true,
          icon: require('../../assets/images/realPeople/og-ico.png'),
          bgImgL: require('../../assets/images/realPeople/og.jpg')
        },PT:{
          name: 'PT平台',
          status: true,
          icon: require('../../assets/images/realPeople/allbet-ico.png'),
          bgImgL: require('../../assets/images/realPeople/allbet.png')
        },eBET:{
          name: 'eBET平台',
          status: true,
          icon: require('../../assets/images/realPeople/ebet-ico.png'),
          bgImgL: require('../../assets/images/realPeople/ebet.png')
        }
      },
      baccaratPlatform: ['AG', 'OG', 'PT', 'eBET']
    }
    props.AsetUserPlatfrom()
  }

  _toLiveGame = (item) => {
    if (item.partnerStatus) return
    toLiveGame({partnerCode: item.partnerCode}).then(res => {
      if (res.code === 0) {
        this.props.navigation.navigate('ThirdGameScreen', {uri: res.data.url})
      } else {
        Toast.fail(res.message)
      }
    })
  }

  render () {
    let {list, baccaratPlatform} = this.state
    let w = Dimensions.get('window').width/2
    let {userPlatformInfo} = this.props
    return (
      <ScrollView style={{paddingLeft: 5, paddingRight: 5}}>
        <Flex wrap="wrap" justify="space-between">
        {
          userPlatformInfo.map((item, index) => {
            let d = baccaratPlatform.includes(item.partnerName)
            return (
              d ? <View style={{width: '49%',}} key={index}>
                <ImageBackground source={list[item.partnerName].bgImgL} resizeMode= 'contain' style={{width: '100%', height:w/0.7 }}>
                  <View style={styles.card}>
                    <View style={styles.footer}>
                      <Image source={list[item.partnerName].icon} resizeMode= 'contain' style={{width: 60, height: 30}}></Image>
                      <View style={{width: 100, alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 14}}>{item.partnerDesc}</Text>
                        <Button
                          onPress={()=> this._toLiveGame(item)}
                          style={{width: 80, height: 25}}>
                          <Text style={{fontSize: 12}}>{item.partnerStatus === 0 ? '进入游戏' : '请等待'}</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View> : null
              )
          })
        }
        </Flex>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  card: {
    flex: 1,
    margin: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingRight: 10
  }
})

const mapStateToProps = (state, props) => {
  let { userPlatformInfo } = state.common
  return {
    userPlatformInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AsetUserPlatfrom: (data) => { dispatch(AsetUserPlatfrom(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealPeople)
