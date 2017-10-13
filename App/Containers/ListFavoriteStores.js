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
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import {MaskService} from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as userAction from '../actions/user'
import * as productAction from '../actions/product'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/ListFavoriteStoresStyle'
import { Images, Colors } from '../Themes/'

class ListFavoriteStores extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      list: false
    }
    this.state = {
      search: '',
      listStore: [],
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: true,
      loadingPage: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsListStore} = nextProps
    if (propsListStore.status === 200 && this.submitting.list) {
      this.submitting = { ...this.submitting, list: false }
      if (propsListStore.stores.length > 0) {
        let data = [...this.state.listStore, ...propsListStore.stores]
        this.setState({
          listStore: data,
          page: this.state.page + 1,
          isRefreshing: false,
          isLoading: false,
          loadmore: true,
          loadingPage: false
        })
      } else {
        this.setState({
          loadmore: false,
          isLoading: false
        })
      }
    }
  }

  componentDidMount () {
    const {listStore} = this.state
    if (listStore) {
      this.submitting = {
        ...this.submitting,
        list: true
      }
      this.props.getListFavStore(1)
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

  loadMore () {
    const { page, loadmore } = this.state
    if (loadmore) {
      this.submitting.list = true
      this.props.getListFavStore(page)
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, listStore: [], page: 1 })
    this.submitting.list = true
    this.props.getListFavStore(1)
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
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
            placeholder='Cari Toko Favorit Anda disini'
          />
        </View>
      </View>
    )
  }

  renderLikes (status) {
    if (status) {
      return (
        <TouchableOpacity>
          <Image source={Images.love} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity>
        <Image source={Images.love} style={styles.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
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
      <Text />
    )
  }

  checkDiscount (data, isDiscount) {
    if (isDiscount) {
      return (
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {data}%
          </Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderRowProduk (rowData, id) {
    const mapProduct = rowData.map((data, i) => {
      if (data.is_discount) {
        this.hargaDiskon = this.discountCalculate(data.price, data.discount)
      } else {
        this.hargaDiskon = data.price
      }

      const money = MaskService.toMask('money', this.hargaDiskon, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
      return (
        <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5} onPress={() => this.handleDetailProduct(data.id)}>
          <View style={styles.maskedimageProduct}>
            <Image source={{uri: data.image}} style={styles.imageProduct} />
          </View>
          {this.checkDiscount(data.discount, data.is_discount)}
          <Text style={styles.textTitleProduct}>
            {data.name}
          </Text>
          {this.renderDiskon(data.is_discount, data.price)}
          <Text style={styles.harga}>
            {money}
          </Text>
          <View style={styles.likesContainer}>
            {/* {this.renderLikes(data.is_liked, data.id)} */}
            <Text style={styles.like}>
              {data.stock}
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
      <TouchableOpacity style={styles.containerList} activeOpacity={0.8} onPress={() => this.handleDetailStore(rowData.store.id)}>
        <View style={styles.storeInfo}>
          <View style={styles.maskedBitmap}>
            <Image source={{uri: rowData.store.logo}} style={styles.bitmap} />
          </View>
          <View style={styles.column}>
            <View style={styles.flexRow1}>
              <Text style={styles.fontboldSlate}>{rowData.store.name}</Text>
              <Image source={Images.infoDone} style={styles.iconOval} />
            </View>
            <Text style={styles.fontregularBrowGrey}>{rowData.store.province.name}</Text>
          </View>
          <TouchableOpacity onPress={() => this.handlePutFavStore(rowData.store.id)}>
            <Image source={Images.keranjang} style={styles.searchImage} />
          </TouchableOpacity>
        </View>
        {this.renderRowProduk(rowData.products, rowData.store.id)}
      </TouchableOpacity>
    )
  }

  handleDetailStore (id) {
    this.props.getStore(id)
    NavigationActions.storedetail({ type: ActionConst.PUSH })
  }

  handleDetailProduct (id) {
    this.props.getDetailProduct(id)
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
  }

  handlePutFavStore (id) {
    this.props.putFavoriteStore(id)
  }

  render () {
    if (this.state.loadingPage) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {/* {this.renderSearch()} */}
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
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  propsListStore: state.listFavoriteStore,
  propsFavStore: state.favorite
})

const mapDispatchToProps = (dispatch) => ({
  getListFavStore: (page) => dispatch(userAction.listFavorite({page: page})),
  putFavoriteStore: (id) => dispatch(userAction.favoriteStore({id: id})),
  getStore: (id) => dispatch(storeAction.getStores({ id: id })),
  getDetailProduct: (id) => dispatch(productAction.getProduct({id: id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListFavoriteStores)
