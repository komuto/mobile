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
      katalog: [
        { nama: 'sepatu',
          produk: [
            {
              namaProduk: 'Sepatu Joging Nike Casual',
              statusDropshiper: false,
              stok: 54,
              priceAfterDiscount: 1650000,
              moneyToEarn: 1633000
            },
            {
              namaProduk: 'Sepatu Joging Nike Casual',
              statusDropshiper: false,
              stok: 54,
              priceAfterDiscount: 1650000,
              moneyToEarn: 1633000
            },
            {
              namaProduk: 'Sepatu Joging Nike Casual',
              statusDropshiper: false,
              stok: 54,
              priceAfterDiscount: 1650000,
              moneyToEarn: 1633000
            }
          ]
        },
        { nama: 'baju',
          produk: [
            {
              namaProduk: 'Sepatu Joging Nike Casual',
              statusDropshiper: false,
              stok: 54,
              priceAfterDiscount: 1650000,
              moneyToEarn: 1633000
            },
            {
              namaProduk: 'Sepatu Joging Nike Casual',
              statusDropshiper: false,
              stok: 54,
              priceAfterDiscount: 1650000,
              moneyToEarn: 1633000
            },
            {
              namaProduk: 'Sepatu Joging Nike Casual',
              statusDropshiper: false,
              stok: 54,
              priceAfterDiscount: 1650000,
              moneyToEarn: 1633000
            }
          ]
        }
      ],
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      search: ''
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
    const { katalog } = this.state
    const mapProduk = katalog.map((data, i) => {
      return (
        <View key={i} style={styles.separaator}>
          <View style={styles.containerProduk}>
            <View style={styles.headerInfoAlamat}>
              <Text style={styles.textHeader}>{data.nama} ({data.produk.length})</Text>
              <TouchableOpacity onPress={() => this.setState({statusDot: true})}>
                <Image source={Images.threeDotSilver} style={styles.imageDot} />
              </TouchableOpacity>
            </View>
            {this.containerEdit()}
            {this.mapSingleProduk(data.produk, i)}
          </View>
          <TouchableOpacity activeOpacity={0.5} style={[styles.headerInfoAlamat, {backgroundColor: Colors.snow}]}>
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

  mapSingleProduk (data, i) {
    const mapProduk = data.map((data, i) => {
      return (
        <View key={i} style={styles.dataListProduk}>
          <View style={styles.flexRow}>
            <Image source={Images.contohproduct} style={styles.imageProduk} />
            <View style={styles.column}>
              <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
                <Text style={styles.textTitle}>{data.namaProduk}</Text>
                <TouchableOpacity>
                  <Image source={Images.diskon} style={styles.imageDot} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textDetail}>Komisi yang diterima : Rp {data.priceAfterDiscount}</Text>
              <Text style={styles.textDetail}>Jumlah Stok : {data.stok}</Text>
              <Text style={styles.textDetail}>Harga jual setelah diskon : Rp {data.priceAfterDiscount}</Text>
              <Text style={styles.textDetail}>Uang yang diterima : Rp {data.moneyToEarn}</Text>
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
    console.log(this.state.katalog)
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaftarProdukScreenScreen)
