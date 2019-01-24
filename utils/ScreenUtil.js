/**
 * 屏幕工具类 以及一些常用的工具类封装
 * ui设计基准,iphone 6 2倍图
 * width:750px
 * height:1334px
 * @2x
 */

/**
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6
 */

import {
  PixelRatio,
  Dimensions,
  Platform, StyleSheet
} from 'react-native'

export let screenW = Dimensions.get('window').width
export let screenH = Dimensions.get('window').height
const fontScale = PixelRatio.getFontScale()
export let pixelRatio = PixelRatio.get()
//像素密度
export const DEFAULT_DENSITY = 2
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 375
const defaultHeight = 667
const w2 = defaultWidth / DEFAULT_DENSITY
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY

//缩放比例
const _scaleWidth = screenW / defaultWidth
const _scaleHeight = screenH / defaultHeight

// iPhoneX
const X_WIDTH = 375
const X_HEIGHT = 812

// iPhoneXR XsMax
const XR_WIDTH = 414
const XR_HEIGHT = 896

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleSize(size) {
  return size * _scaleWidth
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop, paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleHeight(size) {
  return size * _scaleHeight
}

/* 最初版本尺寸适配方案 也许你会更喜欢这个
export function scaleSize(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}*/

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px , allowFontScaling 是否根据设备文字缩放比例调整，默认不会
 * @returns {Number} 返回实际sp
 */
export function setSpText(size, allowFontScaling = false) {
  const scale = Math.min(_scaleWidth, _scaleHeight)
  const fontSize = allowFontScaling ? 1 : fontScale
  return size * scale / fontSize
}

// export function setSpText2(size) {
//   let scaleWidth = screenW / w2
//   let scaleHeight = screenH / h2
//   let scale = Math.min(scaleWidth, scaleHeight)
//   size = Math.round((size * scale + 0.5))
//
//   return size / DEFAULT_DENSITY * fontScale
// }

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
      (screenH === X_WIDTH && screenW === X_HEIGHT))
  )
}

//判断是否为iphoneXR或XsMAX
function isIphoneXR() {
  return (
    Platform.OS === 'ios' &&
    ((screenH === XR_HEIGHT && screenW === XR_WIDTH) ||
      (screenH === XR_WIDTH && screenW === XR_HEIGHT))
  )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle = {}) {
  if (isIphoneX() || isIphoneXR()) {
    return iphoneXStyle
  } else if (Platform.OS === 'ios') {
    return iosStyle
  } else {
    if (androidStyle) return androidStyle
    return iosStyle
  }
}

// 单个 Style
export const styleUtil = (StyleObj = {}) => {
  let WIDTH_NAME = ['width', 'paddingHorizontal', 'paddingLeft', 'paddingRight',
    'marginHorizontal', 'marginLeft', 'marginRight']
  let HEIGHT_NAME = ['height', 'paddingVertical', 'paddingTop', 'paddingBottom',
    'marginVertical', 'marginTop', 'marginBottom', 'lineHeight']

  // 是否为球 圆
  let circle = StyleObj.width === StyleObj.height && StyleObj.height > 0
  let circleRadius = StyleObj.borderRadius === StyleObj.width / 2
  Object.keys(StyleObj).forEach(styleItem => {
    if (typeof StyleObj[styleItem] === 'string') {
      return
    }
    if (WIDTH_NAME.includes(styleItem)) {
      StyleObj[styleItem] = scaleSize(StyleObj[styleItem])
    }
    if (HEIGHT_NAME.includes(styleItem)) {
      StyleObj[styleItem] = scaleHeight(StyleObj[styleItem])
    }

    if (['fontSize'].includes(styleItem)) {
      StyleObj[styleItem] = setSpText(StyleObj[styleItem])
    }
  })

  if (circle) {
    StyleObj['height'] = StyleObj['width']
    if (circleRadius) {
      StyleObj['borderRadius'] = StyleObj['width'] / 2
    }
  }

  return StyleObj
}

// 整个 StyleSheet
export const stylesUtil = (stylesObj = {}) => {
  Object.keys(stylesObj).forEach(stylesItem => {
    stylesObj[stylesItem] = styleUtil(stylesObj[stylesItem])
  })
  return stylesObj
}
