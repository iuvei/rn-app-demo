import React from 'react';
import { createIconSet } from '@expo/vector-icons';
import {glyphMapHex} from '../constants/glyphMapHex'
const glyphMap = {};

// 十六进制转十进制
Object.keys(glyphMapHex).forEach(function(key) {
  glyphMap[key] = parseInt(glyphMapHex[key], 16)
})
const CustomIcon = createIconSet(glyphMap, 'MyIconFont');

export class MyIconFont extends React.Component {
  // name size color
  render() {
    return <CustomIcon {...this.props} />;
  }
}
