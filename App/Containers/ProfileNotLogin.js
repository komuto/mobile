import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

class ProfilNotLogin extends React.Component {

  render () {
    return (
      <View />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilNotLogin)
