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

class ProductListByCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      product: false,
      search: false,
      loadFromSearch: false
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
    const {dataProduk, dataProductSearch} = nextProps

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

    if (!isFetching(dataProductSearch) && this.submitting.search) {
      this.submitting = { ...this.submitting, search: false }
      if (isError(dataProductSearch)) {
        ToastAndroid.show(dataProductSearch.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProductSearch)) {
        const isFound = dataProductSearch.products.length
        if (isFound >= 10) {
          const data = [...this.state.produk, ...dataProductSearch.products]
          this.setState({
            produk: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false
          })
        } else {
          const data = [...this.state.produk, ...dataProductSearch.products]
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
    this.submitting = {
      ...this.submitting,
      search: true,
      loadFromSearch: true
    }
    if (text !== '') {
      const {catalogId} = this.state
      this.props.getProductByCatalogSearch({catalog_id: catalogId, q: text})
    } else {
      this.submitting = {
        ...this.submitting,
        product: true
      }
      this.props.getProductByCatalogs({id: this.state.catalogId, hidden: false})
    }
  }

  refresh = () => {
    const { catalogId } = this.state
    this.setState({ isRefreshing: true, produk: [], page: 1, isLoading: true, search: '' })
    this.submitting = {
      product: true,
      search: false,
      loadFromSearch: false
    }
    this.props.getProductByCatalogs({id: catalogId, page: 1, hidden: false})
  }

  loadMore = () => {
    Reactotron.log('load more')
    const {isLoading, loadmore, catalogId, page, search} = this.state
    if (this.submitting.loadFromSearch) {
      if (!isLoading) {
        if (loadmore) {
          this.submitting.search = true
          this.props.getProductByCatalogSearch({catalog_id: catalogId, q: search})
        }
      }
    } else {
      if (!isLoading) {
        if (loadmore) {
          this.submitting.product = true
          this.props.getProductByCatalogs({id: catalogId, page: page, hidden: false})
        }
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
        price: price,
        commission: data.dropship_origin.commission.percent
      })
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
    let price
    if (value < 1000) {
      price = 'Rp ' + value
    }
    if (value >= 1000) {
      price = MaskService.toMask('money', value, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
    }
    return price
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
      var commission = (data.price * data.commission) / 100
      var fee = data.price - commission
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
      var commissions = (data.price * data.commission) / 100
      var fees = data.price - commissions
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
    dataProduk: state.storeCatalogProducts,
    dataProductSearch: state.storeCatalogProductsSearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
    getProductByCatalogs: (param) => dispatch(storeAction.getStoreCatalogProducts(param)),
    getProductByCatalogSearch: (param) => dispatch(storeAction.getStoreProductsByCatalogSearch(param)),
    getDetailProduct: (param) => dispatch(productAction.getProduct(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListByCatalog)
