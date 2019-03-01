import React from 'react'
import { connect } from 'react-redux'
import { setActiveAccount } from '../../actions/common'
import {
  View,
  Text
} from 'react-native'
import {
  Accordion,
  Flex, WingBlank
} from '@ant-design/react-native'
import { Icon } from 'expo'
import BankItem from './BankItem'


class AccountsPanel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeSections: [0]
    }
  }

  componentWillReceiveProps(np) {
    if (np.curPage !== this.props.curPage) {
      this.setState({
        activeSections: [0]
      })
    }
  }

  onChange = activeSections => {
    let {tabs, curPage} = this.props
    this.setState({activeSections})
    if (activeSections.length > 0 && activeSections[0] >= 0) {
      this.props.setActiveAccount(tabs[curPage].arr[activeSections[0]].accounts[0])
    }
  }

  _renderSectionTitle = section => {
    return (
      <View style={{height: 0}}>
        <Text></Text>
      </View>
    )
  }

  _renderHeader = (section, index) => {
    return (
      <Flex
        style={{
          backgroundColor: '#fff',
          height: 40,
          borderBottomColor: '#f0f0f0',
          borderBottomWidth: 0.5,
          paddingHorizontal: 16
        }}>
        <View style={{flex: 1}}>
          <Text style={{lineHeight: 40, color: '#333', width: '50%'}}>{section.title}</Text>
        </View>
        <Text style={{width: 90, textAlign: 'right'}}>
          <Icon.Ionicons
            style={{textAlign: 'right'}}
            color={this.state.activeSections[0] === index ? '#666' : '#cacaca'}
            name={this.state.activeSections[0] === index ? 'ios-arrow-down' : 'ios-arrow-forward'}
            size={20}>
          </Icon.Ionicons>
        </Text>
      </Flex>
    )
  }

  _renderContent = (section, activeSections) => {
    if (section.index !== activeSections[0]) {  // 非当前点中的不渲染里面的数据
      return <View key={section.index}></View>
    }
    return <WingBlank style={{marginBottom: 5}}>
      <Flex wrap="wrap" justify="between">
        {
          section.accounts.map((account, idx) => {
            return <BankItem account={account} key={idx} />
          })
        }
      </Flex>
    </WingBlank>
  }

  render() {
    let { activeSections } = this.state
    let { tabs, curPage } = this.props

    return (
      <View>
        {
          tabs[curPage].arr.length > 0 &&
          <Accordion
            ref={ref => this.AccordionComp = ref}
            duration={50}
            activeSections={activeSections}
            sections={tabs[curPage].arr}
            onChange={this.onChange}
            renderHeader={this._renderHeader}
            renderSectionTitle={this._renderSectionTitle}
            renderContent={(section) => this._renderContent(section, activeSections)}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveAccount: (data) => {
      dispatch(setActiveAccount(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPanel)
