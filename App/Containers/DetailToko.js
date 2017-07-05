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
      data: [
        { 'id': 1, 'kategori': 'elektronik' },
        { 'id': 2, 'kategori': 'pakaian' },
        { 'id': 3, 'kategori': 'alat olahraga' }
      ]
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
          <Text style={styles.kategori}>{rowData.kategori}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.containerData}>
          <Text style={styles.kategori}>{rowData.kategori}</Text>
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

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.profilContainer}>
                <Image source={Images.contohproduct} style={styles.profilImage} />
              </View>
              <View style={styles.info}>
                <Text style={styles.namaToko}>Sports Station Shop</Text>
                <Text style={styles.alamatToko}>Jakarta Selatan, DKI Jakarta</Text>
                <View style={styles.verifyContainer}>
                  <Image source={Images.verified} style={styles.imageVerify} />
                  <Text style={styles.verifiedText}>Terverifikasi</Text>
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
            tabBarBackgroundColor={Colors.snow}
            tabBarActiveTextColor={Colors.darkgrey}
            tabBarUnderlineStyle={{ backgroundColor: Colors.red, height: 2 }}
            tabBarInactiveTextColor={Colors.lightgrey}
            tabBarTextStyle={styles.textTab}
            locked
          >
            <Produk tabLabel='Produk' />
            <DetailTokoProfile tabLabel='Profile' />
            <DetailTokoPenilaian tabLabel='Penilaian' />
          </ScrollableTabView>
        </ScrollView>
        {this.renderFloatButton()}
        {this.renderModal()}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailToko)
