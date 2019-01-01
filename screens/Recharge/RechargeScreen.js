import React from 'react'
import { connect } from 'react-redux';
import {ScrollView, StyleSheet, View, Text} from 'react-native'
import { Accordion, Drawer, Provider, DatePicker, List, Picker, Button, WhiteSpace, Tabs, Radio } from '@ant-design/react-native';
import {getRechargeChannels} from '../../api/member'
import {isObject} from 'lodash'
const data = require('./data.json')
import {MyIconFont} from '../../components/MyIconFont'
import {RechargeChannelIconMap} from '../../constants/glyphMapHex'
import {setActiveAccount} from '../../actions/common'

const RadioItem = Radio.RadioItem;

class RechargeScreen extends React.Component {
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
      activeAccount: {}
    };
    this.onOpenChange = isOpen => {
      /* tslint:disable: no-console */
      console.log('是否打开了 Drawer', isOpen.toString());
    };
    this.onAccordionChange = activeSections => {
      this.setState({ activeSections });
    };
    getRechargeChannels().then(res => {
      if (res.code === 0) {
        let recharge = res.data.recharge
        console.log('recharge', recharge)
        // 人民币渠道集合
        let channelRealObj = {}
        Object.keys(recharge).forEach((keyTitle) => {
          if (keyTitle !== 'virtual') {
            Object.keys(recharge[keyTitle]).forEach((infomap) => {
              if (isObject(recharge[keyTitle][infomap])) {
                let channelReal = ''
                for (channelReal in recharge[keyTitle][infomap]) {
                  if (recharge[keyTitle][infomap].hasOwnProperty(channelReal)) {
                    for (let i = 0; i < recharge[keyTitle][infomap][channelReal].length; i++) {
                      if (Object.keys(this.props.activeAccount).length === 0 && i === 0) {
                        this.props.setActiveAccount(recharge[keyTitle][infomap][channelReal][i]);
                      }
                      recharge[keyTitle][infomap][channelReal][i]['local_id'] =  channelReal + '_' + i + '_' + new Date().getTime()
                    }
                    channelRealObj[channelReal] = recharge[keyTitle][infomap][channelReal]
                  }
                }
              }
            })
          }
        })
        console.log('channelRealObj', channelRealObj)
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
    return <Text></Text>
  }

  _renderHeader = section => {
    return (
      <View style={{height: 24, paddingLeft: 20}}>
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
              return <RadioItem
                multipleLine
                name="rechargeChannels"
                checked={this.props.activeAccount.local_id === item.local_id}
                key={item.payChannelAlias + index}
                onChange={event => {
                  if (event.target.checked) {
                    this.props.setActiveAccount(item);
                  }
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 30,
                    paddingLeft: 50
                  }}
                >
                  <MyIconFont name={'icon_'+RechargeChannelIconMap[item.bankCode]} size={30}/>
                </View>
              </RadioItem>
            })
          }
        </List>
      </View>
    );
  };

  render() {
    let {channelRealObj} = this.state
    let {activeAccount} = this.props
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
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ddd',
      flexDirection: 'row',
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
                <List style={{width: '100%'}}>
                  <List.Item arrow="horizontal" onPress={() => this.drawer && this.drawer.openDrawer()}>
                    {activeAccount.bankCode ? <MyIconFont name={'icon_'+RechargeChannelIconMap[activeAccount.bankCode]} size={30}/> : null}
                  </List.Item>
                </List>
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

const mapStateToProps = (state, props) => {
  let {activeAccount} = state.member
  return {activeAccount}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveAccount: (data) => {
      dispatch(setActiveAccount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeScreen);

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

