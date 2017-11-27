import React from 'react'
import {
  View,
  Image,
  BackAndroid,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ListView,
  RefreshControl,
  ScrollView,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import RupiahFormat from '../Services/MaskedMoneys'

import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
// import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as userAction from '../actions/user'
import * as productAction from '../actions/product'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/ListFavoriteStoresStyle'
import { Images, Colors, Fonts } from '../Themes/'

class ListFavoriteStores extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      list: false,
      search: false,
      updateFavorite: false,
      wishlist: false
    }
    this.state = {
      search: '',
      listStore: [],
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: true,
      loadingPage: true,
      gettingData: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsListStore, propsFavStore, propsWishlist} = nextProps

    if (!isFetching(propsListStore) && this.submitting.list) {
      this.submitting = { ...this.submitting, list: false }
      if (isError(propsListStore)) {
        ToastAndroid.show(propsListStore.message, ToastAndroid.SHORT)
      }
      if (isFound(propsListStore)) {
        const isFound = propsListStore.stores.length
        this.setState({isRefreshing: false})
        if (isFound >= 10) {
          const data = [...this.state.listStore, ...propsListStore.stores]
          this.setState({
            listStore: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false,
            gettingData: false
          })
        } else {
          const data = [...this.state.listStore, ...propsListStore.stores]
          this.setState({
            listStore: data,
            isLoading: false,
            loadmore: false,
            page: 1,
            isRefreshing: false,
            gettingData: false
          })
        }
      }
    }

    if (!isFetching(propsWishlist) && this.submitting.wishlist) {
      this.submitting = { ...this.submitting, wishlist: false }
      if (isError(propsWishlist)) {
        ToastAndroid.show(propsWishlist.message, ToastAndroid.SHORT)
      }
      if (isFound(propsWishlist)) {
      }
    }

    if (!isFetching(propsFavStore) && this.submitting.updateFavorite) {
      this.submitting = { ...this.submitting, updateFavorite: false, list: true }
      if (isError(propsFavStore)) {
        ToastAndroid.show(propsFavStore.message, ToastAndroid.SHORT)
      }
      if (isFound(propsFavStore)) {
        this.submitting.list = true
        this.props.getListFavStore({page: 1})
        ToastAndroid.show(propsFavStore.message, ToastAndroid.SHORT)
      }
    }
  }

  componentDidMount () {
    const {listStore} = this.state
    if (!listStore.isFound || !this.submitting.list) {
      this.submitting = {
        ...this.submitting,
        list: true
      }
      this.props.getListFavStore({page: 1})
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

  backToHome () {
    NavigationActions.backtab({
      type: ActionConst.RESET
    })
    return true
  }

  loadMore () {
    const { page, loadmore, search } = this.state
    if (loadmore) {
      this.submitting.list = true
      this.props.getListFavStore({page: page, q: search})
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, gettingData: true, listStore: [], page: 1 })
    this.submitting.list = true
    this.props.getListFavStore({page: 1})
  }

  handleTextSearch = (text) => {
    this.setState({ isRefreshing: true, search: text, gettingData: true, listStore: [] })
    this.trySearch(text)
  }

  trySearch (text) {
    if (text !== '') {
      this.submitting.list = true
      setTimeout(() => {
        this.props.getListFavStore({page: 1, q: text})
      }, 3000)
    } else {
      this.submitting.list = true
      this.props.getListFavStore({page: 1})
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
            placeholder='Cari Toko Favorit Anda disini'
          />
        </View>
      </View>
    )
  }

  addWishList (id) {
    const {listStore} = this.state
    this.submitting = {
      ...this.submitting,
      wishlist: true
    }
    listStore.map((myProduct, i) => {
      myProduct.products.map((data, i) => {
        if (data.id === id) {
          data.is_liked ? data.count_like -= 1 : data.count_like += 1
          data.is_liked = !data.is_liked
        }
      })
    })
    this.props.addWishList(id)
    this.setState({ listStore })
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

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  renderDiskon (status, nominal) {
    if (status) {
      const money = this.maskedMoney(nominal)
      return (
        <Text style={styles.nominalDiskon}>
          {money}
        </Text>
      )
    }
    return (
      <Text />
    )
  }

  checkDiscount (discount, isDiscount, isWholesaler) {
    if (isDiscount && isWholesaler) {
      return (
        <View stlye={{left: -10, flexDirection: 'column'}}>
          <View style={styles.containerDiskon}>
            <Text style={styles.diskon}>
              {discount}%
            </Text>
          </View>
          <View style={styles.containerDiskon2}>
            <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny}]}>
              GROSIR
            </Text>
          </View>
        </View>
      )
    } if (isDiscount) {
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

  renderRowProduk (rowData, id, logo) {
    const mapProduct = rowData.map((data, i) => {
      if (data.is_discount) {
        this.hargaDiskon = this.discountCalculate(data.price, data.discount)
      } else {
        this.hargaDiskon = data.price
      }

      const money = this.maskedMoney(this.hargaDiskon)
      return (
        <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5} onPress={() => this.handleDetailProduct(data.id)}>
          <Image source={{uri: data.image}} style={styles.imageProduct} >
            {this.checkDiscount(data.discount, data.is_discount, data.is_wholesaler)}
          </Image>
          <Text style={styles.textTitleProduct}>
            {data.name}
          </Text>
          {this.renderDiskon(data.is_discount, data.price)}
          <Text style={styles.harga}>
            {money}
          </Text>
          <View style={styles.likesContainer}>
            {this.renderLikes(data.is_liked, data.id)}
            <Text style={styles.like}>
              {data.count_like}
            </Text>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingBottom: 12}}>
        {mapProduct}
        <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5} onPress={() => this.handleDetailStore(id)}>
          <View style={styles.iconflexColumn}>
            <Image source={Images.listProduk} style={styles.bitmap} />
            <Text style={styles.fontsemiBoldCharcoal}>
              Lihat Barang{'\n'}Selengkapnya
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  renderRowListStore (rowData) {
    return (
      <View>
        <View style={styles.storeInfo}>
          <View style={styles.maskedBitmap}>
            <Image source={{uri: rowData.store.logo}} style={styles.bitmap} />
          </View>
          <View style={styles.column}>
            <View style={styles.flexRow1}>
              <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.fontboldSlate}>{rowData.store.name}</Text>
              <Image source={Images.infoDone} style={styles.iconOval} />
            </View>
            <Text style={styles.fontregularBrowGrey}>{rowData.store.province.name}</Text>
          </View>
          <TouchableOpacity onPress={() => this.handlePutFavStore(rowData.store.id)}>
            <Image source={Images.keranjang} style={styles.searchImage} />
          </TouchableOpacity>
        </View>
        {this.renderRowProduk(rowData.products, rowData.store.id, rowData.store.logo)}
      </View>
    )
  }

  handleDetailStore (id) {
    this.props.getStore({id: id})
    NavigationActions.storedetail({ type: ActionConst.PUSH })
  }

  handleDetailProduct (id) {
    this.props.getDetailProduct({id: id})
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
  }

  handlePutFavStore (id) {
    if (!this.submitting.list) {
      this.submitting = {
        ...this.submitting,
        updateFavorite: true
      }
      this.setState({isRefreshing: true, gettingData: true, listStore: []})
      this.props.putFavoriteStore({id: id})
    }
  }

  render () {
    const {gettingData, listStore} = this.state
    let view
    if (!gettingData) {
      if (listStore.length > 0) {
        view = (
          <View style={{
            flex: 1
          }}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.listStore)}
              renderRow={this.renderRowListStore.bind(this)}
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
              onEndReached={this.loadMore.bind(this)}
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
            />
          </View>
        )
      } else {
        view = (
          <View style={styles.imageContainer}>
            <Image source={Images.notFound} style={styles.image} />
            <Text style={styles.textLabel}>Toko Favorit Anda Kosong</Text>
            <Text style={styles.textInfo}>
              Anda belum menambah toko apapun ke dalam daftar toko favorit
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => this.backToHome()}>
                <Text style={styles.textButton}>Kembali ke Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    } else {
      view = (
        <View style={{
          flex: 1
        }}>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.listStore)}
            renderRow={this.renderRowListStore.bind(this)}
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
            onEndReached={this.loadMore.bind(this)}
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
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderSearch()}
        {view}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  propsListStore: state.listFavoriteStore,
  propsFavStore: state.favorite,
  propsWishlist: state.addWishlist
})

const mapDispatchToProps = (dispatch) => ({
  getListFavStore: (param) => dispatch(userAction.listFavorite(param)),
  putFavoriteStore: (param) => dispatch(userAction.favoriteStore(param)),
  getStore: (param) => dispatch(storeAction.getStores(param)),
  getDetailProduct: (param) => dispatch(productAction.getProduct(param)),
  addWishList: (id) => dispatch(productAction.addToWishlist({ id: id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListFavoriteStores)
