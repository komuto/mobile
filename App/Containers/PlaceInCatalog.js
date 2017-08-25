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
import { MaskService } from 'react-native-masked-text'
import CustomRadio from '../Components/CustomRadioCatalog'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as catalogAction from '../actions/catalog'
import * as productAction from '../actions/product'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/TempatkanDiKatalogScreenStyle'
import { Images, Colors } from '../Themes'

class PlaceInCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      listKatalog: [],
      id: this.props.id,
      foto: this.props.fotoToko || null,
      price: this.props.price || 1000,
      namaToko: this.props.namaToko || null,
      productName: this.props.productName || null,
      index: this.props.catalogId,
      idCatalog: this.props.catalogId,
      modalTambahKatalog: false,
      namaKatalog: '',
      statusCreateProduct: this.props.createDropshipper
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
    } if (nextProps.alterProduct.status === 200) {
      this.setState({
        loading: false
      })
      nextProps.alterProduct.status = 0
    } if (nextProps.dataCreateProdukDropshipper.status > 200) {
      ToastAndroid.show('Terjadi Kesalahan..', ToastAndroid.LONG)
      this.setState({
        loading: false
      })
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    this.props.getListProduk()
    this.props.getHiddenProduct()
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  renderProduct () {
    const totalHarga = MaskService.toMask('money', this.state.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.productName}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.textKelola}>
                {totalHarga}
              </Text>
              <Text style={[styles.textKelola, {color: Colors.darkMint}]}> - Komisi 10%</Text>
            </View>
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

  nextState () {
    const {idCatalog, id, statusCreateProduct} = this.state
    this.setState({
      loading: true
    })
    if (statusCreateProduct) {
      this.props.createProductFromDropshipper(id, idCatalog)
    } else {
      let tempIdProduct = []
      tempIdProduct[0] = id
      this.props.changeCatalog(idCatalog, tempIdProduct)
    }
  }

  renderStage () {
    if (this.state.statusCreateProduct) {
      <View style={styles.header}>
        <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
          <Text style={[styles.textState, {color: Colors.background}]}>1</Text>
        </View>
        <View style={styles.line} />
        <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
          <Text style={[styles.textState, {color: Colors.background}]}>2</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.state}>
          <Text style={styles.textState}>3</Text>
        </View>
      </View>
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={[styles.container]}>
        {this.renderStage()}
        {this.renderProduct()}
        <Text style={styles.bigTitle}>Pilih Katalog yang sesuai dengan produk Anda</Text>
        {this.renderCatalog()}
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
          <Text style={styles.textButtonNext}>
            Lanjutkan
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
    alterProduct: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
    createCatalog: (name) => dispatch(catalogAction.createCatalog({name: name})),
    changeCatalog: (id, data) => dispatch(productAction.changeCatalogProducts({catalog_id: id, product_ids: data})),
    createProductFromDropshipper: (id, idCatalog) => dispatch(productAction.addDropshipProducts({id: id, catalog_id: idCatalog})),
    getListProduk: () => dispatch(storeAction.getStoreProducts()),
    getHiddenProduct: () => dispatch(storeAction.getHiddenStoreProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInCatalog)
