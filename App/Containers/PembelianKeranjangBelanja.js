import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/PembelianKeranjangBelanjaStyle'

class PembelianKeranjangBelanja extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      price: 100000,
      foto: 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
      namaProduk: 'Sepatu',
      countProduct: 1,
      alamat: 'Alamat Pengiriman',
      jalan: 'Kemanggisan Jakarta Barat, Palmerah',
      nama: 'Dwinawan Hariwijaya',
      provinsi: 'Jakarta Barat DKI Jakarta, 55673',
      telepon: 'Telp: 0821 - 1310 - 1585'
    }
  }

  renderProduct () {
    const totalHarga = MaskService.toMask('money', this.state.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.namaProduk}
            </Text>
            <Text style={styles.textKelola}>
              {totalHarga}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.textHapus}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderJumlah () {
    const {countProduct} = this.state
    return (
      <View style={[styles.qualityContainer, {paddingTop: 25}]}>
        <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25}]}>
          <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5}]}>Jumlah:</Text>
        </View>
        <View style={[styles.eachQualiyNoMargin, {flexDirection: 'row', paddingRight: 20, paddingBottom: 0}]}>
          <TouchableOpacity onPress={() => this.substract()}>
            <Image source={Images.sub} style={styles.imageOperator} />
          </TouchableOpacity>
          <Text style={[styles.qualityText, styles.textJumlah]}>{countProduct}</Text>
          <TouchableOpacity onPress={() => this.add()}>
            <Image source={Images.add} style={styles.imageOperator} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  substract () {
    const {countProduct} = this.state
    if (countProduct > 0) {
      this.setState({
        countProduct: countProduct - 1
      })
    }
  }

  add () {
    const {countProduct} = this.state
    this.setState({
      countProduct: countProduct + 1
    })
  }

  renderAlamat () {
    const { alamat, jalan, nama, provinsi, telepon } = this.state
    return (
      <View style={styles.alamatContainer}>
        <View style={styles.alamat}>
          <Text style={styles.textNama}> {alamat} </Text>
          <Text style={styles.textAlamat}> {nama} </Text>
          <Text style={styles.textAlamat}> {jalan} </Text>
          <Text style={styles.textAlamat}> {provinsi} </Text>
          <Text style={styles.textAlamat}> {telepon} </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.textGanti}>Ganti</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.renderProduct()}
        {this.renderJumlah()}
        {this.renderAlamat()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PembelianKeranjangBelanja)
