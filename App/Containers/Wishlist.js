import React from 'react'
import {
  ScrollView,
  Image,
  View,
  TextInput,
  ListView,
  Text,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { Images, Colors } from '../Themes'
import * as wishlistAction from '../actions/user'
import * as produkAction from '../actions/product'
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
      loading: true,
      tipeView: 'grid',
      sortModal: false,
      terbaruColor: Colors.lightblack,
      termurahColor: Colors.lightblack,
      termahalColor: Colors.lightblack,
      terlarisColor: Colors.lightblack,
      terbaruCek: 0,
      termurahCek: 0,
      termahalCek: 0,
      terlarisCek: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataWishlist.status === 200) {
      console.log(nextProps.dataWishlist.wishlist)
      this.setState({
        listDataSource: nextProps.dataWishlist.wishlist,
        rowDataSource: nextProps.dataWishlist.wishlist,
        loading: false
      })
    } else if (nextProps.dataWishlist.status > 200) {
      this.setState({
        loading: false
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataWishlist.message)
    } else if (nextProps.dataWishlist.status === 'ENOENT') {
      this.setState({
        loading: false
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataWishlist.message)
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
  }

  _onPress (field) {
    const {listDataSource} = this.state
    let sortedData = this.sortArrayAsc(listDataSource, 'price', field)
    this.setState({
      listDataSource: sortedData
    })
  }

  sortArrayAsc (array, key, field) {
    const {bluesky, lightblack} = Colors
    switch (field) {
      case 'terbaru':
        this.setState({terbaruColor: bluesky, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 1, termurahCek: 0, termahalCek: 0, terlarisCek: 0})
        return array.sort(function (a, b) {
          return new Date(a.product.created_at).getTime() - new Date(b.product.dateCreate).getTime()
        }).reverse()
      case 'termurah':
        this.setState({terbaruColor: lightblack, termurahColor: bluesky, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 1, termahalCek: 0, terlarisCek: 0})
        return array.sort(function (a, b) {
          return b.product.price - a.product.price
        }).reverse()
      case 'termahal':
        this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: bluesky, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 1, terlarisCek: 0})
        return array.sort(function (a, b) {
          return b.product.price - a.product.price
        })
      case 'terlaris':
        this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: bluesky, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 1})
        return array.sort(function (a, b) {
          return b.product.stock - a.product.stock
        })
      default:
        window.alert('Internal Error')
        break
    }
  }

  renderVerified (status) {
    if (status === 'verified') {
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
      const money = MaskService.toMask('money', nominal, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
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
          <TouchableOpacity onPress={() => this._onPress('terbaru')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: terbaruColor}]}>Terbaru</Text>
              <Image style={[stylesProduk.checkImage, {opacity: terbaruCek}]} source={Images.centang} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('termurah')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: termurahColor}]}>Termurah</Text>
              <Image style={[stylesProduk.checkImage, {opacity: termurahCek}]} source={Images.centang} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('termahal')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: termahalColor}]}>Termahal</Text>
              <Image style={[stylesProduk.checkImage, {opacity: termahalCek}]} source={Images.centang} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('terlaris')}>
            <View style={stylesProduk.itemContainer}>
              <Text style={[stylesProduk.title, {color: terlarisColor}]}>Terlaris</Text>
              <Image style={[stylesProduk.checkImage, {opacity: terlarisCek}]} source={Images.centang} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  renderRowList (rowData) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const money = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

    return (
      <TouchableOpacity style={stylesProduk.rowDataContainer} activeOpacity={0.5} onPress={() =>
        this.produkDetail(rowData.product.id)}>
        <Image source={{ uri: rowData.images[0].file }} style={stylesProduk.imageProduct} />
        <View style={stylesProduk.containerDiskon}>
          <Text style={stylesProduk.diskon}>
            {rowData.product.discount} %
          </Text>
        </View>
        <View style={stylesProduk.containerTitle}>
          <Text style={stylesProduk.textTitleProduct}>
            {rowData.product.name}
          </Text>
          <View style={stylesProduk.tokoContainer}>
            <Text style={stylesProduk.namaToko}>
              {rowData.store.name}
            </Text>
            {this.renderVerified(rowData.store.remarks_status)}
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
                {rowData.product.stock}
              </Text>
            </View>
            <TouchableOpacity style={styles.keranjangContainer}>
              <Image source={Images.keranjang} style={styles.searchImage} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowGrid (rowData) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const money = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity style={stylesHome.rowDataContainer} activeOpacity={0.5} onPress={() =>
        this.produkDetail(rowData.product.id)}>
        <Image source={{ uri: rowData.images[0].file }} style={stylesHome.imageProduct} />
        <View style={stylesHome.containerDiskon}>
          <Text style={stylesHome.diskon}>
            {rowData.product.discount} %
          </Text>
        </View>
        <Text style={stylesHome.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.remarks_status)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.product.price)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={stylesHome.like}>
            {rowData.product.stock}
          </Text>
          <TouchableOpacity style={styles.keranjangContainer}>
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

  viewProduk () {
    if (this.state.tipeView === 'grid') {
      return (
        <View style={[stylesHome.listViewContainer, { marginBottom: 50 }]}>
          <ListView
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            enableEmptySections
            dataSource={this.dataSourceRow.cloneWithRows(this.state.rowDataSource)}
            renderRow={this.renderRowGrid.bind(this)}
          />
        </View>
      )
    }
    return (
      <View style={stylesProduk.listViewContainer}>
        <ListView
          contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
          enableEmptySections
          dataSource={this.dataSourceList.cloneWithRows(this.state.listDataSource)}
          renderRow={this.renderRowList.bind(this)}
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

  render () {
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

const mapStateToProps = (state) => {
  return {
    dataWishlist: state.wishlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: dispatch(wishlistAction.wishlist()),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
