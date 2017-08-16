import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Switch from 'react-native-switch-pro'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PengaturanNotifikasiScreenStyle'
import { Colors, Images } from '../Themes/'

class NotificationSetting extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      notif: false
    }
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Sukses memperbarui pengaturan notifikasi</Text>
          <TouchableOpacity onPress={() => this.setState({notif: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.notif()}
        <View style={styles.header}>
          <Text style={styles.textHeader}>Pilih Notifikasi yang ingin dikirimkan ke akun Anda</Text>
        </View>
        <View style={styles.containerMain}>
          <View style={[styles.menu, {height: 88}]}>
            <Text style={[styles.textMenu, {lineHeight: 23}]}>Setiap pesan pribadi dari admin{'\n'}saya terima</Text>
            <Switch width={34} height={16} circleColor={Colors.teal} backgroundActive={'rgba(0, 148, 133, 0.5)'} />
          </View>
          <View style={[styles.menu, {height: 62}]}>
            <Text style={styles.textMenu}>Setiap Pesan Berita dari Komuto.</Text>
            <Switch width={34} height={16} circleColor={Colors.teal} backgroundActive={'rgba(0, 148, 133, 0.5)'} />
          </View>
          <View style={[styles.menu, {height: 62}]}>
            <Text style={styles.textMenu}>Setiap Review dan komentar saya terima.</Text>
            <Switch width={34} height={16} circleColor={Colors.teal} backgroundActive={'rgba(0, 148, 133, 0.5)'} />
          </View>
          <View style={[styles.menu, {height: 86}]}>
            <Text style={[styles.textMenu, {lineHeight: 23}]}>Setiap Diskusi produk dan komentar saya {'\n'}terima.</Text>
            <Switch width={34} height={16} circleColor={Colors.teal} backgroundActive={'rgba(0, 148, 133, 0.5)'} />
          </View>
          <View style={[styles.menu, {height: 64}]}>
            <Text style={styles.textMenu}>Setiap Pesan Pribadi saya terima.</Text>
            <Switch width={34} height={16} circleColor={Colors.teal} backgroundActive={'rgba(0, 148, 133, 0.5)'} />
          </View>
        </View>
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.setState({notif: true})}>
          <Text style={styles.textButtonNext}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSetting)
