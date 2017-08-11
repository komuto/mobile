import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'

// Styles
import styles from './Styles/DaftarProdukScreenStyle'
import { Colors, Images } from '../Themes/'

class DaftarProdukScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      katalog: [],
      produk: [],
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      search: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProduk.status === 200) {
      console.log('ooo', nextProps.dataProduk)
      this.setState({
        produk: nextProps.dataProduk.storeCatalogProducts.products
      })
    }
  }

  renderSearch () {
    return (
      <View style={styles.searchContainer}>
        <Image source={Images.searchGrey} style={styles.searchImage} />
        <View style={styles.textInputContainer}>
          <TextInput
            ref='search'
            style={styles.inputText}
            value={this.state.search}
            onSubmitEditing={() => this.search()}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleTextSearch}
            underlineColorAndroid='transparent'
            placeholder='Cari Produk'
          />
        </View>
      </View>
    )
  }

  DaftarProdukDiTampilkan () {
    return (
      <View>
        {this.mapSingleProduk()}
      </View>
    )
  }

  handleListProduk () {
    NavigationActions.listprodukbycatalog({
      type: ActionConst.PUSH
    })
  }

  produkDetail (id) {
    NavigationActions.productdetail({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  labelDropshipping () {
    return (
      <View>
        <View style={[styles.flexRow, {marginTop: 10, marginBottom: 10}]}>
          <View style={styles.laberDropShipping}>
            <Text style={styles.textDropShipping}>
              Dropship dari WorldSports
            </Text>
          </View>
          <View style={styles.triangleLabel} />
        </View>
        <View style={[styles.flexRow, {marginTop: 10, marginBottom: 10}]}>
          <View style={[styles.laberDropShipping, {backgroundColor: Colors.lightBlueGrey}]}>
            <Text style={[styles.textDropShipping, {color: Colors.darkMintTwo}]}>
              Terbuka untuk dropshipper
            </Text>
          </View>
          <View style={[styles.triangleLabel, {backgroundColor: Colors.lightBlueGrey}]} />
        </View>
      </View>
    )
  }

  mapSingleProduk (data, id) {
    const { produk } = this.state
    const mapProduk = produk.map((data, i) => {
      return (
        <TouchableOpacity key={i} style={[styles.dataListProduk, {backgroundColor: Colors.snow}]} onPress={() => this.produkDetail(data.id)}>
          <View style={styles.flexRow}>
            <Image source={{uri: data.image}} style={styles.imageProduk} />
            <View style={styles.column}>
              <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
                <Text style={styles.textTitle}>{data.name}</Text>
                <TouchableOpacity>
                  <Image source={Images.diskon} style={styles.imageDot} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
                </TouchableOpacity>
              </View>
              {this.labelDropshipping()}
              <Text style={styles.textDetail}>Komisi yang diterima : Rp {data.price}</Text>
              <Text style={styles.textDetail}>Jumlah Stok : {data.price}</Text>
              <Text style={styles.textDetail}>Harga jual setelah diskon : Rp {data.price}</Text>
              <Text style={styles.textDetail}>Uang yang diterima : Rp {data.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <View>
        {mapProduk}
      </View>
    )
  }

  DaftarProdukDiSembunyikan () {
    return (
      <View>
        {this.mapSingleProduk()}
      </View>
    )
  }

  handleTambahProduk () {
    NavigationActions.tambahproduk({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderSearch()}
          {this.DaftarProdukDiTampilkan()}
        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.storeCatalogProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaftarProdukScreenScreen)
