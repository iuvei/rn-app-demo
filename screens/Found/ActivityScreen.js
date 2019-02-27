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
import { Toast, Flex, WhiteSpace, Button, Icon } from "@ant-design/react-native";
import $Toast from '../../plugin/$Toast'
import _ from 'lodash'
import HTML from 'react-native-render-html'
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils'
import { connect } from "react-redux";
import Header from './../../components/Header';
import { queryActivity } from "../../actions/common";
import {joinActivity, getCashBouns} from './../../api/basic'
import Accordion from 'react-native-collapsible/Accordion'

const tags = _.without(IGNORED_TAGS,
  'table', 'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'
)
let x = 1
const renderers={
  table: (htmlAttribs, children, style, passProps) => {
    //return makeWebView(++x, item, content);

    return (
      <ScrollView key={`table${++x}`} horizontal={true}>
        {children}
      </ScrollView>
    );
  },
  tr: (html, children, style, passProps) => {
  return (
    <View
      key={`tr${++x}`}
      style={{
        borderBottomWidth: 1,
        borderColor: '#ccc'
      }}
    >
      {children}
    </View>
  );
},
  th: (attribs, children, style, passProps) => {
  let rowspan = 1;
  if (attribs.colspan) {
    rowspan = parseInt(attribs.colspan, 10);
  }
  return (
    <View
      key={`th${++x}`}
      style={{
        borderLeftColor: 'white',
        borderLeftWidth: passProps.nodeIndex === 0 ? 0 : 1,
        padding: 6
      }}
    >
      <Text style={{fontWeight: "bold" }}>
        {children}
      </Text>
    </View>
  );
},
  td: (attribs, children, style, passProps) => {
  let rowspan = 1;
  if (attribs.rowspan) {
    rowspan = parseInt(attribs.rowspan, 10);
  }
  return (
    <View
      key={`td${++x}`}
      style={{
        borderColor: '#ccc',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        padding: 6
      }}
    >
      <Text>{children}</Text>
    </View>
  );
}
}

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
        'activity/hyscs.png': require(`./../../assets/images/activity/hyscs.png`),
        'activity/otccz.png': require(`./../../assets/images/activity/otccz.png`),
        'activity/sjkyj.png': require(`./../../assets/images/activity/sjkyj.png`)
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
    console.log(item.rewardValue)
    let rewardValue = item.rewardValue ? JSON.parse(item.rewardValue) : []
    return (
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        {
          item.activityCode !== 'otcPay' && rewardValue && rewardValue instanceof Array ?
            <View>
              <ScrollView horizontal={true}>
                <View>
                  <View style={{paddingVertical: 5, paddingHorizontal: 10, borderColor: '#ccc', borderWidth: 1}}><Text>{item.table_header[0]}</Text></View>
                  {
                    rewardValue.map((v,index) =>
                      <View key={index} style={{paddingVertical: 5, paddingHorizontal: 10, borderColor: '#ccc', borderWidth: 1}}><Text>{v.minPeriphery} - {v.maxPeriphery }</Text></View>
                    )
                  }
                </View>
                <View>
                  <View style={{paddingVertical: 5, paddingHorizontal: 10, borderColor: '#ccc', borderWidth: 1}}><Text>{item.table_header[1]}</Text></View>
                  {
                    rewardValue.map((v,index) =>
                      <View key={index} style={{paddingVertical: 5, paddingHorizontal: 10, borderColor: '#ccc', borderWidth: 1}}>
                        <Text>
                          {
                            item.activityCode === 'sjksyj' && <Text>{v.oneReword} / {v.twoReword} / {v.threeReword}</Text>
                          }
                          <Text>{v.reword } 元</Text>
                        </Text>
                      </View>
                    )
                  }
                </View>
              </ScrollView>
            </View>
            :
            <HTML html={item.local_introduce || '<div>--</div>'} imagesMaxWidth={width} ignoredTags={tags} renderers={renderers} />

        }
        <Text>活动说明:</Text>
        <HTML html={item.local_explanation || '<div>--</div>'} imagesMaxWidth={width} ignoredTags={tags} renderers={renderers} />
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
      $Toast.success('刷新成功！')
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
