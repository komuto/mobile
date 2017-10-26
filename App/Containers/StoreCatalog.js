import React from 'react'
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  BackAndroid,
  Modal,
  Image,
  ScrollView,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as katalogAction from '../actions/catalog'

// Styles
import styles from './Styles/KatalogTokoScreenStyle'
import { Images, Colors } from '../Themes/'

class StoreCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.submitting = {
      catalog: false,
      delete: false,
      detail: false
    }
    this.state = {
      listKatalog: [],
      statusDot: false,
      name: this.props.name,
      email: this.props.email,
      rowTerpilih: '',
      idDelete: '',
      notif: this.props.notif,
      pesanNotif: this.props.pesanNotif,
      loading: this.props.loading || false,
      modalGagalHapus: false,
      modalSuksesHapus: false,
      namaKatalog: '',
      countProduct: '',
      isRefreshing: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataCatalog, catalogDelete, detailCatalog} = nextProps

    if (!isFetching(dataCatalog) && this.submitting.catalog) {
      this.submitting = { ...this.submitting, catalog: false }
      if (isError(dataCatalog)) {
        ToastAndroid.show(dataCatalog.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCatalog)) {
        this.setState({
          listKatalog: dataCatalog.catalogs,
          loading: false,
          isRefreshing: false
        })
      }
    }

    if (!isFetching(catalogDelete) && this.submitting.delete) {
      this.submitting = { ...this.submitting, delete: false }
      if (isError(catalogDelete)) {
        ToastAndroid.show(catalogDelete.message, ToastAndroid.SHORT)
      }
      if (isFound(catalogDelete)) {
        if (!this.submitting.catalog) {
          this.submitting = {
            ...this.submitting,
            catalog: true
          }
          this.setState({isRefreshing: true})
          this.props.getCatalog()
        }
      }
    }

    if (!isFetching(detailCatalog) && this.submitting.detail) {
      this.submitting = { ...this.submitting, detail: false }
      if (isError(detailCatalog)) {
        ToastAndroid.show(detailCatalog.message, ToastAndroid.SHORT)
      }
      if (isFound(detailCatalog)) {
        NavigationActions.addeditstorecatalog({
          type: ActionConst.PUSH,
          title: 'Edit Nama Katalog',
          edit: true,
          namaKatalog: nextProps.detailCatalog.catalog.name,
          idKatalogs: nextProps.detailCatalog.catalog.id,
          titleButton: 'Simpan perubahan'
        })
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.catalog) {
      this.submitting = {
        ...this.submitting,
        catalog: true
      }
      this.props.getCatalog()
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.popTo('managestore')
    return true
  }

  refresh = () => {
    if (!this.submitting.catalog) {
      this.submitting = {
        ...this.submitting,
        catalog: true
      }
      this.setState({isRefreshing: true, listKatalog: []})
      this.props.getCatalog()
    }
  }

  handleCreateKatalog () {
    NavigationActions.addeditstorecatalog({
      type: ActionConst.PUSH
    })
  }

  handleEditKatalog (idKatalog) {
    this.setState({statusDot: false, isRefreshing: true})
    if (!this.submitting.catalog) {
      this.submitting = {
        ...this.submitting,
        detail: true
      }
      this.props.getCatalogDetail(idKatalog)
    }
  }

  handleDeletKatalog () {
    this.setState({modalSuksesHapus: false, isRefreshing: true})
    if (!this.submitting.catalog) {
      this.submitting = {
        ...this.submitting,
        delete: true
      }
      this.props.deleteCatalog(this.state.idDelete)
    }
  }

  handleCekIsiKatalog (id, name, count) {
    this.setState({idDelete: id, statusDot: false, namaKatalog: name, countProduct: count})
    if (count <= 0) {
      this.setState({modalSuksesHapus: true})
    } else {
      this.setState({modalGagalHapus: true})
    }
  }

  modalGagalHapus () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalGagalHapus}
        onRequestClose={() => this.setState({ modalGagalHapus: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Image source={Images.gagalHapusKatalog} style={styles.gambarHapus} />
            <Text style={styles.titleModal}>Gagal menghapus katalog{'\n'}"{this.state.namaKatalog}"</Text>
            <Text style={styles.titleModal2}>Anda tidak bisa menghapus katalog{'\n'}tersebut karena masih ada barang{'\n'}di dalamnya.</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.setState({modalGagalHapus: false})}>
              <Text style={styles.textVerifikasiButton}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  modalSuksesHapus () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalSuksesHapus}
        onRequestClose={() => this.setState({ modalSuksesHapus: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Image source={Images.suksesHapusKatalog} style={styles.gambarSukses} />
            <Text style={styles.titleModal}>Anda Yakin akan menghapus{'\n'}Katalog "{this.state.namaKatalog}"?</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleDeletKatalog()}>
              <Text style={styles.textVerifikasiButton}>Ya, Hapus Katalog ini</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({modalSuksesHapus: false})}>
              <Text style={styles.textBatalButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Sukses {this.state.pesanNotif}</Text>
          <TouchableOpacity onPress={() => this.setState({notif: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderHeader () {
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => this.handleBack()}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Katalog
        </Text>
      </View>
    )
  }

  containerEdit (i, idKatalog, name, contProduct) {
    if (this.state.statusDot && this.state.rowTerpilih === i) {
      return (
        <View elevation={5} style={styles.edit}>
          <TouchableOpacity style={styles.touch} onPress={() =>
            this.handleEditKatalog(idKatalog)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.handleCekIsiKatalog(idKatalog, name, contProduct)}>
            <Text style={styles.textEdit}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View />
    )
  }

  mapingKatalog () {
    const { listKatalog } = this.state
    const mapparent = listKatalog.map((data, i) =>
    (<View key={i} style={{borderBottomWidth: 0.5, borderBottomColor: Colors.silver}}>
      <View style={styles.headerInfoAlamat}>
        <View style={{flex: 1}}>
          <Text style={styles.textHeader}>{data.name}</Text>
          <View style={{opacity: 0.50}}>
            <Text style={styles.textHeader2}>{data.count_product} Produk</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setState({statusDot: true, rowTerpilih: i})}>
          <Image source={Images.threeDotSilver} style={styles.imageDot} />
        </TouchableOpacity>
      </View>
      {this.containerEdit(i, data.id, data.name, data.count_product)}
    </View>
    ))
    return (
      <View>
        {mapparent}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.notif()}
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refresh}
            tintColor={Colors.red}
            colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
            title='Loading...'
            titleColor={Colors.red}
            progressBackgroundColor={Colors.snow}
          />
        }>
          <TouchableOpacity activeOpacity={1} onPress={() => this.setState({statusDot: false})} >
            {this.mapingKatalog()}
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.create} onPress={() => this.handleCreateKatalog()}>
          <View elevation={9}>
            <Image source={Images.tambahWhite} style={styles.imageTambah} />
          </View>
        </TouchableOpacity>
        {this.modalGagalHapus()}
        {this.modalSuksesHapus()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataCatalog: state.getListCatalog,
    catalogDelete: state.deleteCatalog,
    detailCatalog: state.getCatalog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCatalog: (id) => dispatch(katalogAction.deleteCatalog({id})),
    getCatalog: () => dispatch(katalogAction.getListCatalog()),
    getCatalogDetail: (id) => dispatch(katalogAction.getCatalog({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreCatalog)
