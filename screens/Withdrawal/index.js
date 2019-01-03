import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'
import { Button } from '@ant-design/react-native'

class Withdrawal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <Button type="primary">primary</Button>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);

const styles = StyleSheet.create({
})

