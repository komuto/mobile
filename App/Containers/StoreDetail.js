import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  ListView,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as userAction from '../actions/user'
import StoreDetailProduct from './StoreDetailProduct'
import StoreDetailProfile from './StoreDetailProfile'
import StoreDetailRating from './StoreDetailRating'
// Styles
import styles from './Styles/DetailTokoStyle'
import Reactotron from 'reactotron-react-native'

class StoreDetail extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      katalog: false,
      modal: false,
      data: [],
      id: '',
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      firstTabSwitch: true,
      tabAktiv: 'Produk',
      height: [],
      namaToko: '',
      alamat: '',
      verified: false,
      fotoToko: null,
      isFavorited: false,
      getData: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataToko.status === 200) {
      Reactotron.log(nextProps.dataToko)
      if (this.state.getData) {
        this.setState({
          data: nextProps.dataToko.store.catalogs,
          namaToko: nextProps.dataToko.store.name,
          id: nextProps.dataToko.store.id,
          alamat: nextProps.dataToko.store.origin || 'Belum Mendaftarkan Alamat Toko',
          verified: nextProps.dataToko.store.is_verified,
          fotoToko: nextProps.dataToko.store.logo || null,
          isFavorited: nextProps.dataToko.store.is_favorite,
          getData: false
        })
      }
    } else if (nextProps.dataToko.status !== 200 && nextProps.dataToko.status !== 0) {
      ToastAndroid.show(nextProps.dataToko.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataFavorit.status === 200) {
      this.setState({
        isFavorited: nextProps.dataFavorit.favorite
      })
    } else if (nextProps.dataFavorit.status !== 200 && nextProps.dataFavorit.status !== 0) {
      this.setState({
        isFavorited: !this.state.isFavorited
      })
      nextProps.dataFavorit.status = 0
    }
  }

  renderFloatButton () {
    if (!this.state.katalog) {
      return (
        <TouchableOpacity style={styles.floatButton} onPress={() => this.openKatalog()}>
          <Image source={Images.katalog} style={styles.floatImage} />
          <Text style={styles.katalog}>Daftar Katalog</Text>
        </TouchableOpacity>
      )
    }
    return null
  }

  renderRow (rowData, sectionId, rowId) {
    if (parseInt(rowId) === this.state.data.length - 1) {
      return (
        <TouchableOpacity style={styles.containerDataLast}>
          <Text style={styles.kategori}>{rowData.name}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.containerData}>
          <Text style={styles.kategori}>{rowData.name}</Text>
        </TouchableOpacity>
      )
    }
  }

  kirimPesan () {
    NavigationActions.sendmessagestore({
      type: ActionConst.PUSH,
      id: this.state.id,
      foto: this.state.fotoToko,
      namaToko: this.state.namaToko,
      alamat: this.state.alamat,
      typeMessage: 'sendMessageStore'
    })
  }

  renderModal () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modal}
        onRequestClose={() => this.setState({ modal: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.openKatalog()}>
          <View style={styles.listViewModal}>
            <ListView
              enableEmptySections
              contentContainerStyle={{ flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.data)}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
          <TouchableOpacity style={styles.floatButtonClose} onPress={() => this.openKatalog()}>
            <Image source={Images.closewhite} style={styles.floatImage} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }

  openKatalog () {
    if (this.state.katalog) {
      this.setState({
        katalog: false,
        modal: false
      })
    } else {
      this.setState({
        modal: true,
        katalog: true
      })
    }
  }

  renderVerified () {
    Reactotron.log(this.state.verified)
    if (this.state.verified) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={Images.verified} style={styles.imageVerify} />
          <Text style={styles.verifiedText}>Terverifikasi</Text>
        </View>
      )
    } else {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={Images.notVerified} style={styles.imageVerify} />
          <Text style={styles.verifiedText}>Belum Terverifikasi</Text>
        </View>
      )
    }
  }

  renderFotoToko () {
    if (this.state.fotoToko === null) {
      return (
        <Image source={null} style={styles.profilImage} />
      )
    }
    return (
      <Image source={{ uri: this.state.fotoToko }} style={styles.profilImage} />
    )
  }

  favorite () {
    const { isFavorited, id } = this.state
    if (isFavorited) {
      this.setState({
        isFavorited: false
      })
    } else {
      this.setState({
        isFavorited: true
      })
    }
    this.props.putFavoriteStore(id)
  }

  render () {
    const { isFavorited } = this.state
    let renderFavorite
    if (!isFavorited) {
      renderFavorite = (
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.snow }]} onPress={() => this.favorite()}>
          <Image source={Images.tambah} style={styles.image} />
          <Text style={[styles.verifiedText, { color: Colors.darkgrey }]}>Favorit</Text>
        </TouchableOpacity>
      )
    } else {
      renderFavorite = (
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.bluesky }]} onPress={() => this.favorite()}>
          <Image source={Images.centang} style={styles.image} />
          <Text style={[styles.verifiedText, { color: Colors.snow }]}>Di Favoritkan</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.profilContainer}>
              {this.renderFotoToko()}
            </View>
            <View style={styles.info}>
              <Text style={styles.namaToko}>{this.state.namaToko}</Text>
              <Text style={styles.alamatToko}>{this.state.alamat}</Text>
              <View style={styles.verifyContainer}>
                {this.renderVerified()}
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.kirimPesan()}>
              <Image source={Images.pesan} style={styles.image} />
              <Text style={styles.verifiedText}>Kirim Pesan</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            {renderFavorite}
          </View>
        </View>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.snow}
          tabBarActiveTextColor={Colors.darkgrey}
          tabBarUnderlineStyle={{ backgroundColor: Colors.red, height: 2 }}
          tabBarInactiveTextColor={Colors.lightgrey}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <View tabLabel='Produk' ref='Product' style={styles.scrollView}>
            <StoreDetailProduct />
          </View>
          <ScrollView tabLabel='Profile' ref='Profile' style={styles.scrollView}>
            <StoreDetailProfile />
          </ScrollView>
          <View tabLabel='Penilaian' ref='Rating' style={styles.scrollView}>
            <StoreDetailRating />
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataToko: state.stores,
    dataFavorit: state.favorite
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putFavoriteStore: (id) => dispatch(userAction.favoriteStore({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetail)
