import React from 'react';
import { createIconSet } from '@expo/vector-icons';
const glyphMap = { zhongxinyinhang: 58882 };
const CustomIcon = createIconSet(glyphMap, 'MyIconFont');

export class MyIconFont extends React.Component {
  // name size color
  render() {
    return <CustomIcon {...this.props} />;
  }
}
