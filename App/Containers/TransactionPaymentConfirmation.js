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
  BackAndroid
} from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
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
      nominal: 'Rp 250.257',
      tanggal: 'Pilih Tanggal',
      idBank: -1,
      labelBank: 'Pilih Bank',
      idBankPengirim: -1,
      labelBankPengirim: 'Pilih Bank',
      timestamp: '',
      rekening: '',
      bukti: null,
      image: '',
      bankSeller: [
        {
          'id': 1,
          'name': 'Bank Mandiri'
        },
        {
          'id': 2,
          'name': 'Bank BCA'
        }
      ],
      bank: [
        {
          'id': 1,
          'name': 'Bank Mandiri'
        },
        {
          'id': 2,
          'name': 'Bank BCA'
        },
        {
          'id': 3,
          'name': 'Bank BRI'
        },
        {
          'id': 4,
          'name': 'Bank BNI'
        }
      ]
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
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        mode: 'calendar',
        date: new Date()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
          'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const tempLabel = (parseInt(month) + 1) + '-' + day + '-' + year
        const d = new Date(tempLabel)

        const tempTimestamp = day + '-' + (parseInt(month) + 1) + '-' + year
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
    (<Picker.Item key={bank.name} label={bank.name} value={bank.id} />)
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
    const { bukti } = this.state
    if (bukti !== null) {
      return (
        <View style={{ paddingTop: 12, width: 110, marginTop: 25 }}>
          <Image
            source={{ uri: bukti }}
            style={styles.images}
          />
          <TouchableOpacity style={styles.deleteImage}>
            <Image source={Images.closeCircleBack} style={styles.imageX} />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <TouchableOpacity style={styles.defaultImage}>
        <Image source={Images.plus} style={styles.imagePlus} />
      </TouchableOpacity>
    )
  }

  renderButton () {
    return (
      <View style={[styles.rowLabel, { marginTop: 30 }]}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>
            Konfirmasikan Pembayaran
          </Text>
        </TouchableOpacity>
      </View>
    )
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
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPaymentConfirmation)
