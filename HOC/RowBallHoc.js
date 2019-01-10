import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (Comp) => {
  class RowBallHoc extends Component {
    constructor(props) {
      super(props)
      this.state = {
        tools: [
          {code: 'full', name: '全'},
          {code: 'big', name: '大'},
          {code: 'small', name: '小'},
          {code: 'single', name: '单'},
          {code: 'double', name: '双'},
          {code: 'empty', name: '清'}
        ],
        RowData: [
          {
            title: '万位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '千位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '百位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '十位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '个位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '万位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '千位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '百位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '十位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          },
          {
            title: '个位',
            data: [
              {text: 0}, {text: 1}, {text: 2}, {text: 3}, {text: 4},
              {text: 5}, {text: 6}, {text: 7}, {text: 8}, {text: 9}
            ]
          }
        ]
      }
    }

    render() {
      return (
        <Comp
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = (state) => {
    return ({
      ...state.classic
    })
  }

  return connect(mapStateToProps)(RowBallHoc)
}
