import React from 'react'
import Header from './../../components/Header'
import { Provider } from '@ant-design/react-native';

class BroadcastScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <Header title={'公告'} navigation={navigation}/>
    }
  }

  constructor(props) {
    super (props)
    this.state = {
    }
  }

  render() {
    return (
      <Provider></Provider>
    )
  }
}

export default BroadcastScreen
