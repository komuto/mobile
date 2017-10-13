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
import {MaskService} from 'react-native-masked-text'
import {isFetching, isError, isFound} from '../Services/Status'

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
      doneFetching: true,
      isRefreshing: false
    }
    this.state = {
      product: props.dataProduk || null
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataProduk} = nextProps

    if (!isFetching(dataProduk) && this.submitting.showProduct) {
      this.submitting = { ...this.submitting, showProduct: false, doneFetching: false }
      if (isError(dataProduk)) {
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        this.setState({ product: dataProduk })
      }
    }

    if (!isFetching(dataProduk) && this.submitting.isRefreshing) {
      this.submitting = { ...this.submitting, isRefreshing: false, doneFetching: false }
      if (isError(dataProduk)) {
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        this.setState({ product: dataProduk })
      }
    }
  }

  componentDidMount () {
    const { product } = this.state
    if (!product.isFound && !this.submitting.showProduct) {
      this.submitting = {
        ...this.submitting,
        showProduct: true
      }
      this.props.getListProduk()
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
    const maskedPrice = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return maskedPrice
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
    } if (data.is_dropship) {
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

  renderRow (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity activeOpacity={0.5}key={rowId} style={styles.dataListProduk}
        onPress={() => this.produkDetail(rowData.id, rowData.name, rowData.image, rowData.price, rowData)}>
        <View style={styles.flexRow}>
          <Image source={{uri: rowData.image}} style={styles.imageProduk} />
          <View style={styles.column}>
            <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
              <Text style={styles.textTitle}>{rowData.name}</Text>
              <TouchableOpacity activeOpacity={0.5}>
                <Image source={Images.diskon} style={styles.imageDot} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
              </TouchableOpacity>
            </View>
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
        price: price
      })
      this.props.getCatalog()
    } else {
      NavigationActions.detailproductstore({
        type: ActionConst.PUSH,
        productName: name,
        idProduct: id
      })
    }
  }

  refresh = () => {
    if (!this.submitting.isRefreshing) {
      this.submitting = {
        ...this.submitting,
        isRefreshing: true
      }
      this.props.getListProduk(false)
    }
  }

  render () {
    if (this.submitting.doneFetching) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    return (
      <View>
        <ListView
          enableEmptySections
          contentContainerStyle={{ flexWrap: 'wrap' }}
          dataSource={this.dataSource.cloneWithRows(this.state.product.products)}
          renderRow={this.renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.submitting.isRefreshing}
              onRefresh={this.refresh}
              tintColor={Colors.red}
              colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
              title='Loading...'
              titleColor={Colors.red}
              progressBackgroundColor={Colors.snow}
            />
            }
        />
        {this.renderTambahButton()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataProduk: state.hiddenStoreProducts
})

const mapDispatchToProps = (dispatch) => ({
  getListProduk: () => dispatch(storeAction.getHiddenStoreProducts()),
  getProductByCatalogs: (id) => dispatch(storeAction.getStoreCatalogProducts({id: id, limit: 100}))
})
export default connect(mapStateToProps, mapDispatchToProps)(StoreProductHidden)
