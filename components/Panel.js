import React, { PureComponent } from 'react'
import {StyleSheet,View,TouchableHighlight,Animated} from 'react-native';

class Panel extends PureComponent{
  constructor(props){
    super(props);

    this.state = {
      expanded: false,
      animation: new Animated.Value()
    };
  }

  toggle(){
    let initialValue= this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue= this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  _setMaxHeight(event){
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event){
    let height = event.nativeEvent.layout.height
    this.setState({
      minHeight: height,
      animation: new Animated.Value(height)
    });
  }

  render(){
    return (
      <Animated.View
        style={[styles.container, this.props.style, {height: this.state.animation}]}>
        <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
          <TouchableHighlight
            onPress={this.toggle.bind(this)}
            style={styles.header}
            underlayColor="#f1f1f1">
            {this.props.header}
          </TouchableHighlight>
        </View>
        <View onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   overflow: 'hidden'
  },
  header: {
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row'
  }
});

export default Panel;
