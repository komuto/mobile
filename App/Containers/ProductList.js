import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/DaftarProdukScreenStyle'
import { Colors, Images } from '../Themes/'

class ProductList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      katalog: [],
      product: [],
      productHidden: [],
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      search: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProduk.status === 200) {
      this.setState({
        product: nextProps.dataProduk.storeProducts
      })
    } if (nextProps.dataProductHidden.status === 200) {
      this.setState({
        productHidden: nextProps.dataProductHidden.hiddenStoreProducts
      })
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

  nextState () {
    NavigationActions.notification({
      type: ActionConst.PUSH,
      tipeNotikasi: 'successBukaToko'
    })
  }

  renderKatalogtButton () {
    return (
      <TouchableOpacity style={styles.floatButton} onPress={() => {}}>
        <Image source={Images.katalog} style={styles.floatImage} />
        <Text style={styles.katalog}>Daftar Katalog</Text>
      </TouchableOpacity>
    )
  }

  renderTambahButton () {
    return (
      <TouchableOpacity style={styles.create} onPress={() => this.handleTambahProduk()}>
        <View elevation={9}>
          <Image source={Images.tambahWhite} style={styles.floatImage} />
        </View>
      </TouchableOpacity>
    )
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
        {this.mapingProduct()}
      </View>
    )
  }

  handleListProduk (id, name) {
    this.props.getProductByCAtalog(id)
    NavigationActions.productlistbycatalog({
      type: ActionConst.PUSH,
      title: name
    })
  }

  onPopupEvent = (eventName, index) => {
    if (eventName !== 'itemSelected') return
    if (index === 0) this.onEdit()
    else this.onRemove()
  }

  mapingProduct () {
    const { product } = this.state
    const mapProduk = product.map((data, i) => {
      return (
        <View key={i} style={styles.separaator}>
          <View style={styles.containerProduk}>
            <View style={styles.headerInfoAlamat}>
              <Text style={styles.textHeader}>{data.catalog.name} ({data.catalog.count_product})</Text>
            </View>
            {this.mapSingleProduk(data.products, i)}
          </View>
          <TouchableOpacity activeOpacity={0.5} style={[styles.headerInfoAlamat, {backgroundColor: Colors.snow}]} onPress={() => this.handleListProduk(data.catalog.id, data.catalog.name)}>
            <Text style={[styles.textHeader, {color: Colors.bluesky}]}>Lihat semua produk di katalog ini</Text>
            <Image source={Images.rightArrow} style={styles.imageDot} />
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <View>
        {mapProduk}
      </View>
    )
  }

  mapingProductHidden () {
    const { productHidden } = this.state
    const mapProduk = productHidden.map((data, i) => {
      return (
        <View key={i} style={styles.separaator}>
          <View style={styles.containerProduk}>
            <View style={styles.headerInfoAlamat}>
              <Text style={styles.textHeader}>{data.catalog.name} ({data.catalog.count_product})</Text>
            </View>
            {this.mapSingleProduk(data.products, i)}
          </View>
          <TouchableOpacity activeOpacity={0.5} style={[styles.headerInfoAlamat, {backgroundColor: Colors.snow}]} onPress={() => this.handleListProduk(data.catalog.id, data.catalog.name)}>
            <Text style={[styles.textHeader, {color: Colors.bluesky}]}>Lihat semua produk di katalog ini</Text>
            <Image source={Images.rightArrow} style={styles.imageDot} />
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <View>
        {mapProduk}
      </View>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  discountCheck (data) {
    var priceAfterDiscount = this.discountCalculate(data.price, data.discount)
    var maskedPriceAfterDiscount = this.maskedMoney(priceAfterDiscount)
    return (
      <Text style={styles.textDetail}>Harga jual setelah diskon : {maskedPriceAfterDiscount}</Text>
    )
  }

  maskedMoney (value) {
    const maskedPrice = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return maskedPrice
  }

  labeldaridropshipper (data) {
    if (data.is_dropshipper === true && data.dropship_origin) {
      var maskedCommision = this.maskedMoney(data.dropship_origin.commission)
      return (
        <View>
          <View style={[styles.flexRow, {marginTop: 10, marginBottom: 10}]}>
            <View style={styles.laberDropShipping}>
              <Text style={styles.textDropShipping}>
                Dropship dari {data.dropship_origin.name}
              </Text>
            </View>
            <View style={styles.triangleLabel} />
          </View>
          <Text style={styles.textDetail}>Komisi yang diterima : {maskedCommision}</Text>
        </View>
      )
    } if (data.is_dropshipper) {
      var maskedPrice = this.maskedMoney(data.price)
      return (
        <View>
          <View style={[styles.flexRow, {marginTop: 10, marginBottom: 10}]}>
            <View style={[styles.laberDropShipping, {backgroundColor: Colors.lightBlueGrey}]}>
              <Text style={[styles.textDropShipping, {color: Colors.darkMintTwo}]}>
                Terbuka untuk dropshipper
              </Text>
            </View>
            <View style={[styles.triangleLabel, {backgroundColor: Colors.lightBlueGrey}]} />
          </View>
          <Text style={styles.textDetail}>Jumlah Stok : {data.stock}</Text>
          {this.discountCheck(data)}
          <Text style={styles.textDetail}>Uang yang diterima : {maskedPrice}</Text>
        </View>
      )
    } else {
      var maskedPrices = this.maskedMoney(data.price)
      return (
        <View>
          <Text style={styles.textDetail}>Jumlah Stok : {data.stock}</Text>
          {this.discountCheck(data)}
          <Text style={styles.textDetail}>Uang yang diterima : {maskedPrices}</Text>
        </View>
      )
    }
  }

  mapSingleProduk (data, id) {
    const mapProduk = data.map((data, i) => {
      return (
        <TouchableOpacity key={i} style={styles.dataListProduk} onPress={() => this.produkDetail(data.id)}>
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
              {this.labeldaridropshipper(data)}
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
        {this.mapingProductHidden()}
      </View>
    )
  }

  handleTambahProduk () {
    NavigationActions.addproduct({
      type: ActionConst.PUSH
    })
  }

  produkDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <ScrollView tabLabel='Ditampilkan di Toko' ref='produkTampil' style={styles.scrollView}>
            {this.renderSearch()}
            {this.DaftarProdukDiTampilkan()}
          </ScrollView>
          <ScrollView tabLabel='Disembunyikan' ref='productHidden' style={styles.scrollView}>
            {this.renderSearch()}
            {this.DaftarProdukDiSembunyikan()}
          </ScrollView>
        </ScrollableTabView>
        {this.renderKatalogtButton()}
        {this.renderTambahButton()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.storeProducts,
    dataProductHidden: state.hiddenStoreProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductByCAtalog: (id) => dispatch(storeAction.getStoreCatalogProducts({id})),
    getListProduk: (hidden) => dispatch(storeAction.getStoreProducts({hidden: hidden})),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
