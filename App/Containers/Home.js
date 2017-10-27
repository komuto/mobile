import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { MaskService } from 'react-native-masked-text'
import { Images, Colors, Fonts } from '../Themes'
import ModalLogin from '../Components/ModalLogin'
import { marketplace } from '../config'

import {isFetching, isError, isFound} from '../Services/Status'
import ModalSearchGeneral from '../Components/Search'

// import YourActions from '../Redux/YourRedux'
import { connect } from 'react-redux'
import * as homeAction from '../actions/home'
import * as produkAction from '../actions/product'
import * as cartAction from '../actions/cart'
import * as wishlistAction from '../actions/user'

// Styles
import styles from './Styles/HomeStyle'

import FCM, {FCMEvent} from 'react-native-fcm'

const handleFCM = (data) => {
  console.log(data) // data.id, data.click_action
  switch (data.click_action) {
    case 'SELLER_MESSAGE' :
      return NavigationActions.sellernotificationmessagedetail({ type: ActionConst.PUSH, idMessage: data.id })
    case 'SELLER_DISCUSSION':
      return NavigationActions.sellernotificationdiscussion({ type: ActionConst.PUSH })
    case 'SELLER_REVIEW':
      return NavigationActions.sellernotificationreview({ type: ActionConst.PUSH })
    case 'SELLER_RESOLUTION':
      return NavigationActions.sellernotificationresolution({ type: ActionConst.PUSH })
    case 'BUYER_MESSAGE':
      return NavigationActions.buyerdetailmessage({ type: ActionConst.PUSH, idMessage: data.id })
    case 'BUYER_DISCUSSION':
      return NavigationActions.buyerdiscussion({ type: ActionConst.PUSH })
    case 'BUYER_RESOLUTION':
      return NavigationActions.buyerresolution({ type: ActionConst.PUSH })
    // case 'List_Follower': return Actions.follower({ userId: data.my_costum_data.user_id })
    // case 'List_Pending_Follow': return Actions.follower({ userId: data.my_costum_data.user_id })
    // case 'Detail_Conversation': return Actions.conversationDetail({conversationId: data.my_costum_data.conversation_id, friend: data.my_costum_data.friend})
  }
}

FCM.on(FCMEvent.Notification, async (notif) => {
  console.log(notif)
  let myCostumData = notif.id
  const data = {
    click_action: notif.type,
    id: myCostumData
  }
  FCM.presentLocalNotification({
    id: data.id,
    title: data.title,
    body: data.body,
    sound: 'default',
    priority: 'high',
    click_action: data.click_action,
    auto_cancel: true,
    large_icon: 'ic_stat_name',
    icon: 'ic_stat_name',
    big_text: data.title,
    sub_text: data.body,
    vibrate: 400,
    group: 'group',
    picture: 'ic_stat_name',
    ongoing: true,
    my_custom_data: data,
    lights: true,
    show_in_foreground: true
  })
  if (notif.opened_from_tray) {
    handleFCM(data)
  }
})

FCM.on(FCMEvent.RefreshToken, (token) => {
  console.log(token)
})

