import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as storeAction from '../actions/stores'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DaftarProdukScreenStyle'
import { Colors, Images } from '../Themes/'

class DaftarProdukScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      katalog: [],
      produk: [],
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      search: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProduk.status === 200) {
      this.setState({
        produk: nextProps.dataProduk.storeProducts
      })
    }
  }

  renderKatalogtButton () {
    return (
      <TouchableOpacity style={styles.floatButton} onPress={() => {}}>
        <Image source={Images.katalog} style={styles.floatImage} />
        <Text style={styles.katalog}>Daftar Katalog</Text>
      </TouchableOpacity>
    )
  }

  renderTambahButton () {
    return (
      <TouchableOpacity style={styles.create} onPress={() => this.handleTambahProduk()}>
        <View elevation={9}>
          <Image source={Images.tambahWhite} style={styles.floatImage} />
        </View>
      </TouchableOpacity>
    )
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
            placeholder='Cari Produk'
          />
        </View>
      </View>
    )
  }

  DaftarProdukDiTampilkan () {
    return (
      <View>
        {this.mapingProduk()}
      </View>
    )
  }

  handleListProduk (id, name) {
    this.props.getProductByCAtalog(id)
    NavigationActions.listprodukbycatalog({
      type: ActionConst.PUSH,
      title: name
    })
  }

  containerEdit (i, idAlamat) {
    if (this.state.statusDot && this.state.rowTerpilih === i) {
      return (
        <View elevation={5} style={styles.edit}>
          <TouchableOpacity style={styles.touch} onPress={() =>
            this.handlleEditAlamat(idAlamat)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.setState({deletAlamat: true, idDelete: idAlamat, statusDot: false})}>
            <Text style={styles.textEdit}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View />
    )
  }

  mapingProduk () {
    const { produk } = this.state
    const mapProduk = produk.map((data, i) => {
      return (
        <View key={i} style={styles.separaator}>
          <View style={styles.containerProduk}>
            <View style={styles.headerInfoAlamat}>
              <Text style={styles.textHeader}>{data.catalog.name} ({data.catalog.count_product})</Text>
              <TouchableOpacity onPress={() => this.setState({statusDot: true})}>
                <Image source={Images.threeDotSilver} style={styles.imageDot} />
              </TouchableOpacity>
            </View>
            {this.containerEdit()}
            {this.mapSingleProduk(data.products, i)}
          </View>
          <TouchableOpacity activeOpacity={0.5} style={[styles.headerInfoAlamat, {backgroundColor: Colors.snow}]} onPress={() => this.handleListProduk(data.catalog.id, data.catalog.name)}>
            <Text style={[styles.textHeader, {color: Colors.bluesky}]}>Lihat semua produk di katalog ini</Text>
            <Image source={Images.rightArrow} style={styles.imageDot} />
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <View>
        {mapProduk}
      </View>
    )
  }

  labeldaridropshipper () {
    return (
      <View style={[styles.flexRow, {marginTop: 10, marginBottom: 10}]}>
        <View style={styles.laberDropShipping}>
          <Text style={styles.textDropShipping}>
            Dropship dari WorldSports
          </Text>
        </View>
        <View style={styles.triangleLabel} />
      </View>
    )
  }
  labelDropshipping () {
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
      </View>
    )
  }

  mapSingleProduk (data, id) {
    const mapProduk = data.map((data, i) => {
      return (
        <View key={i} style={styles.dataListProduk}>
          <View style={styles.flexRow}>
            <Image source={{uri: data.image}} style={styles.imageProduk} />
            <View style={styles.column}>
              <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
                <Text style={styles.textTitle}>{data.name}</Text>
                <TouchableOpacity>
                  <Image source={Images.diskon} style={styles.imageDot} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
                </TouchableOpacity>
              </View>
              {this.labelDropshipping()}
              <Text style={styles.textDetail}>Komisi yang diterima : Rp {data.price}</Text>
              <Text style={styles.textDetail}>Jumlah Stok : {data.price}</Text>
              <Text style={styles.textDetail}>Harga jual setelah diskon : Rp {data.price}</Text>
              <Text style={styles.textDetail}>Uang yang diterima : Rp {data.price}</Text>
            </View>
          </View>
        </View>
      )
    })
    return (
      <View>
        {mapProduk}
      </View>
    )
  }

  DaftarProdukDiSembunyikan () {
    return (
      <View>
        {this.mapingProduk()}
      </View>
    )
  }

  handleTambahProduk () {
    NavigationActions.tambahproduk({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <ScrollView tabLabel='Ditampilkan di Toko' ref='produkTampil' style={styles.scrollView}>
            {this.renderSearch()}
            {this.DaftarProdukDiTampilkan()}
          </ScrollView>
          <ScrollView tabLabel='Disembunyikan' ref='produkHidden' style={styles.scrollView}>
            {this.renderSearch()}
            {this.DaftarProdukDiSembunyikan()}
          </ScrollView>
        </ScrollableTabView>
        {this.renderKatalogtButton()}
        {this.renderTambahButton()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.storeProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductByCAtalog: (id) => dispatch(storeAction.getStoreCatalogProducts({id})),
    getListProduk: (hidden) => dispatch(storeAction.getStoreProducts({hidden: hidden}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaftarProdukScreenScreen)
