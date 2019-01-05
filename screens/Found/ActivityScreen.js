import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native'
import Header from './../../components/Header'
import { Toast } from "@ant-design/react-native/lib/index";

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
    return (
      <View style={styles.container}>
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
