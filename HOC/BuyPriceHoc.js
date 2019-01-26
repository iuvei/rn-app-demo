import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { connect } from 'react-redux'

export default (Comp) => {
  class BuyPriceHoc extends Component {
    constructor(props) {
      super(props)
      this.state = {
        HocValue: 0,
        tools: [
          {code: 'full', name: '全'},
          {code: 'big', name: '大'},
          {code: 'small', name: '小'},
          {code: 'single', name: '单'},
          {code: 'double', name: '双'},
          {code: 'empty', name: '清'}
        ],
        ViewData: [
          {
            title: '万位',
            b: [1, 2, 23, 34, 45, 6, 7, 8, 9, 10],
            t: true,
            color: 'green'
          },
          {
            title: '千位',
            b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            t: true,
            color: 'orange'
          },
          {
            title: '百位',
            b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            t: true,
            color: 'blue'
          },
          {
            title: '十位',
            b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            t: true,
            color: 'gray'
          },
          {
            title: '个位',
            b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            t: true,
            color: 'pink'
          }
        ]
      }
    }

    componentDidMount() {
      // this.autoChangeValue()
    }

    autoChangeValue = () => {
      this.setState({
        HocValue: this.state.HocValue + 2
      })
    }

    setViewData = d => {
      this.setState({
        ViewData: d
      })
    }

    render() {
      return (
        <Comp
          setViewData={this.setViewData}
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  return connect()(BuyPriceHoc)
}
