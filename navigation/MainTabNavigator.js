import React from 'react'
import {Platform, Image} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

// import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/Home/HomeScreen'
import GameScreen from '../screens/Games/GamesScreen'
import RechargeScreen from '../screens/Recharge/RechargeScreen'
import FoundScreen from '../screens/Found/FoundScreen'
import PersonalScreen from '../screens/Personal/PersonalScreen'
// import SvgIcon from '../components/SvgIcon'
// import Colors from '../constants/Colors'

// 首页
const HomeStack = createStackNavigator({
  Home: HomeScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({focused}) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === 'ios' ? "ios-home" : "md-home"}
    // />
    focused ? <Image source={require('../assets/images/footericon/home_selected.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/> :
    <Image source={require('../assets/images/footericon/home_normal.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/>
  )
}

// 彩厅
const GamesStack = createStackNavigator({
  Links: GameScreen
})
GamesStack.navigationOptions = {
  tabBarLabel: '彩厅', // games_room
  tabBarIcon: ({focused}) => (
    // <TabBarIcon
    //   focused={focused}
    //   name="ios-arrow-dropdown"
    // />
    // <SvgIcon icon={focused ? 'game' : 'games_room'} size={26} color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>
    focused ? <Image source={require('../assets/images/footericon/game_selected.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/> :
      <Image source={require('../assets/images/footericon/game_normal_origin.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/>
  )
}

// 充值
const RechargeStack = createStackNavigator({
  Recharge: RechargeScreen
})
RechargeStack.navigationOptions = {
  tabBarLabel: '充值',
  tabBarIcon: ({focused}) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === 'ios' ? "logo-yen" : "logo-yen"}
    // />
    focused ? <Image source={require('../assets/images/footericon/recharge_select.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/> :
    <Image source={require('../assets/images/footericon/recharge_normal_origin.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/>
  )
}

// 发现
const FoundStack = createStackNavigator({
  Found: FoundScreen
})
FoundStack.navigationOptions = {
  tabBarLabel: '发现',
  tabBarIcon: ({focused}) => (
    // <TabBarIcon
    //   focused={focused}
    //   name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    // />
    // <SvgIcon icon={focused ? 'compass_focused' : 'compass'} size={26} color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>
    focused ? <Image source={require('../assets/images/footericon/Notice_Selected.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/> :
    <Image source={require('../assets/images/footericon/notice_normal_origin.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/>
  )
}

// 个人
const PersonalStack = createStackNavigator({
  Personal: PersonalScreen
})
PersonalStack.navigationOptions = {
  tabBarLabel: '个人中心',
  tabBarIcon: ({focused}) => (
    // <TabBarIcon
    //   focused={focused}
    //   tips={true}
    //   name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    // />
    focused ? <Image source={require('../assets/images/footericon/centre_selected.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/> :
    <Image source={require('../assets/images/footericon/centre_normal_origin.png')} style={{resizeMode: 'contain', width: 28, height: 28}}/>
  )
}

const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    GamesStack,
    RechargeStack,
    FoundStack,
    PersonalStack
  },
  {
    tabBarOptions: {
      labelStyle: {
        color: '#ffffff'
      },
      style: {
        backgroundColor: '#00b4cc'
      },
    }
  }
)

MainTabNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null
}

export default MainTabNavigator
