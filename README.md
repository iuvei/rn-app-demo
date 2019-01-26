
## android 打包，echarts图表不显示问题
```
修改\node_modules\native-echarts\src\components\Echarts\index.js
WebView的source资源引入方式
** source={require('./tpl.html')} **
改成
** source={{uri:'线上资源'}} **
```

**https://www.iosanzhuangbao.com/ios_download/tianxiang/tianxiangh5.qmuitest.com/tpl.html**
