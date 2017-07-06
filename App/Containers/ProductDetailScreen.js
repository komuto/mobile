import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, Image, ListView, Picker, ActivityIndicator, BackAndroid } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as homeAction from '../actions/home'

// Styles
import styles from './Styles/ProductDetailScreenStyle'
import stylesHome from './Styles/ProdukTerbaruScreenStyle'

import { Images, Colors, Fonts } from '../Themes'

class ProductDetailScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    var imageProduct = [
      { gambar: Images.contohproduct },
      { gambar: Images.contohproduct },
      { gambar: Images.contohproduct },
      { gambar: Images.contohproduct },
      { gambar: Images.contohproduct }
    ]
    var ulasan = [
      { foto: Images.contohproduct, nama: 'Budi Budiman', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Adi Budiman', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' }
    ]
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    var dataSource2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      listDataSource: dataSource2.cloneWithRows(imageProduct),
      grosir: true,
      discount: false,
      price: 1350000,
      starQuantity: 3,
      starAccurate: 3,
      avgQuantity: 4.5,
      avgAccurate: 4.5,
      numOfLine: 3,
      foto: 'default',
      countProduct: 1,
      ulasanDataSource: dataSource2.cloneWithRows(ulasan),
      provinsi: [
        {id: 1, title: 'Daerah Istimewa Yogyakarta'},
        {id: 2, title: 'Jawa Barat'},
        {id: 3, title: 'Jawa Tengah'}
      ],
      kabupaten: [
        {id: 1, title: 'Bantul'}
      ],
      kecamatan: [
        {id: 1, title: 'Sedayu'}
      ],
      provinsiTerpilih: 'Daerah Istimewa Yogyakarta',
      kabTerpilih: 'Bantul',
      kecTerpilih: 'Sedayu',
      loadingProduk: true,
      productSource: [],
      sizeUlasan: 2
    }
    this.props.getProdukTerbaru(3)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      productSource: nextProps.dataProduk.products,
      loadingProduk: false
    })
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
          Detail
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={Images.threeDot}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderImageProduct () {
    return (
      <View style={styles.scrollImage}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ListView
            contentContainerStyle={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}
            dataSource={this.state.listDataSource}
            renderRow={this.renderRowImageProduct.bind(this)}
          />
        </ScrollView>
      </View>
    )
  }

  renderRowImageProduct (rowData) {
    return (
      <View style={styles.imageCotainer}>
        <View style={styles.imageProduct}>
          <Image
            source={rowData.gambar}
            style={styles.image}
          />
        </View>
      </View>
    )
  }

  renderTitle () {
    const {grosir, discount} = this.state
    const totalHarga = MaskService.toMask('money', this.state.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    if (!grosir && !discount) {
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Blue Training Kit Machester United
            </Text>
            {this.renderLikes(true)}
          </View>
          <Text style={styles.price}>
            {totalHarga}
          </Text>
        </View>
      )
    } else if (discount && !grosir) {
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Blue Training Kit Machester United
            </Text>
            {this.renderLikes(true)}
          </View>
          <View style={styles.flexRow}>
            <View style={[styles.containerDiskon, {marginTop: 10, marginRight: 10}]}>
              <Text style={styles.diskon}>
                10%
              </Text>
            </View>
            <View>
              {this.renderDiskon(true, totalHarga)}
              <Text style={[styles.price, {marginTop: 0}]}>
                {totalHarga}
              </Text>
            </View>
          </View>
        </View>
      )
    } else if (!discount && grosir) {
      return (
        <View>
          <View style={styles.flexRow}>
            <View style={[styles.containerDiskon, {backgroundColor: Colors.darkMint}]}>
              <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny, color: Colors.background}]}>
                GROSIR
              </Text>
            </View>
            <View style={[styles.titleContainer, {flex: 1, marginLeft: 15}]}>
              <Text style={styles.title}>
                Blue Training Kit Machester United
              </Text>
              {this.renderLikes(false)}
            </View>
          </View>
        </View>
      )
    }
  }

  renderFotoProfil () {
    if (this.state.foto !== 'default') {
      return (
        <Image
          source={{ uri: this.state.foto }}
          style={styles.styleFoto}
        />
      )
    }
    return (
      <Image
        source={Images.contohproduct}
        style={styles.styleFoto}
      />
    )
  }

  renderFotoToko () {
    if (this.state.foto !== 'default') {
      return (
        <Image
          source={{ uri: this.state.foto }}
          style={[styles.styleFoto, {borderRadius: 0}]}
        />
      )
    }
    return (
      <Image
        source={Images.contohproduct}
        style={[styles.styleFoto, {borderRadius: 0}]}
      />
    )
  }

  renderRating () {
    const {starAccurate, starQuantity, avgAccurate, avgQuantity} = this.state
    return (
      <View style={styles.qualityContainer}>
        <View style={styles.eachQualiy}>
          <Text style={styles.qualityText}> Kualitas Produk </Text>
          <View style={styles.flexRow}>
            <View style={{paddingTop: 4, marginLeft: 3}}>
              <StarRating
                disabled
                maxStars={5}
                starColor={'#ffcd00'}
                emptyStarColor={'#d9e1e9'}
                starSize={16}
                rating={starQuantity}
                selectedStar={(rating) => this.onStarQtyPress(rating)}
              />
            </View>
            <Text style={[styles.qualityText, {paddingLeft: 8.8, fontSize: Fonts.size.regular}]}>{avgQuantity}</Text>
          </View>
        </View>
        <View style={styles.eachQualiy}>
          <Text style={styles.qualityText}> Akurasi Produk </Text>
          <View style={styles.flexRow}>
            <View style={{paddingTop: 4, marginLeft: 3}}>
              <StarRating
                disabled
                maxStars={5}
                starColor={'#ffcd00'}
                emptyStarColor={'#d9e1e9'}
                starSize={16}
                rating={starAccurate}
                selectedStar={(rating) => this.onStarAcuPress(rating)}
              />
            </View>
            <Text style={styles.avgTitle}>{avgAccurate}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderRatingUlasan () {
    const {starAccurate, starQuantity} = this.state
    return (
      <View style={styles.qualityNoBorderContainer}>
        <View style={styles.eachQualiy}>
          <Text style={[styles.qualityText]}> Kualitas Produk </Text>
          <View style={styles.flexRow}>
            <View style={{paddingTop: 4, marginLeft: 3}}>
              <StarRating
                disabled
                maxStars={5}
                starColor={'#ffcd00'}
                emptyStarColor={'#d9e1e9'}
                starSize={16}
                rating={starQuantity}
                selectedStar={(rating) => this.onStarQtyPress(rating)}
              />
            </View>
          </View>
        </View>
        <View style={styles.eachQualiy}>
          <Text style={styles.qualityText}> Akurasi Produk </Text>
          <View style={styles.flexRow}>
            <View style={{paddingTop: 4, marginLeft: 3}}>
              <StarRating
                disabled
                maxStars={5}
                starColor={'#ffcd00'}
                emptyStarColor={'#d9e1e9'}
                starSize={16}
                rating={starAccurate}
                selectedStar={(rating) => this.onStarAcuPress(rating)}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  onStarQtyPress (rating) {
    this.setState({
      starQuantity: rating
    })
  }

  onStarAcuPress (rating) {
    this.setState({
      starAccurate: rating
    })
  }

  provinsiValue = (key, value) => {
    this.setState({
      provinsiTerpilih: value
    })
  }

  kabupatenValue = (key, value) => {
    this.setState({
      kabTerpilih: value
    })
  }

  kecValue = (key, value) => {
    this.setState({
      kecTerpilih: value
    })
  }

  pickerProvinsi () {
    const { provinsi } = this.state
    const dataProvinsi = provinsi.map(provinsi =>
    (<Picker.Item
      key={provinsi.id}
      label={provinsi.title}
      value={provinsi.title}
      color={Colors.darkgrey}
    />))
    return (
      <View style={styles.pickerStyle}>
        <Picker
          style={{flex: 1, height: 21}}
          selectedValue={this.state.provinsiTerpilih}
          onValueChange={this.provinsiValue.bind(this, 'provinsiTerpilih')}
          mode='dropdown'
        >
          {dataProvinsi}
        </Picker>
      </View>
    )
  }

  pickerKabupaten () {
    const { kabupaten } = this.state
    const dataProvinsi = kabupaten.map(kabupaten =>
    (<Picker.Item
      key={kabupaten.id}
      label={kabupaten.title}
      value={kabupaten.title}
      color={Colors.darkgrey}
    />))
    return (
      <View style={styles.pickerStyle}>
        <Picker
          style={{flex: 1, height: 21}}
          selectedValue={this.state.kabTerpilih}
          onValueChange={this.kabupatenValue.bind(this, 'kabTerpilih')}
          mode='dropdown'
        >
          {dataProvinsi}
        </Picker>
      </View>
    )
  }

  pickerKecamatan () {
    const { kecamatan } = this.state
    const dataProvinsi = kecamatan.map(kecamatan =>
    (<Picker.Item
      key={kecamatan.id}
      label={kecamatan.title}
      value={kecamatan.title}
      color={Colors.darkgrey}
    />))
    return (
      <View style={styles.pickerStyle}>
        <Picker
          style={{flex: 1, height: 21}}
          selectedValue={this.state.kecTerpilih}
          onValueChange={this.kecValue.bind(this, 'kecTerpilih')}
          mode='dropdown'
        >
          {dataProvinsi}
        </Picker>
      </View>
    )
  }

  renderVerified (status) {
    if (status) {
      return (
        <Image source={Images.verified} style={styles.imageVerified} />
      )
    }
    return (
      <Image source={Images.love} style={{height: 25, width: 25}} />
    )
  }

  renderVerifiedPenjual (status) {
    if (status) {
      return (
        <Image source={Images.verified} style={styles.image24p} />
      )
    }
    return (
      <Image source={Images.love} style={styles.image24p} />
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
          <Image source={Images.love} style={styles.imageStyleLike} />
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

  renderKurir () {
    return (
      <View style={{backgroundColor: Colors.background}}>
        <View style={styles.staticContainer}>
          <View style={styles.staticList}>
            <Text style={styles.staticProduct}>JNE REG</Text>
            <Text style={[styles.staticProductVal, {flex: 1}]}>328.000</Text>
            <Text style={styles.staticProductVal}>2-3 hari</Text>
          </View>
          <View style={styles.staticList}>
            <Text style={styles.staticProduct}>JNE ONS</Text>
            <Text style={[styles.staticProductVal, {flex: 1}]}>328.000</Text>
            <Text style={styles.staticProductVal}>2-3 hari</Text>
          </View>
          <View style={styles.staticList}>
            <Text style={styles.staticProduct}>TIKI REG</Text>
            <Text style={[styles.staticProductVal, {flex: 1}]}>328.000</Text>
            <Text style={styles.staticProductVal}>2-3 hari</Text>
          </View>
        </View>
      </View>
    )
  }

  renderStaticProduct () {
    return (
      <View style={styles.staticContainer}>
        <View style={[styles.staticList, {borderStyle: this.state.showBorder ? 'dashed' : null}]}>
          <Text style={styles.staticProduct}>Stok Barang</Text>
          <Text style={styles.staticProductVal}>128</Text>
        </View>
        <View style={styles.staticList}>
          <Text style={styles.staticProduct}>Dilihat</Text>
          <Text style={styles.staticProductVal}>1.760 kali</Text>
        </View>
        <View style={styles.staticList}>
          <Text style={styles.staticProduct}>Terjual</Text>
          <Text style={styles.staticProductVal}>250</Text>
        </View>
      </View>
    )
  }

  listDiscount () {
    const {grosir} = this.state
    if (grosir) {
      return (
        <View style={styles.staticContainer}>
          <View style={[styles.staticList]}>
            <Text style={styles.staticProduct}>5 - 10 Barang</Text>
            <Text style={styles.staticProductVal}>Rp 1.500.000 / barang</Text>
          </View>
          <View style={styles.staticList}>
            <Text style={styles.staticProduct}>11 - 15 Barang</Text>
            <Text style={styles.staticProductVal}>Rp 1.450.000 / barang</Text>
          </View>
          <View style={styles.staticList}>
            <Text style={styles.staticProduct}>16 - 20 Barang</Text>
            <Text style={styles.staticProductVal}>Rp 1.250.000 / barang</Text>
          </View>
        </View>
      )
    }
    return (
      <View />
    )
  }

  renderInfoProduct () {
    const { numOfLine } = this.state
    return (
      <View>
        <View style={styles.infoContainer}>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Berat</Text>
            <Text style={styles.infoProductVal}>120 gram</Text>
          </View>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Kondisi</Text>
            <Text style={styles.infoProductVal}>Baru</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Asuransi</Text>
            <Text style={styles.infoProductVal}>Opsional</Text>
          </View>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Kategori</Text>
            <Text style={styles.infoProductVal}>Peralatan Olahraga</Text>
          </View>
        </View>
        <View style={[styles.infoContainer, {flexDirection: 'column'}]}>
          <Text style={styles.infoProduct}>Deskripsi</Text>
          <Text numberOfLines={numOfLine} style={[styles.infoProductVal, {color: Colors.darkgrey, paddingRight: 26, paddingBottom: 0}]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris</Text>
          <TouchableOpacity style={styles.readMoreTextContainer} onPress={() => this.readMore()}>
            <View style={{alignItems: 'center'}}>
              <Image source={Images.down} style={styles.imageDown} />
            </View>
          </TouchableOpacity>
          <View style={{marginBottom: 22.1}} />
        </View>
      </View>
    )
  }

  renderUlasan (rowData) {
    const {numOfLine} = this.state
    return (
      <View style={{backgroundColor: Colors.background}}>
        <View style={styles.border}>
          <View style={styles.profile}>
            {this.renderFotoProfil()}
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                {rowData.nama}
              </Text>
              <Text style={styles.textKelola}>
                {rowData.lastReview} hari yang lalu
              </Text>
            </View>
          </View>
          {this.renderRatingUlasan()}
          <Text numberOfLines={numOfLine} style={styles.isiUlasan}>{rowData.isiUlasan}</Text>
        </View>
      </View>
    )
  }

  readMore () {
    const {numOfLine} = this.state
    if (numOfLine != null) {
      this.setState({numOfLine: null})
    } else if (numOfLine === null) {
      this.setState({numOfLine: 3})
    }
  }

  renderRowUlasan () {
    return (
      <View>
        <ListView
          dataSource={this.state.ulasanDataSource}
          initialListSize={3}
          pageSize={3}
          renderRow={this.renderUlasan.bind(this)}
        />
        <TouchableOpacity style={styles.allCategory} onPress={() => this.onPressUlasan()}>
          <Text style={styles.textAllCategory}>
            Lihat semua ulasan
          </Text>
          <Image source={Images.rightArrow} style={styles.imageCategory} />
        </TouchableOpacity>
      </View>
    )
  }

  onPressUlasan () {
    NavigationActions.ulasanscreen({ type: ActionConst.PUSH })
  }

  renderEstimasiPengiriman () {
    const {countProduct} = this.state
    return (
      <View>
        <View style={[styles.qualityContainer, {paddingTop: 25}]}>
          <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25}]}>
            <Text style={[styles.qualityText, {marginBottom: 0}]}>Jumlah Produk</Text>
          </View>
          <View style={[styles.eachQualiyNoMargin, {flexDirection: 'row', paddingRight: 20, paddingBottom: 0}]}>
            <TouchableOpacity onPress={() => this.substract()}>
              <Image source={Images.sub} style={styles.imageOperator} />
            </TouchableOpacity>
            <Text style={[styles.qualityText, {flex: 1, textAlign: 'center'}]}>{countProduct}</Text>
            <TouchableOpacity onPress={() => this.add()}>
              <Image source={Images.add} style={styles.imageOperator} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lokasiContainer}>
          <Text style={styles.qualityText}>Lokasi Pengiriman</Text>
          <View style={styles.staticList2}>
            <Text style={styles.lokasiItem}>Provinsi :</Text>
            {this.pickerProvinsi()}
          </View>
          <View style={styles.staticList2}>
            <Text style={styles.lokasiItem}>Kabupaten :</Text>
            {this.pickerKabupaten()}
          </View>
          <View style={styles.staticList2}>
            <Text style={styles.lokasiItem}>Kecamatan :</Text>
            {this.pickerKecamatan()}
          </View>
        </View>
        {this.renderKurir()}
      </View>
    )
  }

  substract () {
    const {countProduct} = this.state
    this.setState({countProduct: countProduct - 1})
  }

  add () {
    const {countProduct} = this.state
    this.setState({countProduct: countProduct + 1})
  }

  detailPenjual () {
    NavigationActions.detailtoko({ type: ActionConst.PUSH, title: 'Budi Budiman' })
  }

  renderInfoPenjual () {
    const {numOfLine} = this.state
    return (
      <TouchableOpacity onPress={() => this.detailPenjual()}>
        <View style={[styles.ulasanContainer]}>
          <View style={styles.border}>
            <View style={[styles.profile, {paddingBottom: 20}]}>
              {this.renderFotoToko()}
              <View style={styles.containerNamaToko}>
                <View style={styles.namaContainer}>
                  <View style={styles.flexRow}>
                    <Text style={styles.textNama}>
                      Budi Budiman
                    </Text>
                    {this.renderVerifiedPenjual(true)}
                  </View>
                  <Text style={[styles.textKelola, {color: Colors.lightgrey}]}>
                    DKI Jakarta
                  </Text>
                </View>
                <TouchableOpacity style={styles.buttonFav}>
                  <Image source={Images.centang} style={styles.image24p} />
                  <Text style={styles.labelButtonFav}>
                    Di Favoritkan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.infoContainer, {flexDirection: 'column', marginTop: 1.8}]}>
            <Text style={styles.infoProduct}>Terms and Conditions</Text>
            <Text numberOfLines={numOfLine} style={[styles.infoProductVal, {color: Colors.darkgrey, paddingRight: 26, paddingBottom: 0}]}>
              - Lorem ipsum dolor sit amet, consectetur adipis{'\n'}
              - elit, sed do eiusmod tempor incididunt ut labore{'\n'}
              - dolore magna aliqua. Ut enim ad minim veniam{'\n'}
              - nostrud exercitation ullamco laboris</Text>
            <TouchableOpacity style={styles.readMoreTextContainer} onPress={() => this.readMore()}>
              <View style={{alignItems: 'center'}}>
                <Image source={Images.down} style={styles.imageDown} />
              </View>
            </TouchableOpacity>
            <View style={{marginBottom: 22.1}} />
          </View>
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
      <View style={{elevation: 1, backgroundColor: Colors.background}}>
        <ListView
          contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
          dataSource={this.dataSource.cloneWithRows(this.state.productSource)}
          pageSize={3}
          renderRow={this.renderRowProduk.bind(this)}
          enableEmptySections
        />
        <TouchableOpacity style={styles.allCategory} onPress={() => {}}>
          <Text style={styles.textAllCategory}>
            Lihat semua produk terbaru
          </Text>
          <Image source={Images.rightArrow} style={styles.imageCategory} />
        </TouchableOpacity>
      </View>
    )
  }

  renderRowProduk (rowData) {
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
      <TouchableOpacity style={stylesHome.rowDataContainer} activeOpacity={0.5}>
        <Image source={Images.contohproduct} style={stylesHome.imageProduct} />
        <View style={stylesHome.containerDiskon}>
          <Text style={stylesHome.diskon}>
            {rowData.product.discount} %
          </Text>
        </View>
        <View style={stylesHome.containerTitle}>
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
          <View style={{flexDirection: 'row', paddingBottom: 28.8}}>
            <View style={{flex: 1}}>
              <Text style={stylesHome.harga}>
                {money}
              </Text>
            </View>
            <View style={stylesHome.likesContainer}>
              {this.renderLikes(rowData.like)}
              <Text style={stylesHome.like}>
                {rowData.product.stock}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView>
          <View style={styles.headerContainer}>
            {this.renderImageProduct()}
            {this.renderTitle()}
          </View>
          {this.listDiscount()}
          {this.renderRating()}
          {this.renderStaticProduct()}
          <Text style={styles.bigTitle}>Informasi Produk</Text>
          {this.renderInfoProduct()}
          <Text style={styles.bigTitle}>Ulasan ({this.state.ulasanDataSource._cachedRowCount})</Text>
          {this.renderRowUlasan()}
          <Text style={styles.bigTitle}>Estimasi Pengiriman</Text>
          {this.renderEstimasiPengiriman()}
          <Text style={styles.bigTitle}>Info Penjual</Text>
          {this.renderInfoPenjual()}
          <Text style={styles.bigTitle}>Produk lain dari Penjual ini</Text>
          {this.renderProduk()}
          <View style={{height: 20.3}} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonReset}>
              <Image source={Images.diskusi} style={{marginTop: 2, height: 14, width: 15}} />
              <Text style={styles.labelButtonReset}>
                  Diskusi (278)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOke}>
              <Text style={styles.labelButtonOke}>
                Beli Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProdukTerbaru: (limit) => dispatch(homeAction.products({limit}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreenScreen)
