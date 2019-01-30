import React from 'react'
import {SegmentedControl, InputItem, Flex, Button, Toast, List} from '@ant-design/react-native'
import {getUserContract} from '../api/member'

class Contract extends React.Component {
  state = {
    selectedId: 0,
    contractList: [],
    signed: false,
    contract: {}
  }

  async componentDidMount () {
    let {subUserInfo} = this.props
    let res = await getUserContract({
      userId: subUserInfo.userId,
      type: 1
    })
    if (res.data && res.data.length > 0) {
      res.data.forEach(item => {
        let obj = {
          id: item.id,
          status: item.status,
          strategy: item.strategy,
          contract: JSON.parse(item.contractContent)
        }
        this.state.contractList.push(obj)
      })
    }
  }

  renderSigned = () => {
    let {signed, contract} = this.state
    return (
      <View>
        <List>
          <InputItem
            value={contract.money}
            placeholder="满足天数"
            onChange={value => {
              this.setState({
                chargeData: {
                  ...contract,
                  money: value
                }
              })
            }}>
            满足天数
          </InputItem>
        </List>
      </View>
    )
  }
  
  componentWillUnmount(){
    this.setState = () => () => {}
  }

  render () {
    let {subUserInfo} = this.props
    return (
      <SegmentedControl selectedIndex={this.state.selectedId} values={['已签', '新增']}
                        style={{}} onChange={e => {
        this.setState({selectedId: e.nativeEvent.selectedSegmentIndex})
      }}/>
    )
  }
}

export default Contract
