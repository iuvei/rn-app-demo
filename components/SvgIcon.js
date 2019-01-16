import React, { Component } from 'react'
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
    } = this.props
    let svgXmlData = svgs[icon]

    if (!svgXmlData) {
      let err_msg = `没有"${this.props.icon}"这个icon`
      throw new Error(err_msg)
    }
    return (
      <SvgUri
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={color}
        style={style}
      />
    )
  }
}