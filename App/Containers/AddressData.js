import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, BackAndroid, Image, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Spinner from '../Components/Spinner'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as addressAction from '../actions/address'
import { Colors, Fonts, Images } from '../Themes/'

// Styles
import styles from './Styles/DataAlamatScreenStyle'

class AddressData extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      listAlamat: [],
      deletAlamat: false,
      statusDot: false,
      name: this.props.name,
      email: this.props.email,
      rowTerpilih: '',
      idDelete: '',
      notif: this.props.notif,
      pesanNotif: this.props.pesanNotif,
      loading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataAlamats.status === 200) {
      this.setState({
        listAlamat: nextProps.dataAlamats.address,
        loading: false
      })
    }
    if (nextProps.dataDeletAlamat.status === 200) {
      Reactotron.log('hapus')
      this.setState({
        notif: true,
        pesanNotif: nextProps.dataDeletAlamat.message,
        loading: false
      })
      this.props.getAlamat()
      nextProps.dataDeletAlamat.status = 0
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.popTo('accountmanage')
    return true
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{this.state.pesanNotif}</Text>
          <TouchableOpacity onPress={() => this.setState({notif: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  handleCreateAlamat () {
    NavigationActions.addaddress({
      type: ActionConst.PUSH,
      name: this.state.name,
      email: this.state.email,
      titleButton: 'Buat Alamat Baru'
    })
  }

  handlleEditAlamat (idAlamat) {
    this.setState({statusDot: false})
    NavigationActions.addaddress({
      type: ActionConst.PUSH,
      edit: true,
      idAlamat: idAlamat,
      titleButton: 'Simpan Alamat'
    })
  }

  handleDeleteAlamat () {
    this.setState({deletAlamat: false, loading: true})
    this.props.deleteAddress(this.state.idDelete)
  }

  renderHeader () {
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => this.handleBack()}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Data Alamat
        </Text>
      </View>
    )
  }

  modalConfrimDeletAlamat () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.deletAlamat}
        onRequestClose={() => this.setState({ deletAlamat: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Text style={styles.titleModal}>Anda yakin akan menghapus{'\n'}Alamat tersebut?</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleDeleteAlamat()}>
              <Text style={styles.textVerifikasiButton}>Ya, Hapus Alamat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({deletAlamat: false})}>
              <Text style={styles.textBatalButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  containerEdit (i, id) {
    if (this.state.statusDot && this.state.rowTerpilih === i) {
      return (
        <View elevation={5} style={styles.edit}>
          <TouchableOpacity style={styles.touch} onPress={() => this.handlleEditAlamat(id)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.setState({deletAlamat: true, statusDot: false})}>
            <Text style={styles.textEdit}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View />
    )
  }

  mapingAlamat () {
    const { listAlamat } = this.state
    const mapparent = listAlamat.map((alamat, i) => {
      let primary
      if (alamat.is_primary_address) {
        primary = (
          <View style={{ backgroundColor: Colors.bluesky, marginLeft: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 5 }}>
            <Text style={styles.primaryAddress}>Alamat Utama</Text>
          </View>
        )
      }
      return (<TouchableOpacity key={i} activeOpacity={100} onPress={() => this.setState({statusDot: false})}>
        <View style={styles.headerInfoAlamat}>
          <Text style={[styles.textHeader, { flex: 0 }]}>{alamat.alias_address}</Text>
          {primary}
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => this.setState({statusDot: true, rowTerpilih: i, idDelete: alamat.id})}>
            <Image source={Images.threeDotSilver} style={styles.imageDot} />
          </TouchableOpacity>
        </View>
        <View style={styles.dataInfoAlamat}>
          <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Nama Penerima</Text>
          <Text style={styles.textHeader2}>{alamat.name}</Text>
          <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>No Handphone</Text>
          <Text style={styles.textHeader2}>{alamat.phone_number}</Text>
          <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Alamat</Text>
          <Text numberOfLines={3} style={[styles.textHeader2, {paddingRight: 100}]}>{alamat.address}, {alamat.village.name}, {alamat.subDistrict.name}, {alamat.district.name}, {alamat.province.name}, {alamat.postal_code}</Text>
        </View>
        {this.containerEdit(i, alamat.id)}
        <View style={{backgroundColor: Colors.paleGrey, height: 24.4}} />
      </TouchableOpacity>
      )
    })
    return (
      <View>
        {mapparent}
      </View>
    )
  }

  renderEmpty (data) {
    if (data.length === 0) {
      return (
        <View style={styles.containerEmpty}>
          <Image source={Images.emptyDiscussion} style={{ width: 173, height: 178 }} />
          <Text style={styles.textTitleEmpty}>Alamat Anda Kosong</Text>
          <Text style={styles.textTitleEmpty2}>----</Text>
        </View>
      )
    }
    return null
  }

  render () {
    const { loading } = this.state
    if (!loading) {
      return (
        <View style={styles.container}>
          {this.renderHeader()}
          {this.notif()}
          {this.renderEmpty(this.state.listAlamat)}
          <ScrollView>
            <View style={styles.infoAlamat}>
              {this.mapingAlamat()}
              {this.modalConfrimDeletAlamat()}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.create} onPress={() => this.handleCreateAlamat()}>
            <View elevation={9}>
              <Image source={Images.tambahWhite} style={styles.imageTambah} />
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <Spinner />
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    dataAlamats: state.listAddress,
    dataDeletAlamat: state.deleteAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAddress: (id) => dispatch(addressAction.deleteAddress({id})),
    getAlamat: () => dispatch(addressAction.getListAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressData)
