import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import * as productAction from '../actions/product'
import {isFetching, isError, isFound} from '../Services/Status'

import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as catalogAction from '../actions/catalog'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/DaftarProdukScreenStyle'
import { Colors, Images } from '../Themes/'

class ListProdukByCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      product: false
    }
    this.state = {
      loading: false,
      produk: [],
      catalogId: this.props.catalogId,
      search: '',
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: true
    }
  }

  componentDidMount () {
    if (!this.submitting.product) {
      this.submitting = {
        ...this.submitting,
        product: true
      }
      this.props.getProductByCatalogs({id: this.state.catalogId, hidden: false})
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataProduk} = nextProps

    if (!isFetching(dataProduk) && this.submitting.product) {
      this.submitting = { ...this.submitting, product: false }
      if (isError(dataProduk)) {
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        const isFound = dataProduk.storeCatalogProducts.products.length
        if (isFound >= 10) {
          const data = [...this.state.produk, ...dataProduk.storeCatalogProducts.products]
          this.setState({
            produk: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false
          })
        } else {
          const data = [...this.state.produk, ...dataProduk.storeCatalogProducts.products]
          this.setState({
            produk: data,
            isLoading: true,
            loadmore: false,
            page: 1,
            isRefreshing: false
          })
        }
      }
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text, produk: [], isRefreshing: true })
    this.trySearch(text)
  }

  trySearch (text) {
    const {catalogId} = this.state
    if (text !== '') {
      this.submitting.product = true
      setTimeout(() => {
        this.props.getProductByCatalogs({id: catalogId, q: text, hidden: false})
      }, 3000)
    }
  }

  refresh = () => {
    const { catalogId } = this.state
    this.setState({ isRefreshing: true, produk: [], page: 1, isLoading: true })
    this.submitting = {
      product: false
    }
    this.props.getProductByCatalogs({id: catalogId, page: 1, hidden: false})
  }

  loadMore = () => {
    Reactotron.log('load more')
    const {isLoading, loadmore, catalogId, page} = this.state
    if (!isLoading) {
      if (loadmore) {
        this.submitting.product = true
        this.props.getProductByCatalogs({id: catalogId, page: page, hidden: false})
      }
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
      this.props.getDetailProduct({id: id})
      NavigationActions.detailproductstore({
        type: ActionConst.PUSH,
        productName: name,
        idProduct: id
      })
    }
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

  renderRow (rowdata) {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.dataListProduk}
        onPress={() => this.produkDetail(rowdata.id, rowdata.name, rowdata.image, rowdata.price, rowdata, this.state.catalogId)}>
        <View style={styles.flexRow}>
          <Image source={{uri: rowdata.image}} style={styles.imageProduk} />
          <View style={styles.column}>
            {this.checkLabelProduct(rowdata.name, rowdata.is_discount, rowdata.is_wholesaler)}
            {this.labeldaridropshipper(rowdata)}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  handleTambahProduk () {
    NavigationActions.addproduct({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderSearch()}
        <ListView
          enableEmptySections
          dataSource={this.dataSource.cloneWithRows(this.state.produk)}
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
          onEndReached={this.loadMore}
          renderFooter={() => {
            if (this.state.loadmore) {
              return (
                <ActivityIndicator
                  style={[styles.loadingStyle, { height: 50 }]}
                  size='small'
                  color='#ef5656'
                />
              )
            }
            return <View />
          }}
          style={styles.listView}
        />
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
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
    getProductByCatalogs: (param) => dispatch(storeAction.getStoreCatalogProducts(param)),
    getDetailProduct: (param) => dispatch(productAction.getProduct(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProdukByCatalog)
