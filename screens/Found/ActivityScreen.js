import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions
} from 'react-native'
import Header from './../../components/Header'
import { Toast } from "@ant-design/react-native/lib/index";
import HTML from 'react-native-render-html';

export default class ActivityScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header title={'活动'} navigation={navigation}/>
    }
  }

  constructor(props) {
    super (props)
    this.state = {
      refreshing: false,
      list: []
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      Toast.success('刷新成功！')
      this.setState({refreshing: false});
    }, 1000);
  }

  render() {
    const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
    return (
      <View style={styles.container}>
        <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
        <Text>活动页面123</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})
