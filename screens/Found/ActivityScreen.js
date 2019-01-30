import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { List, Toast, Flex, WhiteSpace, Button, Icon } from "@ant-design/react-native";
import HTML from 'react-native-render-html';
import { connect } from "react-redux";
import Header from './../../components/Header';
import { queryActivity } from "../../actions/common";
import {joinActivity, getCashBouns} from './../../api/basic'
import Accordion from 'react-native-collapsible/Accordion'
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
      activeSections: [],
      height: 0,
      ImageList: {
        'activity/czxfs.png': require(`./../../assets/images/activity/czxfs.png`),
        'activity/dayhyscs.png': require(`./../../assets/images/activity/dayhyscs.png`),
        'activity/hyscs.png': require(`./../../assets/images/activity/hyscs.png`)
      }
    }
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  _renderHeader = (item, index) => {
    let width = Dimensions.get('window').width
    return (
      <View>
        {
          !!item.local_banner && <Flex><Image
            source={this.getImg(item.local_banner)}
            resizeMode={'contain'}
            style={{width: '100%', height: (width*220)/750}}/></Flex>
        }
        <Flex justify="space-between" style={{padding: 10}}>
          <Text>{item.activityName}</Text>
          <Icon name={[this.state.activeSections[0] === index ? 'up' : 'down']} />
        </Flex>
      </View>
    )
  }

  _renderContent = item => {
    let width = Dimensions.get('window').width
    return (
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <HTML html={item.local_introduce || '<div>--</div>'} imagesMaxWidth={width} />
        <Text>活动说明:</Text>
        <HTML html={item.local_explanation || '<div>--</div>'} imagesMaxWidth={width} />
        <WhiteSpace size="sm" />
        {
          this._getButtonAction(item)
        }
      </View>
    )
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
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
    let data = sysActivities.filter(item => item.status === 1)
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <Accordion
            sections={data}
            sectionContainerStyle={{marginBottom:10, backgroundColor:'#ffffff'}}
            underlayColor={'#cccccc'}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
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
