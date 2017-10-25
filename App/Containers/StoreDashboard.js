import React from 'react'
import { View, Text, TouchableOpacity, BackAndroid, Image, ScrollView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
// import moment from 'moment'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as storeAction from '../actions/stores'

import Reactotron from 'reactotron-react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'
import * as reviewAction from '../actions/review'

// Styles
import styles from './Styles/TokoDashboardScreenStyle'

import { Images, Fonts, Colors } from '../Themes'

class StoreDashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: '',
      nama: '',
      saldo: '0',
      status: '1',
      email: '',
      foto: 'default',
      statusVerifikasi: this.props.isStoreVerify,
      createStoresAt: this.props.createStoresAt,
      notif: false,
      complainItems: 0,
      callback: false
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.callback !== undefined) {
      Reactotron.log('callback ' + nextProps.callback)
      if (nextProps.callback !== this.state.callback) {
        this.setState({
          callback: nextProps.callback,
          notif: true,
          statusVerifikasi: true
        })
      }
    }
    if (nextProps.dataDisputes.status === 200) {
      this.setState({
        complainItems: nextProps.dataDisputes.disputes.disputes,
        unreadSales: nextProps.dataDisputes.disputes.sales
      })
    } else if (nextProps.dataDisputes.status !== 0 && nextProps.dataDisputes.status !== 200) {
      ToastAndroid.show(nextProps.dataDisputes.message, ToastAndroid.LONG)
    }
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  nextState () {
    NavigationActions.storeinputcodeverification({
      type: ActionConst.PUSH,
      callback: this.state.callback
    })
  }

  handleDaftarProduk () {
    NavigationActions.storeproduct({
      type: ActionConst.PUSH
    })
  }

  handleSales () {
    NavigationActions.salesdashboard({
      type: ActionConst.PUSH
    })
  }

  handleKelolaToko () {
    NavigationActions.managestore({
      type: ActionConst.PUSH
    })
  }

  countDownDaysVerification (date) {
    // var startdate = moment.unix(date).format('DD MMMM YYYY').toString()
    // var dateEnd = moment(startdate, 'DD MMMM YYYY').add(30, 'days').format('DD MMMM YYYY').toString()
    // var datetoday = moment().format('DD MMMM YYYY').toString()

    // var dayEnd = moment(dateEnd).format('DD')
    // var monthEnd = moment(dateEnd).format('MM')
    // var yearEnd = moment(dateEnd).format('YYYY')

    // var dayToday = moment(datetoday).format('DD')
    // var monthToday = moment(datetoday).format('MM')
    // var yearToday = moment(datetoday).format('YYYY')

    // var end = moment([yearEnd, monthEnd, dayEnd])
    // var today = moment([yearToday, monthToday, dayToday])
    // var dayDiff = end.diff(today, 'days')
    const dayDiff = 12
    return dayDiff
  }

  renderNotifAktivasi () {
    var daysLeft = this.countDownDaysVerification(this.state.createStoresAt)

    if (!this.state.statusVerifikasi) {
      return (
        <View style={{marginBottom: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textMenu, {paddingTop: 15.5, paddingBottom: 15.2, fontSize: Fonts.size.smallMed}]}>
              Batas Waktu Penjualan:
            </Text>
            <Text style={[styles.textMenu, {paddingTop: 15.5, paddingBottom: 15.2, paddingLeft: 8, fontSize: Fonts.size.smallMed, color: Colors.brownishGrey}]}>
              {daysLeft} Hari
            </Text>
          </View>
          <View style={[styles.dataProfileContainer, {justifyContent: 'center', alignItems: 'center', paddingLeft: -20}]}>
            <Text style={[styles.textNama, {fontFamily: Fonts.type.bold, paddingTop: 30.5, paddingBottom: 5}]}>
              Toko belum diverifikasi.
            </Text>
            <Text style={[styles.textNama, {textAlign: 'center', paddingBottom: 20.5, color: Colors.brownishGrey, fontSize: Fonts.size.smallMed}]}>
              Lakukan verifikasi agar bisa melakukan aktifitas{'\n'}penjualan lebih dari 30 hari
            </Text>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
              <Text style={styles.textButtonNext}>
                Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  notification () {
    if (this.state.notif) {
      return (
        <View style={{marginBottom: 30}}>
          <View style={{flexDirection: 'row', backgroundColor: Colors.duckEggBlue}}>
            <Text style={[styles.textMenu, {flex: 1, color: Colors.darkMint, paddingTop: 15.5, paddingBottom: 15.2, fontSize: Fonts.size.smallMed}]}>
              Selamat, Toko Anda telah terverifikasi.{'\n'}Kini Anda adalah verified seller
            </Text>
            <TouchableOpacity onPress={() => this.notifClose()}>
              <Image source={Images.closeGreen} style={{marginTop: 15.2, marginRight: 15.2, height: 24, width: 24}} />
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  notifClose () {
    this.setState({notif: false})
  }

  openMessageNotification () {
    this.props.getListMessages()
    this.props.getListArchiveMessages()
    NavigationActions.sellernotificationmessage({
      type: ActionConst.PUSH
    })
  }

  openDiscussionNotification () {
    // this.props.getStoreDiscussions(1)
    NavigationActions.sellernotificationdiscussion({
      type: ActionConst.PUSH
    })
  }

  openReviewNotification () {
    // this.props.getListReview(1)
    NavigationActions.sellernotificationreview({
      type: ActionConst.PUSH
    })
  }

  openResolutionNotification () {
    NavigationActions.sellercomplain({
      type: ActionConst.PUSH
    })
  }

  render () {
    const { complainItems } = this.state
    let view = null
    if (complainItems > 0) {
      view = (
        <View style={styles.containerNumber}>
          <Text style={styles.number}>
            {String(this.state.complainItems)}
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderNotifAktivasi()}
          {this.notification()}
          <View style={[styles.dataProfileContainer]}>
            <TouchableOpacity onPress={() => this.handleKelolaToko()}>
              <View style={styles.profile}>
                <Image source={Images.pengaturanToko} style={styles.imageCategory} />
                <View style={styles.noBorderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Pengaturan Toko
                    </Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.rightArrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.textMenu}>
            Menu Toko
          </Text>
          <View style={styles.dataProfileContainer}>
            <TouchableOpacity onPress={() => this.handleDaftarProduk()}>
              <View style={styles.profile}>
                <Image source={Images.listProduk} style={styles.imageCategory} />
                <View style={styles.borderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Daftar Produk
                    </Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.rightArrow} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSales()}>
              <View style={styles.profile}>
                <Image source={Images.penjualan} style={styles.imageCategory} />
                <View style={styles.noBorderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Penjualan
                    </Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.rightArrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.textMenu}>
            Notifikasi
          </Text>
          <View style={styles.dataProfileContainer}>
            <TouchableOpacity onPress={() => this.openMessageNotification()}>
              <View style={styles.profile}>
                <Image source={Images.chat} style={styles.imageCategory} />
                <View style={styles.borderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Chat dengan Pelanggan
                    </Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.rightArrow} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openDiscussionNotification()}>
              <View style={styles.profile}>
                <Image source={Images.komentar} style={styles.imageCategory} />
                <View style={styles.borderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Diskusi Produk
                    </Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.rightArrow} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openReviewNotification()}>
              <View style={styles.profile}>
                <Image source={Images.diReview} style={styles.imageCategory} />
                <View style={styles.borderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Produk Direview
                    </Text>
                  </View>
                  <Image source={Images.rightArrow} style={styles.rightArrow} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openResolutionNotification()}>
              <View style={styles.profile}>
                <Image source={Images.laporkan} style={styles.imageCategory} />
                <View style={styles.borderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Komplain Barang
                    </Text>
                  </View>
                  {view}
                  <Image source={Images.rightArrow} style={styles.rightArrow} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataDisputes: state.unreadDisputesStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListMessages: () => dispatch(messageAction.getSellerMessages()),
    getListArchiveMessages: () => dispatch(messageAction.getArchiveSellerMessages()),
    getStoreDiscussions: (page) => dispatch(storeAction.getStoreDiscussions({page: page})),
    getListReview: (page) => dispatch(reviewAction.getSellerReview({ page: page }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDashboard)
