import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, Modal, ToastAndroid, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import * as productAction from '../actions/product'
import CustomRadio from '../Components/CustomRadio'
import Spinner from '../Components/Spinner'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaporkanStyle'

class Report extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      images: this.props.images,
      namaBarang: this.props.namaBarang,
      harga: this.props.harga,
      data: [
        {label: 'Salah Kategori', value: 0},
        {label: 'Iklan Situs Luar', value: 1},
        {label: 'Pornografi', value: 2},
        {label: 'Pelanggaran Merk Dagang', value: 3},
        {label: 'Lainnya', value: 4}
      ],
      index: 0,
      alasan: 'Salah Kategori',
      notifikasi: false,
      report: '',
      height: 50,
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataReport.status === 200) {
      this.setState({
        notifikasi: true,
        loading: false
      })
      nextProps.dataReport.status = 0
    } else if (nextProps.dataReport.status !== 200 && nextProps.dataReport.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataReport.message, ToastAndroid.SHORT)
    }
  }

  handleChangeReport = (text) => {
    this.setState({ report: text })
  }

  handlingRadio (index, value) {
    this.setState({
      index: index,
      alasan: value
    })
  }

  laporkan () {
    const { id, report, index } = this.state
    this.setState({
      loading: true
    })
    this.props.reportProduct(id, index + 1, report)
  }

  backButton () {
    this.setState({
      notifikasi: false
    })
    NavigationActions.pop()
  }

  renderNotifikasiModal () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.notifikasi}
        onRequestClose={() => this.setState({ notifikasi: false })}
        >
        <View style={styles.modalContainer}>
          <View style={styles.notifikasiContainer}>
            <View style={styles.notifikasi} />
            <View style={styles.notifikasi}>
              <Text style={styles.namaBarang}> Laporan Terkirim </Text>
              <Text style={[styles.laporan, { textAlign: 'center' }]}> Laporan Anda telah berhasil dikirim. Kami akan menindaklanjuti laporan Anda.</Text>
              <TouchableOpacity style={styles.tombolKembali} onPress={() => this.backButton()}>
                <Text style={styles.textTombol}>Kembali ke Halaman Detail Barang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  render () {
    let renderButton
    if (this.state.loading) {
      renderButton = (
        <View style={styles.tombol}>
          <Spinner color={Colors.snow} />
        </View>
      )
    } else {
      renderButton = (
        <TouchableOpacity style={styles.tombol} onPress={() => this.laporkan()}>
          <Text style={styles.textTombol}>Kirimkan Laporan</Text>
        </TouchableOpacity>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerData}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: this.state.images }} style={styles.imageStyle} />
            <View style={styles.barangContainer}>
              <Text style={styles.namaBarang}>{this.state.namaBarang}</Text>
              <Text style={styles.hargaBarang}>{this.state.harga}</Text>
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.hargaBarang}>Jenis Laporan</Text>
            <View style={styles.radio}>
              <CustomRadio
                data={this.state.data}
                handlingRadio={(index1, value1) =>
                  this.handlingRadio(index1, value1)}
                vertical
              />
            </View>
            <Text style={styles.hargaBarang}>Laporan Anda</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref='report'
                style={[styles.textInput, { height: this.state.height }]}
                multiline
                onContentSizeChange={(event) => {
                  this.setState({height: event.nativeEvent.contentSize.height})
                }}
                value={this.state.report}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeReport}
                underlineColorAndroid='transparent'
                placeholder='Laporan Anda'
              />
            </View>
          </View>
          {renderButton}
        </View>
        {this.renderNotifikasiModal()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataReport: state.report
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reportProduct: (id, type, description) => dispatch(productAction.reportProduct({
      id: id,
      report_type: type,
      description: description
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