class Home extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.dataSourceSearch = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      category: false,
      products: false,
      wishlist: false,
      cart: false,
      search: false
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
      number: 0,
      isFound: false,
      modalSearch: false,
      refreshSearch: false,
      resultSearch: [],
      modalLogin: false
    }
  }

  componentWillMount () {
    FCM.getInitialNotification().then(notif => {
      console.log(notif)
      let myCostumData = notif.id
      const data = {
        click_action: notif.type,
        id: myCostumData
      }
      if (data !== undefined) {
        FCM.presentLocalNotification({
          id: data.id,
          title: data.title,
          body: data.body,
          sound: 'default',
          priority: 'high',
          click_action: data.click_action,
          auto_cancel: true,
          large_icon: 'ic_stat_name',
          icon: 'ic_stat_name',
          big_text: data.title,
          sub_text: data.body,
          vibrate: 400,
          group: 'group',
          picture: 'ic_stat_name',
          ongoing: true,
          my_custom_data: data,
          lights: true,
          show_in_foreground: true
        })
        handleFCM(data)
      }
    })
  }

  componentDidMount () {
    const { product, cartItems } = this.state
    if (!product.isFound) {
      this.submitting = {
        ...this.submitting,
        products: true
      }
      this.props.getProdukTerbaru(6)
    }

    if (!cartItems.isFound) {
      this.submitting = {
        ...this.submitting,
        cart: true
      }
      this.props.getCart()
    }
    this.submitting = {
      ...this.submitting,
      category: true
    }
    this.props.getKategori()
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps (nextProps) {
    const {propsProducts, propsCategory, propsWishlist, propsCart, dataSearch} = nextProps

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
        let tempData = []
        var i
        for (i = 0; i < 6; i++) {
          tempData.push(propsCategory.categories[i])
        }
        this.setState({ category: tempData })
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

    if (!isFetching(dataSearch) && this.submitting.search) {
      this.submitting = { ...this.submitting, search: false }
      if (isError(dataSearch)) {
        ToastAndroid.show(dataSearch.message, ToastAndroid.SHORT)
      }
      if (isFound(dataSearch)) {
        const result = dataSearch.products
        if (result.length === 0) {
          this.setState({
            resultSearch: dataSearch.products,
            isFound: true,
            refreshSearch: false
          })
        } else {
          this.setState({
            resultSearch: dataSearch.products,
            isFound: false,
            refreshSearch: false
          })
        }
      }
    }
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
    this.setState({ search: text, isFound: false, refreshSearch: true })
    this.submitting.search = true
    if (text !== '') {
      this.props.getSearch({q: text})
    } else {
      this.props.getSearch({q: 'null'})
    }
  }

  detailResult (name) {
    this.setState({ modalSearch: false, page: 1, resultSearch: [], search: '' })
    NavigationActions.newproduct({ header: name, type: ActionConst.PUSH, query: name })
  }

  searchFocus () {
    this.setState({
      isFound: false,
      search: ''
    })
  }

  renderRowSearch (rowData) {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.detailResult(rowData.name)}>
        <Text style={styles.textResult}>
          {rowData.name}
        </Text>
      </TouchableOpacity>
    )
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
      this.setState({
        modalLogin: true
      })
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
        dataSource={this.dataSource.cloneWithRows(this.state.category)}
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
      // Alert.alert('Pesan', 'Anda belum login')
      this.setState({
        modalLogin: true
      })
    }
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

  onClose () {
    this.setState({
      modalLogin: false
    })
  }

  render () {
    const name = marketplace
    const { modalLogin } = this.state
    let view = null
    if (modalLogin) {
      view = <ModalLogin visible={modalLogin} onClose={() => this.onClose()} />
    }
    return (
      <ParallaxScrollView
        backgroundColor={Colors.snow}
        stickyHeaderHeight={50}
        parallaxHeaderHeight={110}
        backgroundSpeed={10}
        renderBackground={() => (
          <View key='background' style={{ backgroundColor: Colors.greenish }} />
        )}
        renderForeground={() => (
          <View key='parallax-header' style={{ backgroundColor: Colors.snow }} >
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={styles.textHeader}>
                  {name}
                </Text>
                <TouchableOpacity style={styles.buttonHeader} onPress={() => this.wishlist()}>
                  <Image source={Images.love} style={styles.imagestyle} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonHeader} onPress={() => this.keranjang()}>
                  <Image source={Images.shoppingCart} style={styles.imagestyle} />
                  {this.renderCartNumber()}
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.searchContainer} onPress={() => this.setState({modalSearch: true})}>
                <Image source={Images.searchGrey} style={styles.searchImage} />
                <View style={styles.textInputContainer}>
                  <Text style={styles.inputText}>
                    Cari Barang
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        renderStickyHeader={() => (
          <View key='sticky-header' style={{ backgroundColor: Colors.snow }}>
            <TouchableOpacity style={styles.floatingSearch} onPress={() => this.setState({modalSearch: true})}>
              <Image source={Images.searchGrey} style={styles.searchImage} />
              <View style={styles.textInputContainer}>
                <Text style={styles.inputText}>
                  Cari Barang
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
            Kategori Produk
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
          {view}
          <ModalSearchGeneral
            visible={this.state.modalSearch}
            onBack={() => this.setState({modalSearch: false})}
            onRequestClose={() => this.setState({modalSearch: false})}
            refreshing={this.state.refreshSearch}
            value={this.state.search}
            onChangeText={this.handleTextSearch}
            notFound={this.state.isFound}
            dataSource={this.dataSourceSearch.cloneWithRows(this.state.resultSearch)}
            renderRow={this.renderRowSearch.bind(this)}
            onChangeSearch={() => this.searchFocus()}
          />
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
    propsCart: state.cart,
    dataSearch: state.searchProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: () => dispatch(homeAction.categoryList({ limit: 6 })),
    getProdukTerbaru: (limit) => dispatch(homeAction.products({limit})),
    addWishList: (id) => dispatch(produkAction.addToWishlist({ id: id })),
    resetAddToWishlist: () => dispatch(produkAction.resetAddToWishlistHome()),
    getWishlist: () => dispatch(wishlistAction.wishlist()),
    getCart: () => dispatch(cartAction.getCart()),
    getCartReset: () => dispatch(cartAction.getCartReset()),
    getSearch: (param) => dispatch(homeAction.search(param)),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
