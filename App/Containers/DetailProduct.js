import React from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  ListView,
  ActivityIndicator,
  BackAndroid,
  Modal,
  ToastAndroid,
  Share
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
import ModalLogin from '../Components/ModalLogin'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as homeAction from '../actions/home'
import * as filterAction from '../actions/location'
import * as serviceAction from '../actions/expedition'
import * as reviewAction from '../actions/review'
import * as productAction from '../actions/product'
import * as storeAction from '../actions/stores'
import * as catalogAction from '../actions/catalog'
import * as userAction from '../actions/user'

// Styles
import styles from './Styles/ProductDetailScreenStyle'
import stylesHome from './Styles/ProdukTerbaruScreenStyle'

import { Images, Colors, Fonts } from '../Themes'

class DetailProduct extends React.Component {

  constructor (props) {
    super(props)
    this.submiting = {
      detail: this.props.detail || false
    }
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataImage: [],
      dataGrosir: [],
      isLogin: this.props.datalogin.login,
      id: this.props.id,
      grosir: true,
      discount: false,
      diskon: 0,
      price: 0,
      kondisi: 1,
      avgQuantity: 0,
      avgAccurate: 0,
      numOfLine: 3,
      lokasiPenjual: '',
      namaToko: '',
      like: false,
      idLokasiPenjual: 0,
      numOfLineTerm: 3,
      readmore: styles.readMoreTextContainer,
      readmoreTerm: styles.readMoreTextContainer,
      verified: false,
      title: '',
      fotoToko: 'http://188.166.246.46/uploads/produk/noimage.png',
      countProduct: 1,
      ulasan: [],
      kategori: '',
      deskripsi: '',
      termcondition: '',
      showService: false,
      stock: 0,
      sold: 0,
      weight: 0,
      totalWeight: 0,
      originId: 0,
      otherProduct: [],
      provinsiTerpilih: 'Semua Wilayah',
      kabTerpilih: 'Semua Wilayah',
      kecTerpilih: 'Semua Wilayah',
      idProvinsiTerpilih: 0,
      idKabTerpilih: 0,
      idKecTerpilih: 0,
      loadingProduk: true,
      sizeUlasan: 2,
      modalLaporkan: false,
      estimasi: 0,
      modalProvinsi: false,
      modalKabupaten: false,
      modalKecamatan: false,
      tambahanProvinsi: [
        {
          'id': 0,
          'name': 'Pilih Provinsi'
        }
      ],
      tambahanKota: [
        {
          'id': 0,
          'ro_id': 0,
          'name': 'Pilih Kota'
        }
      ],
      tambahanKecamatan: [
        {
          'id': 0,
          'name': 'Pilih Kecamatan'
        }
      ],
      provinsi: [],
      kabupaten: [],
      kecamatan: [],
      service: [],
      dataServices: [],
      jumlahServis: 0,
      messageServices: '',
      storeId: 0,
      asuransi: false,
      jumlahLihat: 0,
      diskusi: 0,
      pickFromDropshipper: this.props.dropship || false,
      buttonText: this.props.buttonText || 'Beli Sekarang',
      idCategory: '',
      idBrand: '',
      isDropship: '',
      photoProductDropship: [],
      expeditionDropship: [],
      shareUrl: '',
      isHere: true,
      modalLogin: false,
      commission: this.props.commission || 0,
      fetchData: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetailProduk.status === 200) {
      if (this.state.id === nextProps.dataDetailProduk.detail.product.id) {
        if (this.state.fetchData) {
          this.setState({
            id: nextProps.dataDetailProduk.detail.product.id,
            loadingProduk: false,
            grosir: nextProps.dataDetailProduk.detail.product.is_wholesaler,
            discount: nextProps.dataDetailProduk.detail.product.is_discount,
            price: nextProps.dataDetailProduk.detail.product.price,
            ulasan: nextProps.dataDetailProduk.detail.reviews.slice(0, 3),
            sizeUlasan: nextProps.dataDetailProduk.detail.reviews.length,
            dataImage: nextProps.dataDetailProduk.detail.images,
            title: nextProps.dataDetailProduk.detail.product.name,
            like: nextProps.dataDetailProduk.detail.product.is_liked,
            diskon: nextProps.dataDetailProduk.detail.product.discount,
            verified: nextProps.dataDetailProduk.detail.store.is_verified,
            otherProduct: nextProps.dataDetailProduk.detail.other_products,
            avgQuantity: nextProps.dataDetailProduk.detail.rating.quality,
            avgAccurate: nextProps.dataDetailProduk.detail.rating.accuracy,
            stock: nextProps.dataDetailProduk.detail.product.stock,
            sold: nextProps.dataDetailProduk.detail.product.count_sold,
            diskusi: nextProps.dataDetailProduk.detail.product.count_discussion,
            weight: nextProps.dataDetailProduk.detail.product.weight,
            totalWeight: nextProps.dataDetailProduk.detail.product.weight,
            kondisi: nextProps.dataDetailProduk.detail.product.condition,
            kategori: nextProps.dataDetailProduk.detail.category.name,
            deskripsi: nextProps.dataDetailProduk.detail.product.description,
            termcondition: nextProps.dataDetailProduk.detail.store.term_condition,
            idLokasiPenjual: nextProps.dataDetailProduk.detail.location.province.id,
            lokasiPenjual: nextProps.dataDetailProduk.detail.location.province.name,
            namaToko: nextProps.dataDetailProduk.detail.store.name,
            service: nextProps.dataDetailProduk.detail.expeditions,
            jumlahServis: nextProps.dataDetailProduk.detail.expeditions.length,
            storeId: nextProps.dataDetailProduk.detail.store.id,
            isStoreFavorite: nextProps.dataDetailProduk.detail.store.is_favorite,
            originId: nextProps.dataDetailProduk.detail.location.district.ro_id,
            dataGrosir: nextProps.dataDetailProduk.detail.wholesaler,
            asuransi: nextProps.dataDetailProduk.detail.product.is_insurance,
            jumlahLihat: nextProps.dataDetailProduk.detail.product.count_view,
            idCategory: nextProps.dataDetailProduk.detail.product.category_id,
            idBrand: nextProps.dataDetailProduk.detail.product.identifier_brand,
            isDropship: nextProps.dataDetailProduk.detail.product.is_dropshipper,
            shareUrl: nextProps.dataDetailProduk.detail.share_link,
            fetchData: false
          })
          try {
            this.setState({
              fotoToko: nextProps.dataDetailProduk.detail.store.logo
            })
          } catch (e) {
            console.log(e)
          }
          let tempPhoto = []
          let tempExpedition = []
          nextProps.dataDetailProduk.detail.images.map((data, i) => {
            tempPhoto.push({'name': data.file})
          })
          nextProps.dataDetailProduk.detail.expeditions.map((data, i) => {
            tempExpedition.push({'expedition_service_id': data.id})
          })
          this.setState({
            photoProductDropship: tempPhoto,
            expeditionDropship: tempExpedition
          })
          nextProps.dataDetailProduk.status = 0
          // this.props.resetProduk()
        }
      }
    } else if (nextProps.dataDetailProduk.status !== 200 && nextProps.dataDetailProduk.status !== 0) {
      ToastAndroid.show(nextProps.dataDetailProduk.message, ToastAndroid.SHORT)
      this.setState({
        loadingProduk: false
      })
      // nextProps.dataDetailProduk.status = 0
    }
    if (nextProps.dataProvinsi.status === 200) {
      this.setState({
        provinsi: this.state.tambahanProvinsi.concat(nextProps.dataProvinsi.provinces)
      })
      // nextProps.dataProvinsi.status = 0
    } else if (nextProps.dataProvinsi.status !== 200 && nextProps.dataProvinsi.status !== 0) {
      ToastAndroid.show(nextProps.dataProvinsi.message, ToastAndroid.SHORT)
      // nextProps.dataProvinsi.status = 0
    }
    if (nextProps.dataKota.status === 200) {
      this.setState({
        kabupaten: this.state.tambahanKota.concat(nextProps.dataKota.districts)
      })
      // nextProps.dataKota.status = 0
    } else if (nextProps.dataKota.status !== 200 && nextProps.dataKota.status !== 0) {
      ToastAndroid.show(nextProps.dataKota.message, ToastAndroid.SHORT)
      // nextProps.dataKota.status = 0
    }
    if (nextProps.dataSubDistrict.status === 200) {
      this.setState({
        kecamatan: this.state.tambahanKecamatan.concat(nextProps.dataSubDistrict.subdistricts)
      })
      // nextProps.dataSubDistrict.status = 0
    } else if (nextProps.dataSubDistrict.status !== 200 && nextProps.dataSubDistrict.status !== 0) {
      ToastAndroid.show(nextProps.dataSubDistrict.message, ToastAndroid.SHORT)
      // nextProps.dataSubDistrict.status = 0
    }
    if (nextProps.dataServis.status === 200) {
      this.setState({
        dataServices: nextProps.dataServis.charges
      })
      nextProps.dataServis.status = 0
    } else if (nextProps.dataServis.status !== 200 && nextProps.dataServis.status !== 0) {
      this.setState({
        messageServices: nextProps.dataServis.message
      })
      nextProps.dataServis.status = 0
    }
    if (nextProps.dataWishlist.status === 200) {
      if (this.state.like) {
        this.setState({
          like: false
        })
      } else if (!this.state.like) {
        this.setState({
          like: true
        })
      }
      this.props.getDetailProduk(this.state.id)
      this.props.resetAddToWishlist()
    } else if (nextProps.dataWishlist.status !== 200 && nextProps.dataWishlist.status !== 0) {
      ToastAndroid.show(nextProps.dataWishlist.message, ToastAndroid.SHORT)
      this.props.resetAddToWishlist()
    }
    if (nextProps.dataFavorit.status === 200) {
      if (this.state.isStoreFavorite) {
        this.setState({isStoreFavorite: false})
        ToastAndroid.show('Berhasil menghapus dari toko favorit', ToastAndroid.SHORT)
      } else if (!this.state.isStoreFavorite) {
        this.setState({isStoreFavorite: true})
        ToastAndroid.show(nextProps.dataFavorit.message.toString(), ToastAndroid.SHORT)
      }
      nextProps.dataFavorit.status = 0
    } else if (nextProps.dataFavorit.status !== 200 && nextProps.dataFavorit.status !== 0) {
      ToastAndroid.show(nextProps.dataFavorit.message, ToastAndroid.SHORT)
      nextProps.dataFavorit.status = 0
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    // this.props.getDetailProduk(this.state.id)
    this.props.getProvinsi()
    // this.props.getKota(11)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (NavigationActions.pop()) {
      return true
    } else {
      NavigationActions.backtab({
        type: ActionConst.REPLACE
      })
      return true
    }
  }

  backButton () {
    if (NavigationActions.pop()) {
      return true
    } else {
      NavigationActions.backtab({
        type: ActionConst.REPLACE
      })
      return true
    }
  }

  openLaporkan () {
    this.setState({
      modalLaporkan: true
    })
  }

  closeLaporkan () {
    this.setState({
      modalLaporkan: false
    })
  }

  laporkan () {
    this.setState({ modalLaporkan: false })
    NavigationActions.report({
      type: ActionConst.PUSH,
      images: this.state.fotoToko,
      namaBarang: this.state.title,
      harga: this.state.price,
      id: this.state.id
    })
  }

  produkDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  onShare () {
    const price = this.maskedMoney(this.state.price)
    Share.share({
      message: 'Coba Lihat Product ' + this.state.title + ' dengan harga ' + price +
        '\n' + this.state.shareUrl,
      url: '',
      title: 'Bagikan Product Ini'
    }, {
      dialogTitle: 'Bagikan Product',
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}))
  }

  renderModalLaporkan () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalLaporkan}
        onRequestClose={() => this.setState({ modalLaporkan: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.closeLaporkan()}>
          <View style={styles.menuLaporkanContainer}>
            <TouchableOpacity
              style={styles.menuLaporkan}
              activeOpacity={0.8}
              onPress={() => this.onShare()}
            >
              <Image
                source={Images.share}
                style={styles.imageStyle}
              />
              <Text style={styles.textBagikan}>Bagikan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuLaporkan} onPress={() => this.laporkan()} activeOpacity={0.8}>
              <Image
                source={Images.laporkan}
                style={styles.imageStyle}
              />
              <Text style={styles.textBagikan}>Laporkan</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    )
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
        <TouchableOpacity onPress={() => this.openLaporkan()}>
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
        <ListView
          horizontal
          enableEmptySections
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          showsHorizontalScrollIndicator={false}
          dataSource={this.dataSource.cloneWithRows(this.state.dataImage)}
          renderRow={this.renderRowImageProduct.bind(this)}
        />
      </View>
    )
  }

  renderRowImageProduct (rowData) {
    return (
      <View style={styles.imageCotainer}>
        <View style={styles.imageProduct}>
          <Image
            source={{ uri: rowData.file }}
            style={styles.image}
          />
        </View>
      </View>
    )
  }

  renderCommission (dropship, commission) {
    if (dropship) {
      return (
        <Text style={styles.commissionText}>
         - Komisi {commission}%
        </Text>
      )
    }
  }

  renderDiskon (status, nominal) {
    Reactotron.log('render dis ;' + status)
    if (status) {
      const money = this.maskedMoney(nominal)
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

  renderDiskon2 (status, nominal) {
    Reactotron.log('render dis ;' + status)
    if (status) {
      const money = this.maskedMoney(nominal)
      return (
        <Text style={styles.nominalDiskon2}>
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

  renderTitle () {
    const {id, grosir, title, discount, diskon, pickFromDropshipper, commission, price} = this.state
    const totalHarga = this.maskedMoney(price)
    let valueCommission
    if (pickFromDropshipper) {
      valueCommission = (
        <Text style={styles.commissionText}>
        -{'\b'}Komisi {commission} %
        </Text>
      )
    }

    const hargaDiskon = this.discountCalculate(price, diskon)
    const hargaDiskonMasked = this.maskedMoney(hargaDiskon)
    const wholesalerMasked = this.maskedMoney(price)
    if (!grosir && !discount) {
      Reactotron.log('tidak dis, tidak gros')
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {title}
            </Text>
            {this.renderLikes(pickFromDropshipper, id)}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.price}>
              {totalHarga}{'\b'}
            </Text>
            {valueCommission}
          </View>
        </View>
      )
    } else if (discount && !grosir) {
      Reactotron.log('dis')
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {title}
            </Text>
            {this.renderLikes(pickFromDropshipper, id)}
          </View>
          <View style={styles.flexRow}>
            <View style={[styles.containerDiskon, {marginTop: 10, marginRight: 10}]}>
              <Text style={styles.diskon}>
                {diskon}%
              </Text>
            </View>
            <View>
              {this.renderDiskon(discount, price)}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.price, {marginTop: 0}]}>
                  {hargaDiskonMasked}{'\b'}
                </Text>
                {valueCommission}
              </View>
            </View>
          </View>
        </View>
      )
    } else if (!discount && grosir) {
      Reactotron.log('gros')
      return (
        <View>
          <View style={styles.flexRow}>
            <View style={[styles.containerDiskon, {backgroundColor: Colors.darkMint}]}>
              <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny, color: Colors.background}]}>
                GROSIR
              </Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={[styles.titleContainer, {flex: 1, marginLeft: 15}]}>
                <Text style={styles.title}>
                  {title}
                </Text>
                {this.renderLikes(pickFromDropshipper, id)}
              </View>
              <Text style={[styles.price, { marginLeft: 15 }]}>
                {wholesalerMasked}
              </Text>
              {valueCommission}
            </View>
          </View>
        </View>
      )
    } else {
      Reactotron.log('normal')
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {title}
            </Text>
            {this.renderLikes(pickFromDropshipper, id)}
          </View>
          <View style={styles.flexRow}>
            <View style={[styles.containerDiskon, {marginTop: 10, marginRight: 10}]}>
              <Text style={styles.diskon}>
                {diskon}%
              </Text>
            </View>
            <View style={[styles.containerDiskon, {marginTop: 10, marginRight: 10, backgroundColor: Colors.darkMint}]}>
              <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny, color: Colors.background}]}>
                GROSIR
              </Text>
            </View>
            <View>
              {this.renderDiskon(discount, price)}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.price, {marginTop: 0}]}>
                  {hargaDiskonMasked}{'\b'}
                </Text>
                {valueCommission}
              </View>
            </View>
          </View>
        </View>
      )
    }
  }

  renderFotoProfil (foto) {
    if (foto === '' || foto === null || foto === undefined) {
      return (
        <Image
          source={Images.contohproduct}
          style={styles.styleFoto}
        />
      )
    }
    return (
      <Image
        source={{ uri: foto }}
        style={styles.styleFoto}
      />
    )
  }

  renderFotoToko () {
    return (
      <Image
        source={{ uri: this.state.fotoToko }}
        style={[styles.styleFoto, {borderRadius: 0}]}
      />
    )
  }

  renderRating () {
    const {avgAccurate, avgQuantity} = this.state
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
                rating={parseFloat(avgQuantity)}
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
                rating={parseFloat(avgAccurate)}
                selectedStar={(rating) => this.onStarAcuPress(rating)}
              />
            </View>
            <Text style={styles.avgTitle}>{avgAccurate}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderRatingUlasan (starAccurate, starQuantity) {
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

  renderLikes (pickFromDropshipper, id) {
    if (!pickFromDropshipper) {
      if (this.state.like) {
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
  }

  addWishList (ids) {
    if (this.state.isLogin) {
      this.props.addWishList({id: ids})
    } else {
      ToastAndroid.show('Anda belum login', ToastAndroid.SHORT)
    }
  }

  addWishListOther (id) {
    const {otherProduct} = this.state
    if (this.props.datalogin.login) {
      otherProduct.map((myProduct) => {
        if (myProduct.id === id) {
          myProduct.is_liked ? myProduct.count_like -= 1 : myProduct.count_like += 1
          myProduct.is_liked = !myProduct.is_liked
        }
      })
      this.props.addWishList({id: id})
      this.setState({ otherProduct })
    } else {
      ToastAndroid.show('Anda belum login', ToastAndroid.SHORT)
    }
  }

  renderLikesProduk (status, id) {
    if (status) {
      return (
        <TouchableOpacity onPress={() => this.addWishListOther(id)}>
          <Image source={Images.lovered} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this.addWishListOther(id)}>
        <Image source={Images.love} style={styles.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  renderRowService (rowData) {
    const temp2 = Math.ceil((this.state.countProduct + 1) * this.state.totalWeight / 1000) * rowData.cost
    const money = this.maskedMoney(temp2)
    return (
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceName}>{rowData.full_name}</Text>
        <Text style={styles.serviceCost}>{money}</Text>
        <Text style={styles.serviceEtd}>{rowData.etd} hari</Text>
      </View>
    )
  }

  renderKurir () {
    if (this.state.showService) {
      if (this.state.dataServices.length > 0) {
        return (
          <View style={{ backgroundColor: Colors.background }}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataServices)}
              renderRow={this.renderRowService.bind(this)}
              enableEmptySections
            />
          </View>
        )
      } else {
        return (
          <View style={{backgroundColor: Colors.lightOrange, paddingLeft: 10}}>
            <Text style={styles.errorExpedition}>{this.state.messageServices}</Text>
          </View>
        )
      }
    } else {
      return null
    }
  }

  renderSold () {
    const { sold } = this.state
    if (sold === null || sold === undefined) {
      return (
        <Text style={styles.staticProductVal}>0</Text>
      )
    }
    return (
      <Text style={styles.staticProductVal}>{sold}</Text>
    )
  }

  renderStaticProduct () {
    return (
      <View style={styles.staticContainer}>
        <View style={[styles.staticList, {borderStyle: this.state.showBorder ? 'dashed' : null}]}>
          <Text style={styles.staticProduct}>Stok Barang</Text>
          <Text style={styles.staticProductVal}>{this.state.stock}</Text>
        </View>
        <View style={styles.staticList}>
          <Text style={styles.staticProduct}>Dilihat</Text>
          <Text style={styles.staticProductVal}>{this.state.jumlahLihat}</Text>
        </View>
        <View style={[styles.staticList, {borderBottomWidth: 0}]}>
          <Text style={styles.staticProduct}>Terjual</Text>
          {this.renderSold()}
        </View>
      </View>
    )
  }

  listDiscount () {
    const {dataGrosir} = this.state
    if (dataGrosir.length > 0) {
      return (
        <View style={styles.staticContainer}>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.dataGrosir)}
            renderRow={this.renderRowGrosir.bind(this)}
            enableEmptySections
          />
        </View>
      )
    }
    return (
      <View />
    )
  }

  renderRowGrosir (rowData, sectionID, rowID, highlightRow) {
    let warnaText
    const money = this.maskedMoney(rowData.price)
    if (parseInt(rowID) === this.state.dataGrosir.length - 1) {
      warnaText = { color: Colors.darkMint }
    } else {
      warnaText = { color: Colors.red }
    }
    return (
      <View style={[styles.staticList]}>
        <Text style={styles.staticProduct}>{rowData.min} - {rowData.max} Barang</Text>
        <Text style={[styles.staticProductVal, warnaText]}>{money}</Text>
        <Text style={styles.staticProductVal}> / barang </Text>
      </View>
    )
  }

  renderKondisi () {
    const { kondisi } = this.state
    if (kondisi > 0) {
      return (
        <Text style={styles.infoProductVal}>Baru</Text>
      )
    }
    return (
      <Text style={styles.infoProductVal}>Bekas</Text>
    )
  }

  renderAsuransi () {
    if (this.state.asuransi) {
      return (
        <Text style={styles.infoProductVal}>Wajib</Text>
      )
    }
    return (
      <Text style={styles.infoProductVal}>Optional</Text>
    )
  }

  renderInfoProduct () {
    const { numOfLine, weight } = this.state
    return (
      <View>
        <View style={styles.infoContainer}>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Berat</Text>
            <Text style={styles.infoProductVal}>{weight} gram</Text>
          </View>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Kondisi</Text>
            {this.renderKondisi()}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Asuransi</Text>
            {this.renderAsuransi()}
          </View>
          <View style={styles.infoList}>
            <Text style={styles.infoProduct}>Kategori</Text>
            <Text style={styles.infoProductVal}>{this.state.kategori}</Text>
          </View>
        </View>
        <View style={[styles.infoContainer, {flexDirection: 'column'}]}>
          <Text style={styles.infoProduct}>Deskripsi</Text>
          <Text
            numberOfLines={numOfLine}
            style={[styles.infoProductVal, {color: Colors.darkgrey, paddingRight: 26, paddingBottom: 0}]}
          >
            {this.state.deskripsi}
          </Text>
          <TouchableOpacity style={this.state.readmore} onPress={() => this.readMore()}>
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
            {this.renderFotoProfil(rowData.user.photo)}
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                {rowData.user.name}
              </Text>
              <Text style={styles.textKelola}>
                3 hari yang lalu
              </Text>
            </View>
          </View>
          {this.renderRatingUlasan(rowData.accuracy, rowData.quality)}
          <Text numberOfLines={numOfLine} style={styles.isiUlasan}>{rowData.review}</Text>
        </View>
      </View>
    )
  }

  readMore () {
    const {numOfLine} = this.state
    if (numOfLine !== null) {
      this.setState({
        numOfLine: null,
        readmore: styles.readMoreTextContainer1
      })
    } else if (numOfLine === null) {
      this.setState({
        numOfLine: 3,
        readmore: styles.readMoreTextContainer
      })
    }
  }

  readMoreTerm () {
    const {numOfLineTerm} = this.state
    if (numOfLineTerm !== null) {
      this.setState({
        numOfLineTerm: null,
        readmoreTerm: styles.readMoreTextContainer1
      })
    } else if (numOfLineTerm === null) {
      this.setState({
        numOfLineTerm: 3,
        readmoreTerm: styles.readMoreTextContainer
      })
    }
  }

  renderRowUlasan () {
    return (
      <View>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.ulasan)}
          renderRow={this.renderUlasan.bind(this)}
          enableEmptySections
        />
        <TouchableOpacity style={styles.allCategory} onPress={() => this.onPressUlasan(this.state.id)}>
          <Text style={styles.textAllCategory}>
            Lihat semua ulasan
          </Text>
          <Image source={Images.rightArrow} style={styles.imageCategory} />
        </TouchableOpacity>
      </View>
    )
  }

  onPressUlasan (id) {
    NavigationActions.review({
      id: id,
      type: ActionConst.PUSH,
      price: this.state.price,
      foto: this.state.fotoToko,
      namaToko: this.state.namaToko
    })
    this.props.reviewAction(id, 1)
  }

  renderListProvinsi (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            provinsiTerpilih: rowData.name,
            kabTerpilih: 'Semua Wilayah',
            kecTerpilih: 'Semua Wilayah',
            idProvinsiTerpilih: rowData.id,
            modalProvinsi: false })
          this.props.getKota(rowData.id)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKabupaten (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kabTerpilih: rowData.name,
            idKabTerpilih: rowData.ro_id,
            kecTerpilih: 'Semua Wilayah',
            modalKabupaten: false })
          this.props.getSubDistrict(rowData.id)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKecamatan (rowData) {
    const { id, idLokasiPenjual, idKabTerpilih } = this.state
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kecTerpilih: rowData.name,
            idKecTerpilih: rowData.id,
            modalKecamatan: false,
            showService: true
          })
          this.listDataService(id, idLokasiPenjual, idKabTerpilih, 1)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  listDataService (id, originId, destinationId, weight) {
    this.props.getServices(id, originId, destinationId, weight)
  }

  renderModalProvinsi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalProvinsi}
        onRequestClose={() => this.setState({ modalProvinsi: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalProvinsi: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.provinsi)}
              renderRow={this.renderListProvinsi.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderModalKabupaten () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKabupaten}
        onRequestClose={() => this.setState({ modalKabupaten: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKabupaten: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.kabupaten)}
              renderRow={this.renderListKabupaten.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderModalKecamatan () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKecamatan}
        onRequestClose={() => this.setState({ modalKecamatan: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKecamatan: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.kecamatan)}
              renderRow={this.renderListKecamatan.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderLokasi () {
    return (
      <View style={styles.lokasiContainerKurir}>
        <View style={styles.pilihLokasiContainer}>
          <Text style={[styles.qualityText, { marginBottom: 0, flex: 0.4 }]}>Provinsi :</Text>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalProvinsi: true })}>
            <Text style={[styles.qualityText, { marginBottom: 0, flex: 1 }]}>{this.state.provinsiTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <View style={styles.pilihLokasiContainer}>
          <Text style={[styles.qualityText, { marginBottom: 0, flex: 0.4 }]}>Kabupaten :</Text>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
            <Text style={[styles.qualityText, { marginBottom: 0, flex: 1 }]}>{this.state.kabTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <View style={styles.pilihLokasiContainer}>
          <Text style={[styles.qualityText, { marginBottom: 0, flex: 0.4 }]}>Kecamatan :</Text>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKecamatan: true })}>
            <Text style={[styles.qualityText, { marginBottom: 0, flex: 1 }]}>{this.state.kecTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderBukaEstimasiPengiriman () {
    if (this.state.estimasi === 200) {
      return null
    } else {
      return (
        <View style={styles.bukaEstimasiContainer}>
          <Text style={[styles.isiUlasan, { paddingLeft: 0 }]}>Lihat estimasi harga dan lama pengiriman barang ke tempat Anda</Text>
          <TouchableOpacity style={styles.buttonEstimasi} onPress={() => this.setState({ estimasi: 200 })}>
            <Text style={styles.labelButtonFav}>
              Lihat Estimasi Pengiriman Barang
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderEstimasiPengiriman () {
    if (this.state.estimasi === 200) {
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
              {this.renderLokasi()}
            </View>
          </View>
          {this.renderKurir()}
        </View>
      )
    } else {
      return null
    }
  }

  substract () {
    const {countProduct} = this.state
    const berat = (countProduct - 1) * this.state.weight
    if (countProduct > 1) {
      this.setState({
        countProduct: countProduct - 1,
        totalWeight: Math.ceil(berat)
      })
    }
  }

  add () {
    const {countProduct} = this.state
    const berat = (countProduct + 1) * this.state.weight
    this.setState({
      countProduct: countProduct + 1,
      totalWeight: Math.ceil(berat)
    })
  }

  detailPenjual (id) {
    this.props.getToko(id)
    this.props.getStoreReview(id)
    this.setState({
      isHere: false
    })
    NavigationActions.storedetail({ type: ActionConst.PUSH })
  }

  checkIsFavorite (data) {
    const {storeId} = this.state
    if (!data) {
      return (
        <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleFavoriteStore(storeId)}>
          <Text style={styles.labelButtonFav}>
            Favorit
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleFavoriteStore(storeId)}>
          <Image source={Images.centangBiru} style={styles.image24p} />
          <Text style={styles.labelButtonFav}>
            Di Favoritkan
          </Text>
        </TouchableOpacity>
      )
    }
  }

  renderInfoPenjual () {
    const {numOfLine, storeId} = this.state
    return (
      <View style={[styles.ulasanContainer]}>
        <View style={styles.border}>
          <TouchableOpacity
            style={[styles.profile, {paddingBottom: 20}]}
            onPress={() => this.detailPenjual(storeId)}
          >
            {this.renderFotoToko()}
            <View style={styles.containerNamaToko}>
              <View style={styles.namaContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.textNama} numberOfLines={2} ellipsizeMode={'tail'}>
                    {this.state.namaToko}
                  </Text>
                  {this.renderVerifiedPenjual(this.state.verified)}
                </View>
                <Text numberOfLines={2} ellipsizeMode={'tail'} style={[styles.textKelola, {color: Colors.lightgrey}]}>
                  {this.state.lokasiPenjual}
                </Text>
              </View>
              {this.checkIsFavorite(this.state.isStoreFavorite)}
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.infoContainer, {flexDirection: 'column', marginTop: 1.8}]}>
          <Text style={styles.infoProduct}>Terms and Conditions</Text>
          <Text
            numberOfLines={numOfLine}
            style={[styles.infoProductVal, {color: Colors.darkgrey, paddingRight: 26, paddingBottom: 0}]}
          >
            {this.state.termcondition}
          </Text>
          <TouchableOpacity style={this.state.readmoreTerm} onPress={() => this.readMoreTerm()}>
            <View style={{alignItems: 'center'}}>
              <Image source={Images.down} style={styles.imageDown} />
            </View>
          </TouchableOpacity>
          <View style={{marginBottom: 22.1}} />
        </View>
      </View>
    )
  }

  handleFavoriteStore (id) {
    this.props.putFavoriteStore(id)
  }

  handleNewProduct (id) {
    NavigationActions.newproduct({
      type: ActionConst.PUSH,
      header: 'Produk Terbaru',
      storeId: id
    })
  }

  renderProdukSeller () {
    return (
      <View style={{elevation: 1, backgroundColor: Colors.background}}>
        <ListView
          contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
          dataSource={this.dataSource.cloneWithRows(this.state.otherProduct)}
          renderRow={this.renderRowProdukPenjual.bind(this)}
          enableEmptySections
        />
        <TouchableOpacity style={styles.allCategory} onPress={() => this.handleNewProduct(this.state.storeId)}>
          <Text style={styles.textAllCategory}>
            Lihat semua produk terbaru
          </Text>
          <Image source={Images.rightArrow} style={styles.imageCategory} />
        </TouchableOpacity>
      </View>
    )
  }

  checkDiscount (discount, isDiscount, isWholesaler) {
    if (isDiscount && isWholesaler) {
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.containerDiskon, {top: -15, left: -15}]}>
            <Text style={styles.diskon}>
              {discount}%
            </Text>
          </View>
          <View style={[styles.containerDiskon2, {top: -15, left: -10}]}>
            <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny}]}>
              GROSIR
            </Text>
          </View>
        </View>
      )
    } if (isDiscount) {
      return (
        <View style={[styles.containerDiskon, {top: -15, left: -15}]}>
          <Text style={styles.diskon}>
            {discount}%
          </Text>
        </View>
      )
    } if (isWholesaler) {
      return (
        <View style={[styles.containerDiskon, {top: -15, left: -15, backgroundColor: Colors.green}]}>
          <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny}]}>
            GROSIR
          </Text>
        </View>
      )
    } else {
      return (<View />)
    }
  }

  renderRowProdukPenjual (rowData) {
    if (rowData.is_discount) {
      this.hargaDiskon = this.discountCalculate(rowData.price, rowData.discount)
    } else {
      this.hargaDiskon = rowData.price
    }

    const money = this.maskedMoney(this.hargaDiskon)
    return (
      <TouchableOpacity
        style={stylesHome.rowDataContainer}
        activeOpacity={0.5}
        onPress={() => this.produkDetail(rowData.id)}
      >
        <Image source={{ uri: rowData.image }} style={stylesHome.imageProduct}>
          {this.checkDiscount(rowData.discount, rowData.is_discount, rowData.is_wholesaler)}
        </Image>
        <View style={stylesHome.containerTitle}>
          <Text numberOfLines={2} ellipsizeMode={'tail'} style={stylesHome.textTitleProduct}>
            {rowData.name}
          </Text>
          <View style={stylesHome.tokoContainer}>
            <Text style={stylesHome.namaToko}>
              {this.state.namaToko}
            </Text>
            {this.renderVerified(this.state.verified)}
          </View>
          {this.renderDiskon2(rowData.is_discount, rowData.price)}
          <View style={styles.otherProductMoneyContainer}>
            <View style={{flex: 1}}>
              <Text style={stylesHome.harga}>
                {money}
              </Text>
            </View>
            <View style={stylesHome.likesContainer}>
              {this.renderLikesProduk(rowData.is_liked, rowData.id)}
              <Text style={stylesHome.like}>
                {rowData.count_like}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
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

  renderProductSeller () {
    if (!this.state.pickFromDropshipper) {
      return (
        <View style={{ marginBottom: 80 }}>
          <Text style={styles.bigTitle}>Produk lain dari Penjual ini</Text>
          {this.renderProdukSeller()}
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  diskusi () {
    this.props.getDiscussion(this.state.id, 1)
    NavigationActions.productdiscussion({
      id: this.state.id,
      type: ActionConst.PUSH,
      price: this.state.price,
      foto: this.state.fotoToko,
      namaProduk: this.state.title,
      data: []
    })
  }

  beliSekarang () {
    const { id,
      grosir,
      price,
      dataImage,
      title,
      diskon,
      stock,
      weight,
      namaToko,
      service,
      dataGrosir,
      originId } = this.state
    if (this.state.isLogin) {
      if (!this.state.pickFromDropshipper) {
        NavigationActions.purchaseaddtocart({
          type: ActionConst.PUSH,
          idProduct: id,
          price: price - (diskon / 100 * price),
          foto: dataImage[0].file,
          namaProduk: title,
          namaToko: namaToko,
          weight: weight,
          subtotal: price - (diskon / 100 * price),
          diskon: String(diskon / 100 * price),
          originId: originId,
          dataKurir: service,
          stock: stock,
          grosir: grosir,
          dataGrosir: dataGrosir
        })
        this.props.getDetailProduk(this.state.id)
      } else {
        NavigationActions.placeincatalog({
          type: ActionConst.PUSH,
          fotoToko: this.state.fotoToko,
          productName: this.state.title,
          namaToko: this.state.namaToko,
          price: this.state.price,
          id: this.state.id,
          createDropshipper: true,
          commission: this.state.commission
        })
      }
    } else {
      this.setState({
        modalLogin: true
      })
    }
  }

  onClose () {
    this.setState({ isLogin: false })
  }

  render () {
    const { loadingProduk, modalLogin } = this.state
    if (loadingProduk) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    let view = null
    if (modalLogin) {
      view = <ModalLogin visible={modalLogin} onClose={() => this.onClose()} />
    }
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
          <Text style={styles.bigTitle}>Ulasan ({this.state.sizeUlasan})</Text>
          {this.renderRowUlasan()}
          <Text style={styles.bigTitle}>Estimasi Pengiriman</Text>
          {this.renderBukaEstimasiPengiriman()}
          {this.renderEstimasiPengiriman()}
          <Text style={styles.bigTitle}>Info Penjual</Text>
          {this.renderInfoPenjual()}
          {this.renderProductSeller()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.diskusi()}>
            <Image source={Images.diskusi} style={{marginTop: 2, height: 14, width: 15}} />
            <Text style={styles.labelButtonReset}>
                Diskusi ({this.state.diskusi})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOke} onPress={() => this.beliSekarang()}>
            <Text style={styles.labelButtonOke}>
              {this.state.buttonText}
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderModalLaporkan()}
        {this.renderModalProvinsi()}
        {this.renderModalKabupaten()}
        {this.renderModalKecamatan()}
        {view}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDetailProduk: state.productDetail,
    dataProvinsi: state.provinces,
    dataKota: state.districts,
    dataSubDistrict: state.subdistricts,
    dataServis: state.estimatedCharges,
    dataWishlist: state.addWishlist,
    datalogin: state.isLogin,
    dataFavorit: state.favorite
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProdukTerbaru: (limit) => dispatch(homeAction.products({limit})),
    getProvinsi: () => dispatch(filterAction.getProvince()),
    getKota: (id) => dispatch(filterAction.getDistrict({ province_id: id })),
    getSubDistrict: (id) => dispatch(filterAction.getSubDistrict({ district_id: id })),
    getServices: (id, originId, destinationId, weight) => dispatch(serviceAction.estimatedShipping({
      id: id, origin_id: originId, destination_id: destinationId, weight: weight
    })),
    reviewAction: (id, page) => dispatch(reviewAction.listReviews({ id: id, page: page })),
    addWishList: (param) => dispatch(productAction.addToWishlist(param)),
    resetAddToWishlist: () => dispatch(productAction.resetAddToWishlist()),
    getToko: (id) => dispatch(storeAction.getStores({ id: id })),
    getDetailProduk: (id) => dispatch(productAction.getProduct({id: id})),
    getDiscussion: (id, page) => dispatch(productAction.getDiscussion({ id: id, page: page })),
    resetProduk: () => dispatch(productAction.resetDetail()),
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
    putFavoriteStore: (id) => dispatch(userAction.favoriteStore({id: id})),
    getStoreReview: (id) => dispatch(reviewAction.getStoreReview({id: id, page: 1}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
