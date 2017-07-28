import React from 'react'
import { ScrollView, View, BackAndroid, Text, TouchableOpacity, TextInput, Image, Modal, ListView } from 'react-native'
import { connect } from 'react-redux'
import CameraModal from '../Components/CameraModal'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import * as locationAction from '../actions/location'
import * as storeAction from '../actions/stores'
import * as userAction from '../actions/user'

import { Images, Colors, Fonts, Metrics } from '../Themes'
import CustomRadio from '../Components/CustomRadio'

import styles from './Styles/BiodataScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

class BiodataScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    var day = moment.unix(this.props.dataProfile.user.user.date_of_birth).format('DD-MMMM-YYYY').toString()
    this.state = {
      fotoProfil: null || this.props.dataProfile.user.user.photo,
      showModalCamera: false,
      gender: this.props.dataProfile.user.user.gender,
      index: '',
      dataGender: [{label: 'Pria', value: 0}, {label: 'Wanita', value: 1}],
      loading: false,
      namaPemilik: '' || this.props.dataProfile.user.user.name,
      tambahanKota: [
        {
          'id': 0,
          'ro_id': 0,
          'name': 'Pilih Kota'
        }
      ],
      modalKabupaten: false,
      kabTerpilih: this.props.dataProfile.user.user.place_of_birth || 'Tempat Lahir Anda',
      idKabTerpilih: 0,
      kabupaten: [],
      colorPicker: Colors.darkgrey,
      date: day,
      notif: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataKota.status === 200) {
      this.setState({kabupaten: this.state.tambahanKota.concat(nextProps.dataKota.districts)})
    }
    if (nextProps.dataPhoto.status === 200) {
      this.setState({fotoProfil: nextProps.dataPhoto.payload.name})
    }
    if (nextProps.dataUpdate.status === 200) {
      this.props.getProfil()
      this.setState({notif: true})
      nextProps.dataUpdate.status = 0
    }
  }

  componentDidMount () {
    if (this.props.dataProfile.user.user.gender === 'female') {
      this.setState({index: 1})
    } else {
      this.setState({index: 0})
    }
    this.props.getKota()
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Berhasil memperbarui biodata Anda</Text>
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

  renderCameraButton () {
    if (this.state.fotoProfil === null) {
      return (
        <TouchableOpacity onPress={() => this.setState({showModalCamera: true})}>
          <View style={styles.foto}>
            <Image style={styles.fotoStyle} source={Images.defaultprofile} />
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity onPress={() => this.setState({showModalCamera: true})}>
        <View style={styles.foto}>
          <Image style={styles.fotoStyle} source={{uri: this.state.fotoProfil}} />
        </View>
      </TouchableOpacity>
    )
  }

  renderModalKabupaten () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKabupaten}
        onRequestClose={() => this.setState({ modalKabupaten: false })}
        >
        <View style={styles.rowContainer}>
          <View style={styles.modalHeader} >
            <Text style={styles.textModalTitle}>Pilih Kota Kelahiran</Text>
            <TouchableOpacity onPress={() => this.setState({modalKabupaten: false})}>
              <Image source={Images.close} style={styles.closeImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalSearch} >
            <Image source={Images.searchGrey} style={styles.closeImage} />
            <TextInput
              style={styles.textSearch}
              value={this.state.search}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangename}
              underlineColorAndroid='transparent'
              placeholder='Cari kota kelahiran Anda'
            />
          </View>
          <ScrollView>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.kabupaten)}
              renderRow={this.renderListKabupaten.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </View>
      </Modal>
    )
  }

  renderListKabupaten (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kabTerpilih: rowData.name,
            idKabTerpilih: rowData.id,
            colorPicker: Colors.darkgrey,
            modalKabupaten: false })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  addPhoto (photo) {
    this.setState({ fotoProfil: photo, showModalCamera: false, loading: true })
    const PicturePath = this.state.fotoProfil
    const postData = new FormData()
    postData.append('images', { uri: PicturePath, type: 'image/jpg', name: 'image.jpg' })
    postData.append('type', 'store')
    this.props.postFotoToko(postData)
  }

  handleChangename = (text) => {
    this.setState({ namaPemilik: text })
  }

  handlingRadio (index, value) {
    console.log(index, value)
    if (value.toLowerCase() === 'pria') {
      this.setState({
        gender: 'male',
        index: index
      })
    } else {
      this.setState({
        gender: 'female',
        index: index
      })
    }
  }

  handleUpdateProfil () {
    let tempDate = moment(this.state.date, 'DD-MMMM-YYYY').format('MM-DD-YYYY')
    tempDate = tempDate.split('-')
    let dayMod = parseInt(tempDate[1]) + 2
    tempDate[1] = String(dayMod)
    let dob = new Date(tempDate).getTime() / 1000
    this.props.updateProfile(this.state.fotoProfil, this.state.namaPemilik, this.state.idKabTerpilih, dob)
  }

  renderFoto () {
    return (
      <View>
        <CameraModal
          visible={this.state.showModalCamera}
          onClose={() => {
            this.setState({showModalCamera: false})
          }}
          onPhotoCaptured={(path) => {
            this.addPhoto(path)
          }}
        />
        <View style={styles.containerFoto}>
          {this.renderCameraButton()}
          <TouchableOpacity onPress={() => this.setState({showModalCamera: true})}>
            <Text style={styles.uploadText}>Ganti Foto Profil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textLabel}>Nama Lengkap</Text>
          <TextInput
            ref='name'
            style={styles.inputText}
            value={this.state.namaPemilik}
            keyboardType='default'
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleChangename}
            underlineColorAndroid='transparent'
            placeholder='Nama Lengkap Anda'
          />
          <Text style={styles.radioLabel}>Gender</Text>
          <View style={{marginLeft: -10}}>
            <CustomRadio
              data={this.state.dataGender}
              index={this.state.index}
              handlingRadio={(index1, value1) =>
                this.handlingRadio(index1, value1)}
              horizontal
            />
          </View>
          <View style={styles.lokasiSeparator}>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
                <Text style={[styles.inputText, {color: this.state.colorPicker, borderBottomWidth: 0, flex: 1, marginLeft: 0}]}>{this.state.kabTerpilih}</Text>
                <Image source={Images.down} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lokasiSeparator}>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
                <DatePicker
                  style={{width: Metrics.screenWidth - 24 - 40, height: 32}}
                  date={this.state.date}
                  mode='date'
                  androidMode='spinner'
                  placeholder='Tanggal Lahir Anda'
                  format='DD-MMMM-YYYY'
                  minDate='02-01-1970'
                  maxDate='01-01-2019'
                  showIcon={false}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  customStyles={{
                    dateInput: {
                      marginLeft: 0,
                      borderBottomWidth: 0,
                      borderColor: '#fff',
                      alignItems: 'flex-start',
                      height: 32
                    },
                    dateText: {
                      fontFamily: Fonts.type.regular,
                      color: Colors.darkgrey,
                      fontSize: 14
                    },
                    placeholderText: {
                      fontFamily: Fonts.type.regular,
                      color: Colors.labelgrey,
                      fontSize: 13,
                      textAlign: 'left'
                    }
                  }}
                  onDateChange={(date) => { this.setState({date: date}) }}
                />
                <Image source={Images.down} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handleUpdateProfil()}>
          <Text style={styles.textButtonNext}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
        {this.renderModalKabupaten()}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.notif()}
        <ScrollView>
          {this.renderFoto()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataKota: state.districts,
    dataProfile: state.profile,
    dataPhoto: state.upload,
    dataUpdate: state.updateProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postFotoToko: (data) => dispatch(storeAction.photoUpload({data: data})),
    getProfil: () => dispatch(userAction.getProfile()),
    getKota: () => dispatch(locationAction.getDistrict()),
    updateProfile: (foto, namaLengkap, idKabTerpilih, tanggalLahir) => dispatch(userAction.updateProfile({photo: foto, name: namaLengkap, place_of_birth_id: idKabTerpilih, date_of_birth: tanggalLahir}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiodataScreenScreen)
