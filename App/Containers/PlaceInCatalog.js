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
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import CustomRadio from '../Components/CustomRadio'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as catalogAction from '../actions/catalog'
import * as productAction from '../actions/product'

// Styles
import styles from './Styles/TempatkanDiKatalogScreenStyle'
import { Images, Colors } from '../Themes'

class PlaceInCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      data: [],
      foto: this.props.fotoToko || null,
      price: this.props.price || null,
      namaToko: this.props.namaToko || null,
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false,
      index: '',
      catalogValue: '',
      listKatalog: [],
      idCatalog: '',
      modalTambahKatalog: false,
      namaKatalog: '',
      dataProduct: this.props.dataProduk,
      imageAndExpedition: this.props.imageAndExpedition

    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCatalog.status === 200) {
      let temp = this.state.listKatalog
      nextProps.dataCatalog.catalogs.map((data, i) => {
        temp.push({value: i, label: data.name, id: data.id})
      })
      this.setState({
        listKatalog: temp,
        idCatalog: nextProps.dataCatalog.catalogs[0].id
      })
      temp = []
    } if (nextProps.dataCreateCatalog.status === 200) {
      nextProps.dataCreateCatalog.status = 0
      this.setState({
        listKatalog: []
      })
      this.props.getCatalog()
    } if (nextProps.dataCreateProduk.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.notification({
        type: ActionConst.PUSH,
        tipeNotikasi: 'succestambahproduk',
        hideNavBar: true,
        hideBackImage: true
      })
    } if (nextProps.dataCreateProduk.status > 200) {
      this.setState({
        loading: true
      })
    }
  }

  componentDidMount () {
    this.props.getCatalog()
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
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
              {this.state.namaToko}
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

  handlingRadio (index, value, id) {
    this.setState({
      index: index,
      idCatalog: id
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
              handlingRadio={(index1, value1, id) =>
                this.handlingRadio(index1, value1, id)}
              vertical
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  nextState () {
    const {dataProduct, imageAndExpedition, idCatalog} = this.state
    this.setState({
      loading: true
    })
    this.props.createProduk(
      dataProduct[0],
      dataProduct[1],
      dataProduct[2],
      dataProduct[3],
      dataProduct[4],
      dataProduct[5],
      dataProduct[6],
      dataProduct[7],
      dataProduct[8],
      dataProduct[9],
      idCatalog,
      imageAndExpedition[0],
      imageAndExpedition[1]
    )
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={[styles.container]}>
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
    dataCreateProduk: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
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
    ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInCatalog)
