import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TambahProdukScreenStyle'
import { Images, Metrics } from '../Themes/'

class TambahProdukScreenScreen extends React.Component {

  handleUploadProduk () {
    NavigationActions.uploadphotoproduk({
      type: ActionConst.PUSH
    })
  }

  handleDropshiper () {
    NavigationActions.tentangdropshipping({
      type: ActionConst.PUSH,
      marginNavbars: Metrics.navBarHeight,
      visibleButton: true
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tentukan produk yang akan ditambah</Text>
        <TouchableOpacity onPress={() => this.handleUploadProduk()}>
          <View style={[styles.menu, {marginTop: 15}]}>
            <Image source={Images.uploadPhotoProduk} style={styles.imageMenu} />
            <View style={styles.textMenuCol}>
              <Text style={styles.title}>Upload Produk Baru</Text>
              <Text style={styles.desc}>Tambahkan produk baru untuk dijual</Text>
            </View>
            <Image source={Images.rightArrow} style={styles.imageArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDropshiper()}>
          <View style={styles.menu}>
            <Image source={Images.listProduk} style={styles.imageMenu} />
            <View style={styles.textMenuCol}>
              <Text style={styles.title}>Ambil dari Dropshipper</Text>
              <Text style={styles.desc}>Ambil produk dari dropshipper.{'\n'}Dan Anda akan mendapat komisi.{'\n'}penjualan sebesar 10%</Text>
            </View>
            <Image source={Images.rightArrow} style={styles.imageArrow} />
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TambahProdukScreenScreen)
