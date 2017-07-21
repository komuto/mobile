import React from 'react'
import { ScrollView, Text, View, TextInput, Image, Modal, ListView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as bankAction from '../actions/bank'
import * as accountAction from '../actions/user'

// Styles
import styles from './Styles/TambahDataRekeningScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

import { Colors, Images } from '../Themes/'

class TambahDataRekeningScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      pemilikAkun: '',
      nomerRekening: '',
      cabangBank: '',
      email: this.props.email,
      colorPemilik: Colors.snow,
      colorNomerRek: Colors.snow,
      colorNamaBank: Colors.snow,
      colorCabangBank: Colors.snow,
      colorPickerNamaBank: Colors.labelgrey,
      loading: false,
      namaBankTerpilih: 'Nama Bank',
      idnamaBankTerpilih: 0,
      listNamaBanks: [],
      modalNamaBank: false,
      tambahBank: [
        {
          'id': 0,
          'name': 'Pilih Bank'
        }
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataList.status === true) {
      this.setState({
        listNamaBanks: this.state.tambahBank.concat(nextProps.dataList.banks)
      })
    }
    if (nextProps.codeOtp.state === 200) {
      console.log(nextProps.codeOtp)
      this.setState({
        loading: false
      })
      NavigationActions.otpcode({
        type: ActionConst.PUSH,
        typeVerifikasi: 'otptambahrekening',
        fieldPass: this.state.email,
        email: this.state.email,
        name: this.state.pemilikAkun,
        nomerRek: this.state.nomerRekening,
        idBank: this.state.idnamaBankTerpilih,
        cabangBank: this.state.cabangBank
      })
    }
  }

  handleChangePemilikAkun = (text) => {
    this.setState({ pemilikAkun: text })
  }

  handleChangeNoRek = (text) => {
    this.setState({ nomerRekening: text })
  }

  handleChangeNamaBank = (text) => {
    this.setState({ namaBankTerpilih: text })
  }

  handleChangeCabangBank = (text) => {
    this.setState({ cabangBank: text })
  }

  onError = (field) => {
    console.tron.log('field', field)
    switch (field) {
      case 'pemilikAkun':
        this.setState({
          colorPemilik: Colors.red
        })
        break
      case 'norek':
        this.setState({
          colorNomerRek: Colors.red
        })
        break
      case 'namabank':
        this.setState({
          colorNamaBank: Colors.red
        })
        break
      case 'cabanagbank':
        this.setState({
          colorCabangBank: Colors.red
        })
        break
      case 'empty':
        this.setState({
          colorPemilik: Colors.red,
          colorNomerRek: Colors.red,
          colorNamaBank: Colors.red,
          colorCabangBank: Colors.red
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'pemilikAkun':
        this.setState({
          colorPemilik: Colors.snow
        })
        break
      case 'norek':
        this.setState({
          colorNomerRek: Colors.snow
        })
        break
      case 'namabank':
        this.setState({
          colorNamaBank: Colors.snow
        })
        break
      case 'cabanagbank':
        this.setState({
          colorCabangBank: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          colorPemilik: Colors.snow,
          colorNomerRek: Colors.snow,
          colorNamaBank: Colors.snow,
          colorCabangBank: Colors.snow
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'pemilikAkun':
        this.setState({
          colorPemilik: Colors.snow
        })
        break
      case 'norek':
        this.setState({
          colorNomerRek: Colors.snow
        })
        break
      case 'namabank':
        this.setState({
          colorNamaBank: Colors.snow
        })
        break
      case 'cabanagbank':
        this.setState({
          colorCabangBank: Colors.snow
        })
        break
      default:
        this.setState({
          colorPemilik: Colors.snow,
          colorNomerRek: Colors.snow,
          colorNamaBank: Colors.snow,
          colorCabangBank: Colors.snow
        })
        break
    }
  }

  tambahRek () {
    const {pemilikAkun, nomerRekening, namaBankTerpilih, cabangBank} = this.state
    if (pemilikAkun === '' && nomerRekening === '' && namaBankTerpilih === '' && cabangBank === '') {
      this.onError('empty')
    } if (pemilikAkun === '') {
      this.onError('pemilikAkun')
    } if (nomerRekening === '') {
      this.onError('norek')
    } if (namaBankTerpilih === '') {
      this.onError('namabank')
    } if (cabangBank === '') {
      this.onError('cabanagbank')
    } else {
      this.setState({loading: true})
      this.props.sendOtp()
      // this.props.createBank(47988, idnamaBankTerpilih, pemilikAkun, nomerRekening, cabangBank)
    }
  }

  renderListNamaBank (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            namaBankTerpilih: rowData.name,
            colorPickerNamaBank: Colors.lightblack,
            idnamaBankTerpilih: rowData.id,
            modalNamaBank: false
          })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderModalKelurahan () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalNamaBank}
        onRequestClose={() => this.setState({ modalNamaBank: false })}
        >
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={1} style={[styles.bgModal, {flex: 1}]} onPress={() => this.setState({modalNamaBank: false})} />
          <ScrollView>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.listNamaBanks)}
              renderRow={this.renderListNamaBank.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </View>
      </Modal>
    )
  }

  render () {
    const {colorPemilik, colorNomerRek, colorNamaBank, colorCabangBank, colorPickerNamaBank} = this.state
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.infoContainer}>
            <TextInput
              ref='pemilikakun'
              style={styles.inputText}
              value={this.state.pemilikAkun}
              keyboardType='email-address'
              returnKeyType='next'
              onFocus={() => this.onFocus('pemilikAkun')}
              onBlur={() => this.onBlur('pemilikAkun')}
              onSubmitEditing={() => this.refs.norek.focus()}
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangePemilikAkun}
              underlineColorAndroid='transparent'
              placeholder='Pemilik Akun'
            />
            <Text style={[styles.textLabel, {color: colorPemilik}]}>Pemilik Akun harus diisi</Text>
            <TextInput
              ref='norek'
              style={styles.inputText}
              value={this.state.nomerRekening}
              keyboardType='numeric'
              returnKeyType='done'
              onFocus={() => this.onFocus('namabank')}
              onBlur={() => this.onBlur('namabank')}
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangeNoRek}
              underlineColorAndroid='transparent'
              placeholder='Nomer Rekening'
            />
            <Text style={[styles.textLabel, {color: colorNomerRek}]}>Nomor Rekening harus diisi</Text>
            <View style={[styles.lokasiSeparator]}>
              <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalNamaBank: true })}>
                <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerNamaBank}]}>{this.state.namaBankTerpilih}</Text>
                <Image source={Images.down} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.textLabel, {color: colorNamaBank}]}>Nama Bank harus diisi</Text>
            <TextInput
              ref='cabanagbank'
              style={styles.inputText}
              value={this.state.cabangBank}
              keyboardType='default'
              returnKeyType='done'
              onFocus={() => this.onFocus('cabanagbank')}
              onBlur={() => this.onBlur('cabanagbank')}
              onSubmitEditing={() => this.refs.slogan.focus()}
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangeCabangBank}
              underlineColorAndroid='transparent'
              placeholder='Cabang Bank'
            />
            <Text style={[styles.textLabel, {color: colorCabangBank}]}>Cabang Bank harus diisi</Text>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.tambahRek()}>
              <Text style={styles.textButtonNext}>
                Simpan Perubahan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.renderModalKelurahan()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.banks,
    codeOtp: state.sendOTPBank
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListBank: dispatch(bankAction.listBank()),
    sendOtp: () => dispatch(accountAction.sendOTPBank())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TambahDataRekeningScreenScreen)
