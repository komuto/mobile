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
  TextInput
} from 'react-native'
import {connect} from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {Actions as NavigationActions} from 'react-native-router-flux'
// import InvertibleScrollView from 'react-native-invertible-scroll-view'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :) import
// YourActions from '../Redux/YourRedux'
import * as complaintAction from '../actions/transaction'

// Styles
import styles from './Styles/SellerDetailComplaintsGoodsStyle'
import {Colors, Images, Fonts} from '../Themes'

class SellerDetailComplaintsGoods extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      detail: false
    }
    this.listHeight = 0
    this.footerY = 0
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      detailComplain: [],
      discussion: [],
      loadingPage: true,
      idComplaint: this.props.idComplaint,
      modalReceived: false,
      stateDeliveryRefund: false,
      stateDeliveryRetur: false,
      stateProcessReceipt: false,
      stateReceiptSend: false,
      receiptNumber: '',
      disputeSolutionType: '',
      disputeStatus: '',
      modalLoading: false,
      acceptRefund: false,
      acceptRetur: false,
      inputAirwayBills: false,
      updateAirwayBills: false,
      modalUpdateReceiptNumber: false,
      inputReceiptNumber: '',
      messages: '',
      replyDiscussions: false,
      listHeight: 0,
      footerY: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsDetailCompaint, propsConfrimProduct, propsUpdateStatus, propsReply} = nextProps
    if (propsDetailCompaint.status === 200 && this.submitting.detail) {
      this.submitting.detail = false
      this.setState({
        detailComplain: propsDetailCompaint.orderDetail,
        disputeSolutionType: propsDetailCompaint.orderDetail.solution,
        disputeStatus: propsDetailCompaint.orderDetail.status,
        receiptNumber: propsDetailCompaint.orderDetail.airway_bill,
        discussion: propsDetailCompaint.orderDetail.discussions,
        loadingPage: false
      })
    } if (propsConfrimProduct.status === 200 && this.state.acceptRefund) {
      this.setState({
        stateDeliveryRefund: true,
        modalLoading: false,
        acceptRefund: false
      })
      this.props.getDetailComplaintSeller(this.state.idComplaint)
      propsConfrimProduct.status = 0
    } if (propsConfrimProduct.status === 200 && this.state.acceptRetur) {
      this.setState({
        stateDeliveryRefund: true,
        stateDeliveryRetur: true,
        modalLoading: false,
        acceptRetur: false
      })
      this.props.getDetailComplaintSeller(this.state.idComplaint)
      propsConfrimProduct.status = 0
    } if (propsUpdateStatus.status === 200 && this.state.inputAirwayBills) {
      this.props.getDetailComplaintSeller(this.state.idComplaint)
      this.setState({
        stateReceiptSend: true,
        stateDeliveryRetur: false,
        modalLoading: false,
        inputAirwayBills: false,
        receiptNumber: propsDetailCompaint.orderDetail.airway_bill
      })
      propsConfrimProduct.status = 0
    } if (propsUpdateStatus.status === 200 && this.state.updateAirwayBills) {
      this.props.getDetailComplaintSeller(this.state.idComplaint)
      this.setState({
        stateReceiptSend: true,
        stateDeliveryRetur: false,
        modalLoading: false,
        updateAirwayBills: false,
        receiptNumber: propsDetailCompaint.orderDetail.airway_bill
      })
      propsConfrimProduct.status = 0
    } if (propsReply.status === 200 && this.state.replyDiscussions) {
      this.props.getDetailComplaintSeller(this.state.idComplaint)
      this.submitting.detail = true
      this.setState({
        messages: ''
      })
      propsReply.status = 0
    }
  }

  componentDidMount () {
    if (!this.submitting.detail) {
      this.submitting.detail = true
      this.props.getDetailComplaintSeller(this.state.idComplaint)
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

  renderNotification (disputeSolutionType, disputeStatus, stateDeliveryRefund) {
    if (!stateDeliveryRefund) {
      if (disputeSolutionType === 1 && disputeStatus === 1) {
        return (
          <View style={styles.header}>
            <Image source={Images.infoOcher} style={styles.iconOcher} />
            <Text style={styles.semiboldOcher}>Pembeli menginginkan refund. Pembeli akan mengirimkan kembali barang yang dibeli. Silahkan klik
              <Text style={styles.boldOrcher}> "Barang sudah saya terima" </Text>jika barang sudah Anda terima dan Admin akan mengirimkan uang ke pembeli.</Text>
          </View>
        )
      } if (disputeSolutionType === 2 && disputeStatus === 1) {
        return (
          <View style={styles.header}>
            <Image source={Images.infoOcher} style={styles.iconOcher} />
            <Text style={styles.semiboldOcher}>Pembeli menginginkan tukar barang. Pembeli akan mengirimkan kembali barang yang dibeli. Silahkan klik
              <Text style={styles.boldOrcher}> "Barang sudah saya terima" </Text>jika barang sudah Anda terima dan Anda akan diminta untuk mengirimkan kembali barang yang baru.</Text>
          </View>
        )
      } if (disputeSolutionType === 1 && disputeStatus === 4) {
        return (
          <View style={[styles.header, {backgroundColor: Colors.blueBackground}]}>
            <Image source={Images.infoBlue} style={styles.iconOcher} />
            <Text style={[styles.semiboldOcher, {color: Colors.blueText}]}>Terima kasih telah bersifat kooperatif. Kini Admin akan mengirimkan kembali uang ke pembeli. Dan segera setelah itu Admin akan menandai komplain ini sudah terselesaikan</Text>
          </View>
        )
      } if (disputeSolutionType === 1 && disputeStatus === 8) {
        return (
          <View style={[styles.header, {backgroundColor: Colors.duckEggBlue, alignItems: 'center'}]}>
            <Image source={Images.infoDone} style={[styles.iconOcher, {marginTop: 0}]} />
            <Text style={[styles.semiboldOcher, {color: Colors.greenish, lineHeight: 20}]}>Komplain telah terselesaikan</Text>
          </View>
        )
      } if (disputeSolutionType === 2 && disputeStatus === 5) {
        return (
          <View style={[styles.header, {backgroundColor: Colors.blueBackground}]}>
            <Image source={Images.infoBlue} style={styles.iconOcher} />
            <Text style={[styles.semiboldOcher, {color: Colors.blueText}]}>Terima kasih telah bersifat kooperatif. Kini Anda tinggal menunggu konfirmasi dari pembeli setelah barang sampai</Text>
          </View>
        )
      }
    } else {
      return (
        <View />
      )
    }
  }

  renderNotificationRefund (disputeSolutionType, stateDeliveryRefund) {
    if (stateDeliveryRefund) {
      if (disputeSolutionType === 1) {
        return (
          <View style={[styles.header, {backgroundColor: Colors.blueBackground}]}>
            <Image source={Images.infoBlue} style={styles.iconOcher} />
            <Text style={[styles.semiboldOcher, {color: Colors.blueText}]}>Terima kasih telah bersifat kooperatif. Kini Admin akan mengirimkan kembali uang ke pembeli. Dan segera setelah itu Admin akan menandai komplain ini sudah terselesaikan</Text>
          </View>
        )
      }
    } else {
      return (
        <View />
      )
    }
  }

  renderNotificationRetur (disputeSolutionType, disputeStatus, stateDeliveryRetur) {
    if (disputeSolutionType === 2 && disputeStatus === 4) {
      return (
        <View style={styles.header}>
          <Image source={Images.infoOcher} style={styles.iconOcher} />
          <Text style={styles.semiboldOcher}>Kini Anda silahkan memproses pengiriman barang baru. Dan silahkan memasukkan nomor resi di form dibawah ini</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderActionAcceptGoods (stateDeliveryRefund, disputeStatus) {
    if (disputeStatus === 1) {
      if (!stateDeliveryRefund) {
        return (
          <View style={styles.containerSnow}>
            <TouchableOpacity activeOpacity={0.5} style={styles.blueButton} onPress={() => this.setState({modalReceived: true})}>
              <Text style={styles.textboldWhite}>Barang sudah saya terima</Text>
            </TouchableOpacity>
          </View>
        )
      }
    } else {
      return (
        <View />
      )
    }
  }

  renderProcessReceipt (disputeSolutionType, disputeStatus) {
    if (disputeSolutionType === 2 && disputeStatus === 4) {
    // if (data) {
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
    this.setState({modalLoading: true, inputAirwayBills: true})
    this.props.inputNumberReceipt(this.state.idComplaint, this.state.receiptNumber)
  }

  renderReceiptSend (disputeSolutionType, disputeStatus) {
    if (disputeSolutionType === 2 && disputeStatus === 5) {
      return (
        <View style={styles.containerSnowNull}>
          <View style={styles.flexRowBorder}>
            <Text style={styles.semiboldSlateFlexOne}>Nomor Resi</Text>
            <Text style={[styles.regularBrowGrey]}>{this.state.receiptNumber}</Text>
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
          <Text style={styles.regularcharcoalGrey}>READ_BY_USER</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>SEND_BY_BUYER</Text>
        </View>
      )
    } if (data === 4) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>RECEIVE_BY_SELLER</Text>
        </View>
      )
    } if (data === 5) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>SEND_BY_SELLER</Text>
        </View>
      )
    } if (data === 6) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>RECEIVE_BY_USER</Text>
        </View>
      )
    } if (data === 7) {
      return (
        <View style={styles.flexRowChild}>
          <View style={styles.iconStatus} />
          <Text style={styles.regularcharcoalGrey}>PROCESS_OF_REFUND</Text>
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
        <Text style={styles.regularBrowGreyFlextwo}>REFUND</Text>
      )
    } else {
      return (
        <Text style={styles.regularBrowGreyFlextwo}>EXCHANGE</Text>
      )
    }
  }

  renderDetail (data) {
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
        {this.renderDetailRefundMoney(data, this.state.disputeStatus)}
        {this.renderDetailNumberRefund(data, this.state.disputeStatus)}
      </View>
    )
  }

  renderDetailRefundMoney (data, disputeStatus) {
    var maksedMoney = this.maskedMoney(data.refund.total)
    if (disputeStatus === 8) {
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

  renderItemsProblem (data) {
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

  renderProofs (data) {
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

  renderProblem (data) {
    return (
      <View>
        <Text style={styles.textBoldcharcoalGrey}>Masalah yang terjadi</Text>
        <View style={[styles.containerSnowNull, {paddingBottom: 15.5, paddingRight: 15.5, paddingTop: 15.5}]} >
          <Text style={styles.regularSlateFlexOne}>{data.problems}</Text>
        </View>
      </View>
    )
  }

  renderInformation (data) {
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
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleReceive(this.state.disputeSolutionType)}>
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
    this.setState({modalUpdateReceiptNumber: false, modalLoading: true, updateAirwayBills: true})
    this.props.inputNumberReceipt(this.state.idComplaint, this.state.inputReceiptNumber)
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

  handleReceive (disputeSolutionType) {
    if (disputeSolutionType === 1) {
      this.setState({modalLoading: true, modalReceived: false, acceptRefund: true})
      this.props.confrimProduct(this.state.idComplaint)
    } else {
      this.setState({modalLoading: true, modalReceived: false, acceptRetur: true})
      this.props.confrimProduct(this.state.idComplaint)
    }
  }

  renderRowDiscussion (rowData) {
    const image = rowData.map((data, i) => {
      const timeStampToDate = moment.unix(data.created_at).format('HH:MM').toString()
      return (
        <View key={i} onLayout={this.onLayout} style={styles.containerMessage}>
          <View style={styles.maskedPhoto}>
            <Image source={{uri: data.user.photo}} style={styles.photoUser} />
          </View>
          <View style={{marginLeft: 20, flex: 1}}>
            <View style={styles.flexRowMessage}>
              <Text style={styles.titleMessage}>{data.user.name}</Text>
              <Text style={styles.date}>{timeStampToDate}</Text>
            </View>
            <Text style={styles.messageText}>{data.content}</Text>
          </View>
        </View>
      )
    })
    return (
      <View>
        {image}
      </View>
    )
  }

  sendDiscussion () {
    this.setState({replyDiscussions: true})
    this.props.replyDiscussion(this.state.idComplaint, this.state.messages)
  }

  onLayout = (event) => {
    const layout = event.nativeEvent.layout
    this.listHeight = layout.height
    console.log(this.listHeight)
  }

  renderFooter = () => {
    return (
      <View onLayout={this.onFooterLayout} />
    )
  }

  onFooterLayout = (event) => {
    const layout = event.nativeEvent.layout
    this.footerY = layout.y
    console.log(this.footerY)
  }

  scrollToBottom () {
    this.refs.listView.scrollToEnd()
  }

  render () {
    if (this.state.loadingPage) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    const {detailComplain, stateDeliveryRefund, stateDeliveryRetur, disputeStatus, disputeSolutionType} = this.state
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <View tabLabel='Detail' ref='detail'>
            <ScrollView>
              {this.renderNotification(disputeSolutionType, disputeStatus, stateDeliveryRefund)}
              {this.renderNotificationRefund(disputeSolutionType, stateDeliveryRefund)}
              {this.renderNotificationRetur(disputeSolutionType, disputeStatus, stateDeliveryRetur)}
              {this.renderActionAcceptGoods(stateDeliveryRefund, disputeStatus)}
              {this.renderProcessReceipt(disputeSolutionType, disputeStatus)}
              {this.renderReceiptSend(disputeSolutionType, disputeStatus)}
              {this.renderDetail(detailComplain)}
              {this.renderItemsProblem(detailComplain)}
              {this.renderProblem(detailComplain)}
              {this.renderProofs(detailComplain)}
              {this.renderInformation(detailComplain)}
            </ScrollView>
          </View>
          <View tabLabel='Diskusi' ref='discussion' style={{flex: 1, flexDirection: 'column', backgroundColor: Colors.snow}}>
            <ScrollView ref='listView'>
              {this.renderRowDiscussion(this.state.discussion)}
              {/* {<ListView
                ref='listView'
                onLayout={this.onLayout}
                renderFooter={this.renderFooter}
                dataSource={this.dataSource.cloneWithRows(this.state.discussion)}
                renderRow={this.renderRowDiscussion.bind(this)}
                enableEmptySections
              />} */}
            </ScrollView>
            <TouchableOpacity onPress={() => this.scrollToBottom()} style={styles.absolute}>
              <Image source={Images.down} style={{width: 30, height: 30}} />
            </TouchableOpacity>
            <TextInput
              style={[styles.inputTextMessage]}
              value={this.state.messages}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect
              onChangeText={(text) => this.setState({messages: text})}
              onSubmitEditing={() => this.sendDiscussion()}
              underlineColorAndroid='transparent'
              placeholder='Tulis pesan Anda disini'
            />
          </View>
        </ScrollableTabView>
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
  propsUpdateStatus: state.updateStatus,
  propsReply: state.sellerComplaintDiscussion
})
const mapDispatchToProps = (dispatch) => ({
  getDetailComplaintSeller: (id) => dispatch(complaintAction.getComplainedOrderDetailSeller({id: id})),
  confrimProduct: (id) => dispatch(complaintAction.sellerDisputeReceived({id: id})),
  inputNumberReceipt: (id, numberinputNumberReceipt) => dispatch(complaintAction.updateAirwayBill({id: id, airway_bill: numberinputNumberReceipt})),
  replyDiscussion: (id, content) => dispatch(complaintAction.createComplaintDiscussionSeller({id: id, content: content}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerDetailComplaintsGoods)
