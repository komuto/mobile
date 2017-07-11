import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CustomRadio from '../Components/CustomRadio'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaporkanStyle'

class Laporkan extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
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
      notifikasi: false
    }
  }

  handlingRadio (index, value) {
    this.setState({
      index: index,
      alasan: value
    })
  }

  laporkan () {
    this.setState({
      notifikasi: true
    })
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
            <Text style={styles.laporan}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            </Text>
          </View>
          <TouchableOpacity style={styles.tombol} onPress={() => this.laporkan()}>
            <Text style={styles.textTombol}>Kirimkan Laporan</Text>
          </TouchableOpacity>
        </View>
        {this.renderNotifikasiModal()}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Laporkan)
