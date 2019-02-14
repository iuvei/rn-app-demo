import React from 'react'
import { Animated, Text, View, Easing } from 'react-native'

class FadeInView extends React.Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  }

  state = {
    fadeAnim: new Animated.Value(0)  // Initial value for opacity: 0
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.spring(
      this.animatedValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        tension: 2
      }).start(() => this.animate()
    )
  }

  render() {
    let {fadeAnim} = this.state

    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0]
    })

    return (
      <View>
        <Animated.View                 // Special animatable View
          style={{
            ...this.props.style,
            opacity: fadeAnim         // Bind opacity to animated value
          }}
        >
          {this.props.children}
        </Animated.View>

        <Animated.View
          style={{
            marginLeft: 10,
            marginTop: movingMargin,
            height: 30,
            width: 40,
            backgroundColor: 'orange'
          }}/>
      </View>
    )
  }
}

// You can then use your `FadeInView` in place of a `View` in your components:
class AnimationScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
            Fading In
          </Text>
        </FadeInView>
      </View>
    )
  }
}

export default AnimationScreen
