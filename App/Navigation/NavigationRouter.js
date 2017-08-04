import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { View, Text, Image } from 'react-native'

// screens identified by the router
import Profile from '../Containers/Profile'
import Splash from '../Containers/Splash'
import ForgetPassword from '../Containers/ForgetPassword'
import Notifikasi from '../Containers/Notifikasi'
import Register from '../Containers/Register'
import Login from '../Containers/LoginScreen'
import PasswordBaru from '../Containers/PasswordBaru'
import Home from '../Containers/Home'
import NotifikasiPengguna from '../Containers/NotifikasiPengguna'
import Transaksi from '../Containers/Transaksi'
import KategoriScreen from '../Containers/KategoriScreen'
import KategoriDuaScreen from '../Containers/KategoriDuaScreen'
import KategoriTigaScreen from '../Containers/KategoriTigaScreen'
import KategoriEmpatScreen from '../Containers/KategoriEmpatScreen'
import SearchResult from '../Containers/SearchResult'
import Search from '../Containers/Search'
import ProdukTerbaru from '../Containers/ProdukTerbaruScreen'
import OTPCodeScreen from '../Containers/OTPCodeScreen'
import Wishlist from '../Containers/Wishlist'
import DetailToko from '../Containers/DetailToko'
import ProductDetailScreen from '../Containers/ProductDetailScreen'
import UlasanScreen from '../Containers/UlasanScreen'
import Laporkan from '../Containers/Laporkan'
import InfoAlamatToko from '../Containers/InfoAlamatTokoScreen'
import InfoPemilikToko from '../Containers/InfoPemilikTokoScreen'
import InfoToko from '../Containers/InformasiTokoScreen'
import EkspedisiKirimToko from '../Containers/EkspedisiPengirimanTokoScreen'
import TokoDashboard from '../Containers/TokoDashboardScreen'
import DiskusiProduk from '../Containers/DiskusiProduk'
import DiskusiAdd from '../Containers/DiskusiAdd'
import PembelianInfoPengguna from '../Containers/PembelianInfoPengguna'
import PembelianKeranjangBelanja from '../Containers/PembelianKeranjangBelanja'
import PembelianTambahKeKeranjang from '../Containers/PembelianTambahKeKeranjang'
import KirimPesan from '../Containers/KirimPesanToko'
import DiskusiProdukKomentar from '../Containers/DiskusiProdukKomentar'
import TambahAlamat from '../Containers/TambahAlamatScreen'
import EditAlamat from '../Containers/EditAlamatScreen'
import DataAlamat from '../Containers/DataAlamatScreen'
import DataRekening from '../Containers/DataRekeningScreen'
import TambahRekening from '../Containers/TambahDataRekeningScreen'
import PengaturanNotifikasi from '../Containers/PengaturanNotifikasiScreen'
import KelolaAkunScreen from '../Containers/KelolaAkunScreen'
import BiodataScreen from '../Containers/BiodataScreen'
import NomerHandphoneScreen from '../Containers/NomerHandphoneScreen'
import GantiPassword from '../Containers/GantiPasswordScreen'
import Pembayaran from '../Containers/Pembayaran'
import PembayaranKeranjangBelanja from '../Containers/PembayaranKeranjangBelanja'
import PembayaranTransferBank from '../Containers/PembayaranTransferBank'
import PembayaranTransferBankDetail from '../Containers/PembayaranTransferBankDetail'
import PembayaranDetailBarang from '../Containers/PembayaranDetailBarang'
import PembayaranKartuKredit from '../Containers/PembayaranKartuKredit'
import PembayaranSaldo from '../Containers/PembayaranSaldo'
import DaftarProduk from '../Containers/DaftarProdukScreen'
import TambahProduk from '../Containers/TambahProdukScreen'
import UploadPhotoProduk from '../Containers/UploadPhotoProdukScreen'
import InfoNamaDanKategoriProdukScreen from '../Containers/InfoNamaDanKategoriProdukScreen'
import TentangDropshipping from '../Containers/TentangDropshippingScreen'
import EkspedisiPengirimanProduk from '../Containers/EkspedisiPengirimanProdukScreen'
import InfoHargaDanSpesifikasiProduk from '../Containers/InfoHargaDanSpesifikasiProdukScreen'
import PembayaranMandiriPay from '../Containers/PembayaranMandiriPay'
import PembayaranVirtualAccount from '../Containers/PembayaranVirtualAccount'
import PembayaranBri from '../Containers/PembayaranBri'
import PembayaranDoku from '../Containers/PembayaranDoku'
import PembayaranAlfamart from '../Containers/PembayaranAlfamart'
import PembayaranBerhasil from '../Containers/PembayaranBerhasil'
import PembayaranAlfamartDetail from '../Containers/PembayaranAlfamartDetail'
import SearchByCategory from '../Containers/SearchByCategoryScreen'
import SearchResultByCategory from '../Containers/SearchResultByCategoryScreen'

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
                  key='homeScreen'
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
                  key='transactionScreen'
                  component={Transaksi}
                  title='Transaksi'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
              <Scene
                key='notification'
                title='Notifikasi'
                icon={TabIcon}
                iconDefault={Images.notifikasi}
                iconActive={Images.notifikasiActive}>
                <Scene
                  key='notificationScreen'
                  component={NotifikasiPengguna}
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
                  key='acccountScreen'
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
            component={OTPCodeScreen}
            title='Lupa Password'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='notifikasi'
            component={Notifikasi}
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
            key='passwordbaru'
            component={PasswordBaru}
            title='Password Baru'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='kategoriscreen'
            component={KategoriScreen}
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
            key='produkterbaru'
            component={ProdukTerbaru}
            title='Produk Terbaru'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='kategoriduascreen'
            component={KategoriDuaScreen}
            title='Fashion Pria'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='kategoritigascreen'
            component={KategoriTigaScreen}
            title='Fashion Pria'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='kategoriempatscreen'
            showSearchIcon
            component={KategoriEmpatScreen}
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
            key='detailtoko'
            component={DetailToko}
            title='Detail Toko'
            navBar={CustomNavBar}
            hideNavBar={false}
            />
          <Scene
            key='productdetail'
            component={ProductDetailScreen}
            title='Fashion Pria'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='ulasanscreen'
            component={UlasanScreen}
            title='Ulasan'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='laporkan'
            component={Laporkan}
            title='Laporkan Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infotoko'
            component={InfoToko}
            title='Isi Informasi Toko'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='ekspedisitoko'
            component={EkspedisiKirimToko}
            title='Ekspedisi Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infopemilik'
            component={InfoPemilikToko}
            title='Info Pemilik'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infoalamattoko'
            component={InfoAlamatToko}
            title='Info Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='tokodashboard'
            component={TokoDashboard}
            title='Info Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='diskusiproduk'
            component={DiskusiProduk}
            title='Diskusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='tambahDiskusi'
            component={DiskusiAdd}
            title='Buat Diskusi Baru'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembelianinfopengguna'
            component={PembelianInfoPengguna}
            title='Isi Informasi Data Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembeliankeranjangbelanja'
            component={PembelianKeranjangBelanja}
            title='Keranjang Belanja'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='kirimpesan'
            component={KirimPesan}
            title='Kirim Pesan'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage />
          <Scene
            key='pembeliantambahkekeranjang'
            component={PembelianTambahKeKeranjang}
            title='Proses Pembelian'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='diskusiprodukkomentar'
            component={DiskusiProdukKomentar}
            title='Detail Diskusi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='tambahalamat'
            component={TambahAlamat}
            title='Tambah Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='editalamat'
            component={EditAlamat}
            title='Tambah Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='dataalamat'
            component={DataAlamat}
            title='Data Alamat'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='tambahrekening'
            component={TambahRekening}
            title='Tambah Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='datarekening'
            component={DataRekening}
            title='Data Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pengarutannotif'
            component={PengaturanNotifikasi}
            title='Pengaturan Notifikasi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='kelolaakun'
            component={KelolaAkunScreen}
            title='Kelola Akun'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='biodata'
            component={BiodataScreen}
            title='Biodata'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='nomerhape'
            component={NomerHandphoneScreen}
            title='Nomor Handphone'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='gantipassword'
            component={GantiPassword}
            title='Ganti Password'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayaran'
            component={Pembayaran}
            title='Pembayaran'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayarankeranjangbelanja'
            component={PembayaranKeranjangBelanja}
            title='Detail Pembelian'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayarantransferbank'
            component={PembayaranTransferBank}
            title='Transfer Bank'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayarantransferbankdetail'
            component={PembayaranTransferBankDetail}
            title='Detail Transaksi'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='pembayarandetailbarang'
            component={PembayaranDetailBarang}
            title='Detail Barang'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayarankartukredit'
            component={PembayaranKartuKredit}
            title='Kartu Kredit'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayaransaldo'
            component={PembayaranSaldo}
            title='Bayar Dengan Saldo'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='tambahrekening'
            component={TambahRekening}
            title='Tambah Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='datarekening'
            component={DataRekening}
            title='Data Rekening'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pengarutannotif'
            component={PengaturanNotifikasi}
            title='Pengaturan Notifikasi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='daftarproduk'
            component={DaftarProduk}
            title='Daftar Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='tambahproduk'
            component={TambahProduk}
            title='Tambah Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='uploadphotoproduk'
            component={UploadPhotoProduk}
            title='Upload Photo'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infonamadankategori'
            component={InfoNamaDanKategoriProdukScreen}
            title='Nama dan Kategori Produk'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='tentangdropshipping'
            component={TentangDropshipping}
            title='Tentang Dropshipping'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='ekspedisipengirimanproduk'
            component={EkspedisiPengirimanProduk}
            title='Ekspedisi Pengiriman'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='infohargaspesifikasi'
            component={InfoHargaDanSpesifikasiProduk}
            title='Harga dan Spesifikasi'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayaranmandiripay'
            component={PembayaranMandiriPay}
            title='Mandiri Click Pay'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayaranvirtualaccount'
            component={PembayaranVirtualAccount}
            title='Virtual Account (ATM)'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayaranbri'
            component={PembayaranBri}
            title='E-Pay BRI'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayarandoku'
            component={PembayaranDoku}
            title='Doku Wallet'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayaranalfamart'
            component={PembayaranAlfamart}
            title='Alfamart'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='pembayaranberhasil'
            component={PembayaranBerhasil}
            title='Notifikasi'
            navBar={CustomNavBar}
            hideNavBar
            hideBackImage={false} />
          <Scene
            key='pembayaranalfamartdetail'
            component={PembayaranAlfamartDetail}
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
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
