import React from 'react'
import { View, Text, ActivityIndicator, BackAndroid, Modal, ListView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as categoriAction from '../actions/home'
import * as brandAction from '../actions/brand'
import * as katalogAction from '../actions/catalog'

// Styles
import styles from './Styles/InfoNamaDanKategoriProdukScreenStyle'
import { Images, Colors, Fonts } from '../Themes'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

class ProductInfoNameAndCategory extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      images: this.props.images,
      namaProduk: '',
      descProduk: '',
      active: false,
      errorColorNamaProduk: Colors.snow,
      colorKategori: Colors.labelgrey,
      colorsubKat1: Colors.labelgrey,
      colorsubKat2: Colors.labelgrey,
      colorsubKat3: Colors.labelgrey,
      colorBrand: Colors.labelgrey,
      kategoriIcon: Images.down,
      subKat1Icon: Images.down,
      subKat2Icon: Images.down,
      subKat3Icon: Images.down,
      brandIcon: Images.down,
      loading: false,
      kategori: [],
      subKategori1: [],
      subKategori2: [],
      subKategori3: [],
      brand: [],
      kategoriTerpilih: 'Pilih Kategori',
      subKategori1Terpilih: 'Pilih Sub Kategori 1',
      subKategori2Terpilih: 'Pilih Sub Kategori 2',
      subKategori3Terpilih: 'Pilih Sub Kategori 3',
      brandTerpilih: 'Pilih Brand',
      idkategoriTerpilih: 0,
      idSubKategori1Terpilih: 0,
      idSubKategori2Terpilih: 0,
      idSubKategori3Terpilih: 0,
      idBrandTerpilih: 0,
      tambahanKategori: [
        {
          'id': 0,
          'name': 'Pilih Kategori'
        }
      ],
      tambahanSubKategori1: [
        {
          'id': 0,
          'name': 'Pilih Sub Kategori 1'
        }
      ],
      tambahanSubKategori2: [
        {
          'id': 0,
          'name': 'Pilih Sub Kategori 2'
        }
      ],
      tambahanSubKategori3: [
        {
          'id': 0,
          'name': 'Pilih Sub Kategori 3'
        }
      ],
      tambahanBrand: [
        {
          'id': 0,
          'name': 'Pilih Brand'
        }
      ],
      modalKategori: false,
      modalSubKategori1: false,
      modalSubKategori2: false,
      modalSubKategori3: false,
      modalBrand: false,
      brandCheck: false,
      height: 0,
      dataProduk: [],
      colorCheckbox: Colors.snow
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataKategori.status === 200) {
      this.setState({
        loading: false,
        kategori: this.state.tambahanKategori.concat(nextProps.dataKategori.categories)
      })
    } if (nextProps.dataSubKategori1.status === 200) {
      this.setState({
        loading: false,
        subKategori1: this.state.tambahanSubKategori1.concat(nextProps.dataSubKategori1.categories.sub_categories)
      })
    } if (nextProps.dataSubKategori2.status === 200) {
      this.setState({
        loading: false,
        subKategori2: this.state.tambahanSubKategori2.concat(nextProps.dataSubKategori2.categories.sub_categories)
      })
    } if (nextProps.dataSubKategori3.status === 200) {
      this.setState({
        loading: false,
        subKategori3: this.state.tambahanSubKategori3.concat(nextProps.dataSubKategori3.categories.sub_categories)
      })
    } if (nextProps.dataBrand.status === 200) {
      this.setState({
        loading: false,
        brand: this.state.tambahanBrand.concat(nextProps.dataBrand.brands)
      })
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

  onError = (field) => {
    console.tron.log('field', field)
    switch (field) {
      case 'namaproduk':
        this.setState({
          errorColorNamaProduk: Colors.red
        })
        break
      case 'empty':
        this.setState({
          errorColorNamaProduk: Colors.red
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'namaproduk':
        this.setState({
          errorColorNamaProduk: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          errorColorNamaProduk: Colors.snow
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'namaproduk':
        this.setState({
          errorColorNamaProduk: Colors.snow
        })
        break
      default:
        this.setState({
          errorColorNamaProduk: Colors.snow
        })
        break
    }
  }

  handleChangeNamaProduk = (text) => {
    this.setState({ namaProduk: text })
  }

  renderListKategori (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kategoriTerpilih: rowData.name,
            idkategoriTerpilih: rowData.id,
            colorKategori: Colors.darkgrey,
            kategoriIcon: Images.down,
            modalKategori: false })
          this.props.getSubKategori1(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListSubKategori1 (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            subKategori1Terpilih: rowData.name,
            idSubKategori1Terpilih: rowData.id,
            colorsubKat1: Colors.darkgrey,
            subKat1Icon: Images.down,
            modalSubKategori1: false })
          this.props.getSubKategori1(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListSubKategori2 (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            subKategori2Terpilih: rowData.name,
            idSubKategori2Terpilih: rowData.id,
            colorsubKat2: Colors.darkgrey,
            subKat2Icon: Images.down,
            modalSubKategori2: false })
          this.props.getSubKategori1(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListSubKategori3 (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            subKategori3Terpilih: rowData.name,
            idSubKategori3Terpilih: rowData.id,
            colorsubKat3: Colors.darkgrey,
            subKat3Icon: Images.down,
            modalSubKategori3: false })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListBrand (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            brandTerpilih: rowData.name,
            idBrandTerpilih: rowData.id,
            colorBrand: Colors.darkgrey,
            brandIcon: Images.down,
            modalBrand: false })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  modalKategori () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKategori}
        onRequestClose={() => this.setState({ modalKategori: false, kategoriIcon: Images.down })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKategori: false, kategoriIcon: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.kategori)}
              renderRow={this.renderListKategori.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  modalSubKategori1 () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalSubKategori1}
        onRequestClose={() => this.setState({ modalSubKategori1: false, subKat1Icon: Images.down })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalSubKategori1: false, subKat1Icon: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.subKategori1)}
              renderRow={this.renderListSubKategori1.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  modalSubKategori2 () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalSubKategori2}
        onRequestClose={() => this.setState({ modalSubKategori2: false, subKat2Icon: Images.down })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalSubKategori2: false, subKat2Icon: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.subKategori2)}
              renderRow={this.renderListSubKategori2.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  modalSubKategori3 () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalSubKategori3}
        onRequestClose={() => this.setState({ modalSubKategori3: false, subKat3Icon: Images.down })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalSubKategori3: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.subKategori3)}
              renderRow={this.renderListSubKategori3.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  modalBrand () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalBrand}
        onRequestClose={() => this.setState({ modalBrand: false, brandIcon: Images.down })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalBrand: false, brandIcon: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.brand)}
              renderRow={this.renderListBrand.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  handdleBrand () {
    if (!this.state.brandCheck) {
      this.setState({brandCheck: true, loading: true, colorCheckbox: Colors.bluesky})
      this.props.getBrand()
    } else {
      this.setState({brandCheck: false, colorCheckbox: Colors.snow})
    }
  }

  viewBrand () {
    const {errorColorNamaProduk, colorBrand, brandCheck, brandIcon} = this.state
    if (brandCheck) {
      return (
        <View>
          <Text style={[styles.textLabel]}>Brand</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalBrand: true, brandIcon: Images.up })}>
              <Text style={[styles.inputPicker, {color: colorBrand}]}>{this.state.brandTerpilih}</Text>
              <Image source={brandIcon} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Brand Harus dipilih</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  stateTwo () {
    const {colorCheckbox, brandCheck, errorColorNamaProduk, colorKategori, colorsubKat1, colorsubKat2, colorsubKat3} = this.state
    const imageCentang = brandCheck ? Images.centangBiru : null
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.textLabel}>Nama Produk</Text>
        <TextInput
          style={styles.inputText}
          value={this.state.namaProduk}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          onFocus={() => this.onFocus('namaproduk')}
          onBlur={() => this.onBlur('namaproduk')}
          onChangeText={this.handleChangeNamaProduk}
          underlineColorAndroid='transparent'
          placeholder='Nama Produk Anda'
        />
        <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Nama Produk Harus diisi</Text>
        <Text style={[styles.textLabel]}>Kategori</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKategori: true, kategoriIcon: Images.up })}>
            <Text style={[styles.inputPicker, {color: colorKategori}]}>{this.state.kategoriTerpilih}</Text>
            <Image source={this.state.kategoriIcon} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Kategori Harus dipilih</Text>
        <Text style={[styles.textLabel]}>Sub-Kategori 1</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalSubKategori1: true, subKat1Icon: Images.up })}>
            <Text style={[styles.inputPicker, {color: colorsubKat1}]}>{this.state.subKategori1Terpilih}</Text>
            <Image source={this.state.subKat1Icon} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Sub-Kategori 1 Harus dipilih</Text>
        <Text style={[styles.textLabel]}>Sub-Kategori 2</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalSubKategori2: true, subKat2Icon: Images.up })}>
            <Text style={[styles.inputPicker, {color: colorsubKat2}]}>{this.state.subKategori2Terpilih}</Text>
            <Image source={this.state.subKat2Icon} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Sub-Kategori 2 Harus dipilih</Text>
        <Text style={[styles.textLabel]}>Sub-Kategori 3</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalSubKategori3: true, subKat3Icon: Images.up })}>
            <Text style={[styles.inputPicker, {color: colorsubKat3}]}>{this.state.subKategori3Terpilih}</Text>
            <Image source={this.state.subKat3Icon} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Sub-Kategori 3 Harus dipilih</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 20.8}}>
          <TouchableOpacity onPress={() => this.handdleBrand()}>
            <View style={[styles.box, {backgroundColor: colorCheckbox}]}>
              <Image
                source={imageCentang}
                style={[styles.gambarCentangBox]}
              />
            </View>
          </TouchableOpacity>
          <Text style={[styles.textLabel, {fontFamily: Fonts.type.semiBolds, letterSpacing: 0.22, marginLeft: 15}]}>Sertakan Brand</Text>
        </View>
        {this.viewBrand()}
        <Text style={styles.textLabel}>Deksripsi Produk</Text>
        <TextInput
          style={[styles.inputText, {height: Math.max(40, this.state.height)}]}
          value={this.state.descProduk}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          multiline
          onFocus={() => this.onFocus('namaproduk')}
          onBlur={() => this.onBlur('namaproduk')}
          onChange={(event) => {
            this.setState({
              descProduk: event.nativeEvent.text,
              height: event.nativeEvent.contentSize.height
            })
          }}
          underlineColorAndroid='transparent'
          placeholder='Deksripsi Produk Anda'
        />
        <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Deksripsi Produk Harus diisi</Text>
      </View>
    )
  }

  nextState () {
    const {dataProduk, namaProduk, idkategoriTerpilih, idBrandTerpilih, descProduk} = this.state
    if (namaProduk === '') {
      console.log(dataProduk)
      NavigationActions.priceandspesificationproduct({
        type: ActionConst.PUSH
      })
      this.props.getCatalog()
      this.onError('namaproduk')
    } else {
      dataProduk[0] = namaProduk
      dataProduk[1] = idkategoriTerpilih
      dataProduk[2] = idBrandTerpilih
      dataProduk[3] = descProduk
      console.log(dataProduk)
      this.props.getCatalog()
      NavigationActions.infohargaspesifikasi({
        type: ActionConst.PUSH,
        dataProduk: dataProduk,
        images: this.state.images
      })
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
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
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>4</Text>
          </View>
        </View>
        <ScrollView>
          {this.stateTwo()}
          <View style={{backgroundColor: Colors.background}}>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
              <Text style={styles.textButtonNext}>
                Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.modalKategori()}
        {this.modalSubKategori1()}
        {this.modalSubKategori2()}
        {this.modalSubKategori3()}
        {this.modalBrand()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataKategori: state.category,
    dataSubKategori1: state.subCategory,
    dataSubKategori2: state.subCategory,
    dataSubKategori3: state.subCategory,
    dataBrand: state.brands
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubKategori1: (id) => dispatch(categoriAction.subCategory({id})),
    getBrand: (id) => dispatch(brandAction.getBrand()),
    getCatalog: () => dispatch(katalogAction.getListCatalog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoNameAndCategory)
