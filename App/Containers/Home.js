import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ListView,
  BackAndroid,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { MaskService } from 'react-native-masked-text'
import { Images, Colors } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { connect } from 'react-redux'
import * as homeAction from '../actions/home'
import * as produkAction from '../actions/product'

// Styles
import styles from './Styles/HomeStyle'

class Home extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      tipe: this.props.tipe || 'home',
      search: '',
      loadingKategori: true,
      loadingProduk: true,
      productSource: [],
      kategoriSource: [],
      isLogin: this.props.datalogin.login
    }
    this.props.getProdukTerbaru(6)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataKategori.status === 200) {
      const newKategori = nextProps.dataKategori.categories
      var kategoriInital = newKategori.filter(function (country) {
        return [ 'Handphone & Tablet', 'Olahraga & Outbond', 'Office & Stationery', 'Komputer & Laptop', 'Ibu dan Anak', 'Peralatan Rumah Tangga' ].indexOf(country.name) !== -1
      })
      this.setState({
        kategoriSource: kategoriInital,
        productSource: nextProps.dataProduk.products,
        loadingKategori: false,
        loadingProduk: false
      })
    } else if (nextProps.dataKategori.status > 200) {
      this.setState({
        loadingKategori: true,
        loadingProduk: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataKategori.message)
    } else if (nextProps.dataKategori.status === 'ENOENT') {
      this.setState({
        loadingKategori: true,
        loadingProduk: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataKategori.message)
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
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

  renderVerified (status) {
    if (status !== 'null') {
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

  renderLikes (status) {
    if (status) {
      return (
        <TouchableOpacity onPress={() => {}}>
          <Image source={Images.lovered} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => {}}>
        <Image source={Images.love} style={styles.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  renderRowProduk (rowData) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
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
        <Image source={{ uri: rowData.images[0].file }} style={styles.imageProduct} />
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {rowData.product.discount}%
          </Text>
        </View>
        <Text style={styles.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={styles.tokoContainer}>
          <Text style={styles.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.remarks_status)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.product.price)}
        <Text style={styles.harga}>
          {totalHarga}
        </Text>
        <View style={styles.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={styles.like}>
            {rowData.product.stock}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderProduk () {
    const spinner = this.state.loadingProduk
    ? (<View style={styles.spinnerProduk}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    if (this.state.loadingProduk) {
      return (
        <View>
          {spinner}
        </View>
      )
    }
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        dataSource={this.dataSource.cloneWithRows(this.state.productSource)}
        initialListSize={1}
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
    const spinner = this.state.loadingKategori
    ? (<View style={styles.spinnerKategori}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    if (this.state.loadingKategori) {
      return (
        <View>
          {spinner}
        </View>
      )
    }
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        dataSource={this.dataSource.cloneWithRows(this.state.kategoriSource)}
        initialListSize={10}
        renderRow={this.renderRowKategori.bind(this)}
        enableEmptySections
      />
    )
  }

  semuaKategori () {
    NavigationActions.kategoriscreen({ type: ActionConst.PUSH })
  }

  wishlist () {
    if (this.state.isLogin) {
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
    NavigationActions.search({ type: ActionConst.PUSH, search: this.state.search })
  }

  produkTerbaru () {
    NavigationActions.produkterbaru({
      type: ActionConst.PUSH,
      header: 'Produk Terbaru'
    })
  }

  produkDetail (id) {
    NavigationActions.productdetail({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  handleDetailKategori (rowId, title) {
    NavigationActions.kategoriempatscreen({
      type: ActionConst.PUSH,
      id: rowId,
      header: title,
      name: title
    })
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
                <TouchableOpacity style={styles.buttonHeader}>
                  <Image source={Images.shoppingCart} style={styles.imagestyle} />
                  <View style={styles.containerNumber}>
                    <Text style={styles.number}>
                      {String(4)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
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
                    placeholder='Cari barang atau toko'
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        renderStickyHeader={() => (
          <View key='sticky-header' style={{ backgroundColor: Colors.snow }}>
            <View style={styles.floatingSearch}>
              <Image source={Images.searchGrey} style={styles.searchImage} />
              <View style={styles.textInputContainer}>
                <TextInput
                  ref='search'
                  onSubmitEditing={() => this.search()}
                  style={styles.inputText}
                  value={this.state.search}
                  keyboardType='default'
                  autoCapitalize='none'
                  autoCorrect
                  onChangeText={this.handleTextSearch}
                  underlineColorAndroid='transparent'
                  placeholder='Cari barang atau toko'
                />
              </View>
            </View>
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
    dataKategori: state.category,
    dataProduk: state.products,
    datalogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: dispatch(homeAction.categoryList()),
    getProdukTerbaru: (limit) => dispatch(homeAction.products({limit})),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
