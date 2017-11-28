import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  BackAndroid,
  ActivityIndicator,
  ListView,
  ToastAndroid,
  RefreshControl
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import RupiahFormat from '../Services/MaskedMoneys'

import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

import * as storeAction from '../actions/stores'

import styles from './Styles/DaftarProdukScreenStyle'

import {Colors, Images} from '../Themes/'

class StoreProductHidden extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.position = []
    this.positionCatalog = []
    this.submitting = {
      showProduct: false,
      doneFetching: true
    }
    this.state = {
      product: props.dataProduk || [],
      callback: this.props.callback,
      isRefreshing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataProduk, callback} = nextProps
    if (callback !== undefined) {
      if (callback !== this.state.callback) {
        this.refresh()
        this.setState({
          callback: callback
        })
      }
    }

    if (!isFetching(dataProduk) && this.submitting.showProduct) {
      this.submitting = { ...this.submitting, showProduct: false, doneFetching: false }
      if (isError(dataProduk)) {
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        this.setState({ product: dataProduk })
      }
    }

    if (!isFetching(dataProduk) && this.state.isRefreshing) {
      this.setState({ isRefreshing: false })
      this.submitting = { ...this.submitting, doneFetching: false }
      if (isError(dataProduk)) {
        this.submitting = { ...this.submitting, showProduct: false, doneFetching: true }
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        this.setState({ product: dataProduk })
      }
    }
  }

  componentDidMount () {
    Reactotron.log('hide product')
    const { product } = this.state
    if (!product.isFound || !this.submitting.showProduct) {
      this.submitting = {
        ...this.submitting,
        showProduct: true
      }
      this.props.getListProdukHidden()
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
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

  renderTambahButton () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.create} onPress={() => this.handleTambahProduk()}>
        <View elevation={9}>
          <Image source={Images.tambahWhite} style={styles.floatImage} />
        </View>
      </TouchableOpacity>
    )
  }

  handleTambahProduk () {
    NavigationActions.addproduct({
      type: ActionConst.PUSH
    })
  }

  labeldaridropshipper (data) {
    if (data.is_dropship === true && data.dropship_origin) {
      var commisson = (data.dropship_origin.commission.nominal * 100)
      var maskedCommision = this.maskedMoney(commisson)
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
    } if (data.is_dropship) {
      var discount = this.discountCalculate(data.price, data.discount)
      var commission = (discount * data.commission) / 100
      var fee = discount - commission
      var feeMasked = this.maskedMoney(fee)
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
          <Text style={styles.textDetail}>Uang yang diterima : {feeMasked}</Text>
        </View>
      )
    } else {
      var discounts = this.discountCalculate(data.price, data.discount)
      var commissions = (discounts * data.commission) / 100
      var fees = discounts - commissions
      var feeMaskeds = this.maskedMoney(fees)
      return (
        <View>
          <Text style={styles.textDetail}>Jumlah Stok : {data.stock}</Text>
          {this.discountCheck(data)}
          <Text style={styles.textDetail}>Uang yang diterima : {feeMaskeds}</Text>
        </View>
      )
    }
  }

  checkLabelProduct (productName, isDiscount, isWholesale) {
    if (isDiscount && isWholesale) {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
          <TouchableOpacity>
            <Image source={Images.diskon} style={[styles.imageDot]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
          </TouchableOpacity>
        </View>
      )
    } else if (isDiscount) {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
          <TouchableOpacity>
            <Image source={Images.diskon} style={[styles.imageDot]} />
          </TouchableOpacity>
        </View>
      )
    } else if (isWholesale) {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
          <TouchableOpacity>
            <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
        </View>
      )
    }
  }

  renderRow (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity activeOpacity={0.5}key={rowId} style={styles.dataListProduk}
        onPress={() => this.produkDetail(rowData.id, rowData.name, rowData.image, rowData.price, rowData)}>
        <View style={styles.flexRow}>
          <Image source={{uri: rowData.image}} style={styles.imageProduk} />
          <View style={styles.column}>
            {this.checkLabelProduct(rowData.name, rowData.is_discount, rowData.is_wholesaler)}
            {this.labeldaridropshipper(rowData)}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  produkDetail (id, name, photo, price, data, catalogId) {
    if (data.is_dropship === true && data.dropship_origin) {
      NavigationActions.placeincatalog({
        type: ActionConst.PUSH,
        title: 'Detail Barang Dropshipper',
        id: id,
        catalogId: catalogId,
        productName: name,
        fotoToko: photo,
        price: price,
        commission: data.dropship_origin.commission.percent
      })
    } else {
      NavigationActions.detailproductstore({
        type: ActionConst.PUSH,
        productName: name,
        idProduct: id
      })
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true })
    this.props.getListProdukHidden()
  }

  renderEmpty () {
    return (
      <View style={styles.emptyContainer}>
        <Image source={Images.emptySales} style={styles.emptyImage} />
        <Text style={[styles.price, { textAlign: 'center', marginBottom: 10 }]}>
          Tidak Ada Produk Yang Disembunyikan
        </Text>
        <Text style={styles.textNotif}>
          Anda belum memiliki produk yang disembunyikan
        </Text>
      </View>
    )
  }

  render () {
    if (this.submitting.doneFetching) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    let view
    if (this.state.product.products.length > 0) {
      view = (
        <ListView
          enableEmptySections
          contentContainerStyle={{ flexWrap: 'wrap' }}
          dataSource={this.dataSource.cloneWithRows(this.state.product.products)}
          renderRow={this.renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.refresh}
              tintColor={Colors.red}
              colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
              title='Loading...'
              titleColor={Colors.red}
              progressBackgroundColor={Colors.snow}
            />
            }
        />
      )
    } else {
      view = this.renderEmpty()
    }
    return (
      <View>
        {view}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataProduk: state.hiddenStoreProducts
})

const mapDispatchToProps = (dispatch) => ({
  getListProdukHidden: () => dispatch(storeAction.getHiddenStoreProducts())
})
export default connect(mapStateToProps, mapDispatchToProps)(StoreProductHidden)
