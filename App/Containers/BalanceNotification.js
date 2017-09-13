import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { Images } from '../Themes'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceNotificationStyle'

class BalanceNotification extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  renderNotifikasi () {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image source={Images.saldoNotification} style={styles.imagestyle} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Penarikan Saldo Telah Berhasil
          </Text>
        </View>
        <View style={styles.welcome2Container}>
          <Text style={styles.welcome2Text}>
            Kami telah mengirimkan saldo Anda ke
            rekening yang telah Anda pilih. Lihat History
            Saldo untuk mengetahui detailnya
          </Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.backToBalance()}
          >
            <Text style={styles.textButtonLogin}>
              Lihat Riwayat Saldo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  backToBalance () {
    NavigationActions.balance({
      type: ActionConst.POP_TO
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderNotifikasi()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceNotification)
