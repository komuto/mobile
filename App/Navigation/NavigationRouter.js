import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { View, Text, Image } from 'react-native'

// s identified by the router
import Profile from '../Containers/Profile'
import Splash from '../Containers/Splash'
import ForgetPassword from '../Containers/ForgetPassword'
import Notification from '../Containers/Notification'
import Register from '../Containers/Register'
import Login from '../Containers/Login'
import NewPassword from '../Containers/NewPassword'
import Home from '../Containers/Home'
import UserNotification from '../Containers/UserNotification'
import Transaction from '../Containers/Transaction'
import Category1 from '../Containers/Category1'
import Category2 from '../Containers/Category2'
import Category3 from '../Containers/Category3'
import Category4 from '../Containers/Category4'
import SearchResult from '../Containers/SearchResult'
import Search from '../Containers/Search'
import NewProduct from '../Containers/NewProduct'
import OTPCode from '../Containers/OTPCode'
import Wishlist from '../Containers/Wishlist'
import StoreDetail from '../Containers/StoreDetail'
import DetailProduct from '../Containers/DetailProduct'
import Review from '../Containers/Review'
import Report from '../Containers/Report'
import InfoAddressStore from '../Containers/InfoAddressStore'
import InfoStoreOwner from '../Containers/InfoStoreOwner'
import InfoStore from '../Containers/InfoStore'
import StoreExpedition from '../Containers/StoreExpedition'
import StoreDashboard from '../Containers/StoreDashboard'
import ProductDiscussion from '../Containers/ProductDiscussion'
import NewDiscussion from '../Containers/NewDiscussion'
import PurchaseUserInfo from '../Containers/PurchaseUserInfo'
import PurchaseCart from '../Containers/PurchaseCart'
import PurchaseAddToCart from '../Containers/PurchaseAddToCart'
import SendMessageStore from '../Containers/SendMessageStore'
import CommentProductDiscussion from '../Containers/CommentProductDiscussion'
import AddAddress from '../Containers/AddAddress'
import EditAddress from '../Containers/EditAddress'
import AddressData from '../Containers/AddressData'
import AccountData from '../Containers/AccountData'
import AddAccount from '../Containers/AddAccount'
import NotificationSetting from '../Containers/NotificationSetting'
import AccountManage from '../Containers/AccountManage'
import Biodata from '../Containers/Biodata'
import Cellphone from '../Containers/Cellphone'
import ChangePassword from '../Containers/ChangePassword'
import Payment from '../Containers/Payment'
import PaymentCart from '../Containers/PaymentCart'
import PaymentTransferBank from '../Containers/PaymentTransferBank'
import PaymentTransferBankDetail from '../Containers/PaymentTransferBankDetail'
import PaymentItemDetail from '../Containers/PaymentItemDetail'
import PaymentCreditCard from '../Containers/PaymentCreditCard'
import PaymentBalance from '../Containers/PaymentBalance'
import ProductList from '../Containers/ProductList'
import AddProduct from '../Containers/AddProduct'
import UploadProductPhoto from '../Containers/UploadProductPhoto'
import ProductInfoNameAndCategory from '../Containers/ProductInfoNameAndCategory'
import Dropshipping from '../Containers/Dropshipping'
import ExpeditionProduct from '../Containers/ExpeditionProduct'
import PriceAndSpecificationProduct from '../Containers/PriceAndSpecificationProduct'
import PaymentMandiriPay from '../Containers/PaymentMandiriPay'
import PaymentVirtualAccount from '../Containers/PaymentVirtualAccount'
import PaymentBRI from '../Containers/PaymentBRI'
import PaymentDoku from '../Containers/PaymentDoku'
import PaymentAlfamart from '../Containers/PaymentAlfamart'
import PaymentSuccess from '../Containers/PaymentSuccess'
import PaymentAlfamartDetail from '../Containers/PaymentAlfamartDetail'
import SearchByCategory from '../Containers/SearchByCategory'
import SearchResultByCategory from '../Containers/SearchResultByCategory'
import ChooseItemDropship from '../Containers/ChooseItemDropship'
import PlaceInCatalog from '../Containers/PlaceInCatalog'
import ProductListByCatalog from '../Containers/ProductListByCatalog'
import TransactionVerification from '../Containers/TransactionVerification'
import TransactionExpired from '../Containers/TransactionExpired'
import TransactionPaid from '../Containers/TransactionPaid'
import TransactionDetailStatus from '../Containers/TransactionDetailStatus'
import TransactionPaymentConfirmation from '../Containers/TransactionPaymentConfirmation'
import CartDetailItem from '../Containers/CartDetailItem'
import ManageStore from '../Containers/ManageStore'
import Terms from '../Containers/Terms'
import StoreCatalog from '../Containers/StoreCatalog'
import AddEditStoreCatalog from '../Containers/AddEditStoreCatalog'
import AddressStore from '../Containers/AddressStore'
import ManageStoreAddress from '../Containers/ManageStoreAddress'
import UpdateStoreAddress from '../Containers/UpdateStoreAddress'
import ManageStoreExpedition from '../Containers/ManageStoreExpedition'
import TransactionItemReceived from '../Containers/TransactionItemReceived'
import TransactionNotification from '../Containers/TransactionNotification'
import ReviewBuyer from '../Containers/ReviewBuyer'
import MessagesBuyer from '../Containers/MessagesBuyer'
import DetailMessages from '../Containers/DetailMessages'
import DiscussionBuyer from '../Containers/DiscussionBuyer'
import DetailDiscussionBuyer from '../Containers/DetailDiscussionBuyer'
import ResolutionCenter from '../Containers/ResolutionCenter'
import DetailResolution from '../Containers/DetailResolution'
import MovingProduct from '../Containers/MovingProduct'
import DetailProductStore from '../Containers/DetailProductStore'
import StatusStockDropshipping from '../Containers/StatusStockDropshipping'

