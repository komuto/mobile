import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { MaskService } from 'react-native-masked-text'
// import Reactotron from 'reactotron-react-native'
import { Images, Colors, Fonts } from '../Themes'

import {isFetching, isError, isFound} from '../Services/Status'

// import YourActions from '../Redux/YourRedux'
import { connect } from 'react-redux'
import * as homeAction from '../actions/home'
import * as produkAction from '../actions/product'
import * as cartAction from '../actions/cart'
import * as wishlistAction from '../actions/user'

// Styles
import styles from './Styles/HomeStyle'

class Home extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      category: false,
      products: false,
      wishlist: false,
      cart: false
    }
    this.state = {
      product: props.propsProducts || null,
      category: props.propsCategory || null,
      wishlist: props.propsWishlist || null,
      tipe: this.props.tipe || 'home',
      search: '',
      loading: true,
      getCartHome: true,
      isLogin: this.props.datalogin.login,
      cartItems: props.propsCart || null,
      number: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsProducts, propsCategory, propsWishlist, propsCart} = nextProps

    if (!isFetching(propsProducts) && this.submitting.products) {
      this.submitting = { ...this.submitting, products: false }
      if (isError(propsProducts)) {
        ToastAndroid.show(propsProducts.message, ToastAndroid.SHORT)
      }
      if (isFound(propsProducts)) {
        this.setState({ product: propsProducts })
      }
    }

    if (!isFetching(propsCategory) && this.submitting.category) {
      this.submitting = { ...this.submitting, category: false }
      if (isError(propsCategory)) {
        ToastAndroid.show(propsCategory.message, ToastAndroid.SHORT)
      }
      if (isFound(propsCategory)) {
        this.setState({ category: propsCategory })
      }
    }

    if (!isFetching(propsWishlist) && this.submitting.wishlist) {
      this.submitting = { ...this.submitting, wishlist: false }
      if (isError(propsWishlist)) {
        ToastAndroid.show(propsWishlist.message, ToastAndroid.SHORT)
      }
      if (isFound(propsWishlist)) {
        this.setState({ wishlist: propsWishlist })
      }
    }

    if (this.state.getCartHome && !isFetching(propsCart) && this.submitting.cart) {
      this.submitting = { ...this.submitting, cart: false }
      if (isError(propsCart)) {
        // ToastAndroid.show(propsCart.message, ToastAndroid.SHORT)
      }
      if (isFound(propsCart)) {
        if (propsCart.cart.items.length > 0) {
          this.setState({
            cartItems: propsCart,
            getCartHome: false,
            number: propsCart.cart.items.length
          })
        }
      }
    }

    if (!isFetching(propsProducts) && !isFetching(propsCategory)) {
      this.setState({ loading: false })
    }
  }

  componentDidMount () {
    const { product, category, cartItems } = this.state
    if (!product.isFound) {
      this.submitting = {
        ...this.submitting,
        products: true
      }
      this.props.getProdukTerbaru(6)
    }
    if (!category.isFound) {
      this.submitting = {
        ...this.submitting,
        category: true
      }
      this.props.getKategori()
    }

    if (!cartItems.isFound) {
      this.submitting = {
        ...this.submitting,
        cart: true
      }
      this.props.getCart()
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    this.submitting = {
      ...this.submitting,
      products: false,
      category: false
    }
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (this.state.tipe === 'search') {
      this.setState({
        tipe: 'home',
        search: ''
      })
      return true
    } else if (NavigationActions.pop()) {
      NavigationActions.pop()
      return true
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
  }

  addWishList (id) {
    const {isLogin, product} = this.state
    if (isLogin) {
      this.submitting = {
        ...this.submitting,
        wishlist: true
      }
      product.products.map((myProduct) => {
        if (myProduct.product.id === id) {
          myProduct.product.is_liked ? myProduct.product.count_like -= 1 : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
        }
      })
      this.props.addWishList(id)
      this.setState({ product })
    } else {
      Alert.alert('Pesan', 'Anda belum login')
    }
  }

  renderVerified (status) {
    if (status) {
      return (
        <Image source={Images.verified} style={styles.imageVerified} />
      )
    }
    return (
      <Image source={Images.love} style={styles.imageVerified} />
    )
  }

  renderDiskon (status, nominal) {
    if (status) {
      const money = MaskService.toMask('money', nominal, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
      return (
        <Text style={styles.nominalDiskon}>
          {money}
        </Text>
      )
    }
    return (
      <Text style={styles.nominalDiskon1}>
        asd
      </Text>
    )
  }

  renderLikes (status, id) {
    if (status) {
      return (
        <TouchableOpacity onPress={() => this.addWishList(id)}>
          <Image source={Images.lovered} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this.addWishList(id)}>
        <Image source={Images.love} style={styles.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  checkDiscount (discount, isDiscount, isWholesaler) {
    if (isDiscount) {
      return (
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {discount}%
          </Text>
        </View>
      )
    } if (isWholesaler) {
      return (
        <View style={[styles.containerDiskon, {backgroundColor: Colors.green}]}>
          <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny}]}>
            GROSIR
          </Text>
        </View>
      )
    } else {
      return (<View />)
    }
  }

  renderRowProduk (rowData) {
    if (rowData.product.is_discount) {
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.hargaDiskon = rowData.product.price
    }

    const totalHarga = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5} onPress={() =>
        this.produkDetail(rowData.product.id)}>
        <Image source={{ uri: rowData.product.image }} style={styles.imageProduct} />
        {this.checkDiscount(rowData.product.discount, rowData.product.is_discount, rowData.product.is_wholesaler)}
        <Text style={styles.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={styles.tokoContainer}>
          <Text style={styles.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.is_verified)}
        </View>
        {this.renderDiskon(rowData.product.is_discount, rowData.product.price)}
        <Text style={styles.harga}>
          {totalHarga}
        </Text>
        <View style={styles.likesContainer}>
          {this.renderLikes(rowData.product.is_liked, rowData.product.id)}
          <Text style={styles.like}>
            {rowData.product.count_like}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderProduk () {
    if (this.submitting.products) {
      return (
        <View style={styles.spinnerProduk}>
          <ActivityIndicator color='#ef5656' size='small' />
        </View>
      )
    }
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        dataSource={this.dataSource.cloneWithRows(this.state.product.products)}
        renderRow={this.renderRowProduk.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRowKategori (rowData) {
    return (
      <TouchableOpacity style={styles.category} onPress={() => this.handleDetailKategori(rowData.id, rowData.name)}>
        <Image source={{uri: rowData.icon}} style={styles.imageCategory} />
        <Text style={styles.textCategory}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderKategori () {
    if (this.submitting.products) {
      return (
        <View style={styles.spinnerKategori}>
          <ActivityIndicator color='#ef5656' size='small' />
        </View>
      )
    }
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        dataSource={this.dataSource.cloneWithRows(this.state.category.categories)}
        initialListSize={3}
        renderRow={this.renderRowKategori.bind(this)}
        enableEmptySections
      />
    )
  }

  semuaKategori () {
    NavigationActions.category1({ type: ActionConst.PUSH })
  }

  wishlist () {
    if (this.state.isLogin) {
      this.props.getWishlist()
      NavigationActions.wishlist({ type: ActionConst.PUSH })
    } else {
      Alert.alert('Pesan', 'Anda belum login')
    }
  }

  openSearch () {
    this.setState({
      tipe: 'search'
    })
  }

  search () {
    NavigationActions.search({ type: ActionConst.PUSH, from: 'home' })
  }

  produkTerbaru () {
    NavigationActions.newproduct({
      type: ActionConst.PUSH,
      header: 'Produk Terbaru'
    })
  }

  produkDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  handleDetailKategori (rowId, title) {
    NavigationActions.category4({
      type: ActionConst.PUSH,
      id: rowId,
      header: title,
      name: title
    })
  }

  keranjang () {
    NavigationActions.purchasecart({
      type: ActionConst.PUSH
    })
    this.props.getCart()
  }

  renderCartNumber () {
    if (this.state.number > 0) {
      return (
        <View style={styles.containerNumber}>
          <Text style={styles.number}>
            {String(this.state.number)}
          </Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render () {
    return (
      <ParallaxScrollView
        backgroundColor={Colors.snow}
        stickyHeaderHeight={50}
        parallaxHeaderHeight={110}
        backgroundSpeed={10}
        renderBackground={() => (
          <View key='background' style={{ backgroundColor: Colors.snow }} />
        )}
        renderForeground={() => (
          <View key='parallax-header' style={{ backgroundColor: Colors.snow }} >
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={styles.textHeader}>
                  Galaksi Parabola
                </Text>
                <TouchableOpacity style={styles.buttonHeader} onPress={() => this.wishlist()}>
                  <Image source={Images.love} style={styles.imagestyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonHeader} onPress={() => this.keranjang()}>
                  <Image source={Images.shoppingCart} style={styles.imagestyle} />
                  {this.renderCartNumber()}
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.searchContainer} onPress={() => this.search()}>
                <Image source={Images.searchGrey} style={styles.searchImage} />
                <View style={styles.textInputContainer}>
                  <Text style={styles.inputText}>
                    Cari barang atau toko
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        renderStickyHeader={() => (
          <View key='sticky-header' style={{ backgroundColor: Colors.snow }}>
            <TouchableOpacity style={styles.floatingSearch} onPress={() => this.search()}>
              <Image source={Images.searchGrey} style={styles.searchImage} />
              <View style={styles.textInputContainer}>
                <Text style={styles.inputText}>
                  Cari barang atau toko
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      >
        <View style={styles.container}>
          <Swiper height={165} autoplay autoplayTimeout={3.5}>
            <View style={styles.slider}>
              <Image style={styles.imageSlider} source={Images.slider1} resizeMode='stretch' />
            </View>
            <View style={styles.slider}>
              <Image style={styles.imageSlider} source={Images.slider2} resizeMode='stretch' />
            </View>
            <View style={styles.slider}>
              <Image style={styles.imageSlider} source={Images.slider3} resizeMode='stretch' />
            </View>
          </Swiper>
          <Text style={styles.titleCategory}>
            Kategory Produk
          </Text>
          {this.renderKategori()}
          <TouchableOpacity style={styles.allCategory} onPress={() => this.semuaKategori()}>
            <Text style={styles.textAllCategory}>
              Lihat semua kategori
            </Text>
            <Image source={Images.rightArrow} style={styles.imageCategory} />
          </TouchableOpacity>
          <Text style={styles.titleCategory}>
            Produk Terbaru
          </Text>
          {this.renderProduk()}
          <TouchableOpacity style={styles.allCategory} onPress={() => this.produkTerbaru()}>
            <Text style={styles.textAllCategory}>
              Lihat semua produk terbaru
            </Text>
            <Image source={Images.rightArrow} style={styles.imageCategory} />
          </TouchableOpacity>
        </View>
      </ParallaxScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    propsCategory: state.category,
    propsProducts: state.products,
    datalogin: state.isLogin,
    propsWishlist: state.addWishlist,
    propsCart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: () => dispatch(homeAction.categoryList()),
    getProdukTerbaru: (limit) => dispatch(homeAction.products({limit})),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id})),
    addWishList: (id) => dispatch(produkAction.addToWishlist({ id: id })),
    resetAddToWishlist: () => dispatch(produkAction.resetAddToWishlistHome()),
    getWishlist: () => dispatch(wishlistAction.wishlist()),
    getCart: () => dispatch(cartAction.getCart()),
    getCartReset: () => dispatch(cartAction.getCartReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
