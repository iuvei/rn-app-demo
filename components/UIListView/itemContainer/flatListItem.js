import React, {PureComponent} from 'react'
import {StyleSheet, View, Alert, TouchableOpacity, Image, TouchableHighlight} from 'react-native'
import {Button, ListItem, Left, Right, Body, Thumbnail, Text, Icon} from 'native-base'
import styles from '../styles'

const logo = require('../img/default-portrait.png')

export default class Example extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let {item} = this.props
    let {orderId, ruleName} = item
    return (
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={logo} style={styles.thumb}/>
        </Left>
        <Body style={{borderBottomWidth: 0}}>
        <Text>RowID: {orderId}</Text>
        <Text note>Data: {ruleName}</Text>
        </Body>
        <Right style={{borderBottomWidth: 0}}>
          <View style={styles.rightBtnGroup}>
            <Button
              small
              transparent
              title="view"
              onPress={() => this.props.onPress('chat', item)}
              style={styles.rightBtn}
            >
              <Icon name="chatbubbles" style={styles.rightBtnIcon}/>
            </Button>
            <Button
              small
              transparent
              title="view"
              onPress={() => this.props.onPress('like', item)}
              style={styles.rightBtn}
            >
              <Icon name="heart" style={styles.rightBtnIcon}/>
            </Button>
            <Button
              small
              transparent
              title="view"
              onPress={() => this.props.onPress('share', item)}
              style={styles.rightBtn}
            >
              <Icon name="share" style={styles.rightBtnIcon}/>
            </Button>
          </View>
        </Right>
      </ListItem>
    )
  }
}
