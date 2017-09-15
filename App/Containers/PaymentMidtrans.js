import React from 'react'
import { WebView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Metrics } from '../Themes'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

class PaymentMidtrans extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token,
      from: this.props.from
    }
  }

  onNavigationStateChange (webViewState) {
    const address = String(webViewState.url)
    console.log(address)
    if (address.includes('success')) {
      if (this.state.from === 'payment') {
        NavigationActions.paymentsuccess({
          type: ActionConst.REPLACE,
          from: 'payment'
        })
      } else {
        NavigationActions.paymentsuccess({
          type: ActionConst.REPLACE,
          from: 'balance'
        })
      }
    } else if (address.includes('error')) {
      ToastAndroid.show('Terjadi Kesalahan.. Pembayaran Error', ToastAndroid.LONG)
      NavigationActions.pop()
      return true
    } else if (address.includes('close')) {
      ToastAndroid.show('Terjadi Kesalahan.. Pembayaran Dibatalkan', ToastAndroid.LONG)
      NavigationActions.pop()
      return true
    }
  }

  render () {
    return (
      <WebView
        source={{ uri: 'https://komuto.skyshi.com/payment-mobile?token=' + this.state.token }}
        style={{ width: Metrics.screenWidth, height: Metrics.screenHeight }}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMidtrans)
