import React from 'react'
import { View, TouchableOpacity, Modal, ScrollView, Image, Text, ListView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/MovingProductStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

import { Images, Fonts } from '../Themes/'

class MovingProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      title: this.props.title,
      notification: this.props.notification,
      messageNotification: this.props.messageNotification,
      textButton: this.props.textButton,
      actionType: this.props.actionType,
      product: [],
      listKatalog: [],
      addCatalog: [
        {
          'id': 0,
          'name': 'Pilih Katalog Tujuan'
        }
      ],
      modalDelete: false,
      idCatalogChoosen: '',
      modalCatalog: false,
      isDropshipper: this.props.isDropshipper || false,
      loading: true,
      isChecked: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProduk.status === 200) {
      this.setState({
        product: nextProps.dataProduk.storeCatalogProducts.products
      })
    } if (nextProps.dataCatalog.status === 200) {
      this.setState({
        listKatalog: nextProps.dataCatalog.catalogs
      })
    } if (nextProps.dataProduk.status > 200) {
      console.log('ERROR')
    }
  }

  componentDidMount () {
  }

  notif () {
    if (this.state.notification) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{this.state.messageNotification}</Text>
          <TouchableOpacity onPress={() => this.setState({notification: false})}>
            <Image source={Images.closeGreen} style={styles.check} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  button () {
    return (
      <TouchableOpacity style={[styles.buttonNext]} onPress={() => this.finalAction()}>
        <Text style={styles.textButtonNext}>
          {this.state.textButton}
        </Text>
      </TouchableOpacity>
    )
  }

  handleCheck (id) {
    console.log(id)
  }

  renderRowData (rowData) {
    const check = this.state.isChecked ? Images.centang : null
    return (
      <TouchableOpacity style={styles.list} onPress={() => this.handleCheck(rowData.id)}>
        <View style={[styles.row, {paddingLeft: 0}]}>
          <View style={styles.box}>
            <Image
              source={check}
              style={styles.check}
            />
          </View>
          <Image
            source={{uri: rowData.image}}
            style={styles.imageProduct}
          />
          <Text style={[styles.title, {marginLeft: 20.7}]}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  modalConfrimDelete () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalDelete}
        onRequestClose={() => this.setState({ modalDelete: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Text style={styles.titleModal}>Anda yakin akan menghapus{'\n'}barang terpilih?</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleDeleteProduct()}>
              <Text style={styles.textVerifikasiButton}>Ya, Hapus Barang</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({modalDelete: false})}>
              <Text style={styles.textBatalButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  modalCatalog () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalCatalog}
        onRequestClose={() => this.setState({ modalCatalog: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalCatalog: false})}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerCatalog}>
              <Text style={[stylesLokasi.textBagikan, { fontSize: Fonts.size.medium, fontFamily: Fonts.type.bold, marginLeft: 0 }]}>Pilih Katalog Tujuan</Text>
            </View>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.listKatalog)}
              renderRow={this.renderCatalog.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderCatalog (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            idCatalogChoosen: rowData.id,
            modalCatalog: false,
            notification: true,
            messageNotification: 'Berhasil memindahkan ke katalog lain' })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  handleDeleteProduct () {
    this.setState({
      modalDelete: false,
      notification: true,
      messageNotification: 'Berhasil menghapus barang'
    })
  }

  finalAction () {
    if (this.state.actionType === 'hideProduct') {
      this.setState({
        notification: true,
        messageNotification: 'Berhasil menyembunyikan barang'
      })
    } else if (this.state.actionType === 'deleteProduct') {
      this.setState({
        modalDelete: true
      })
    } else if (this.state.actionType === 'moveCatalog') {
      this.setState({
        modalCatalog: true
      })
    } else if (this.state.actionType === 'moveDropship') {
      this.setState({
        notification: true,
        messageNotification: 'Berhasil menjadikan dropshipping'
      })
    }
  }

  headerDropshipper () {
    if (this.state.isDropshipper) {
      return (
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Hanya barang milik Anda sendiri yang bisa dijadikan sebagai dropshipping</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.notif()}
        {this.headerDropshipper()}
        <TouchableOpacity style={styles.header}>
          <View style={styles.row}>
            <View style={styles.box}>
              <Image
                source={null}
                style={styles.check}
              />
            </View>
            <Text style={[styles.title, {marginLeft: 20.7}]}>Pilih Semua Produk</Text>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.product)}
            renderRow={this.renderRowData.bind(this)}
            enableEmptySections
          />
        </ScrollView>
        {this.modalConfrimDelete()}
        {this.modalCatalog()}
        {this.button()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.storeCatalogProducts,
    dataCatalog: state.getListCatalog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductByCAtalog: (id) => dispatch(storeAction.getStoreCatalogProducts({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovingProduct)
