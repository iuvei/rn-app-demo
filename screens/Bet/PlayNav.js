import React from 'react'
import {
  View, Text,
  StyleSheet, Image
} from 'react-native'
import {
  Tabs, Card, WhiteSpace,
  Button, WingBlank
} from '@ant-design/react-native'

class PlayNav extends React.Component {
  render() {
    let {playTabs, _onPlayTabs, actPlay} = this.props
    return (
      <View style={styles.playNav}>
        <Tabs
          style={{height: 10, padding: 0, margin: 0}}
          tabs={playTabs}
          initialPage={0}
          tabBarPosition="top"
          onTabClick={(tab, index) => _onPlayTabs(tab, index)}
          tabBarUnderlineStyle={{height: 0}}
          renderTab={(tab, index) => (
            <Button
              style={{padding: 0, margin: 0}}
              size="small"
              type={tab.value === actPlay.value ? 'primary' : 'ghost'}
              onPress={() => _onPlayTabs(tab, index)}>
              {tab.title}
            </Button>
          )}
        />
      </View>
    )
  }
}

export default PlayNav

const styles = StyleSheet.create({
  playNav: {
    height: 50
  }
})
