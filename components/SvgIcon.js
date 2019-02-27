import React, { Component } from 'react'
import {
  Text
} from 'react-native'
import SvgUri from 'react-native-svg-uri'
import svgs from './svgs'

// <SvgIcon icon={'home'} size="20" />
export default class SvgIcon extends Component {
  render() {
    const {
      icon,
      color,
      size,
      style,
      width,
      height
    } = this.props
    let svgXmlData = svgs[icon]

    if (!svgXmlData) {
      let err_msg = `没有"${icon}"这个icon`
      return <Text>?{icon}?</Text>
      // throw new Error(err_msg)
    }
    return (
      <SvgUri
        width={size || width}
        height={size || height}
        svgXmlData={svgXmlData}
        fill={color}
        style={style}
      />
    )
  }
}