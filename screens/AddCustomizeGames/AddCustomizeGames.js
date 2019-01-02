import React from 'react'
import {
  Text,
  View,
  ScrollView,
  RefreshControl, StyleSheet, Image
} from 'react-native';
import { Accordion, Flex } from '@ant-design/react-native';
import Header from './../../components/Header'
import { connect } from "react-redux";

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
      loNumber: {
        ssc: 0,
        syx5: 0,
        pk10: 0,
        k3: 0,
        kl8: 0,
        xyc: 0,
        kl10: 0,
        dpc: 0
      },
    };
    this.onChange = activeSections => {
      this.setState({ activeSections });
    };
  }

  finishAdd = () => {
    this.props.navigation.goBack()
  }

  _toSetLot = () => {

  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 1000);
  }

  componentDidMount() {
    this.props.navigation.setParams({ finishAdd: this.finishAdd })
  }

  _renderHeader = item => {
    return (
      <Flex style={{width: '95%'}}>
        <View>
          <Image source={require('./../../assets/images/home/ssc_icon.png')} resizeMode={'contain'} style={styles.coItemImg} />
        </View>
        <View>
          <Text>
            <Text style={styles.coItemTitle}>{item.categoryName}</Text>
          </Text>
        </View>
        <View style={styles.coItemText}><Text style={styles.coItemTextCont}>8</Text></View>
      </Flex>
    )
  };

  render() {
    let { sysSortLottery } = this.props
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
                                  style={styles.defaultBtn}
                                  onPress={() => this._toSetLot(v)}>
                                  <Text numberOfLines={1} style={styles.defaultBtnText}>{v.lotterName}</Text>
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
                                  style={styles.defaultBtn}
                                  onPress={() => this._toSetLot(v)}>
                                  <Text numberOfLines={1} style={styles.defaultBtnText}>{v.lotterName}</Text>
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
  defaultBtnText: {
    fontSize: 12,
    color: '#333333',
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

export default connect(
  mapStateToProps
)(AddCustomizeGamesScreen)
