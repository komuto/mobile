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
import StoreProduct from '../Containers/StoreProduct'
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
import BuyerReview from '../Containers/BuyerReview'
import BuyerMessages from '../Containers/BuyerMessage'
import BuyerDetailMessage from '../Containers/BuyerDetailMessage'
import BuyerDiscussion from '../Containers/BuyerDiscussion'
import BuyerDetailDiscussion from '../Containers/BuyerDetailDiscussion'
import BuyerResolution from '../Containers/BuyerResolution'
import BuyerDetailResolution from '../Containers/BuyerDetailResolution'
import MovingProduct from '../Containers/MovingProduct'
import DetailProductStore from '../Containers/DetailProductStore'
import StatusStockDropshipping from '../Containers/StatusStockDropshipping'
import EditProductPhoto from '../Containers/EditProductPhoto'
import EditProductNameAndCategory from '../Containers/EditProductNameAndCategory'
import EditProductPriceAndSpecification from '../Containers/EditProductPriceAndSpecification'
import EditProductExpedition from '../Containers/EditProductExpedition'
import EditProductCatalog from '../Containers/EditProductCatalog'
import EditWholesale from '../Containers/EditWholesale'
import SellerNotificationMessage from '../Containers/SellerNotificationMessage'
import SellerNotificationMessageDetail from '../Containers/SellerNotificationMessageDetail'
import SellerNotificationDiscussion from '../Containers/SellerNotificationDiscussion'
import SellerNotificationReview from '../Containers/SellerNotificationReview'
import SellerNotificationResolution from '../Containers/SellerNotificationResolution'
import PaymentMidtrans from '../Containers/PaymentMidtrans'
import Balance from '../Containers/Balance'
import BalanceRefill from '../Containers/BalanceRefill'
import BalanceStatusRefill from '../Containers/BalanceStatusRefill'
import BalancePull from '../Containers/BalancePull'
import BalanceNewAccount from '../Containers/BalanceNewAccount'
import BalanceNotification from '../Containers/BalanceNotification'
import SalesDashboard from '../Containers/SalesDashboard'
import ListNewOrder from '../Containers/ListNewOrder'
import DetailOrder from '../Containers/DetailOrder'
import DeliveryConfirmation from '../Containers/DeliveryConfirmation'
import InputShippingInfo from '../Containers/InputShippingInfo'
import SalesList from '../Containers/SalesList'
import DetailSales from '../Containers/DetailSales'
import TransactionDetailItem from '../Containers/TransactionDetailItem'
import BalanceHistory from '../Containers/BalanceHistory'
import BalanceHistorySelling from '../Containers/BalanceHistorySelling'
import BalanceHistoryRefund from '../Containers/BalanceHistoryRefund'
import BalanceHistoryTopup from '../Containers/BalanceHistoryTopup'
import BalanceHistoryComission from '../Containers/BalanceHistoryComission'
import BalanceHistoryWithdraw from '../Containers/BalanceHistoryWithdraw'
import BalanceHistoryPurchase from '../Containers/BalanceHistoryPurchase'
import BalanceStatusWithdraw from '../Containers/BalanceStatusWithdraw'
import SellerComplain from '../Containers/SellerComplain'
import SellerComplainDetail from '../Containers/SellerComplainDetail'
import BuyerComplain from '../Containers/BuyerComplain'
import BuyerComplainDetail from '../Containers/BuyerComplainDetail'
import ListFavoriteStores from '../Containers/ListFavoriteStores'
import BuyerComplainConfirmation from '../Containers/BuyerComplainConfirmation'
import BuyerComplainRefundReview from '../Containers/BuyerComplainRefundReview'
import StoreDetailProductCatalogs from '../Containers/StoreDetailProductCatalogs'
import StoreInputCodeVerification from '../Containers/StoreInputCodeVerification'

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
            hideNavBar
            hideBackImage />
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
            hideNavBar
            hideBackImage />
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
            key='storeproduct'
            component={StoreProduct}
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
            hideNavBar
            hideBackImage />
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
            hideNavBar
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
            hideNavBar
            hideBackImage />
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
            key='buyerreview'
            component={BuyerReview}
            title='Review'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyermessage'
            component={BuyerMessages}
            title='Pesan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyerdetailmessage'
            component={BuyerDetailMessage}
            title=''
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='buyerdiscussion'
            component={BuyerDiscussion}
            title='Diskusi Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyerdetaildiscussion'
            component={BuyerDetailDiscussion}
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='buyerresolution'
            component={BuyerResolution}
            title='Pusat Resolusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyerdetailresolution'
            component={BuyerDetailResolution}
            title='Detail Resolusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='movingproduct'
            component={MovingProduct}
            hideNavBar
            hideBackImage />
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
          <Scene
            key='editproductphoto'
            component={EditProductPhoto}
            navBar={CustomNavBar}
            title='Kelola Foto'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='editproductnameandcategory'
            component={EditProductNameAndCategory}
            navBar={CustomNavBar}
            title='Nama dan Kategory Produk'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='editproductpriceandspecification'
            component={EditProductPriceAndSpecification}
            navBar={CustomNavBar}
            title='Harga dan Spesifikasi'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='editproductexpedition'
            component={EditProductExpedition}
            navBar={CustomNavBar}
            title='Ekspedisi Pengiriman'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='editproductcatalog'
            component={EditProductCatalog}
            navBar={CustomNavBar}
            title='Ubah Katalog'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='editwholesale'
            component={EditWholesale}
            navBar={CustomNavBar}
            title='Harga Grosir'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='sellernotificationmessage'
            component={SellerNotificationMessage}
            navBar={CustomNavBar}
            title='Pesan'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='sellernotificationmessagedetail'
            component={SellerNotificationMessageDetail}
            title=''
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='sellernotificationdiscussion'
            component={SellerNotificationDiscussion}
            navBar={CustomNavBar}
            title='Diskusi Product'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='sellernotificationreview'
            component={SellerNotificationReview}
            navBar={CustomNavBar}
            title='Review Product'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='sellernotificationresolution'
            component={SellerNotificationResolution}
            navBar={CustomNavBar}
            title='Pusat Resolusi'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='paymentmidtrans'
            component={PaymentMidtrans}
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='balance'
            component={Balance}
            navBar={CustomNavBar}
            title='Saldo'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancerefill'
            component={BalanceRefill}
            navBar={CustomNavBar}
            title='Pilih Nominal Saldo'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancestatusrefill'
            component={BalanceStatusRefill}
            navBar={CustomNavBar}
            title='Status Pengisian Saldo'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancepull'
            component={BalancePull}
            navBar={CustomNavBar}
            title='Tarik Saldo'
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancenewaccount'
            component={BalanceNewAccount}
            navBar={CustomNavBar}
            title='Tambah Data Rekening'
            hideNavBar
            hideBackImage />
          <Scene
            key='balancenotification'
            component={BalanceNotification}
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene key='salesdashboard'
            component={SalesDashboard}
            title='Penjualan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='listneworder'
            component={ListNewOrder}
            title='Pesanan Baru'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='detailorder'
            component={DetailOrder}
            title='Detail Pesanan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='deliveryConfirmation'
            component={DeliveryConfirmation}
            title='Konfirmasi Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='inputshippinginfo'
            component={InputShippingInfo}
            title='Masukan Informasi Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='saleslist'
            component={SalesList}
            title='Daftar Penjualan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='detailsales'
            component={DetailSales}
            title='Detail Penjualan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='transactiondetailitem'
            component={TransactionDetailItem}
            title='Detail Pesanan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancehistory'
            component={BalanceHistory}
            title='History Saldo'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='balancehistoryselling'
            component={BalanceHistorySelling}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancehistoryrefund'
            component={BalanceHistoryRefund}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancehistorytopup'
            component={BalanceHistoryTopup}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancehistorycomission'
            component={BalanceHistoryComission}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancehistorywithdraw'
            component={BalanceHistoryWithdraw}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancehistorypurchase'
            component={BalanceHistoryPurchase}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='balancestatuswithdraw'
            component={BalanceStatusWithdraw}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='sellercomplain'
            component={SellerComplain}
            title='Komplain Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='sellercomplaindetail'
            component={SellerComplainDetail}
            title='Detail Komplain Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyercomplain'
            component={BuyerComplain}
            title='Komplain Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyercomplaindetail'
            component={BuyerComplainDetail}
            title='Detail Komplain Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='listfavoritestores'
            component={ListFavoriteStores}
            title='Daftar Toko Favorit'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyercomplainconfirmation'
            component={BuyerComplainConfirmation}
            title='Konfirmasi Barang Diterima'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='buyercomplainrefundreview'
            component={BuyerComplainRefundReview}
            title='Memberi Review'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='storedetailproductcatalogs'
            component={StoreDetailProductCatalogs}
            title=''
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='storeinputcodeverification'
            component={StoreInputCodeVerification}
            title='Verifikasi toko'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
