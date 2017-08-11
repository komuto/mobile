import React from 'react'
import { View, Text, TouchableOpacity, BackAndroid, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as katalogAction from '../actions/catalog'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/TokoDashboardScreenStyle'
import { Images } from '../Themes'

class KelolaTokoScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: '',
      nama: '',
      saldo: '0',
      status: '1',
      email: '',
      foto: 'default',
      statusVerifikasi: true
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  handleTerm () {
    NavigationActions.term({ type: ActionConst.PUSH })
  }

  handleKatalog () {
    this.props.getCatalog()
    NavigationActions.katalogtoko({ type: ActionConst.PUSH, loading: true })
  }

  handleAlamat () {
    this.props.getAlamatToko()
    NavigationActions.kelolaalamattoko({ type: ActionConst.PUSH, loading: true })
  }

  handleUpdateInfoToko () {
    NavigationActions.infotoko({
      type: ActionConst.PUSH,
      createStores: false,
      textButton: 'Simpan Perubahan',
      editAble: false
    })
  }

  handleUpdateExpeditionStore () {
    NavigationActions.kelolaekspedisitoko({
      type: ActionConst.PUSH
    })
  }

  menu (borderStyle, image, titleMenu, onPress) {
    return (
      <TouchableOpacity style={styles.profile} onPress={onPress}>
        <Image source={image} style={styles.imageCategory} />
        <View style={borderStyle}>
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {titleMenu}
            </Text>
          </View>
          <Image source={Images.rightArrow} style={styles.rightArrow} />
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.dataProfileContainer, {elevation: 0.5}]}>
          {this.menu(styles.borderContainer, Images.toko, 'Informasi Toko', () => this.handleUpdateInfoToko())}
          {this.menu(styles.borderContainer, Images.ekspedisiPengiriman, 'Ekspedisi Pengiriman', () => this.handleUpdateExpeditionStore())}
          {this.menu(styles.borderContainer, Images.katalogToko, 'Katalog', () => this.handleKatalog())}
          {this.menu(styles.borderContainer, Images.lokasi, 'Alamat Toko', () => this.handleAlamat())}
          {this.menu([styles.borderContainer, {borderBottomWidth: 0}], Images.term, 'Terms and Conditions', () => this.handleTerm())}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(katalogAction.getListCatalog()),
    getAlamatToko: () => dispatch(storeAction.getStoreAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KelolaTokoScreenScreen)
