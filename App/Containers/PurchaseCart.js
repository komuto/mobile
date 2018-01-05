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
import RupiahFormat from '../Services/MaskedMoneys'

import * as cartAction from '../actions/cart'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/PembelianKeranjangBelanjaStyle'

class PurchaseCart extends React.Component {

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
      isRefreshing: false,
      deleteItem: false,
      getData: true,
      dataDelivery: [],
      dataUpload: [],
      loadingCheckout: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCart.status === 200) {
      if (this.state.getData) {
        if (nextProps.dataCart.cart.items.length > 0) {
          let temp = 0
          let tempDataDelivery = []
          let data = []
          nextProps.dataCart.cart.items.map((obj, i) => {
            const dataGrosir = obj.product.wholesale
            if (obj.product.is_wholesaler) {
              for (var p = 0; p < dataGrosir.length; p++) {
                if (obj.qty >= dataGrosir[p].min && obj.qty <= dataGrosir[p].max) {
                  temp = temp + obj.qty * dataGrosir[p].price + obj.shipping.delivery_cost + obj.shipping.insurance_fee
                }
              }
            } else {
              temp = temp + obj.total_price + obj.shipping.delivery_cost + obj.shipping.insurance_fee
            }
          })
          nextProps.dataCart.cart.items.map((obj, i) =>
            (
              tempDataDelivery.push(obj.shipping.delivery_cost)
            )
          )
          nextProps.dataCart.cart.items.map((obj, i) =>
            (
              data.push({
                'id': obj.id,
                'expedition_id': obj.shipping.expedition_service.expedition.id,
                'expedition_service_id': obj.shipping.expedition_service.id,
                'qty': obj.qty,
                'note': obj.note,
                'address_id': obj.shipping.address.id,
                'is_insurance': obj.shipping.is_insurance,
                'service': obj.shipping.expedition_service.name,
                'origin_ro_id': obj.product.location.district.ro_id,
                'destination_ro_id': obj.shipping.address.district.ro_id
              })
            )
          )
          this.setState({
            subtotal: temp,
            isFetching: false,
            isRefreshing: false,
            getData: false,
            data: nextProps.dataCart.cart.items,
            dataDelivery: tempDataDelivery,
            dataUpload: data,
            loadingCheckout: false
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
                diskon: nextProps.dataCart.cart.promo.nominal
              })
            }
          }
        } else {
          this.setState({
            isFetching: false,
            isRefreshing: false,
            getData: false,
            data: []
          })
        }
        this.props.getCartReset()
      }
    } else if (nextProps.dataCart.status !== 200 && nextProps.dataCart.status !== 0) {
      // ToastAndroid.show(nextProps.dataCart.message, ToastAndroid.SHORT)
      this.setState({
        data: [],
        getData: false,
        isFetching: false,
        loadingCheckout: false
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
      nextProps.dataPromo.status = 0
    } else if (nextProps.dataPromo.status !== 200 && nextProps.dataPromo.status !== 0) {
      this.setState({
        modalPromo: false
      })
      nextProps.dataPromo.status = 0
      ToastAndroid.show(nextProps.dataPromo.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataCancelPromo.status === 200 && this.state.requestPromo) {
      ToastAndroid.show('Penggunaan kode promo dibatalkan', ToastAndroid.SHORT)
      this.setState({
        diskon: 0,
        statusDiskon: false,
        requestPromo: false
      })
      nextProps.dataCancelPromo.status = 0
    } else if (nextProps.dataCancelPromo.status !== 200 && nextProps.dataCancelPromo.status !== 0) {
      this.setState({ requestPromo: false })
      nextProps.dataCancelPromo.status = 0
      ToastAndroid.show(nextProps.dataCancelPromo.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataCheckout.status === 200) {
      NavigationActions.payment({
        type: ActionConst.PUSH,
        idCart: this.props.dataCart.cart.id
      })
      this.setState({
        loadingCheckout: false
      })
      this.props.resetUpdateCart()
    } else if (nextProps.dataCheckout.status !== 200 && nextProps.dataCheckout.status !== 0) {
      this.setState({
        loadingCheckout: false
      })
      ToastAndroid.show(nextProps.dataCheckout.message, ToastAndroid.SHORT)
      this.props.resetUpdateCart()
    }
    if (nextProps.dataDeleteItem.status === 200) {
      if (this.state.deleteItem) {
        this.setState({
          deleteItem: false
        })
        this.refresh()
      }
    } else if (nextProps.dataDeleteItem.status !== 200 && nextProps.dataDeleteItem.status !== 0) {
      ToastAndroid.show(nextProps.dataDeleteItem.message, ToastAndroid.SHORT)
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
                onPress={() => NavigationActions.backtab({
                  type: ActionConst.RESET
                })}
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

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  renderProduct () {
    const totalHarga = this.maskedMoney(this.state.price)
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
        enableEmptySections
      />
    )
  }

  renderRow (rowData, sectionData, row) {
    let totalPrice, subtotalPrice
    if (rowData.product.is_wholesaler) {
      const dataGrosir = rowData.product.wholesale
      const tempCount = rowData.qty
      for (var i = 0; i < dataGrosir.length; i++) {
        if (tempCount >= dataGrosir[i].min && tempCount <= dataGrosir[i].max) {
          totalPrice = this.maskedMoney(dataGrosir[i].price)
          subtotalPrice = this.maskedMoney(dataGrosir[i].price * rowData.qty + rowData.shipping.delivery_cost + rowData.shipping.insurance_fee)
          break
        } else if (tempCount < dataGrosir[0].min) {
          if (rowData.product.is_discount) {
            const discountPrice = rowData.product.price - rowData.product.price * rowData.product.discount / 100
            totalPrice = this.maskedMoney(discountPrice)
            subtotalPrice = this.maskedMoney(rowData.total_price + rowData.shipping.delivery_cost + rowData.shipping.insurance_fee)
          } else {
            totalPrice = this.maskedMoney(rowData.product.price)
            subtotalPrice = this.maskedMoney(rowData.total_price + rowData.shipping.delivery_cost + rowData.shipping.insurance_fee)
          }
          break
        }
      }
    } else {
      if (rowData.product.is_discount) {
        const discountPrice = rowData.product.price - rowData.product.price * rowData.product.discount / 100
        totalPrice = this.maskedMoney(discountPrice)
        subtotalPrice = this.maskedMoney(rowData.total_price + rowData.shipping.delivery_cost + rowData.shipping.insurance_fee)
      } else {
        totalPrice = this.maskedMoney(rowData.product.price)
        subtotalPrice = this.maskedMoney(rowData.total_price + rowData.shipping.delivery_cost + rowData.shipping.insurance_fee)
      }
    }
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
            <TouchableOpacity onPress={() => this.deleteItem(rowData.id)}>
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
            <TouchableOpacity onPress={() => this.substract(row)}>
              <Image source={Images.sub} style={styles.imageOperator} />
            </TouchableOpacity>
            <Text style={[styles.qualityText, styles.textJumlah]}>{rowData.qty}</Text>
            <TouchableOpacity onPress={() => this.add(row)}>
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

  deleteItem (id) {
    this.props.deleteItem(id)
    this.setState({
      deleteItem: true
    })
  }

  substract (row) {
    const { data, subtotal, dataUpload, dataDelivery } = this.state
    let tempData = data
    let tempDataUpload = dataUpload
    let tempDeliveryCost
    const rowData = data[row]
    const tempPrice = (rowData.qty - 1) * rowData.product.price
    if (rowData.qty > 1) {
      if (rowData.qty === 0) {
        tempDeliveryCost = dataDelivery[row]
      } else {
        tempDeliveryCost = Math.ceil((rowData.qty - 1) * rowData.product.weight / 1000) * (rowData.shipping.delivery_cost / (Math.ceil((rowData.qty) * rowData.product.weight / 1000)))
      }
      if (rowData.product.is_wholesaler) {
        const dataGrosir = rowData.product.wholesale
        const tempCount = rowData.qty - 1
        for (var i = 0; i < dataGrosir.length; i++) {
          if (tempCount >= dataGrosir[i].min && tempCount <= dataGrosir[i].max) {
            const tempSubtotal = subtotal + tempCount * dataGrosir[i].price + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
            tempData[row].qty = rowData.qty - 1
            tempDataUpload[row].qty = tempData[row].qty
            tempData[row].shipping.delivery_cost = tempDeliveryCost
            tempData[row].total_price = tempCount * dataGrosir[i].price
            this.setState({
              data: tempData,
              subtotal: tempSubtotal,
              dataUpload: tempDataUpload
            })
            break
          } else if (tempCount < dataGrosir[0].min) {
            if (rowData.product.is_discount) {
              const tempSubtotal = subtotal + (tempPrice - tempPrice * rowData.product.discount / 100) + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
              tempData[row].qty = rowData.qty - 1
              tempDataUpload[row].qty = tempData[row].qty
              tempData[row].shipping.delivery_cost = tempDeliveryCost
              tempData[row].total_price = (tempPrice - tempPrice * rowData.product.discount / 100)
              this.setState({
                data: tempData,
                subtotal: tempSubtotal,
                dataUpload: tempDataUpload
              })
            } else {
              const tempSubtotal = subtotal + tempPrice + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
              tempData[row].qty = rowData.qty - 1
              tempDataUpload[row].qty = tempData[row].qty
              tempData[row].shipping.delivery_cost = tempDeliveryCost
              tempData[row].total_price = tempPrice
              this.setState({
                data: tempData,
                subtotal: tempSubtotal,
                dataUpload: tempDataUpload
              })
            }
            break
          }
        }
      } else {
        if (rowData.product.is_discount) {
          const tempSubtotal = subtotal + (tempPrice - tempPrice * rowData.product.discount / 100) + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
          tempData[row].qty = rowData.qty - 1
          tempDataUpload[row].qty = tempData[row].qty
          tempData[row].shipping.delivery_cost = tempDeliveryCost
          tempData[row].total_price = (tempPrice - tempPrice * rowData.product.discount / 100)
          this.setState({
            data: tempData,
            subtotal: tempSubtotal,
            dataUpload: tempDataUpload
          })
        } else {
          const tempSubtotal = subtotal + tempPrice + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
          tempData[row].qty = rowData.qty - 1
          tempDataUpload[row].qty = tempData[row].qty
          tempData[row].shipping.delivery_cost = tempDeliveryCost
          tempData[row].total_price = tempPrice
          this.setState({
            data: tempData,
            subtotal: tempSubtotal,
            dataUpload: tempDataUpload
          })
        }
      }
    }
  }

  add (row) {
    const { data, subtotal, dataDelivery, dataUpload } = this.state
    let tempData = data
    let tempDataUpload = dataUpload
    let tempDeliveryCost
    const rowData = data[row]
    const tempPrice = (rowData.qty + 1) * rowData.product.price
    if (rowData.qty + 1 <= rowData.product.stock) {
      if (rowData.qty === 0) {
        tempDeliveryCost = dataDelivery[row]
      } else {
        tempDeliveryCost = Math.ceil((rowData.qty + 1) * rowData.product.weight / 1000) * (rowData.shipping.delivery_cost / (Math.ceil((rowData.qty) * rowData.product.weight / 1000)))
      }
      if (rowData.product.is_wholesaler) {
        const dataGrosir = rowData.product.wholesale
        const tempCount = rowData.qty + 1
        for (var i = 0; i < dataGrosir.length; i++) {
          if (tempCount >= dataGrosir[i].min && tempCount <= dataGrosir[i].max) {
            const tempSubtotal = subtotal + tempCount * dataGrosir[i].price + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
            tempData[row].qty = rowData.qty + 1
            tempDataUpload[row].qty = tempData[row].qty
            tempData[row].shipping.delivery_cost = tempDeliveryCost
            tempData[row].total_price = tempCount * dataGrosir[i].price
            this.setState({
              data: tempData,
              subtotal: tempSubtotal,
              dataUpload: tempDataUpload
            })
            break
          } else if (tempCount < dataGrosir[0].min) {
            if (rowData.product.is_discount) {
              const tempSubtotal = subtotal + (tempPrice - tempPrice * rowData.product.discount / 100) + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
              tempData[row].qty = rowData.qty + 1
              tempDataUpload[row].qty = tempData[row].qty
              tempData[row].shipping.delivery_cost = tempDeliveryCost
              tempData[row].total_price = (tempPrice - tempPrice * rowData.product.discount / 100)
              this.setState({
                data: tempData,
                subtotal: tempSubtotal,
                dataUpload: tempDataUpload
              })
            } else {
              const tempSubtotal = subtotal + tempPrice + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
              tempData[row].qty = rowData.qty + 1
              tempDataUpload[row].qty = tempData[row].qty
              tempData[row].shipping.delivery_cost = tempDeliveryCost
              tempData[row].total_price = tempPrice
              this.setState({
                data: tempData,
                subtotal: tempSubtotal,
                dataUpload: tempDataUpload
              })
            }
            break
          }
        }
      } else {
        if (rowData.product.is_discount) {
          const tempSubtotal = subtotal + (tempPrice - tempPrice * rowData.product.discount / 100) + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
          tempData[row].qty = rowData.qty + 1
          tempDataUpload[row].qty = tempData[row].qty
          tempData[row].shipping.delivery_cost = tempDeliveryCost
          tempData[row].total_price = (tempPrice - tempPrice * rowData.product.discount / 100)
          this.setState({
            data: tempData,
            subtotal: tempSubtotal,
            dataUpload: tempDataUpload
          })
        } else {
          const tempSubtotal = subtotal + tempPrice + tempDeliveryCost - rowData.total_price - rowData.shipping.delivery_cost
          tempData[row].qty = rowData.qty + 1
          tempDataUpload[row].qty = tempData[row].qty
          tempData[row].shipping.delivery_cost = tempDeliveryCost
          tempData[row].total_price = tempPrice
          this.setState({
            data: tempData,
            subtotal: tempSubtotal,
            dataUpload: tempDataUpload
          })
        }
      }
    }
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
    const hargaDiskon = this.maskedMoney(diskon)
    if (statusDiskon) {
      return (
        <View style={styles.rincianContainer}>
          <View style={styles.rincianDiskon}>
            <Text style={[styles.teksPicker, { flex: 1, marginTop: 0 }]}>Belanja Enak</Text>
            <TouchableOpacity onPress={() => this.cancelPromo()}>
              <Text style={styles.textHapus}>Batal</Text>
            </TouchableOpacity>
          </View>
          <Text allowFontScaling style={styles.diskon}>- {hargaDiskon}</Text>
        </View>
      )
    } else {
      return null
    }
  }

  renderTotal () {
    const { data, diskon, loadingCheckout } = this.state
    let tempTotal = 0
    data.map((obj, i) =>
    (
      tempTotal = tempTotal + obj.total_price + obj.shipping.delivery_cost + obj.shipping.insurance_fee
    )
  )
    const total = parseInt(tempTotal) - parseInt(diskon)
    const hargaTotal = this.maskedMoney(total)
    const spinner = loadingCheckout
    ? (
      <View style={styles.button}>
        <ActivityIndicator color={Colors.blue} size='large' />
      </View>
    ) : (
      <TouchableOpacity style={styles.button} onPress={() => this.pembayaran()}>
        <Text style={styles.textButton}>Bayar Sekarang</Text>
      </TouchableOpacity>
    )
    return (
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <Text style={styles.teksPicker}>Total Pembayaran</Text>
          <Text style={styles.hargaTotal}>{hargaTotal}</Text>
        </View>
        <View style={styles.total}>
          {spinner}
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
    const { dataUpload } = this.state
    this.props.updateCart(dataUpload)
    this.setState({
      loadingCheckout: true
    })
  }

  detailItem (id) {
    NavigationActions.cartdetailitem({type: ActionConst.PUSH})
    this.props.getItem(id)
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], isFetching: true, getData: true })
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
    dataCart: state.cart,
    dataCheckout: state.updateCart, // data update cart
    dataDeleteItem: state.deleteItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPromo: (code) => dispatch(cartAction.getPromo({code})),
    cancelPromo: () => dispatch(cartAction.cancelPromo()),
    getCartReset: () => dispatch(cartAction.getCartReset()),
    getItem: (id) => dispatch(cartAction.getItem({id: id})),
    getCart: () => dispatch(cartAction.getCart()),
    deleteItem: (id) => dispatch(cartAction.deleteItem({id: id})),
    updateCart: (items) => dispatch(cartAction.updateCart({items: items})),
    resetUpdateCart: () => dispatch(cartAction.resetUpdateCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCart)
