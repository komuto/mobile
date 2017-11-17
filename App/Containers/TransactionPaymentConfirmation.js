import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
  Picker,
  BackAndroid,
  ToastAndroid
} from 'react-native'
import Spinner from '../Components/Spinner'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CameraModal from '../Components/CameraModal'
import { connect } from 'react-redux'
import * as storeAction from '../actions/stores'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
import moment from 'moment'
// Styles
import styles from './Styles/TransaksiKonfirmasiPembayaranStyle'

class TransactionPaymentConfirmation extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      nominal: this.props.totalPayment,
      tanggal: 'Pilih Tanggal',
      idBank: 1,
      labelBank: 'Pilih Bank',
      idBankPengirim: 0,
      labelBankPengirim: 'Pilih Bank',
      timestamp: '',
      rekening: '',
      bukti: null,
      image: '',
      bankSeller: this.props.dataBankKomuto.komutoAccounts,
      bank: [],
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      showModalCamera: false,
      loading: false,
      payloadImage: ''
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (NavigationActions.pop()) {
      return true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataBank.status === 200) {
      this.setState({
        bank: nextProps.dataBank.banks
      })
    } else if (nextProps.dataBank.status !== 200 && nextProps.dataBank.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataBank.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataPhoto.status === 200) {
      console.log(nextProps.dataPhoto.payload.images[0].name)
      this.setState({
        loading: false,
        payloadImage: nextProps.dataPhoto.payload.images[0].name
      })
    } else if (nextProps.dataPhoto.status !== 200 && nextProps.dataPhoto.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataPhoto.message, ToastAndroid.SHORT)
    }
  }

  renderNominalPembayaran () {
    const { nominal } = this.state
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>Nominal Pembayaran</Text>
        <Text style={styles.textTitle}>{nominal}</Text>
      </View>
    )
  }

  renderDate () {
    const { tanggal } = this.state
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>Nominal Pembayaran</Text>
        <TouchableOpacity style={styles.rowLabel} onPress={() => this.date()}>
          <Text style={[styles.textTitle, { flex: 1 }]}>{tanggal}</Text>
          <Image source={Images.down} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    )
  }

  async date () {
    const { days, months } = this.state
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        mode: 'calendar',
        date: new Date()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
        const d = new Date(tempLabel)

        const tempTimestamp = day + '/' + (parseInt(month) + 1) + '/' + year
        const hari = days[d.getDay()]
        const bulan = months[d.getMonth()]
        const label = hari + ', ' + day + ' ' + bulan + ' ' + year

        const timestamp = moment(tempTimestamp, 'DD-MM-YYYY').unix()

        this.setState({
          tanggal: label,
          timestamp: timestamp
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  }

  renderBankTujuan () {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>Bank Tujuan</Text>
        {this.bankPicker()}
      </View>
    )
  }

  bankPicker () {
    const { bankSeller } = this.state
    const bankList = bankSeller.map(bank =>
    (<Picker.Item key={bank.bank.name} label={bank.bank.name} value={bank.bank.id} />)
  )
    return (
      <Picker
        style={styles.picker}
        selectedValue={this.state.labelBank}
        onValueChange={this.onValueChange.bind(this)}
        mode='dropdown'
      >
        {bankList}
      </Picker>
    )
  }

  onValueChange = (namaBank, index) => {
    this.setState({
      labelBank: namaBank,
      idBank: this.state.bank[index].id
    })
  }

  renderBankPengirim () {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>Bank Pengirim</Text>
        {this.bankPickerPengirim()}
      </View>
    )
  }

  bankPickerPengirim () {
    const { bank } = this.state
    const bankList = bank.map(bank =>
    (<Picker.Item key={bank.name} label={bank.name} value={bank.id} />)
  )
    return (
      <Picker
        style={styles.picker}
        selectedValue={this.state.labelBankPengirim}
        onValueChange={this.onValueChangePengirim.bind(this)}
        mode='dropdown'
      >
        {bankList}
      </Picker>
    )
  }

  onValueChangePengirim = (namaBank, index) => {
    this.setState({
      labelBankPengirim: namaBank,
      idBankPengirim: this.state.bank[index].id
    })
  }

  handlerekening = (text) => {
    this.setState({ rekening: text })
  }

  renderRekeningPengirim () {
    const { rekening } = this.state
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.textLabel}>Rekening Pengirim</Text>
        <TextInput
          style={styles.input}
          value={rekening}
          keyboardType='numeric'
          autoCapitalize='none'
          autoCorrect
          onChangeText={this.handlerekening}
          underlineColorAndroid='transparent'
          placeholder='Nomor Rekening'
        />
      </View>
    )
  }

  renderBuktiTransfer () {
    return (
      <View style={styles.buktiTransferContainer}>
        <Text style={styles.labelUpload}>Upload bukti Transfer Anda</Text>
        {this.renderImages()}
      </View>
    )
  }

  renderImages () {
    const { bukti, loading } = this.state
    if (loading) {
      return (
        <View style={styles.defaultImage}>
          <Spinner />
        </View>
      )
    } else {
      if (bukti !== null) {
        return (
          <View style={{ paddingTop: 12, width: 110, marginTop: 25 }}>
            <Image
              source={{ uri: bukti }}
              style={styles.images}
            />
            <TouchableOpacity style={styles.deleteImage} onPress={() => this.setState({bukti: null})}>
              <Image source={Images.closeCircleBack} style={styles.imageX} />
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <TouchableOpacity
            style={styles.defaultImage}
            onPress={() => this.setState({showModalCamera: true})}
          >
            <Image source={Images.plus} style={styles.imagePlus} />
          </TouchableOpacity>
        )
      }
    }
  }

  renderButton () {
    return (
      <View style={[styles.rowLabel, { marginTop: 30 }]}>
        <TouchableOpacity style={styles.button} onPress={() => this.send()}>
          <Text style={styles.textButton}>
            Konfirmasikan Pembayaran
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderCameraModal () {
    return (
      <CameraModal
        visible={this.state.showModalCamera}
        onClose={() => {
          this.setState({showModalCamera: false})
        }}
        onPress={() => {
          this.setState({showModalCamera: false})
        }}
        onPhotoCaptured={(path) => {
          this.addPhoto(path)
        }}
      />
    )
  }

  addPhoto (photo, i) {
    this.setState({bukti: photo, showModalCamera: false})
    const postData = new FormData()
    postData.append('images', { uri: photo, type: 'image/jpg', name: 'image.jpg' })
    postData.append('type', 'payment')
    this.props.photoUpload(postData)
    this.setState({loading: true})
  }

  send () {
    const { idBank, timestamp, nominal, payloadImage, labelBankPengirim, bank, rekening } = this.state
    let label
    if (labelBankPengirim !== 'Pilih Bank') {
      label = bank[labelBankPengirim - 1].name
    } else {
      label = bank[0].name
    }
    // this.props.pay(idBank, timestamp, nominal, label, rekening, payloadImage)
    console.log(idBank, timestamp, nominal, label, rekening, payloadImage)
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          {this.renderNominalPembayaran()}
          {this.renderDate()}
          {this.renderBankTujuan()}
          {this.renderBankPengirim()}
          {this.renderRekeningPengirim()}
          {this.renderBuktiTransfer()}
          {this.renderButton()}
          {this.renderCameraModal()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataBankKomuto: state.komutoAccounts,
    dataBank: state.banks,
    dataPhoto: state.upload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    photoUpload: (data) => dispatch(storeAction.photoUpload({data: data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPaymentConfirmation)
