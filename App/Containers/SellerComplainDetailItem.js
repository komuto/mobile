import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  ScrollView,
  BackAndroid,
  ActivityIndicator,
  Modal,
  TextInput,
  ToastAndroid
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import moment from 'moment'
import {MaskService} from 'react-native-masked-text'
import {isFetching, isError, isFound} from '../Services/Status'
import * as complaintAction from '../actions/transaction'
import Reactotron from 'reactotron-react-native'

import styles from './Styles/SellerComplainDetailItemStyle'
import {Colors, Images, Fonts} from '../Themes'

class SellerComplainDetailItem extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      detail: false,
      fetching: true,
      acceptRefund: false,
      acceptRetur: false,
      inputAirwayBills: false,
      updateAirwayBills: false
    }
    this.listHeight = 0
    this.footerY = 0
    this.state = {
      idComplain: this.props.idComplain,
      detailComplain: props.propsDetailCompaint || null,
      modalReceived: false,
      modalUpdateReceiptNumber: false,
      modalLoading: false,
      inputReceiptNumber: '',
      receiptNumber: ''
    }
    moment.locale('id')
  }

  componentWillReceiveProps (nextProps) {
    const {propsDetailCompaint, propsConfrimProduct, propsUpdateStatus} = nextProps
    if (!isFetching(propsDetailCompaint) && this.submitting.detail) {
      this.submitting = { ...this.submitting, detail: false, fetching: false }
      if (isError(propsDetailCompaint)) {
        ToastAndroid.show(propsDetailCompaint.message, ToastAndroid.SHORT)
      }
      if (isFound(propsDetailCompaint)) {
        this.setState({
          detailComplain: propsDetailCompaint
        })
      }
    }

    if (!isFetching(propsConfrimProduct) && this.submitting.acceptRefund) {
      this.submitting = { ...this.submitting, acceptRefund: false, fetching: false }
      if (isError(propsConfrimProduct)) {
        ToastAndroid.show(propsConfrimProduct.message, ToastAndroid.SHORT)
      }
      if (isFound(propsConfrimProduct)) {
        this.setState({
          modalLoading: false
        })
        this.props.getDetailComplaintSeller(this.state.idComplain)
        this.submitting = { ...this.submitting, detail: true, fetching: true }
      }
    }

    if (!isFetching(propsConfrimProduct) && this.submitting.acceptRetur) {
      this.submitting = { ...this.submitting, acceptRetur: false, fetching: false }
      if (isError(propsConfrimProduct)) {
        ToastAndroid.show(propsConfrimProduct.message, ToastAndroid.SHORT)
      }
      if (isFound(propsConfrimProduct)) {
        this.setState({
          modalLoading: false
        })
        this.props.getDetailComplaintSeller(this.state.idComplain)
        this.submitting = { ...this.submitting, detail: true, fetching: true }
      }
    }

    if (!isFetching(propsUpdateStatus) && this.submitting.inputAirwayBills) {
      this.submitting = { ...this.submitting, inputAirwayBills: false, fetching: false }
      if (isError(propsUpdateStatus)) {
        ToastAndroid.show(propsUpdateStatus.message, ToastAndroid.SHORT)
      }
      if (isFound(propsUpdateStatus)) {
        this.setState({
          modalLoading: false
        })
        this.props.getDetailComplaintSeller(this.state.idComplain)
        this.submitting = { ...this.submitting, detail: true, fetching: true }
      }
    }

    if (!isFetching(propsUpdateStatus) && this.submitting.updateAirwayBills) {
      this.submitting = { ...this.submitting, updateAirwayBills: false, fetching: false }
      if (isError(propsUpdateStatus)) {
        ToastAndroid.show(propsUpdateStatus.message, ToastAndroid.SHORT)
      }
      if (isFound(propsUpdateStatus)) {
        this.setState({
          modalLoading: false
        })
        this.props.getDetailComplaintSeller(this.state.idComplain)
        this.submitting = { ...this.submitting, detail: true, fetching: true }
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.detail) {
      this.submitting = {
        ...this.submitting,
        detail: true
      }
      Reactotron.log('detail complain item ' + this.state.idComplain)
      this.props.getDetailComplaintSeller(this.state.idComplain)
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  maskedDate (value) {
    const timeStampToDate = moment.unix(value).format('DD MMMM YYYY').toString()
    return timeStampToDate
  }

  maskedMoney (value) {
    const priceMasked = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return priceMasked
  }

  handleChangeReceiptNumber = (text) => {
    this.setState({ receiptNumber: text })
  }

  renderNotification (data) {
    var solutionType = data.orderDetail.solution
    var disputeStatus = data.orderDetail.status
    if (solutionType === 1 && disputeStatus === 1) {
      return (
        <View style={styles.header}>
          <Image source={Images.infoOcher} style={styles.iconOcher} />
          <Text style={styles.semiboldOcher}>Pembeli menginginkan refund. Pembeli akan mengirimkan kembali barang yang dibeli. Silahkan klik
            <Text style={styles.boldOrcher}> "Barang sudah saya terima" </Text>jika barang sudah Anda terima dan Admin akan mengirimkan uang ke pembeli.</Text>
        </View>
      )
    } if (solutionType === 2 && disputeStatus === 1) {
      return (
        <View style={styles.header}>
          <Image source={Images.infoOcher} style={styles.iconOcher} />
          <Text style={styles.semiboldOcher}>Pembeli menginginkan tukar barang. Pembeli akan mengirimkan kembali barang yang dibeli. Silahkan klik
            <Text style={styles.boldOrcher}> "Barang sudah saya terima" </Text>jika barang sudah Anda terima dan Anda akan diminta untuk mengirimkan kembali barang yang baru.</Text>
        </View>
      )
    } if (solutionType === 1 && disputeStatus === 4) {
      return (
        <View style={[styles.header, {backgroundColor: Colors.blueBackground}]}>
          <Image source={Images.infoBlue} style={styles.iconOcher} />
          <Text style={[styles.semiboldOcher, {color: Colors.blueText}]}>Terima kasih telah bersifat kooperatif. Kini Admin akan mengirimkan kembali uang ke pembeli. Dan segera setelah itu Admin akan menandai komplain ini sudah terselesaikan</Text>
        </View>
      )
    } if (solutionType === 1 && disputeStatus === 8) {
      return (
        <View style={[styles.header, {backgroundColor: Colors.duckEggBlue, alignItems: 'center'}]}>
          <Image source={Images.infoDone} style={[styles.iconOcher, {marginTop: 0}]} />
          <Text style={[styles.semiboldOcher, {color: Colors.greenish, lineHeight: 20}]}>Komplain telah terselesaikan</Text>
        </View>
      )
    } if (solutionType === 2 && disputeStatus === 5) {
      return (
        <View style={[styles.header, {backgroundColor: Colors.blueBackground}]}>
          <Image source={Images.infoBlue} style={styles.iconOcher} />
          <Text style={[styles.semiboldOcher, {color: Colors.blueText}]}>Terima kasih telah bersifat kooperatif. Kini Anda tinggal menunggu konfirmasi dari pembeli setelah barang sampai</Text>
        </View>
      )
    } if (solutionType === 2 && disputeStatus === 4) {
      return (
        <View style={styles.header}>
          <Image source={Images.infoOcher} style={styles.iconOcher} />
          <Text style={styles.semiboldOcher}>Kini Anda silahkan memproses pengiriman barang baru. Dan silahkan memasukkan nomor resi di form dibawah ini</Text>
        </View>
      )
    }
  }

  renderActionAcceptGoods (data) {
    var disputeStatus = data.orderDetail.status
    if (disputeStatus === 1) {
      return (
        <View style={styles.containerSnow}>
          <TouchableOpacity activeOpacity={0.5} style={styles.blueButton} onPress={() => this.setState({modalReceived: true})}>
            <Text style={styles.textboldWhite}>Barang sudah saya terima</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderProcessReceipt (data) {
    var solutionType = data.orderDetail.solution
    var disputeStatus = data.orderDetail.status
    if (solutionType === 2 && disputeStatus === 4) {
      return (
        <View>
          <View style={[styles.viewColumn, {marginBottom: 0}]}>
            <View style={styles.border}>
              <Text style={[styles.textBold]}>Nomor Resi</Text>
            </View>
            <View style={[styles.inputContainer]}>
              <TextInput
                ref='noindentitas'
                maxLength={30}
                style={[styles.inputText]}
                value={this.state.receiptNumber}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeReceiptNumber}
                underlineColorAndroid='transparent'
                placeholder='Masukkan nomor resi disini'
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonReset, {backgroundColor: Colors.bluesky}]} onPress={() => this.onclickProcessReceiptDelivery()}>
              <Text style={[styles.labelButtonReset, {color: Colors.snow}]}>
                  Proses  Resi Pengiriman
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  onclickProcessReceiptDelivery () {
    this.submitting.inputAirwayBills = true
    this.setState({modalLoading: true})
    this.props.inputNumberReceipt(this.state.idComplain, this.state.receiptNumber)
  }

  renderReceiptSend (data) {
    var solutionType = data.orderDetail.solution
    var disputeStatus = data.orderDetail.status
    var receiptNumber = data.orderDetail.airway_bill
    if (solutionType === 2 && disputeStatus === 5) {
      return (
        <View style={styles.containerSnowNull}>
          <View style={styles.flexRowBorder}>
            <Text style={styles.semiboldSlateFlexOne}>Nomor Resi</Text>
            <Text style={[styles.regularBrowGrey]}>{receiptNumber}</Text>
            <TouchableOpacity onPress={() => this.setState({modalUpdateReceiptNumber: true})}>
              <Text style={[styles.regularBrowGrey, {color: Colors.bluesky}]}>Ubah</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flexRowNoBorder}>
            <Text style={styles.semiboldSlateFlexOne}>Status Resi</Text>
            <Text style={styles.regularBrowGreyFlextwo}>Dalam Pengiriman</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  checkStatusComplaint (data) {
    if (data === 1) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>Menunggu Penyelesaian</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>Dibaca oleh pembeli</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>Dikirim oleh pembeli</Text>
        </View>
      )
    } if (data === 4) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>Diterima oleh penjual</Text>
        </View>
      )
    } if (data === 5) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>Dikirim oleh penjual</Text>
        </View>
      )
    } if (data === 6) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>Diterima oleh pembeli</Text>
        </View>
      )
    } if (data === 7) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>Proses Refund</Text>
        </View>
      )
    } if (data === 8) {
      return (
        <View style={styles.flexRowChild}>
          <View style={[styles.iconStatus, {backgroundColor: Colors.greenish}]} />
          <Text style={styles.regularcharcoalGrey}>Terselesaikan</Text>
        </View>
      )
    }
  }

  checkSolution (data) {
    if (data === 1) {
      return (
        <Text style={styles.regularBrowGreyFlextwo}>Refund</Text>
      )
    } else {
      return (
        <Text style={styles.regularBrowGreyFlextwo}>Tukar Baru</Text>
      )
    }
  }

  renderDetail (detail) {
    var data = detail.orderDetail
    var maskedDate = this.maskedDate(data.invoice.created_at)
    return (
      <View style={styles.containerSnowNull}>
        <View style={styles.flexRowBorder}>
          <Text style={styles.semiboldSlateFlexOne}>No Invoice</Text>
          <Text style={styles.regularBrowGreyFlextwo}>{data.invoice.invoice_number}</Text>
        </View>
        <View style={styles.flexRowBorder}>
          <Text style={styles.semiboldSlateFlexOne}>Tanggal Transaksi</Text>
          <Text style={styles.regularBrowGreyFlextwo}>{maskedDate}</Text>
        </View>
        <View style={styles.flexRowBorder}>
          <Text style={styles.semiboldSlateFlexOne}>Status Komplain</Text>
          {this.checkStatusComplaint(data.status)}
        </View>
        <View style={styles.flexRowBorder}>
          <Text style={styles.semiboldSlateFlexOne}>Pembeli</Text>
          <View style={styles.flexRowChild}>
            <View style={styles.photoMasked}>
              <Image source={{uri: data.user.photo}} style={styles.photo} />
            </View>
            <Text style={styles.regularcharcoalGrey}>{data.user.name}</Text>
          </View>
        </View>
        <View style={styles.flexRowNoBorder}>
          <Text style={styles.semiboldSlate}>Solusi yang diinginkan</Text>
          {this.checkSolution(data.solution)}
        </View>
        {this.renderDetailRefundMoney(data, data.status)}
        {this.renderDetailNumberRefund(data, data.status)}
      </View>
    )
  }

  renderDetailRefundMoney (data, disputeStatus) {
    if (disputeStatus === 8) {
      var maksedMoney = this.maskedMoney(data.refund.total)
      return (
        <View style={[styles.flexRowBorder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <Text style={styles.semiboldSlateFlexOne}>Uang yang direfund</Text>
          <Text style={styles.regularBrowGreyFlextwo}>{maksedMoney}</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderDetailNumberRefund (data, disputeStatus) {
    if (disputeStatus === 8) {
      return (
        <View style={styles.flexRowNoBorder}>
          <Text style={styles.semiboldSlateFlexOne}>Nomer Refund</Text>
          <Text style={styles.regularBrowGreyFlextwo}>{data.refund.no_refund}</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderItemsProblem (detail) {
    var data = detail.orderDetail
    if (data.dispute_products.length > 1) {
      for (var i = 0; i < data.dispute_products.length; i++) {
        if (i !== data.dispute_products.length - 1) {
          this.border = 0.5
        } else {
          this.border = 0
        }
      }
    }
    const mapFoto = data.dispute_products.map((data, i) => {
      return (
        <View key={i} style={[styles.borderRow, {borderBottomWidth: this.border}]}>
          <View style={{height: 30, width: 30, backgroundColor: Colors.paleGreyFive, marginRight: 10}}>
            <Image source={{uri: data.image}} style={{height: 30, width: 30, marginRight: 10}} />
          </View>
          <Text style={[styles.labelMessage, {fontFamily: Fonts.type.semiBolds}]}>{data.name}</Text>
        </View>
      )
    })
    return (
      <View>
        <Text style={styles.textBoldcharcoalGrey}>Daftar barang bermasalah</Text>
        <View style={[styles.viewColumn, {marginBottom: 30.5}]}>
          {mapFoto}
        </View>
      </View>
    )
  }

  renderProofs (detail) {
    var data = detail.orderDetail
    return (
      <View>
        <Text style={styles.textBoldcharcoalGrey}>Foto Barang</Text>
        <View style={{backgroundColor: Colors.snow, marginBottom: 30.5}}>
          <View style={styles.scrollImage}>
            <ListView
              horizontal
              enableEmptySections
              contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
              showsHorizontalScrollIndicator={false}
              dataSource={this.dataSource.cloneWithRows(data.proofs)}
              renderRow={this.renderRowImageProofs.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  }

  renderRowImageProofs (rowData) {
    return (
      <View style={{backgroundColor: Colors.lightgrey2, marginRight: 10}}>
        <Image
          source={{uri: rowData.image}}
          style={styles.imageProof}
        />
      </View>
    )
  }

  renderProblem (detail) {
    var data = detail.orderDetail
    return (
      <View>
        <Text style={styles.textBoldcharcoalGrey}>Masalah yang terjadi</Text>
        <View style={[styles.containerSnowNull, {paddingBottom: 15.5, paddingRight: 15.5, paddingTop: 15.5}]} >
          <Text style={styles.regularSlateFlexOne}>{data.problems}</Text>
        </View>
      </View>
    )
  }

  renderInformation (detail) {
    var data = detail.orderDetail
    return (
      <View>
        <Text style={styles.textBoldcharcoalGrey}>Keterangan</Text>
        <View style={[styles.containerSnowNull, {marginBottom: 0, paddingBottom: 15.5, paddingRight: 15.5, paddingTop: 15.5}]} >
          <Text style={styles.regularSlateFlexOne}>{data.note}</Text>
        </View>
      </View>
    )
  }

  modalReceived () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalReceived}
        onRequestClose={() => this.setState({ modalReceived: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Text style={styles.titleModal}>Anda yakin sudah menerima barang?</Text>
            <Text style={styles.titleModal2}>
              Dengan mengkonfirmasi sudah menerima{'\n'}
              barang, Anda diminta untuk mengirim{'\n'}
              ulang barang yang baru kepada pembeli</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleReceive(this.state.detailComplain)}>
              <Text style={styles.textVerifikasiButton}>Ya, Barang sudah saya terima</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({modalReceived: false})}>
              <Text style={styles.textBatalButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  modalUpdateReceiptNumber () {
    return (
      <Modal
        animationType={'none'}
        transparent
        visible={this.state.modalUpdateReceiptNumber}
        onRequestClose={() => this.setState({ modalUpdateReceiptNumber: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalUpdateReceiptNumber: false})}>
          <View style={styles.modalKatalog}>
            <View style={styles.flexRow}>
              <Text style={styles.title}>Masukkan Nomor Resi Baru</Text>
              <TouchableOpacity onPress={() => this.setState({modalUpdateReceiptNumber: false})}>
                <Image source={Images.close} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <View style={styles.flexOne1}>
              <TextInput
                style={styles.inputText2}
                value={this.state.inputReceiptNumber}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={30}
                autoCorrect
                onChangeText={this.changeReceiptNumber}
                underlineColorAndroid='transparent'
                placeholder='Nomer Resi'
              />
              <TouchableOpacity style={styles.buttonnext} onPress={() => this.handleUpdateReceiptNumber()}>
                <Text style={styles.textButtonNext}>
                  Perbarui Nomor Resi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  handleUpdateReceiptNumber () {
    this.submitting.updateAirwayBills = true
    this.setState({modalUpdateReceiptNumber: false, modalLoading: true, inputReceiptNumber: ''})
    this.props.inputNumberReceipt(this.state.idComplain, this.state.inputReceiptNumber)
  }

  changeReceiptNumber = (text) => {
    this.setState({inputReceiptNumber: text})
  }

  modalLoading () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalLoading}
        onRequestClose={() => this.setState({ modalLoading: false })}
        >
        <View style={[styles.containerLoading]}>
          <View style={styles.loading}>
            <ActivityIndicator color='white' size='large' />
          </View>
        </View>
      </Modal>
    )
  }

  handleReceive (data) {
    var solutionType = data.orderDetail.solution
    if (solutionType === 1) {
      this.submitting.acceptRefund = true
      this.setState({modalLoading: true, modalReceived: false})
      this.props.confrimProduct(this.state.idComplain)
    } else {
      this.submitting.acceptRetur = true
      this.setState({modalLoading: true, modalReceived: false})
      this.props.confrimProduct(this.state.idComplain)
    }
  }

  render () {
    if (this.submitting.fetching) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    const {detailComplain} = this.state
    return (
      <View style={styles.container}>
        <View tabLabel='Detail' ref='detail'>
          <ScrollView>
            {this.renderNotification(detailComplain)}
            {this.renderActionAcceptGoods(detailComplain)}
            {this.renderProcessReceipt(detailComplain)}
            {this.renderReceiptSend(detailComplain)}
            {this.renderDetail(detailComplain)}
            {this.renderItemsProblem(detailComplain)}
            {this.renderProblem(detailComplain)}
            {this.renderProofs(detailComplain)}
            {this.renderInformation(detailComplain)}
          </ScrollView>
        </View>
        {this.modalReceived()}
        {this.modalLoading()}
        {this.modalUpdateReceiptNumber()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  propsDetailCompaint: state.sellerComplainedOrderDetail,
  propsConfrimProduct: state.sellerReceived,
  propsUpdateStatus: state.updateStatus
})
const mapDispatchToProps = (dispatch) => ({
  getDetailComplaintSeller: (id) => dispatch(complaintAction.getComplainedOrderDetailSeller({id: id})),
  confrimProduct: (id) => dispatch(complaintAction.sellerDisputeReceived({id: id})),
  inputNumberReceipt: (id, numberinputNumberReceipt) => dispatch(complaintAction.updateAirwayBill({id: id, airway_bill: numberinputNumberReceipt}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerComplainDetailItem)
