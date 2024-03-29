import React from 'react'
import {ScrollView, View, Text, ImageBackground, Image, StyleSheet, TouchableHighlight} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import { Toast } from '@ant-design/react-native';
import { getHotLotter } from './../../api/lottery'
import { connect } from "react-redux";
import { getLoHoIconName } from '../../utils/getLotImg'

class LotteryHall extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      activeSections: [],
      hotLoList: [],
      list: [
        {
          title: '热门彩种',
          categoryCode: 'hot',
          desc: '热门彩种 劲爆推荐',
          img: require('../../assets/images/hall/icon0.png'),
          bgImg: require('../../assets/images/hall/bg0.png'),
          suffix: []
        }, {
          title: '时时彩',
          categoryCode: 'ssc',
          desc: '时时开奖 彩种齐全',
          img: require('../../assets/images/hall/ssc.png'),
          bgImg: require('../../assets/images/hall/bg1.png'),
          suffix: []
        }, {
          title: '11选5',
          categoryCode: 'syx5',
          desc: '主流彩票 应有尽有',
          img: require('../../assets/images/hall/11x5.png'),
          bgImg: require('../../assets/images/hall/bg2.png'),
          suffix: []
        }, {
          title: 'PK拾',
          categoryCode: 'pk10',
          desc: '刺激竞速 快速开奖',
          img: require('../../assets/images/hall/pk10.png'),
          bgImg: require('../../assets/images/hall/bg3.png'),
          suffix: []
        }, {
          title: '快3',
          categoryCode: 'k3',
          desc: '彩种多样 幸运赚不停',
          img: require('../../assets/images/hall/k3.png'),
          bgImg: require('../../assets/images/hall/bg1.png'),
          suffix: []
        }, {
          title: '基诺',
          categoryCode: 'kl8',
          desc: '中奖易 趣味多',
          img: require('../../assets/images/hall/jn.png'),
          bgImg: require('../../assets/images/hall/bg2.png'),
          suffix: []
        }, {
          title: '幸运彩',
          categoryCode: 'xyc',
          desc: '开奖频率高 赔率高',
          img: require('../../assets/images/hall/xyc.png'),
          bgImg: require('../../assets/images/hall/bg3.png'),
          suffix: []
        }, {
          title: '快乐十分',
          categoryCode: 'kl10',
          desc: '玩法简单 引人入胜',
          img: require('../../assets/images/hall/kl10.png'),
          bgImg: require('../../assets/images/hall/bg1.png'),
          suffix: []
        }, {
          title: '低频彩',
          categoryCode: 'dpc',
          desc: '彩种多样 幸运赚不停',
          img: require('../../assets/images/hall/dpc.png'),
          bgImg: require('../../assets/images/hall/bg2.png'),
          suffix: []
        }]
    };
  }

  componentDidMount() {
    this._initHotLottery()
  }

  componentWillUnmount(){
    this.setState = () => () => {}
  }

  _initHotLottery() {
    getHotLotter().then((res) => {
      if(res.code === 0) {
        this.setState({
          hotLoList: res.data
        })
      }
    })
  }

  _renderHeader = item => {
    return (
      <View>
        <ImageBackground source={item.bgImg}
                         style={styles.card}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
          <Image source={item.img} style={{width: 100, height: 100}}></Image>
        </ImageBackground>
      </View>
    )
  }

  _renderContent = item => {
    let { sysSortLottery } = this.props
    let data = sysSortLottery.filter(v => v.realCategory === item.categoryCode)
    let filterData = data.length ? [...data[0].originLot, ...data[0].gpLot] : []
    let list = item.categoryCode === 'hot' ? this.state.hotLoList : filterData
    return (
      list.length !== 0 ? (
        <View style={styles.suffix}>
          {
            list.map((list, j) => {
              return (
                <View key={j} style={{width: '25%', alignItems: 'center'}}>
                  <TouchableHighlight
                    underlayColor="#f0f0f0"
                    onPress={() => this._gotoBet(list)}>
                    <View>
                      <Image
                        source={getLoHoIconName(list)}
                        style={{width: 80, height: 80}}></Image>
                      <Text style={{fontSize: 10, textAlign: 'center'}} numberOfLines={1}>{list.lotterName}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )
            })
          }
        </View>
      ) : <Text>暂无游 戏</Text>
    )
  }

  _gotoBet = (list) => {
    if (list.status === 1) {
      Toast.fail('该彩种暂未开通，敬请期待')
    } else {
      this.props.navigation.navigate('Bet', list)
    }
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render () {
    let { list } = this.state
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#f5f5f9'}}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Accordion
          sections={list}
          underlayColor="#f0f0f0"
          sectionContainerStyle={{marginTop:10}}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 120,
    marginHorizontal: 10,
    borderRadius: 3,
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#f5f5f9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  suffix: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    padding: 8,
    marginHorizontal:10
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  desc: {
    fontSize: 14,
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  let { sysSortLottery } = state.common
  return ({
    sysSortLottery
  })
}

export default connect(
  mapStateToProps
)(LotteryHall)
