import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/TransactionNotificationStyle'

class TransactionNotification extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      type: this.props.typeNotification
    }
  }

  transaksi () {
    NavigationActions.backtab({
      type: ActionConst.RESET
    })
    NavigationActions.transaction()
  }

  renderNotification () {
    const { type } = this.state
    if (type === 'complain') {
      return (
        <View style={styles.container}>
          <Image source={Images.complain} style={styles.image} />
          <Text style={styles.textTitle}>
            Komplain Telah Terkirim
          </Text>
          <Text style={styles.textIsi}>
            Kami memohon maaf atas ketidaknyamanan
            yang Anda alami. Komplain Anda telah kami
            terima. Untuk melihat perkembangan
            komplain Anda. Anda bisa melihat
            di menu Notifikasi - Pusat Resolusi
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.transaksi()}>
              <Text style={styles.textButton}>
                Kembali ke Halaman Transaksi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Image source={Images.review} style={styles.image} />
        <Text style={styles.textTitle}>
          Review Berhasil Dikirim
        </Text>
        <Text style={styles.textIsi}>
          Terima kasih telah mengirim review. Review
          Anda sangat berharga bagi kami untuk
          meningkatkan layanan.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.transaksi()}>
            <Text style={styles.textButton}>
              Kembali Ke Halaman Transaksi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    return (
        this.renderNotification()
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionNotification)
