import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranBerhasilStyle'

class PaymentSuccess extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  transaksi () {
    NavigationActions.backtab({
      type: ActionConst.RESET
    })
    NavigationActions.transaction()
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.pembayaran} style={styles.image} />
        <Text style={styles.textTitle}>
          Pembayaran Telah Berhasil
        </Text>
        <Text style={styles.textIsi}>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess)
