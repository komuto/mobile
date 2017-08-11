import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ListView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import * as cartAction from '../actions/cart'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/PembelianKeranjangBelanjaStyle'

class PembelianKeranjangBelanja extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [],
      subtotal: 0,
      diskon: 0,
      modalPromo: false,
      statusPromo: false,
      kodeVoucher: '',
      statusDiskon: false,
      requestPromo: false,
      isFetching: true,
      isRefreshing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCart.status === 200) {
      if (nextProps.dataCart.cart.items.length > 0) {
        let temp = 0
        nextProps.dataCart.cart.items.map((obj, i) =>
          (
            temp = temp + obj.total_price
          )
        )
        this.setState({
          subtotal: temp,
          isFetching: false,
          isRefreshing: false,
          data: nextProps.dataCart.cart.items
        })
        if (nextProps.dataCart.cart.promo !== null) {
          if (nextProps.dataCart.cart.promo.type === 0) {
            this.setState({
              requestPromo: true,
              statusDiskon: true,
              diskon: parseInt(nextProps.dataCart.cart.promo.percentage) * temp / 100
            })
          } else {
            this.setState({
              requestPromo: true,
              statusDiskon: true,
              diskon: nextProps.dataCart.cart.promo
            })
          }
        }
      }
      this.props.getCartReset()
    } else if (nextProps.dataCart.status > 200) {
      // ToastAndroid.show('Terjadi Kesalahan..' + nextProps.dataCart.message, ToastAndroid.LONG)
      this.setState({
        data: [],
        isFetching: false
      })
    }
    if (nextProps.dataPromo.status === 200) {
      if (nextProps.dataPromo.promo.type === 0) {
        this.setState({
          requestPromo: true,
          statusDiskon: true,
          modalPromo: false,
          diskon: parseInt(nextProps.dataPromo.promo.percentage) * parseInt(this.state.subtotal) / 100
        })
      } else {
        this.setState({
          requestPromo: true,
          statusDiskon: true,
          modalPromo: false,
          diskon: nextProps.dataPromo.promo.nominal
        })
      }
    } else if (nextProps.dataPromo.status > 200) {
      this.setState({
        modalPromo: false
      })
      ToastAndroid.show('Terjadi Kesalahan..' + nextProps.dataPromo.message, ToastAndroid.LONG)
    }
    if (nextProps.dataCancelPromo.status === 200 && this.state.requestPromo) {
      ToastAndroid.show('Penggunaan kode promo dibatalkan..', ToastAndroid.LONG)
      this.setState({
        diskon: 0,
        statusDiskon: false,
        requestPromo: false
      })
    } else if (nextProps.dataCancelPromo.status > 200) {
      this.setState({ requestPromo: false })
      ToastAndroid.show('Terjadi Kesalahan..' + nextProps.dataCancelPromo.message, ToastAndroid.LONG)
    }
  }

  renderView () {
    const { data, isFetching } = this.state
    const spinner = this.state.isFetching
    ? (
      <View style={styles.spinnerBucket}>
        <ActivityIndicator color={Colors.red} size='large' />
        <Text style={[styles.textHapus, { marginTop: 10, textAlign: 'center', marginRight: 0 }]}>
          Loading Data...
        </Text>
      </View>
    ) : (<View />)
    if (isFetching) {
      return (
        <View style={styles.bucketContainer}>
          {spinner}
        </View>
      )
    } else {
      if (data.length === 0) {
        return (
          <View style={styles.bucketContainer}>
            <Image source={Images.ember} style={styles.bucket} />
            <Text style={[styles.qualityText, {textAlign: 'center'}]}>
              Belum ada barang di Keranjang Belanja
            </Text>
            <Text style={styles.textBucket}>
              Anda belum memasukkan barang ke keranjang belanja Anda
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button, { height: 50 }]}
                onPress={() => NavigationActions.pop()}
              >
                <Text style={styles.textButton}>Belanja Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <ScrollView
            refreshControl={
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
            {this.renderListItem()}
            {this.renderButtonKode()}
            {this.renderKode()}
            <View style={styles.separator} />
            {this.renderTotal()}
          </ScrollView>
        )
      }
    }
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
              {this.state.namaProduk}
            </Text>
            <Text style={styles.textKelola}>
              {totalHarga}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.textHapus}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderListItem () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refresh}
            tintColor={Colors.red}
            colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
            title='Loading...'
            titleColor={Colors.red}
            progressBackgroundColor={Colors.snow}
          />
        }
        enableEmptySections
      />
    )
  }

  renderRow (rowData, sectionData, row) {
    const totalPrice = MaskService.toMask('money', rowData.product.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const subtotalPrice = MaskService.toMask('money', rowData.total_price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View>
        <View style={styles.border}>
          <View style={styles.profile}>
            <Image
              source={{ uri: rowData.product.image }}
              style={styles.styleFotoToko}
            />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                {rowData.product.name}
              </Text>
              <Text style={styles.textKelola}>
                {rowData.product.store.name}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.props.deleteItem(rowData.id)}>
              <Text style={styles.textHapus}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.qualityContainer, {paddingTop: 25}]}>
          <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25, flex: 1}]}>
            <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5}]}>Harga Satuan</Text>
          </View>
          <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5, marginRight: 20}]}>
            {totalPrice}
          </Text>
        </View>
        <View style={[styles.qualityContainer, {paddingTop: 25}]}>
          <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25}]}>
            <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5}]}>Jumlah:</Text>
          </View>
          <View style={[styles.eachQualiyNoMargin, {flexDirection: 'row', paddingRight: 20, paddingBottom: 0}]}>
            <TouchableOpacity onPress={() => this.substract()}>
              <Image source={Images.sub} style={styles.imageOperator} />
            </TouchableOpacity>
            <Text style={[styles.qualityText, styles.textJumlah]}>{rowData.qty}</Text>
            <TouchableOpacity onPress={() => this.add()}>
              <Image source={Images.add} style={styles.imageOperator} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={[styles.qualityContainer, {paddingTop: 25}]} onPress={() => this.detailItem(rowData.id)}>
          <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25, flex: 1}]}>
            <Text style={[styles.qualityTextBlue, {paddingLeft: 5}]}>Detail Pengiriman</Text>
          </View>
          <Image source={Images.arrowRight} style={styles.arrow} />
        </TouchableOpacity>
        <View style={[styles.qualityContainer, {paddingTop: 25}]}>
          <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25, flex: 1}]}>
            <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5}]}>Subtotal</Text>
          </View>
          <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5, marginRight: 20}]}>
            {subtotalPrice}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    )
  }

  substract () {
    const {countProduct, price} = this.state
    if (countProduct > 0) {
      const temp = (countProduct - 1) * price
      this.setState({
        countProduct: countProduct - 1,
        subtotal: temp
      })
    }
  }

  add () {
    const {countProduct, price} = this.state
    const temp = (countProduct + 1) * price
    this.setState({
      countProduct: countProduct + 1,
      subtotal: temp
    })
  }

  renderButtonKode () {
    return (
      <View style={styles.containerPicker}>
        <Text style={[styles.teksPicker, { flex: 1, marginTop: 0 }]}>Punya Kode Voucher</Text>
        <TouchableOpacity onPress={() => this.setState({ modalPromo: true })}>
          <Text style={styles.textGanti}>Gunakan Kode</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderKode () {
    const { statusDiskon, diskon } = this.state
    const hargaDiskon = MaskService.toMask('money', diskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    if (statusDiskon) {
      return (
        <View style={styles.rincianContainer}>
          <View style={styles.rincianDiskon}>
            <Text style={[styles.teksPicker, { flex: 1, marginTop: 0 }]}>Belanja Enak</Text>
            <TouchableOpacity onPress={() => this.cancelPromo()}>
              <Text style={styles.textHapus}>Batal</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.diskon}>- {hargaDiskon}</Text>
        </View>
      )
    } else {
      return null
    }
  }

  renderTotal () {
    const { subtotal, diskon } = this.state
    const total = parseInt(subtotal) - parseInt(diskon)
    const hargaTotal = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <Text style={styles.teksPicker}>Total Pembayaran</Text>
          <Text style={styles.hargaTotal}>{hargaTotal}</Text>
        </View>
        <View style={styles.total}>
          <TouchableOpacity style={styles.button} onPress={() => this.pembayaran()}>
            <Text style={styles.textButton}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  handleCatatan = (text) => {
    this.setState({ kodeVoucher: text })
  }

  renderModalPromo () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalPromo}
        onRequestClose={() => this.setState({ modalPromo: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalPromo: false })}>
          <View style={styles.containerModalPromo}>
            <View style={styles.headerModalPromo}>
              <Text style={[styles.textBold, { flex: 1, marginTop: -3 }]}>Gunakan Kode Voucher</Text>
              <TouchableOpacity onPress={() => this.setState({ modalPromo: false })}>
                <Image source={Images.close} style={styles.imageOperator} />
              </TouchableOpacity>
            </View>
            <View style={styles.bodyModalPromo}>
              <Text style={[styles.textAlamat, { fontSize: 14 }]}>Masukkan Kode Voucher</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputKode}
                  value={this.state.kodeVoucher}
                  keyboardType='default'
                  autoCapitalize='characters'
                  onChangeText={this.handleCatatan}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonVoucher} onPress={() => this.cekVoucher()}>
                  <Text style={styles.textButton}>
                    Gunakan Kode Voucher
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  cekVoucher () {
    const { kodeVoucher } = this.state
    this.props.getPromo(kodeVoucher)
  }

  cancelPromo () {
    this.props.cancelPromo()
  }

  pembayaran () {
    NavigationActions.pembayaran({type: ActionConst.PUSH})
  }

  detailItem (id) {
    NavigationActions.cartdetailitem({type: ActionConst.PUSH})
    this.props.getItem(id)
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], isFetching: true })
    this.props.getCart()
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderView()}
        {this.renderModalPromo()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDetailProduk: state.productDetail,
    dataPromo: state.promo,
    dataCancelPromo: state.cancelPromo,
    dataCart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPromo: (code) => dispatch(cartAction.getPromo({code})),
    cancelPromo: () => dispatch(cartAction.cancelPromo()),
    getCartReset: () => dispatch(cartAction.getCartReset()),
    getItem: (id) => dispatch(cartAction.getItem({id: id})),
    getCart: () => dispatch(cartAction.getCart()),
    deleteItem: (id) => dispatch(cartAction.deleteItem({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PembelianKeranjangBelanja)
