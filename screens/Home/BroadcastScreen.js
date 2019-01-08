import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl, Dimensions,
} from 'react-native'
import Header from './../../components/Header'
import { Accordion, Flex, Toast } from '@ant-design/react-native';
import { connect } from "react-redux";
import { getSystemNews } from "../../actions/common";
import dayjs from 'dayjs'
import HTML from 'react-native-render-html';

class BroadcastScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header title={'公告'} navigation={navigation}/>
    }
  }

  constructor(props) {
    super (props)
    this.state = {
      refreshing: false,
      activeSections: []
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getSystemNews()
    setTimeout(() => {
      Toast.success('刷新成功！')
      this.setState({refreshing: false});
    }, 1000);
  }

  _onChange = activeSections => {
    this.setState({ activeSections });
  }

  _renderHeader = val => {
    return (
      <Flex style={styles.adHeader}>
        <Text numberOfLines={2}>{val}</Text>
      </Flex>
    )
  }

  render() {
    let { systemNews } = this.props
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
            onChange={this._onChange}
            duration={400}
            activeSections={this.state.activeSections}
          >
            {
              systemNews.map((item, index) =>{
                return (
                  <Accordion.Panel key={index} header={this._renderHeader(item.shortTitle)} style={{backgroundColor:'#fff'}}>
                    <View style={styles.adContent}>
                      <Text>{item.title}</Text>
                      <HTML html={item.content} imagesMaxWidth={Dimensions.get('window').width} />
                      {/*<Text>{item.content}</Text>*/}
                      <Text style={styles.adTime}>{dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  adHeader: {
    width: '95%',
    height: 70
  },
  adContent: {
    paddingLeft: 10,
    paddingRight: 10
  },
  adTime: {
    textAlign: 'right'
  },
})

const mapStateToProps = (state) => {
  let { systemNews } = state.common
  return ({
    systemNews
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSystemNews: (data) => {
      dispatch(getSystemNews(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BroadcastScreen)
