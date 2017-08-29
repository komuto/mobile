import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  BackAndroid,
  Modal,
  TextInput,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import CustomRadio from '../Components/CustomRadioCatalog'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as catalogAction from '../actions/catalog'
import * as productAction from '../actions/product'

// Styles
import styles from './Styles/EditProductCatalogStyle'
import { Images, Colors } from '../Themes'

class EditProductCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      data: [],
      namaProduk: this.props.dataDetailProduct.storeProductDetail.product.name,
      foto: this.props.dataDetailProduct.storeProductDetail.images[0].file,
      price: 1000000,
      namaToko: this.props.dataDetailProduct.storeProductDetail.product.name,
      index: this.props.catalogId,
      idCatalog: this.props.catalogId,
      catalogValue: '',
      listKatalog: [],
      modalTambahKatalog: false,
      namaKatalog: '',
      dataProduct: this.props.dataProduk,
      imageAndExpedition: this.props.imageAndExpedition,
      isFromDropshipper: this.props.isFromDropshipper || false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCatalog.status === 200) {
      let temp = this.state.listKatalog
      nextProps.dataCatalog.catalogs.map((data, i) => {
        temp[i] = ({'index': data.id, 'label': data.name})
      })
      this.setState({
        listKatalog: temp,
        idCatalog: nextProps.dataCatalog.catalogs[0].id
      })
      nextProps.dataCatalog.status = 0
    } if (nextProps.dataCreateCatalog.status === 200) {
      this.setState({
        namaKatalog: ''
      })
      nextProps.dataCreateCatalog.status = 0
      this.props.getCatalog()
    } if (nextProps.dataCreateProdukDropshipper.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.notification({
        type: ActionConst.PUSH,
        tipeNotikasi: 'succestambahproduk',
        hideNavBar: true,
        hideBackImage: true
      })
      nextProps.dataCreateProdukDropshipper.status = 0
    }
    if (nextProps.dataCreateProdukDropshipper.status > 200) {
      this.setState({
        loading: true
      })
    }
    if (nextProps.dataUpdateData.status === 200) {
      nextProps.dataUpdateData.status = 0
      ToastAndroid.show('Produk berhasil diubah silahkan refresh halaman detail data untuk melihat hasil', ToastAndroid.LONG)
    } else if (nextProps.dataUpdateData.status > 200) {
      nextProps.dataUpdateData.status = 0
      ToastAndroid.show('Terjadi kesalahan.. ' + nextProps.dataUpdateData.message, ToastAndroid.LONG)
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (NavigationActions.pop()) {
      return true
    }
  }

  renderProduct () {
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.namaToko}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  handlingRadio (index, value) {
    this.setState({
      index: index,
      idCatalog: index
    })
  }

  changeNamaKatalog = (text) => {
    this.setState({namaKatalog: text})
  }

  modalTambahCatalog () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalTambahKatalog}
        onRequestClose={() => this.setState({ modalTambahKatalog: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalTambahKatalog: false})}>
          <View style={[styles.modalKatalog]}>
            <View style={[styles.flexRow, {alignItems: 'center', paddingRight: 18.5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: Colors.paleGreyFive}]}>
              <Text style={[styles.title, {flex: 1, paddingBottom: 19.3}]}>Buat Katalog Baru</Text>
              <TouchableOpacity onPress={() => this.setState({modalTambahKatalog: false})}>
                <Image source={Images.close} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <View style={[styles.flexOne, {justifyContent: 'flex-end'}]}>
              <TextInput
                style={[styles.inputText, {marginLeft: 20, marginRight: 20}]}
                value={this.state.namaKatalog}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={30}
                autoCorrect
                onChangeText={this.changeNamaKatalog}
                underlineColorAndroid='transparent'
                placeholder='Masukkan nama katalog'
              />
              <TouchableOpacity style={[styles.buttonnext, {margin: 20}]} onPress={() => this.handleTambahKatalog()}>
                <Text style={styles.textButtonNext}>
                  Buat Katalog Baru
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  handleTambahKatalog () {
    this.setState({modalTambahKatalog: false})
    this.props.createCatalog(this.state.namaKatalog)
  }

  renderCatalog () {
    return (
      <View style={styles.containerCatalog}>
        <TouchableOpacity style={styles.buttonAddCatalog} onPress={() => this.setState({modalTambahKatalog: true})}>
          <Text style={styles.bubttonAddCatalog}>+ Buat Katalog Baru</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.radioContainer}>
            <CustomRadio
              data={this.state.listKatalog}
              index={this.state.index}
              handlingRadio={(index, label) =>
                this.handlingRadio(index, label)}
              vertical
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  save () {
    const { id, idCatalog } = this.state
    this.props.updateData(id, idCatalog)
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={[styles.container]}>
        {this.renderProduct()}
        <Text style={styles.bigTitle}>Pilih Katalog yang sesuai dengan produk Anda</Text>
        {this.renderCatalog()}
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.save()}>
          <Text style={styles.textButtonNext}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
        {this.modalTambahCatalog()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataCatalog: state.getListCatalog,
    dataCreateCatalog: state.createCatalog,
    dataCreateProdukDropshipper: state.addDropshipProducts,
    dataUpdateData: state.alterProducts,
    dataDetailProduct: state.storeProductDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
    getBaseCatalog: dispatch(catalogAction.getListCatalog()),
    createCatalog: (name) => dispatch(catalogAction.createCatalog({name: name})),
    createProduk: (name, categoriId, brandId, desc, price, weight, stock, condition, insurance, isDropship, catalogId, expeditions, images) =>
    dispatch(productAction.createProduct(
      {
        name: name,
        category_id: categoriId,
        brand_id: brandId,
        description: desc,
        price: price,
        weight: weight,
        stock: stock,
        condition: condition,
        is_insurance: insurance,
        is_dropship: isDropship,
        catalog_id: catalogId,
        expeditions: expeditions,
        images: images
      }
    )),
    createProductFromDropshipper: (id, idCatalog) => dispatch(productAction.addDropshipProducts({id: id, catalog_id: idCatalog})),
    updateData: (id, idCatalog) => dispatch(productAction.updateProduct({id: id, catalog_id: idCatalog}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductCatalog)
