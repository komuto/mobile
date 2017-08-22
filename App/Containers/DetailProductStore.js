import React from 'react'
import { ScrollView, ListView, Text, View, BackAndroid, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailProductStoreStyle'
import { Images, Colors } from '../Themes'

class DetailProductStore extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataImage: [Images.contohproduct, Images.contohproduct, Images.contohproduct, Images.contohproduct],
      productName: this.props.productName,
      isDropshipper: 'tidak',
      stock: 500,
      statusAvailable: 'Ditampilkan di Toko'
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
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

  handleEditStatusStockDropshipping (title, action, color) {
    NavigationActions.statusstokdropshipping({
      type: ActionConst.PUSH,
      title: title,
      actionType: action,
      photoProduct: Images.contohproduct,
      productName: 'Sepatu Nike Run Orange',
      backgroundContainer: color
    })
  }

  renderStatusProduct () {
    return (
      <View style={{marginBottom: 21.4}}>
        <View style={styles.headerMenuRow}>
          <Text style={styles.textMenu}>Dropshipping</Text>
          <TouchableOpacity style={styles.touch}
            onPress={() => this.handleEditStatusStockDropshipping('Opsi Dropshipping', 'dropshippingAction', Colors.snow)}>
            <Text style={styles.textValueMenu}>{this.state.isDropshipper}</Text>
            <Image
              source={Images.rightArrow}
              style={[styles.imageStyle, {top: 1.5}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMenuRow}>
          <Text style={styles.textMenu}>Stock</Text>
          <TouchableOpacity style={styles.touch}
            onPress={() => this.handleEditStatusStockDropshipping('Stock Barang', 'stockAction', Colors.snow)}>
            <Text style={styles.textValueMenu}>{this.state.stock}</Text>
            <Image
              source={Images.rightArrow}
              style={[styles.imageStyle, {top: 1}]}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.headerMenuRow, {borderBottomWidth: 0}]}>
          <Text style={styles.textMenu}>Status</Text>
          <TouchableOpacity style={styles.touch}
            onPress={() => this.handleEditStatusStockDropshipping('Opsi Status', 'displayAction', Colors.paleGrey)}>
            <Text style={styles.textValueMenu}>{this.state.statusAvailable}</Text>
            <Image
              source={Images.rightArrow}
              style={[styles.imageStyle, {top: 1}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderPhotoProduct () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow, {borderBottomWidth: 0}]}>
          <Text style={styles.titleMenu}>Foto Produk</Text>
          <TouchableOpacity><Text style={styles.buttonChange}>Ubah</Text></TouchableOpacity>
        </View>
        <View style={styles.scrollImage}>
          <ListView
            horizontal
            enableEmptySections
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            showsHorizontalScrollIndicator={false}
            dataSource={this.dataSource.cloneWithRows(this.state.dataImage)}
            renderRow={this.renderRowImageProduct.bind(this)}
          />
        </View>
      </View>
    )
  }

  renderRowImageProduct (rowData) {
    return (
      <Image
        source={rowData}
        style={styles.image}
      />
    )
  }

  renderNameAndCategory () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Nama dan Kategori</Text>
          <TouchableOpacity><Text style={styles.buttonChange}>Ubah</Text></TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct}>
          <Text style={styles.textMenuNoFlex}>Nama Produk</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, lineHeight: 20}]}>Sepatu Lari Nike Orange</Text>
          <Text style={styles.textMenuNoFlex}>Kategori</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, lineHeight: 20}]}>Fashion dan Aksesoris / Fashion Pria / Sepatu Pria / Sneakers Pria</Text>
          <Text style={styles.textMenuNoFlex}>Brand</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, lineHeight: 20}]}>Nike</Text>
          <Text style={styles.textMenuNoFlex}>Deskripsi Produk</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 15, paddingRight: 40, lineHeight: 20}]}>Sepatu lari yang sangat ringan dengan bahan yang lembut dan cocok untuk dipakai sehari-hari</Text>
        </View>
      </View>
    )
  }

  renderPriceAndSpesification () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Harga dan Spesifikasi</Text>
          <TouchableOpacity><Text style={styles.buttonChange}>Ubah</Text></TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct} />
      </View>
    )
  }

  renderCatalog () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Kategori</Text>
          <TouchableOpacity><Text style={styles.buttonChange}>Ubah</Text></TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct}>
          <Text style={[styles.textMenuNoFlex, {color: Colors.darkgrey}]}>Sepatu Pria</Text>
        </View>
      </View>
    )
  }

  renderWholeSale () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Grosir</Text>
          <TouchableOpacity><Text style={styles.buttonChange}>Ubah</Text></TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct} />
      </View>
    )
  }

  renderExpedition () {
    return (
      <View style={{backgroundColor: Colors.snow, marginBottom: 21.4}}>
        <View style={[styles.headerMenuRow]}>
          <Text style={styles.titleMenu}>Ekspedisi Pengiriman</Text>
          <TouchableOpacity><Text style={styles.buttonChange}>Ubah</Text></TouchableOpacity>
        </View>
        <View style={styles.containerNameProduct}>
          <Text style={[styles.textValueMenu, {paddingBottom: 12}]}>JNE YES</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 12}]}>JNE Reguler</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 12}]}>TIKI ONS</Text>
          <Text style={[styles.textValueMenu, {paddingBottom: 12}]}>TIKI Reguler</Text>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderHeader()}
          {this.renderStatusProduct()}
          {this.renderPhotoProduct()}
          {this.renderNameAndCategory()}
          {this.renderPriceAndSpesification()}
          {this.renderCatalog()}
          {this.renderWholeSale()}
          {this.renderExpedition()}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailProductStore)
