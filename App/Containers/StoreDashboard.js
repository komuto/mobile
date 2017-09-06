import React from 'react'
import { View, Text, TouchableOpacity, BackAndroid, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as storeAction from '../actions/stores'

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
      statusVerifikasi: true
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

  nextState () {
    NavigationActions.notification({
      type: ActionConst.PUSH,
      tipeNotikasi: 'successBukaToko'
    })
  }

  handleDaftarProduk () {
    this.props.getListProduk(false)
    this.props.getHiddenProduct()
    NavigationActions.productlist({
      type: ActionConst.PUSH
    })
  }

  handleKelolaToko () {
    NavigationActions.managestore({
      type: ActionConst.PUSH
    })
  }

  renderNotifAktivasi () {
    if (this.state.statusVerifikasi) {
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textMenu, {paddingTop: 15.5, paddingBottom: 15.2, fontSize: Fonts.size.smallMed}]}>
              Batas Waktu Penjualan:
            </Text>
            <Text style={[styles.textMenu, {paddingTop: 15.5, paddingBottom: 15.2, paddingLeft: 8, fontSize: Fonts.size.smallMed, color: Colors.brownishGrey}]}>
              28 Hari
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
    } else {
      return (
        <View>
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
    return (
      <View />
    )
  }

  openMessageNotification () {
    this.props.getListMessages()
    this.props.getListArchiveMessages()
    NavigationActions.sellernotificationmessage({
      type: ActionConst.PUSH
    })
  }

  openDiscussionNotification () {
    this.props.getStoreDiscussions(1)
    NavigationActions.sellernotificationdiscussion({
      type: ActionConst.PUSH
    })
  }

  openReviewNotification () {
    this.props.getListReview(1)
    NavigationActions.sellernotificationreview({
      type: ActionConst.PUSH
    })
  }

  openResolutionNotification () {
    NavigationActions.sellernotificationresolution({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderNotifAktivasi()}
          <View style={[styles.dataProfileContainer, {marginTop: 30}]}>
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
            <TouchableOpacity>
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
                <Image source={Images.help} style={styles.imageCategory} />
                <View style={styles.borderContainer}>
                  <View style={styles.namaContainer}>
                    <Text style={styles.textNama}>
                      Pusat Resolusi
                    </Text>
                  </View>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListProduk: (status) => dispatch(storeAction.getStoreProducts({hidden: status})),
    getHiddenProduct: () => dispatch(storeAction.getHiddenStoreProducts()),
    getListMessages: () => dispatch(messageAction.getSellerMessages()),
    getListArchiveMessages: () => dispatch(messageAction.getArchiveSellerMessages()),
    getStoreDiscussions: (page) => dispatch(storeAction.getStoreDiscussions({page: page})),
    getListReview: (page) => dispatch(reviewAction.getSellerReview({ page: page }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDashboard)
