import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as saldoAction from '../actions/saldo'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranBerhasilStyle'

class PaymentSuccess extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      from: this.props.from
    }
  }

  transaksi () {
    if (this.state.from === 'payment') {
      NavigationActions.backtab({
        type: ActionConst.RESET
      })
      NavigationActions.transaction()
    } else {
      this.props.getStatusTopUp()
      NavigationActions.balancestatusrefill({
        type: ActionConst.REPLACE
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.pembayaran} style={styles.image} />
        <Text style={styles.textTitle}>
          Pembayaran Telah Berhasil
        </Text>
        <Text style={styles.textIsi}>
          Terima kasih Anda telah melakukan pembayaran. Pesanan Anda akan segera diproses oleh penjual.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.transaksi()}>
            <Text style={styles.textButton}>
              Lihat Daftar Transaksi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusTopUp: () => dispatch(saldoAction.getTopupStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)
