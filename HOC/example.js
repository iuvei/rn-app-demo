import { View, Text } from 'react-native'
// export default containerWrapper({title: '话题'})(TopicPage)

export const containerWrapper = (title) => {
  return (Container) => {
    let WrappedComponent = (props) => <Container {...props} title={title}/>
    // ...
    return WrappedComponent
  }
}

@containerWrapper({title: '话题'})
export default class TopicPage extends Component {
  render() {
    return (
      //
      <View>
        <Text>我是一个写数据</Text>
      </View>
    )
  }
}
