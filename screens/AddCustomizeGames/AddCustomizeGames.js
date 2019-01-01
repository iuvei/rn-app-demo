import React from 'react'
import {
  Text,
  View
} from 'react-native'
import Header from './../../components/Header'

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
    }
  }

  finishAdd = () => {

  }

  componentDidMount() {
    this.props.navigation.setParams({ finishAdd: this.finishAdd })
  }

  render() {
    return (
      <View>
        <Text>是的冯绍峰</Text>
      </View>
    )
  }
}

export default AddCustomizeGamesScreen