// custom navbar
import CustomNavBar from './CustomNavBar'
import { Images, Colors } from '../Themes'

// style
import styles from './Styles/TabbarStyle'
// Simple component to render something in place of icon
const TabIcon = ({ selected, opacity, borderTopWidth, borderTopColor, title, iconDefault, iconActive }) => {
  return (
    <View style={[styles.buttonContainer, {borderTopWidth: selected ? 1 : 1}, {borderTopColor: selected ? Colors.red : Colors.clear}]}>
      <Image resizeMode='contain' source={selected ? iconActive : iconDefault} style={styles.buttonImage} />
      <Text style={[styles.buttonText, {color: selected ? Colors.red : Colors.grey, opacity: selected ? 1 : 0.5}]}>{title}</Text>
    </View>
  )
}

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='splash' component={Splash} hideNavBar />
          <Scene key='backtab'>
            <Scene
              key='tabbar'
              tabs
              tabBarStyle={styles.tabbar}>
              <Scene
                key='home'
                initial
                title='Home'
                icon={TabIcon}
                iconDefault={Images.home}
                iconActive={Images.homeActive}>
                <Scene
                  key='homescreen'
                  component={Home}
                  title='Home'
                  navBar={CustomNavBar}
                  hideNavBar
                  hideBackImage />
              </Scene>
              <Scene
                key='transaction'
                title='Transaksi'
                icon={TabIcon}
                iconDefault={Images.transaksi}
                iconActive={Images.transaksiActive}>
                <Scene
                  key='transactionscreen'
                  component={Transaction}
                  title='Transaksi'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
              <Scene
                key='usernotification'
                title='Notifikasi'
                icon={TabIcon}
                iconDefault={Images.notifikasi}
                iconActive={Images.notifikasiActive}>
                <Scene
                  key='usernotificationscreen'
                  component={UserNotification}
                  title='Notifikasi'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
              <Scene
                key='acccount'
                title='Profile'
                icon={TabIcon}
                iconDefault={Images.profile}
                iconActive={Images.profileActive}>
                <Scene
                  key='acccountscreen'
                  component={Profile}
                  title='Profile'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
            </Scene>
          </Scene>
          <Scene
            key='forgetpassword'
            component={ForgetPassword}
            title='Lupa Password'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='otpcode'
            component={OTPCode}
            title='Lupa Password'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='notification'
            component={Notification}
            navBar={CustomNavBar}
            hideNavBar />
          <Scene
            key='register'
            component={Register}
            title='Register'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='login'
            component={Login}
            title='Login'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='newpassword'
            component={NewPassword}
            title='Password Baru'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='category1'
            component={Category1}
            title='Kategori'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='searchresult'
            component={SearchResult}
            title='Search Result'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='search'
            component={Search}
            title='Search'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='newproduct'
            component={NewProduct}
            title='Produk Terbaru'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='category2'
            component={Category2}
            title='Fashion Pria'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='category3'
            component={Category3}
            title='Fashion Pria'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='category4'
            showSearchIcon
            component={Category4}
            title='Fashion Pria'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='wishlist'
            component={Wishlist}
            title='Wishlist'
            navBar={CustomNavBar}
            hideNavBar={false}
            />
          <Scene
            key='storedetail'
            component={StoreDetail}
            title='Detail Toko'
            navBar={CustomNavBar}
            hideNavBar={false}
            />
          <Scene
            key='detailproduct'
            component={DetailProduct}
            title='Fashion Pria'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='review'
            component={Review}
            title='Ulasan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='report'
            component={Report}
            title='Laporkan Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infostore'
            component={InfoStore}
            title='Isi Informasi Toko'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='storeexpedition'
            component={StoreExpedition}
            title='Ekspedisi Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infostoreowner'
            component={InfoStoreOwner}
            title='Info Pemilik'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infoaddressstore'
            component={InfoAddressStore}
            title='Info Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='storedashboard'
            component={StoreDashboard}
            title='Info Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='productdiscussion'
            component={ProductDiscussion}
            title='Diskusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='newdiscussion'
            component={NewDiscussion}
            title='Buat Diskusi Baru'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='purchaseuserinfo'
            component={PurchaseUserInfo}
            title='Isi Informasi Data Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='purchasecart'
            component={PurchaseCart}
            title='Keranjang Belanja'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='sendmessagestore'
            component={SendMessageStore}
            title='Kirim Pesan'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='purchaseaddtocart'
            component={PurchaseAddToCart}
            title='Proses Pembelian'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='commentproductdiscussion'
            component={CommentProductDiscussion}
            title='Detail Diskusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='addaddress'
            component={AddAddress}
            title='Tambah Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='editaddress'
            component={EditAddress}
            title='Tambah Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='addressdata'
            component={AddressData}
            title='Data Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='addaccount'
            component={AddAccount}
            title='Tambah Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='accountdata'
            component={AccountData}
            title='Data Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='notificationsetting'
            component={NotificationSetting}
            title='Pengaturan Notifikasi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='accountmanage'
            component={AccountManage}
            title='Kelola Akun'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='biodata'
            component={Biodata}
            title='Biodata'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='cellphone'
            component={Cellphone}
            title='Nomor Handphone'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='changepassword'
            component={ChangePassword}
            title='Ganti Password'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='payment'
            component={Payment}
            title='Pembayaran'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentcart'
            component={PaymentCart}
            title='Detail Pembelian'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymenttransferbank'
            component={PaymentTransferBank}
            title='Transfer Bank'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymenttransferbankdetail'
            component={PaymentTransferBankDetail}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='paymentitemdetail'
            component={PaymentItemDetail}
            title='Detail Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentcreditcard'
            component={PaymentCreditCard}
            title='Kartu Kredit'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentbalance'
            component={PaymentBalance}
            title='Bayar Dengan Saldo'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='addaccount'
            component={AddAccount}
            title='Tambah Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='accountdata'
            component={AccountData}
            title='Data Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='notificationsetting'
            component={NotificationSetting}
            title='Pengaturan Notifikasi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='productlist'
            component={ProductList}
            title='Daftar Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='addproduct'
            component={AddProduct}
            title='Tambah Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='uploadproductphoto'
            component={UploadProductPhoto}
            title='Upload Photo'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='productinfonameandcategory'
            component={ProductInfoNameAndCategory}
            title='Nama dan Kategori Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='dropshipping'
            component={Dropshipping}
            title='Tentang Dropshipping'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='expeditionproduct'
            component={ExpeditionProduct}
            title='Ekspedisi Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='priceandspesificationproduct'
            component={PriceAndSpecificationProduct}
            title='Harga dan Spesifikasi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentmandiripay'
            component={PaymentMandiriPay}
            title='Mandiri Click Pay'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentvirtualaccount'
            component={PaymentVirtualAccount}
            title='Virtual Account (ATM)'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentbri'
            component={PaymentBRI}
            title='E-Pay BRI'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentdoku'
            component={PaymentDoku}
            title='Doku Wallet'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentalfamart'
            component={PaymentAlfamart}
            title='Alfamart'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentsuccess'
            component={PaymentSuccess}
            title='Notifikasi'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='paymentalfamartdetail'
            component={PaymentAlfamartDetail}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='searchresultbycategory'
            component={SearchResultByCategory}
            title='Search Result'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='searchbycategory'
            component={SearchByCategory}
            title='Search'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='chooseitemdropship'
            component={ChooseItemDropship}
            title='Pilih Barang dari Dropshipping'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='placeincatalog'
            component={PlaceInCatalog}
            title='Tempatkan di Katalog'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='productlistbycatalog'
            component={ProductListByCatalog}
            title='Daftar Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactionverification'
            component={TransactionVerification}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactionexpired'
            component={TransactionExpired}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactionpaid'
            component={TransactionPaid}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactiondetailstatus'
            component={TransactionDetailStatus}
            title='Detail Status Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactionpaymentconfirmation'
            component={TransactionPaymentConfirmation}
            title='Konfirmasi Pembayaran'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='cartdetailitem'
            component={CartDetailItem}
            title='Detail Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='managestore'
            component={ManageStore}
            title='Kelola Toko'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='terms'
            component={Terms}
            title='Terms and Conditions'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='storecatalog'
            component={StoreCatalog}
            title='Katalog'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='addeditstorecatalog'
            component={AddEditStoreCatalog}
            title='Tambah Katalog'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='addressstore'
            component={AddressStore}
            title='Info Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='managestoreaddress'
            component={ManageStoreAddress}
            title='Info Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='updatestoreaddress'
            component={UpdateStoreAddress}
            title='Info Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='managestoreexpedition'
            component={ManageStoreExpedition}
            title='Ekspedisi Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactionitemreceived'
            component={TransactionItemReceived}
            title='Konfirmasi Barang Diterima'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactionnotification'
            component={TransactionNotification}
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='reviewbuyer'
            component={ReviewBuyer}
            title='Review'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='messagesbuyer'
            component={MessagesBuyer}
            title='Pesan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='detailmessage'
            component={DetailMessages}
            title=''
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='discussionbuyer'
            component={DiscussionBuyer}
            title='Diskusi Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='detaildiscussionbuyer'
            component={DetailDiscussionBuyer}
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='resolutioncenter'
            component={ResolutionCenter}
            title='Pusat Resolusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='detailresolution'
            component={DetailResolution}
            title='Detail Resolusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='detailresolution'
            component={DetailResolution}
            title='Detail Resolusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='movingproduct'
            component={MovingProduct}
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='detailproductstore'
            component={DetailProductStore}
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='statusstokdropshipping'
            component={StatusStockDropshipping}
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
