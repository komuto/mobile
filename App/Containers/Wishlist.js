import React from 'react'
import {
  ScrollView,
  Image,
  View,
  TextInput,
  ListView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import * as produkAction from '../actions/product'
import * as userAction from '../actions/user'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WishlistStyle'
import stylesProduk from './Styles/ProdukTerbaruScreenStyle'
import stylesHome from './Styles/HomeStyle'

class Wishlist extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSourceRow = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      search: '',
      listDataSource: [],
      rowDataSource: [],
      loading: false,
      tipeView: 'grid',
      sortModal: false,
      terbaruColor: Colors.lightblack,
      termurahColor: Colors.lightblack,
      termahalColor: Colors.lightblack,
      terlarisColor: Colors.lightblack,
      terbaruCek: 0,
      termurahCek: 0,
      termahalCek: 0,
      terlarisCek: 0,
      loadmore: true,
      gettingSort: true,
      sort: 'newest',
      page: 1
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataWishlist.status === 200) {
      if (nextProps.dataWishlist.wishlist.length > 0) {
        const data = [...this.state.listDataSource, ...nextProps.dataWishlist.wishlist]
        this.setState({
          listDataSource: data,
          rowDataSource: data,
          loading: false,
          loadmore: true,
          gettingSort: false,
          page: this.state.page + 1
        })
      } else {
        this.setState({
          loading: false,
          loadmore: false,
          gettingSort: false
        })
      }
    } else if (nextProps.dataWishlist.status !== 200 && nextProps.dataWishlist.status !== 0) {
      this.setState({
        loading: false,
        gettingSort: false
      })
      ToastAndroid.show(nextProps.datalogin.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataAddWishlist.status !== 200 && nextProps.dataAddWishlist.status !== 0) {
      ToastAndroid.show(nextProps.dataAddWishlist.message, ToastAndroid.SHORT)
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
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

  _onPress (field) {
    this.setState({
      gettingSort: true
    })
    const {bluesky, lightblack} = Colors
    if (field === 'newest') {
      this.setState({terbaruColor: bluesky, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 1, termurahCek: 0, termahalCek: 0, terlarisCek: 0})
      this.dispatchSort(field)
    } else if (field === 'cheapest') {
      this.setState({terbaruColor: lightblack, termurahColor: bluesky, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 1, termahalCek: 0, terlarisCek: 0})
      this.dispatchSort(field)
    } else if (field === 'expensive') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: bluesky, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 1, terlarisCek: 0})
      this.dispatchSort(field)
    } else if (field === 'selling') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: bluesky, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 1})
      this.dispatchSort(field)
    }
  }

  dispatchSort (typesort) {
    this.setState({
      isRefreshing: true,
      listDataSource: [],
      rowDataSource: [],
      page: 1,
      sortModal: false,
      sort: typesort
    })
    this.props.getWishlist({
      page: 1,
      sort: typesort
    })
  }

  renderVerified (status) {
    if (status) {
      return (
        <Image source={Images.verified} style={stylesProduk.imageVerified} />
      )
    }
    return (
      <Image source={Images.love} style={stylesProduk.imageVerified} />
    )
  }

  renderDiskon (status, nominal) {
    if (status) {
      const money = this.maskedMoney(nominal)
      return (
        <Text style={stylesProduk.nominalDiskon}>
          {money}
        </Text>
      )
    }
    return (
      <Text style={stylesProduk.nominalDiskon1}>
        asd
      </Text>
    )
  }

  renderLikes (status) {
    return (
      <TouchableOpacity>
        <Image source={Images.lovered} style={stylesProduk.imageStyleLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  produkDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  renderModalSort () {
    const {terbaruColor, termurahColor, termahalColor, terlarisColor, terbaruCek, termurahCek, termahalCek, terlarisCek} = this.state
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.sortModal}
        onRequestClose={() => this.setState({ sortModal: false })}
        >
        <TouchableOpacity activeOpacity={1} style={stylesProduk.blackContainer} onPress={() => this.setState({ sortModal: false })} />
        <View style={stylesProduk.modalSortContainer}>
          <View style={stylesProduk.titleContainer}>
            <Text style={stylesProduk.title}>Urutkan Berdasarkan</Text>
          </View>
          <TouchableOpacity onPress={() => this._onPress('newest')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: terbaruColor}]}>Terbaru</Text>
              <Image style={[stylesProduk.checkImage, {opacity: terbaruCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('cheapest')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: termurahColor}]}>Termurah</Text>
              <Image style={[stylesProduk.checkImage, {opacity: termurahCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('expensive')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: termahalColor}]}>Termahal</Text>
              <Image style={[stylesProduk.checkImage, {opacity: termahalCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('selling')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: terlarisColor}]}>Terlaris</Text>
              <Image style={[stylesProduk.checkImage, {opacity: terlarisCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  renderRowList (rowData, section, row) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const money = this.maskedMoney(this.hargaDiskon)
    let label = null

    if (rowData.product.is_discount && rowData.product.is_wholesaler) {
      label = (
        <View style={{flexDirection: 'row'}}>
          <View style={stylesProduk.containerDiskon}>
            <Text style={stylesProduk.diskon}>
              {rowData.product.discount} %
            </Text>
          </View>
          <View style={[stylesProduk.containerDiskon2, { backgroundColor: Colors.green }]}>
            <Text style={[stylesProduk.diskon, {fontSize: Fonts.size.extraTiny}]}>
              GROSIR
            </Text>
          </View>
        </View>
      )
    } else if (rowData.product.is_discount) {
      label = (
        <View style={stylesProduk.containerDiskon}>
          <Text style={stylesProduk.diskon}>
            {rowData.product.discount} %
          </Text>
        </View>
      )
    } else if (rowData.product.is_wholesaler) {
      label = (
        <View style={[stylesProduk.containerDiskon, { backgroundColor: Colors.green }]}>
          <Text style={[stylesProduk.diskon, {fontSize: Fonts.size.extraTiny}]}>
            GROSIR
          </Text>
        </View>
      )
    }

    return (
      <TouchableOpacity style={stylesProduk.rowDataContainer} activeOpacity={0.5} onPress={() =>
        this.produkDetail(rowData.product.id)}>
        <Image source={{ uri: rowData.images[0].file }} style={stylesProduk.imageProduct} >
          {label}
        </Image>
        <View style={stylesProduk.containerTitle}>
          <Text style={stylesProduk.textTitleProduct}>
            {rowData.product.name}
          </Text>
          <View style={[stylesProduk.tokoContainer, {marginRight: 30}]}>
            <Text style={stylesProduk.namaToko}>
              {rowData.store.name}
            </Text>
            {this.renderVerified(rowData.store.is_verified)}
          </View>
          {this.renderDiskon(this.statusDiskon, rowData.product.price)}
          <View style={stylesProduk.moneyLikesContainer}>
            <View style={{flex: 1}}>
              <Text style={stylesProduk.harga}>
                {money}
              </Text>
            </View>
            <View style={stylesProduk.likesContainer}>
              {this.renderLikes(rowData.like)}
              <Text style={stylesProduk.like}>
                {rowData.product.count_like}
              </Text>
            </View>
            <TouchableOpacity style={styles.keranjangContainer} onPress={() => this.removeWishlist(rowData.product.id, row)}>
              <Image source={Images.keranjang} style={styles.searchImage} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowGrid (rowData, section, row) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const money = this.maskedMoney(this.hargaDiskon)
    let label = null
    if (rowData.product.is_discount && rowData.product.is_wholesaler) {
      label = (
        <View style={{flexDirection: 'row'}}>
          <View style={stylesProduk.containerDiskon}>
            <Text style={stylesProduk.diskon}>
              {rowData.product.discount} %
            </Text>
          </View>
          <View style={[stylesProduk.containerDiskon2, { backgroundColor: Colors.green }]}>
            <Text style={[stylesProduk.diskon, {fontSize: Fonts.size.extraTiny}]}>
              GROSIR
            </Text>
          </View>
        </View>
      )
    } else if (rowData.product.is_discount) {
      label = (
        <View style={stylesProduk.containerDiskon}>
          <Text style={stylesProduk.diskon}>
            {rowData.product.discount} %
          </Text>
        </View>
      )
    } else if (rowData.product.is_wholesaler) {
      label = (
        <View style={[stylesProduk.containerDiskon, { backgroundColor: Colors.green }]}>
          <Text style={[stylesProduk.diskon, {fontSize: Fonts.size.extraTiny}]}>
            GROSIR
          </Text>
        </View>
      )
    }

    return (
      <TouchableOpacity style={stylesHome.rowDataContainer} activeOpacity={0.5} onPress={() =>
        this.produkDetail(rowData.product.id)}>
        <Image source={{ uri: rowData.images[0].file }} style={stylesProduk.imageProduct} >
          {label}
        </Image>
        <Text style={stylesHome.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.is_verified)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.product.price)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={stylesHome.like}>
            {rowData.product.count_like}
          </Text>
          <TouchableOpacity style={styles.keranjangContainer} onPress={() => this.removeWishlist(rowData.product.id, row)}>
            <Image source={Images.keranjang} style={styles.searchImage} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  changeView () {
    if (this.state.tipeView === 'grid') {
      this.setState({
        tipeView: 'list'
      })
    } else {
      this.setState({
        tipeView: 'grid'
      })
    }
  }

  removeWishlist (id, row) {
    const { listDataSource } = this.state
    let temp = listDataSource
    temp.splice(row, 1)
    this.setState({
      listDataSource: temp,
      rowDataSource: temp
    })
    this.props.addWishList(id)
  }

  setSortModal (visible) {
    this.setState({sortModal: visible})
  }

  search () {
    const { listDataSource, search } = this.state
    const temp = []
    if (search === '') {
      this.setState({
        listDataSource: this.props.dataWishlist.wishlist,
        rowDataSource: this.props.dataWishlist.wishlist
      })
    } else {
      listDataSource.map(function (obj, index) {
        if (obj.product.name.toLowerCase().includes(search.toLowerCase())) {
          temp.push(obj)
        }
      })
      this.setState({
        listDataSource: temp,
        rowDataSource: temp
      })
    }
  }

  loadMore () {
    const { page, loading, loadmore, sort } = this.state
    if (!loading) {
      if (loadmore) {
        this.props.getWishlist({
          page: page,
          sort: sort
        })
      }
    }
  }

  viewProduk () {
    if (this.state.tipeView === 'grid') {
      return (
        <View style={[stylesHome.listViewContainer, { marginBottom: 50 }]}>
          <ListView
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            enableEmptySections
            style={{ width: Metrics.screenWidth }}
            dataSource={this.dataSourceRow.cloneWithRows(this.state.rowDataSource)}
            renderRow={this.renderRowGrid.bind(this)}
            onEndReached={this.loadMore.bind(this)}
            renderFooter={() => {
              if (this.state.loadmore && this.state.rowDataSource > 10) {
                return (
                  <ActivityIndicator
                    style={[styles.loadingStyle, { height: 50 }]}
                    size='small'
                    color='#ef5656'
                  />
                )
              } else {
                return <View />
              }
            }}
          />
        </View>
      )
    }
    return (
      <View style={[stylesHome.listViewContainer, { marginBottom: 50 }]}>
        <ListView
          contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
          enableEmptySections
          dataSource={this.dataSourceList.cloneWithRows(this.state.listDataSource)}
          renderRow={this.renderRowList.bind(this)}
          onEndReached={this.loadMore.bind(this)}
          renderFooter={() => {
            if (this.state.loadmore && this.state.listDataSource > 10) {
              return (
                <ActivityIndicator
                  style={[styles.loadingStyle, { height: 50 }]}
                  size='small'
                  color='#ef5656'
                />
              )
            } else {
              return <View />
            }
          }}
        />
      </View>
    )
  }

  renderImageTypeView () {
    if (this.state.tipeView === 'grid') {
      return (
        <Image source={Images.grid} style={styles.searchImage} />
      )
    }
    return (
      <Image source={Images.list} style={styles.searchImage} />
    )
  }

  renderView () {
    const { listDataSource, gettingSort } = this.state
    if (listDataSource.length === 0 && !gettingSort) {
      return (
        <View style={styles.notFoundContainer}>
          <Image
            source={Images.emptyWishlist}
            style={styles.image}
          />
          <Text style={styles.textTitle}>
            Wishlist Anda Kosong
          </Text>
          <Text style={styles.textLabel}>
            Anda belum memasukkan barang apapun
            ke dalam wishlist Anda
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buttonChange} onPress={() => this.newproduct()}>
              <Text style={styles.textButton}>
                Mulai Lihat Barang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.floatingSearch}>
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
                placeholder='Cari Produk Favorit Anda disini'
                onSubmitEditing={() => this.search()}
              />
            </View>
          </View>
          <ScrollView>
            {this.viewProduk()}
          </ScrollView>
          <View style={styles.menuBottomContainer}>
            <TouchableOpacity style={styles.urutkanContainer} onPress={() => this.setSortModal(true)}>
              <Image source={Images.sort} style={styles.searchImage} />
              <Text style={styles.textMenuBawah}>Urutkan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.urutkanContainer} onPress={() => this.changeView()}>
              {this.renderImageTypeView()}
              <Text style={styles.textMenuBawah}>Tampilan</Text>
            </TouchableOpacity>
          </View>
          {this.renderModalSort()}
        </View>
      )
    }
  }

  newproduct () {
    NavigationActions.newproduct({
      type: ActionConst.PUSH,
      header: 'Produk Terbaru'
    })
  }

  render () {
    return (
      this.renderView()
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataWishlist: state.wishlist,
    dataAddWishlist: state.addWishlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id})),
    getWishlist: (param) => dispatch(userAction.wishlist(param)),
    addWishList: (id) => dispatch(produkAction.addToWishlist({ id: id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
