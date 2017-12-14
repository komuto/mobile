import React from 'react'
import { Text, Image, View, TextInput, TouchableOpacity, BackAndroid, ActivityIndicator, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as userAction from '../actions/user'

// Styles
import styles from './Styles/NomerHandphoneScreenStyle'
import {Images, Colors} from '../Themes/'

class Cellphone extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      status: '',
      statusVerifikasi: this.props.statusVerifikasi,
      nomerHape: this.props.nomerHape,
      gantiNoHape: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataUser.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.otpcode({
        type: ActionConst.PUSH,
        title: 'Verifikasi Nomer Telepon',
        fieldPass: this.state.nomerHape,
        typeVerifikasi: 'verifikasiKelolatelepon'
      })
      nextProps.dataUser.status = 0
    } else if (nextProps.dataUser.status > 200) {
      this.setState({
        loading: true
      })
      nextProps.dataUser.status = 0
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.popTo('accountmanage')
    return true
  }

  handlenomerHape = (text) => {
    this.setState({ nomerHape: text })
  }

  updatePhone () {
  }

  verifikasiKelola () {
    const { nomerHape } = this.state
    if (nomerHape.length > 8) {
      this.props.updateNomerHape(this.state.nomerHape)
      this.props.sentOTP()
      this.setState({
        loading: true
      })
    } else {
      ToastAndroid.show('Nomor ponsel belum benar', ToastAndroid.SHORT)
    }
  }

  renderTanpaNoHape () {
    return (
      <View>
        <View style={styles.infoContainer}>
          <TextInput
            ref='name'
            style={styles.inputText}
            value={this.state.nomerHape}
            keyboardType='numeric'
            maxLength={12}
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handlenomerHape}
            underlineColorAndroid='transparent'
            placeholder='Masukkan nomor handphone'
          />
        </View>
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.verifikasiKelola()}>
          <Text style={styles.textButtonNext}>
            Simpan Nomor Handphone
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderVerifikasi () {
    if (this.state.statusVerifikasi) {
      this.textStatus = 'telah'
      this.image = Images.hpVerify
    } else {
      this.textStatus = 'belum'
      this.image = Images.noHpNotVerify
    }
    return (
      <View style={{alignItems: 'center'}}>
        <Image source={this.image} style={{height: 172, width: 172}} />
        <View style={[styles.infoContainer]}>
          <Text style={styles.textLabelDark}>Nomor Handphone Anda {this.textStatus} terverifikasi</Text>
          <Text style={styles.textNomerHape}>{this.state.nomerHape}</Text>
        </View>
        {this.buttonVerifikasi()}
        <TouchableOpacity onPress={() => this.setState({gantiNoHape: true})}>
          <Text style={styles.textLabelBlue}>Ubah Nomor Handphone</Text>
        </TouchableOpacity>
      </View>
    )
  }

  buttonVerifikasi () {
    if (this.state.statusVerifikasi) {
      return (
        <View />
      )
    }
    return (
      <TouchableOpacity style={[styles.buttonnext, {marginLeft: 40, marginRight: 40}]} onPress={() => this.verifikasiKelola()}>
        <Text style={[styles.textButtonNext, {paddingHorizontal: 75}]}>
          Verifikasi Sekarang
        </Text>
      </TouchableOpacity>
    )
  }

  renderAll () {
    if (this.state.gantiNoHape || this.state.nomerHape === null) {
      return (
        <View>
          {this.renderTanpaNoHape()}
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          {this.renderVerifikasi()}
        </View>
      )
    }
  }

  renderHeader () {
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => this.handleBack()}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Nomor Handphone
        </Text>
      </View>
    )
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color={Colors.red} size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderAll()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataUser: state.updatePhone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNomerHape: (nomerHape) => dispatch(userAction.updatePhone({phone_number: nomerHape})),
    sentOTP: () => dispatch(userAction.sendOTPPhone()),
    getProfile: (login) => dispatch(userAction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cellphone)
