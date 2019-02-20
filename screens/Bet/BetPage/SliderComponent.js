import React, { PureComponent } from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import { stylesUtil } from '../../../utils/ScreenUtil'

class SliderComponent extends PureComponent {
  render() {
    let {
      rebateMode, lotterMinMode, curMaxMode,
      sliderMode, setBuyInfo
    } = this.props
    return (
      <View style={styles.bonusWarp}>
        <Text style={{color: '#333'}}>
          奖金调节
        </Text>
        <View style={styles.SliderView}>
          <Slider
            // disabled
            defaultValue={rebateMode}
            value={rebateMode}
            minimumValue={lotterMinMode}
            maximumValue={curMaxMode}
            step={2}
            disabled={curMaxMode === 1700 || curMaxMode === lotterMinMode}
            minimumTrackTintColor="#00bbcc"
            maximumTrackTintColor="#1e8fea"
            thumbTintColor="#00bbcc"
            onValueChange={rebateMode => setBuyInfo({rebateMode})}
          />
        </View>
        {/*num,multiple,model,rebateMode,total*/}
        <View style={styles.RebateView}>
          <Text style={styles.RebateText}>
            {rebateMode}/{sliderMode}
          </Text>
        </View>
      </View>
    )
  }
}

export default SliderComponent

const styles = StyleSheet.create(stylesUtil({
  bonusWarp: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  SliderView: {width: 200},
  RebateView: {width: 100},
  RebateText: {fontSize: 16}
}))
