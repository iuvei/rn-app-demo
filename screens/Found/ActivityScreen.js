import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  Dimensions,
  Animated
} from 'react-native';
import { List, Toast, Flex, WhiteSpace, Button } from "@ant-design/react-native";
import HTML from 'react-native-render-html';
import { connect } from "react-redux";
import Header from './../../components/Header';
import { queryActivity } from "../../actions/common";
import {joinActivity, getCashBouns} from './../../api/basic'
const Item = List.Item;

class ActivityScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header title={'活动'} navigation={navigation}/>
    }
  }

  constructor(props) {
    super (props)
    this.state = {
      refreshing: false,
      list: [],
      activeId: -1,
      ImageList: {
        'activity/czxfs.png': require(`./../../assets/images/activity/czxfs.png`),
        'activity/dayhyscs.png': require(`./../../assets/images/activity/dayhyscs.png`),
        'activity/hyscs.png': require(`./../../assets/images/activity/hyscs.png`)
      }
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      Toast.success('刷新成功！')
      this.setState({refreshing: false});
    }, 1000);
  }

  getImg = (url) => {
    return this.state.ImageList[url]
  }

  setActiveList = activeId => {
    this.state.activeId === activeId ? this.setState({activeId: -1}) : this.setState({activeId})
  }

  getAllAct = () => {
    setTimeout(() => {
      this.props.queryActivity()
    }, 100)
  }

  _getButtonAction = item => {
    if (item.status === 3) {
      return <Text style={{color: '#666666'}}>活动已过期</Text>
    } else if (item.status === 1 && item.joinWay === 1 && item.joinStatus === 0 && item.joinPermission === 1) {
      return <Button type="primary" onPress={() => this.joinAct(item)}>参与活动</Button>
    } else if (item.distributeWay === 1 && item.recordStatus === 2) {
      <Button onPress={() => this._getCashBouns(item)} >领取彩金 { item.bouns }</Button>
    } else if (item.recordStatus === -1) {
      return <Text style={{color: '#666666'}}>彩金领取时间已过期</Text>
    }
  }

  joinAct = (item) => {
    joinActivity({activityId: item.activityId}).then(res => {
      if (res.code === 0) {
        Toast.success(res.message)
        setTimeout (() => {
          item.joinStatus = 1
        }, 500)
        this.getAllAct ()
      } else {
        Toast.fail(res.message)
      }
    })
  }

  _getCashBouns = (item) => {
    getCashBouns({recordId: item.recordId}).then(res => {
      if (res.code === 0) {
        Toast.success(res.message)
        this.getAllAct()
      } else {
        Toast.fail(res.message)
      }
    })
  }

  render() {
    let { sysActivities } = this.props
    let { activeId } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          {
            sysActivities.map((item, index) => {
              return (
                <View style={styles.acItem} key={index}>
                  {
                    !!item.local_banner && <Flex onPress={() => this.setActiveList(index)}><Image
                      source={this.getImg(item.local_banner)}
                      resizeMode={'contain'}
                      style={{width: 400, height: 90}}/></Flex>
                  }
                  <List>
                    <Item arrow={[activeId === index ? 'up' : 'down']} onPress={() => this.setActiveList(index)}>
                      {item.activityName}
                    </Item>
                  </List>
                  {
                    activeId === index ?
                      <Animated.View style={{paddingLeft: 10, paddingRight: 10}}>
                        <HTML html={item.local_introduce} imagesMaxWidth={Dimensions.get('window').width} />
                        <Text>活动说明:</Text>
                        <HTML html={item.local_explanation} imagesMaxWidth={Dimensions.get('window').width} />
                        <WhiteSpace size="sm" />
                        {
                          this._getButtonAction(item)
                        }
                      </Animated.View>
                      : null
                  }
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  acItem: {
    marginBottom: 15
  }
})

const mapStateToProps = (state) => {
  let { sysActivities } = state.common
  return ({
    sysActivities
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    queryActivity: () => {
      dispatch(queryActivity())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityScreen)
