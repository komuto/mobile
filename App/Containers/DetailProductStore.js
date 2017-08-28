import React from 'react'
import { ScrollView, ActivityIndicator, ToastAndroid, ListView, Text, View, RefreshControl, BackAndroid, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import * as categoriAction from '../actions/home'
import * as storeAction from '../actions/stores'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailProductStoreStyle'
import { Images, Colors, Fonts } from '../Themes'

class DetailProductStore extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
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
      id: '',
      isRefreshing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetailProduct.status === 200) {
      this.setState({
        brand: nextProps.dataDetailProduct.storeProductDetail.brand,
        catalog: nextProps.dataDetailProduct.storeProductDetail.catalog,
        expeditionServices: nextProps.dataDetailProduct.storeProductDetail.expedition_services,
        wholesaler: nextProps.dataDetailProduct.storeProductDetail.wholesaler,
        product: nextProps.dataDetailProduct.storeProductDetail.product,
        price: nextProps.dataDetailProduct.storeProductDetail.product.price,
        category: nextProps.dataDetailProduct.storeProductDetail.category,
        id: nextProps.dataDetailProduct.storeProductDetail.category.parent_id,
        imageProduct: nextProps.dataDetailProduct.storeProductDetail.images,
        loading: false,
        isRefreshing: false
      })
      nextProps.dataDetailProduct.status = 0
      this.props.getKategori(nextProps.dataDetailProduct.storeProductDetail.category.parent_id)
    } else if (nextProps.dataDetailProduct.status) {
      ToastAndroid.show('Terjadi kesalahan.. ' + nextProps.dataDetailProduct.message, ToastAndroid.LONG)
    }
    if (nextProps.dataKategoriParent.status === 200) {
      this.setState({
        loading: false,
        nameCategory: nextProps.dataKategoriParent.categories.name
      })
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    this.props.getListProduk(false)
    this.props.getHiddenProduct()
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
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
        <TouchableOpacity onPress={() => this.openLaporkan()}>
          <Image
            source={Images.deletWhite}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  handleEditStatusStockDropshipping (title, action, color, id, data) {
    NavigationActions.statusstokdropshipping({
      type: ActionConst.PUSH,
      title: title,
      actionType: action,
      photoProduct: Images.contohproduct,
      productName: 'Sepatu Nike Run Orange',
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

  changePhotos (id) {
    NavigationActions.editproductphoto({
      type: ActionConst.PUSH,
      id: id
    })
  }

  renderPhotoProduct () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow, {borderBottomWidth: 0}]}>
          <Text style={styles.titleMenu}>Foto Produk</Text>
          <TouchableOpacity onPress={() => this.changePhotos(this.state.product.id)}>
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

  checkCategory (data) {
    return (
      <Text style={[styles.textValueMenu, {paddingBottom: 15, lineHeight: 20}]}>{this.state.nameCategory} / {this.state.category.name}</Text>
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
      description: this.state.product.description
    })
    console.log(id)
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
          {this.checkCategory(this.state.category)}
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

  maskedText (value) {
    const price = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return price
  }

  detailReception () {
    if (this.state.product.is_wholesaler) {
      let hargaTemp = Number(this.state.product.price)
      let komisi = 10
      let hargaMasked = this.maskedText(hargaTemp)
      let komisiCalculate = this.komisiCalculate(hargaTemp, komisi)
      let diskonMasked = this.maskedText(komisiCalculate)
      let diskonCalculate = this.discountCalculate(hargaTemp, komisi)
      let hargaDiskonMasked = this.maskedText(diskonCalculate)

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
    } else {
      return (
        <View />
      )
    }
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

  changePrice (id, price, discount, weight, insurance, condition) {
    NavigationActions.editproductpriceandspecification({
      type: ActionConst.PUSH,
      id: id,
      name: this.state.product.name,
      price: price,
      discount: discount,
      weight: weight,
      insurance: insurance,
      condition: condition
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
            product.condition
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

  changeCatalog (id) {
    console.log(id)
    NavigationActions.editproductcatalog({
      type: ActionConst.PUSH,
      id: id
    })
  }

  renderCatalog () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Katalog</Text>
          <TouchableOpacity onPress={() => this.changeCatalog(this.state.product.id)}>
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

  changeSale () {
    NavigationActions.editwholesale({
      type: ActionConst.PUSH
    })
  }

  renderWholeSale () {
    if (this.state.product.is_wholesaler) {
      return (
        <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
          <View style={[styles.headerMenuRow]}>
            <Text style={styles.titleMenu}>Grosir</Text>
            <TouchableOpacity onPress={() => this.changeSale()}>
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
      <Text style={[styles.textValueMenu, {marginRight: 0, paddingBottom: 12}]}>{rowData}</Text>
    )
  }

  changeExpedition (id) {
    NavigationActions.editproductexpedition({
      type: ActionConst.PUSH,
      id: id
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
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
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
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDetailProduct: state.storeProductDetail,
    dataKategoriParent: state.subCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduk: (id) => dispatch(storeAction.getStoreProductDetail({id: id})),
    allCategory: () => dispatch(categoriAction.categoryList()),
    getKategori: (id) => dispatch(categoriAction.subCategory({id: id})),
    getListProduk: (status) => dispatch(storeAction.getStoreProducts({hidden: status})),
    getHiddenProduct: () => dispatch(storeAction.getHiddenStoreProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProductStore)
