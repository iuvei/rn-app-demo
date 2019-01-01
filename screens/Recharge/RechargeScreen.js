import React from 'react'
import {ScrollView, StyleSheet, View, Text} from 'react-native'
import { Accordion, Drawer, Provider, DatePicker, List, Picker, Button, WhiteSpace, Tabs } from '@ant-design/react-native';
import {getRechargeChannels} from '../../api/member'
import {isObject} from 'lodash'
const data = require('./data.json')
import {MyIconFont} from '../../components/MyIconFont'

export default class RechargeScreen extends React.Component {
  static navigationOptions = {
    title: 'Recharge',
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      activeSections: [0],
      recharge: {},
      channelRealObj: {},
    };
    this.onOpenChange = isOpen => {
      /* tslint:disable: no-console */
      console.log('是否打开了 Drawer', isOpen.toString());
    };
    this.onAccordionChange = activeSections => {
      this.setState({ activeSections });
    };
    getRechargeChannels().then(res => {
      console.log('recharge res', res)
      if (res.code === 0) {
        let recharge = res.data.recharge
        // 人民币渠道集合
        let channelRealObj = {}
        Object.keys(recharge).forEach((keyTitle) => {
          if (keyTitle !== 'virtual') {
            Object.keys(recharge[keyTitle]).forEach((infomap) => {
              if (isObject(recharge[keyTitle][infomap])) {
                let channelReal = ''
                for (channelReal in recharge[keyTitle][infomap]) {
                  if (recharge[keyTitle][infomap].hasOwnProperty(channelReal)) {
                    channelRealObj[channelReal] = recharge[keyTitle][infomap][channelReal]
                  }
                }
              }
            })
          }
        })
        this.setState({
          channelRealObj: Object.assign({}, channelRealObj),
          recharge: Object.assign({}, recharge)
        })
      }
    })
  }

  onChange = value => {
    this.setState({ value });
  };

  _renderSectionTitle = section => {
    return <Text>111</Text>
  }

  _renderHeader = section => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    console.log('section', section)
    return (
      <View>
        <List>
          {
            section.content.map((item, index) => {
              return <List.Item
                multipleLine
                thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                key={item.payChannelAlias + index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50
                  }}
                >
                  <Text>Categories - {index}</Text>
                  <Text>{item.bankCode}</Text>
                  <MyIconFont name="zhongxinyinhang" size={50} color="green"/>
                </View>
              </List.Item>
            })
          }
        </List>
      </View>
    );
  };

  render() {
    let {channelRealObj} = this.state
    const sidebar = (
      <ScrollView style={[styles.container]}>
        {
          <Accordion
            onChange={this.onAccordionChange}
            activeSections={this.state.activeSections}
            sections={
              Object.keys(channelRealObj || {}).map((key) => {
                return {title: key, content: channelRealObj[key]}
              })
            }
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          >
          </Accordion>
        }
      </ScrollView>
    );
    const tabs = [
      { title: '人民币支付' },
      { title: '币宝数字货币支付' }
    ];
    const style = {
      paddingVertical: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd',
      flex: 1
    };
    return (
      <View style={styles.container}>
        <Drawer
          sidebar={sidebar}
          position="right"
          open={false}
          drawerRef={el => (this.drawer = el)}
          onOpenChange={this.onOpenChange}
          drawerBackgroundColor="#ccc"
        >
          <View style={{ flex: 1 }}>
            <Tabs tabs={tabs}>
              <View style={style}>
                <Button onPress={() => this.drawer && this.drawer.openDrawer()}>
                  Open drawer
                </Button>
                <WhiteSpace />
              </View>
            </Tabs>
          </View>
        </Drawer>
        {/* <Provider>
          <List>
            <Picker
              data={data}
              cols={3}
              value={this.state.value}
              onChange={this.onChange}
            >
              <List.Item arrow="horizontal" onPress={this.onPress}>
                省市选择
              </List.Item>
            </Picker>
          </List>
        </Provider> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  icon: {
		color: '#000000',
		fontFamily: 'common-font',
		fontSize: 16,
	},
})

