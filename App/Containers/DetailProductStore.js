import React from 'react'
import { ScrollView, ActivityIndicator, ToastAndroid, ListView, Text, View, RefreshControl, BackAndroid, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import Reactotron from 'reactotron-react-native'
import {isFetching, isError, isFound} from '../Services/Status'

import * as categoriAction from '../actions/home'
import * as storeAction from '../actions/stores'
import * as productAction from '../actions/product'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailProductStoreStyle'
import { Images, Colors, Fonts } from '../Themes'

class DetailProductStore extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      deleteProduct: false
    }
    this.state = {
      productName: this.props.productName,
      loading: true,
      brand: '',
      catalog: '',
      expeditionServices: [],
      wholesaler: '',
      product: '',
      price: 0,
      category: '',
      imageProduct: [],
      nameCategory: '',
      id: [this.props.idProduct],
      isRefreshing: false,
      callback: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataDeleteProducts} = nextProps
    if (nextProps.callback !== undefined) {
      if (nextProps.callback !== this.state.callback) {
        this.refresh()
        this.setState({
          callback: nextProps.callback,
          loading: false
        })
      }
    }
    if (nextProps.dataDetailProduct.status === 200) {
      this.setState({
        brand: nextProps.dataDetailProduct.storeProductDetail.brand,
        catalog: nextProps.dataDetailProduct.storeProductDetail.catalog,
        expeditionServices: nextProps.dataDetailProduct.storeProductDetail.expedition_services,
        wholesaler: nextProps.dataDetailProduct.storeProductDetail.wholesaler,
        product: nextProps.dataDetailProduct.storeProductDetail.product,
        productName: nextProps.dataDetailProduct.storeProductDetail.product.name,
        price: nextProps.dataDetailProduct.storeProductDetail.product.price,
        category: nextProps.dataDetailProduct.storeProductDetail.category,
        id: nextProps.dataDetailProduct.storeProductDetail.category.parent_id,
        imageProduct: nextProps.dataDetailProduct.storeProductDetail.images,
        loading: false,
        isRefreshing: false
      })
      nextProps.dataDetailProduct.status = 0
      this.props.getKategori(nextProps.dataDetailProduct.storeProductDetail.category.id)
    } else if (nextProps.dataDetailProduct.status > 200) {
      ToastAndroid.show(nextProps.dataDetailProduct.message, ToastAndroid.LONG)
    }
    if (nextProps.dataKategoriParent.status === 200) {
      this.setState({
        loading: false,
        nameCategory: nextProps.dataKategoriParent.categories.name
      })
    }

    if (!isFetching(dataDeleteProducts) && this.submitting.deleteProduct) {
      this.submitting = { ...this.submitting, deleteProduct: false }
      if (isError(dataDeleteProducts)) {
        ToastAndroid.show(dataDeleteProducts.message, ToastAndroid.SHORT)
      }
      if (isFound(dataDeleteProducts)) {
        this.setState({ loading: false })
        NavigationActions.pop({ refresh: { callback: !this.state.callback } })
        return true
      }
    }
  }

  componentDidMount () {
    Reactotron.log('detail product store')
    this.props.getDetailStoreProduct(this.state.id)
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop({ refresh: { callback: !this.state.callback } })
    return true
  }

  backButton () {
    NavigationActions.pop({ refresh: { callback: !this.state.callback } })
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  fee (price, commission) {
    let hargaDiskon = price - commission
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

  renderHeader () {
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => this.backButton()}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {this.state.productName}
        </Text>
        <TouchableOpacity onPress={() => this.delete()}>
          <Image
            source={Images.deletWhite}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  delete () {
    let data = []
    data[0] = this.state.product.id
    if (!this.submitting.deleteProduct) {
      this.submitting = {
        ...this.submitting,
        deleteProduct: true
      }
      this.props.deleteItems({product_ids: data})
    }
  }

  handleEditStatusStockDropshipping (title, action, color, id, data) {
    NavigationActions.statusstokdropshipping({
      type: ActionConst.PUSH,
      title: title,
      actionType: action,
      photoProduct: this.state.imageProduct,
      productName: this.state.product.name,
      idProduct: id,
      data: data,
      backgroundContainer: color
    })
  }

  checkDopshipper (data) {
    if (data) {
      this.statusDropship = 'Ya'
    } else {
      this.statusDropship = 'Tidak'
    }
    return (
      <Text style={styles.textValueMenu}>{this.statusDropship}</Text>
    )
  }

  checkDisplayProduct (data) {
    if (data === 1) {
      this.statusDisplay = 'Ditampilkan di toko'
    } else {
      this.statusDisplay = 'Disembunyikan'
    }
    return (
      <Text style={styles.textValueMenu}>{this.statusDisplay}</Text>
    )
  }

  renderStatusProduct () {
    return (
      <View style={{marginBottom: 21.4}}>
        <View style={styles.headerMenuRow}>
          <Text style={styles.textMenu}>Dropshipping</Text>
          <TouchableOpacity style={styles.touch}
            onPress={() => this.handleEditStatusStockDropshipping('Opsi Dropshipping', 'dropshippingAction', Colors.snow, this.state.product.id, this.state.product.is_dropship)}>
            {this.checkDopshipper(this.state.product.is_dropship)}
            <Image
              source={Images.rightArrow}
              style={[styles.imageStyle, {top: 1.5}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMenuRow}>
          <Text style={styles.textMenu}>Stock</Text>
          <TouchableOpacity style={styles.touch}
            onPress={() => this.handleEditStatusStockDropshipping('Stock Barang', 'stockAction', Colors.snow, this.state.product.id, this.state.product.stock)}>
            <Text style={styles.textValueMenu}>{this.state.product.stock}</Text>
            <Image
              source={Images.rightArrow}
              style={[styles.imageStyle, {top: 1}]}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.headerMenuRow, {borderBottomWidth: 0}]}>
          <Text style={styles.textMenu}>Status</Text>
          <TouchableOpacity style={styles.touch}
            onPress={() => this.handleEditStatusStockDropshipping('Opsi Status', 'displayAction', Colors.paleGrey, this.state.product.id, this.state.product.status)}>
            {this.checkDisplayProduct(this.state.product.status)}
            <Image
              source={Images.rightArrow}
              style={[styles.imageStyle, {top: 1}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  changePhotos (id, images) {
    let photo = []
    let file = []

    images.map((data, i) => {
      photo.push(data.file)
      file.push(data.file_name)
    })

    // Reactotron.log(photo)
    NavigationActions.editproductphoto({
      type: ActionConst.PUSH,
      id: id,
      foto: photo,
      fileName: file,
      callback: this.state.callback
    })
  }

  renderPhotoProduct () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow, {borderBottomWidth: 0}]}>
          <Text style={styles.titleMenu}>Foto Produk</Text>
          <TouchableOpacity onPress={() => this.changePhotos(this.state.product.id, this.state.imageProduct)}>
            <Text style={styles.buttonChange}>
              Ubah
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollImage}>
          <ListView
            horizontal
            enableEmptySections
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            showsHorizontalScrollIndicator={false}
            dataSource={this.dataSource.cloneWithRows(this.state.imageProduct)}
            renderRow={this.renderRowImageProduct.bind(this)}
          />
        </View>
      </View>
    )
  }

  renderRowImageProduct (rowData) {
    return (
      <View style={{backgroundColor: Colors.lightgrey2, marginRight: 10}}>
        <Image
          source={{uri: rowData.file}}
          style={styles.image}
        />
      </View>
    )
  }

  checkBarand (data) {
    if (data) {
      return (
        <View>
          <Text style={styles.textMenuNoFlex}>Brand</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, lineHeight: 20}]}>Nike</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  changeNameCategory (id) {
    NavigationActions.editproductnameandcategory({
      type: ActionConst.PUSH,
      nameProduct: this.state.productName,
      id: id,
      description: this.state.product.description,
      callback: this.state.callback
    })
    this.props.allCategory()
  }

  renderNameAndCategory () {
    let brand
    if (this.state.brand === null || this.state.brand === undefined) {
      brand = null
    } else {
      brand = (
        this.checkBarand(this.state.brand.is_checked)
      )
    }
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Nama dan Kategori</Text>
          <TouchableOpacity onPress={() => this.changeNameCategory(this.state.product.id)}>
            <Text style={styles.buttonChange}>
              Ubah
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct}>
          <Text style={styles.textMenuNoFlex}>Nama Produk</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, lineHeight: 20}]}>{this.state.product.name}</Text>
          <Text style={styles.textMenuNoFlex}>Kategori</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, lineHeight: 20}]}>{this.state.category.full_name}</Text>
          {brand}
          <Text style={styles.textMenuNoFlex}>Deskripsi Produk</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, paddingRight: 40, lineHeight: 20}]}>{this.state.product.description}</Text>
        </View>
      </View>
    )
  }

  komisiCalculate (value1, value2) {
    let value = (value1 * value2) / 100
    return value
  }

  detailReception () {
    let hargaTemp = Number(this.state.product.price)
    let komisi = String(this.state.product.commission)
    let hargaMasked = this.maskedMoney(hargaTemp)
    let komisiCalculate = this.komisiCalculate(hargaTemp, this.state.product.commission)
    let diskonMasked = this.maskedMoney(komisiCalculate)
    let diskonCalculate = this.fee(hargaTemp, komisiCalculate)
    let hargaDiskonMasked = this.maskedMoney(diskonCalculate)

    return (
      <View style={styles.rincianContainrer}>
        <Text style={[styles.titleMenu, {paddingLeft: 20, paddingBottom: 10}]}>Rincian Penerimaan</Text>
        <View>
          <View style={styles.containerRincian}>
            <Text style={styles.textRincian}>Harga Jual</Text>
            <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkgrey}]}>{hargaMasked}</Text>
          </View>
          <View style={styles.containerRincian}>
            <Text style={styles.textRincian}>Komisi  ({komisi}%  dari {hargaMasked})</Text>
            <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkgrey}]}>{diskonMasked}</Text>
          </View>
          <View style={[styles.containerRincian, {borderBottomWidth: 0, paddingBottom: 0}]}>
            <Text style={styles.textRincian}>Uang yang akan Anda terima</Text>
            <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkMint}]}>{hargaDiskonMasked}</Text>
          </View>
        </View>
      </View>
    )
  }

  checkDiscount (data) {
    if (data) {
      return (
        <View style={{flexDirection: 'row', paddingTop: 15.5, paddingBottom: 20.5}}>
          <Text style={[styles.textMenuNoFlex, {flex: 1, color: Colors.lightblack}]}>Diskon</Text>
          <Text style={[styles.textValueMenu, {paddingRight: 26, marginRight: 0}]}>{this.state.product.discount} %</Text>
        </View>
      )
    }
  }

  changePrice (id, price, discount, weight, insurance, condition, commission) {
    NavigationActions.editproductpriceandspecification({
      type: ActionConst.PUSH,
      id: id,
      name: this.state.product.name,
      price: price,
      discount: discount,
      weight: weight,
      insurance: insurance,
      condition: condition,
      callback: this.state.callback,
      commission: commission
    })
  }

  renderPriceAndSpesification () {
    const product = this.state.product
    var maskedPrices = this.maskedMoney(this.state.price)
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Harga dan Spesifikasi</Text>
          <TouchableOpacity onPress={() => this.changePrice(
            product.id,
            product.price,
            product.discount,
            product.weight,
            product.is_insurance,
            product.condition,
            product.commission
          )}
          >
            <Text style={styles.buttonChange}>
              Ubah
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.containerNameProduct, {paddingTop: 0, paddingBottom: 0}]}>
          <View style={{flexDirection: 'row', borderBottomColor: Colors.silver, borderBottomWidth: 0.5, paddingTop: 14.3, paddingBottom: 15.5}}>
            <Text style={[styles.textMenuNoFlex, {flex: 1, color: Colors.lightblack}]}>Harga</Text>
            <Text style={[styles.textValueMenu, {paddingRight: 26, marginRight: 0}]}>{maskedPrices}</Text>
          </View>
          {this.checkDiscount(this.state.product.is_discount)}
          {this.detailReception()}
        </View>
      </View>
    )
  }

  changeCatalog (id, catalogId) {
    NavigationActions.editproductcatalog({
      type: ActionConst.PUSH,
      id: id,
      catalogId: catalogId,
      callback: this.state.callback
    })
  }

  renderCatalog () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Katalog</Text>
          <TouchableOpacity onPress={() => this.changeCatalog(this.state.product.id, this.state.catalog.id)}>
            <Text style={styles.buttonChange}>
              Ubah
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct}>
          <Text style={[styles.textMenuNoFlex, {color: Colors.darkgrey}]}>{this.state.catalog.name}</Text>
        </View>
      </View>
    )
  }

  renderRowWholesaler (rowData) {
    var maskedPrices = this.maskedMoney(rowData.price)
    return (
      <View style={{flexDirection: 'row', borderBottomColor: Colors.silver, borderBottomWidth: 0.5, paddingTop: 19.3, paddingBottom: 18.5}}>
        <Text style={[styles.textMenuNoFlex, {flex: 1, color: Colors.darkgrey}]}>{rowData.min} - {rowData.max} Barang</Text>
        <Text style={[styles.textValueMenu, {paddingRight: 26, marginRight: 0}]}>{maskedPrices} / Barang</Text>
      </View>
    )
  }

  changeSale (id) {
    NavigationActions.editwholesale({
      type: ActionConst.PUSH,
      id: id,
      callback: this.state.callback
    })
  }

  renderWholeSale () {
    if (this.state.product.is_wholesaler) {
      return (
        <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
          <View style={[styles.headerMenuRow]}>
            <Text style={styles.titleMenu}>Grosir</Text>
            <TouchableOpacity onPress={() => this.changeSale(this.state.product.id)}>
              <Text style={styles.buttonChange}>
                Ubah
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.containerNameProduct, {paddingBottom: 0, paddingTop: 0, marginBottom: -2}]}>
            <ListView
              enableEmptySections
              contentContainerStyle={{ flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.wholesaler)}
              renderRow={this.renderRowWholesaler.bind(this)}
            />
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderRowExpedition (rowData) {
    return (
      <Text style={[styles.textValueMenu, {marginRight: 0, paddingBottom: 12}]}>{rowData.name}</Text>
    )
  }

  changeExpedition (id) {
    NavigationActions.editproductexpedition({
      type: ActionConst.PUSH,
      id: id,
      callback: this.state.callback
    })
  }

  renderExpedition () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Ekspedisi Pengiriman</Text>
          <TouchableOpacity onPress={() => this.changeExpedition(this.state.product.id)}>
            <Text style={styles.buttonChange}>
              Ubah
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct}>
          <ListView
            enableEmptySections
            contentContainerStyle={{ flexWrap: 'wrap' }}
            dataSource={this.dataSource.cloneWithRows(this.state.expeditionServices)}
            renderRow={this.renderRowExpedition.bind(this)}
          />
        </View>
      </View>
    )
  }

  refresh = () => {
    this.setState({ isRefreshing: true })
    this.props.getDetailProduk(this.state.product.id)
  }

  render () {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          {this.renderHeader()}
          <View style={styles.spinner}>
            <ActivityIndicator color={Colors.red} size='large' />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView
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
        >
          {this.renderStatusProduct()}
          {this.renderPhotoProduct()}
          {this.renderNameAndCategory()}
          {this.renderPriceAndSpesification()}
          {this.renderCatalog()}
          {this.renderWholeSale()}
          {this.renderExpedition()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDetailProduct: state.storeProductDetail,
    dataKategoriParent: state.subCategory,
    dataDeleteProducts: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduk: (id) => dispatch(storeAction.getStoreProductDetail({id: id})),
    allCategory: () => dispatch(categoriAction.categoryList()),
    getKategori: (id) => dispatch(categoriAction.subCategory({id})),
    getListProduk: (status) => dispatch(storeAction.getStoreProducts({hidden: status})),
    getHiddenProduct: () => dispatch(storeAction.getHiddenStoreProducts()),
    getDetailStoreProduct: (id) => dispatch(storeAction.getStoreProductDetail({id: id})),
    deleteItems: (param) => dispatch(productAction.deleteProducts(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProductStore)
