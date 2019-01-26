import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button } from '@ant-design/react-native'
import { stylesUtil } from '../../../utils/ScreenUtil'

class ModeComponent extends React.PureComponent {
  render() {
    let {modeItem, setBuyInfo, model} = this.props
    return (
      <Button
        key={modeItem.money}
        type={modeItem.money === model ? 'primary' : 'ghost'}
        onPress={() => setBuyInfo({model: modeItem.money})}
        size="small" style={styles.ModeButton}>
        <Text style={styles.ModeText}>
          {modeItem.name}
        </Text>
      </Button>
    )
  }
}

export default ModeComponent

const styles = StyleSheet.create(stylesUtil({
  ModeButton: {
    width: 28, height: 28,
    borderRadius: 4, marginLeft: 0, marginRight: 2
  },
  ModeText: {fontSize: 12}
}))
