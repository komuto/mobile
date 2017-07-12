import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  ListView
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Produk from './DetailTokoProduk'
import DetailTokoProfile from './DetailTokoProfile'
import DetailTokoPenilaian from './DetailTokoPenilaian'
// Styles
import styles from './Styles/DetailTokoStyle'

class DetailToko extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      katalog: false,
      modal: false,
      data: [],
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      firstTabSwitch: true,
      tabAktiv: 'Produk',
      height: [],
      namaToko: '',
      alamat: 'Jakarta Selatan, DKI Jakarta',
      verified: false,
      fotoToko: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataToko.status === 200) {
      console.log(nextProps.dataToko.store)
      this.setState({
        data: nextProps.dataToko.store.catalogs,
        namaToko: nextProps.dataToko.store.store.name,
        alamat: nextProps.dataToko.store.store.district || 'Jakarta Selatan, DKI Jakarta',
        verified: nextProps.dataToko.store.store.is_verified,
        fotoToko: nextProps.dataToko.store.store.logo || null
      })
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
    if (this.state.verified) {
      return (
        <View>
          <Image source={Images.verified} style={styles.imageVerify} />
          <Text style={styles.verifiedText}>Terverifikasi</Text>
        </View>
      )
    }
    return null
  }

  renderFotoToko () {
    if (this.state.fotoToko === null) {
      return (
        <Image source={Images.contohproduct} style={styles.profilImage} />
      )
    }
    return (
      <Image source={{ uri: this.state.fotoToko }} style={styles.profilImage} />
    )
  }

  render () {
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
            <TouchableOpacity style={styles.button}>
              <Image source={Images.pesan} style={styles.image} />
              <Text style={styles.verifiedText}>Kirim Pesan</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.button}>
              <Image source={Images.tambah} style={styles.image} />
              <Text style={styles.verifiedText}>Favorit</Text>
            </TouchableOpacity>
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
          <ScrollView tabLabel='Produk' ref='Produk' style={styles.scrollView}>
            <Produk />
          </ScrollView>
          <ScrollView tabLabel='Profile' ref='Profile' style={styles.scrollView}>
            <DetailTokoProfile />
          </ScrollView>
          <ScrollView tabLabel='Penilaian' ref='Penilaian' style={styles.scrollView}>
            <DetailTokoPenilaian />
          </ScrollView>
        </ScrollableTabView>
        {this.renderFloatButton()}
        {this.renderModal()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataToko: state.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailToko)
