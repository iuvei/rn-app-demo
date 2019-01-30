import React from 'react'
import {
  Text,
  View,
  ScrollView,
  RefreshControl, StyleSheet, Image
} from 'react-native';
import { Accordion, Flex, Toast } from '@ant-design/react-native';
import Header from '../../components/Header';
import { connect } from "react-redux";
import {
  setActiveUsualLot
} from '../../actions/common'
import { pull } from 'lodash'

class AddCustomizeGamesScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      header: <Header
        title={'自定义'}
        navigation={navigation}
        rightContent={
          <Text style={{fontSize: 16, color: "#fff"}}>
            <Text onPress={() => params.finishAdd()}>完成</Text>
          </Text>
        }/>
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      activeSections: [0],
      checkAllGroup: [],
      loNumber: { ssc: 0, syx5: 0, pk10: 0, k3: 0, kl8: 0, xyc: 0, kl10: 0, dpc: 0 },
    };
    this.getIconName = value => {
      switch (value) {
        case 'ssc':
          return require('../../assets/images/home/ssc_icon.png')
        break
        case 'syx5':
          return require('../../assets/images/home/syxw_icon.png')
          break
        case 'kl8':
          return require('../../assets/images/home/klc_icon.png')
          break
        case 'pk10':
          return require('../../assets/images/home/pks_icon.png')
          break
        case 'k3':
          return require('../../assets/images/home/ks_icon.png')
          break
        case 'kl10':
          return require('../../assets/images/home/kls_icon.png')
          break
        case 'xyc':
          return require('../../assets/images/home/xyc_icon.png')
          break
        case 'dpc':
          return require('../../assets/images/home/dpc_icon.png')
          break
        default:
          return require('../../assets/images/home/ssc_icon.png')
      }
    };
    this.onChange = activeSections => {
      this.setState({ activeSections });
    };
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  initUsualGames = () => {
    let { usualLottery } = this.props
    let loNumber = { ssc: 0, syx5: 0, pk10: 0, k3: 0, kl8: 0, xyc: 0, kl10: 0, dpc: 0 }
    let checkAllGroup = []
    usualLottery.forEach(item => {
      loNumber[item.realCategory] += 1
      checkAllGroup.push(item.lotterCode)
    })
    this.setState({
      loNumber,
      checkAllGroup
    })
  }

  finishAdd = () => {
    let { checkAllGroup } = this.state
    let { sysSortLottery } = this.props
    let sourceData = []
    let formateUsualData = []
    sysSortLottery.forEach(item => sourceData.push(...item.originLot,...item.gpLot))
    sourceData.forEach(item => checkAllGroup.includes(item.lotterCode) ? formateUsualData.push(item) : '')
    this.props.setActiveUsualLot({custom: 1, data: formateUsualData})
    this.props.navigation.goBack()
  }

  _toSetLot = (v) => {
    let {realCategory, lotterCode} = v
    if (this.state.checkAllGroup.includes(lotterCode)) {
      this.setState((prevState) => {
        let checkAllGroup = pull(prevState.checkAllGroup, lotterCode)
        let loNumber = prevState.loNumber
        loNumber[realCategory] -= 1
        return { checkAllGroup, loNumber}
      })
    } else {
      if (this.state.checkAllGroup.length >= 10) {
        Toast.fail('最多设置10个')
        return
      }
      this.setState((prevState) => {
        let checkAllGroup = prevState.checkAllGroup
        let loNumber = prevState.loNumber
        checkAllGroup.push(lotterCode)
        loNumber[realCategory] += 1
        return { checkAllGroup, loNumber}
      })
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 1000);
  }

  componentDidMount() {
    this.initUsualGames()
    this.props.navigation.setParams({ finishAdd: this.finishAdd })
  }

  _renderHeader = item => {
    let { loNumber } = this.state
    return (
      <Flex style={{width: '95%'}}>
        <View>
          <Image source={this.getIconName(item.realCategory)} resizeMode={'contain'} style={styles.coItemImg} />
        </View>
        <View>
          <Text>
            <Text style={styles.coItemTitle}>{item.categoryName}</Text>
          </Text>
        </View>
        {loNumber[item.realCategory] !== 0 && <View style={styles.coItemText}><Text style={styles.coItemTextCont}>{loNumber[item.realCategory]}</Text></View>
        }
      </Flex>
    )
  };

  render() {
    let { sysSortLottery } = this.props
    let { checkAllGroup } = this.state
    return (
      <View style={styles.customContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <Accordion
            onChange={this.onChange}
            duration={400}
            activeSections={this.state.activeSections}
          >
            {
              sysSortLottery.map((item, index) =>{
                return (
                  <Accordion.Panel key={index} header={this._renderHeader(item)} style={{backgroundColor:'#fff'}}>
                    <View>
                      {!!item.originLot.length && <View>
                        <View style={styles.lotTitle}><Text>官方彩</Text></View>
                        <Flex wrap="wrap">
                          {
                            item.originLot.map((v, i) =>{
                              return (
                                <View
                                  key={i}
                                  style={checkAllGroup.includes(v.lotterCode) ? styles.activeBtn : styles.defaultBtn}>
                                  <Text
                                    numberOfLines={1}
                                    style={checkAllGroup.includes(v.lotterCode) ? styles.activeBtnText : styles.defaultBtnText}
                                    onPress={() => this._toSetLot(v)}>{v.lotterName}</Text>
                                </View>
                              )
                            })
                          }
                        </Flex>
                      </View>}
                      {!!item.gpLot.length && <View>
                        <View style={styles.lotTitle}><Text>高频彩</Text></View>
                        <Flex wrap="wrap">
                          {
                            item.gpLot.map((v, i) =>{
                              return (
                                <View
                                  key={i}
                                  style={checkAllGroup.includes(v.lotterCode) ? styles.activeBtn : styles.defaultBtn}>
                                  <Text
                                    numberOfLines={1}
                                    style={checkAllGroup.includes(v.lotterCode) ? styles.activeBtnText : styles.defaultBtnText}
                                    onPress={() => this._toSetLot(v)}>{v.lotterName}</Text>
                                </View>
                              )
                            })
                          }
                        </Flex>
                      </View>}
                    </View>
                  </Accordion.Panel>
                )
              })
            }
          </Accordion>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  customContainer: {
    backgroundColor: '#ffffff',
  },
  coItemImg: {
    width: 70,
    height: 70,
    backgroundColor: '#fff'
  },
  coItemTitle: {
    fontSize: 16
  },
  coItemText: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ef3153',
    marginTop: -15,
    marginLeft: -4
  },
  coItemTextCont: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16
  },
  lotTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    marginLeft: 10,
  },
  defaultBtn: {
    width: 80,
    height: 25,
    marginLeft: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#e4e4e4'
  },
  activeBtn: {
    width: 80,
    height: 25,
    marginLeft: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#016fca'
  },
  defaultBtnText: {
    fontSize: 12,
    color: '#333333',
    lineHeight: 20,
    textAlign: 'center',
    padding: 3,
  },
  activeBtnText: {
    fontSize: 12,
    color: '#ffffff',
    lineHeight: 20,
    textAlign: 'center',
    padding: 3,
  },
})

const mapStateToProps = (state) => {
  let { sysSortLottery, usualLottery } = state.common
  return ({
    sysSortLottery,
    usualLottery
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveUsualLot: (data) => {
      dispatch(setActiveUsualLot(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomizeGamesScreen)
