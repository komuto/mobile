import React from 'react'
import { ScrollView, View, BackAndroid, Text, DatePickerAndroid, TouchableOpacity, TextInput, Image, Modal, ListView } from 'react-native'
import { connect } from 'react-redux'
import CameraModal from '../Components/CameraModal'
import { Actions as NavigationActions } from 'react-native-router-flux'
import moment from 'moment'

import * as locationAction from '../actions/location'
import * as storeAction from '../actions/stores'
import * as userAction from '../actions/user'

import { Images, Colors } from '../Themes'
import CustomRadio from '../Components/CustomRadio'

import styles from './Styles/BiodataScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'
class Biodata extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    var listMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    var timeStampToDate = moment(this.props.dataProfile.user.user.date_of_birth).format('DD/MM/YYYY').toString()
    var day = moment(timeStampToDate, 'DD/MM/YYYY').date()
    var months = moment(timeStampToDate, 'DD/MM/YYYY').month()
    var years = moment(timeStampToDate, 'DD/MM/YYYY').year()
    this.state = {
      fotoProfil: null || this.props.dataProfile.user.user.photo,
      showModalCamera: false,
      gender: this.props.dataProfile.user.user.gender,
      index: '',
      dataGender: [{label: 'Pria', value: 0}, {label: 'Wanita', value: 1}],
      namaPemilik: '' || this.props.dataProfile.user.user.name,
      modalKabupaten: false,
      kabTerpilih: this.props.dataProfile.user.user.place_of_birth || 'Tempat Lahir Anda',
      idKabTerpilih: this.props.dataProfile.user.user.place_of_birth_id || 0,
      kabupaten: [],
      colorPicker: Colors.darkgrey,
      dof: (day) + ' ' + listMonths[months] + ' ' + years,
      timestamp: this.props.dataProfile.user.user.date_of_birth || '',
      notif: false,
      loading: false,
      uploadDate: '',
      updatePhoto: ''
    }
    moment.locale('id')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataKota.status === 200) {
      this.setState({kabupaten: nextProps.dataKota.districts})
    }
    if (nextProps.dataPhoto.status === 200) {
      this.setState({
        updatePhoto: nextProps.dataPhoto.payload.images[0].name
      })
      this.props.getProfil()
      nextProps.dataPhoto.status = 0
    }
    if (nextProps.dataUpdate.status === 200) {
      this.props.getProfil()
      this.setState({notif: true})
      nextProps.dataUpdate.status = 0
    }
  }

  componentDidMount () {
    if (this.props.dataProfile.user.user.gender === 'male') {
      this.setState({index: 0})
    } else {
      this.setState({index: 1})
    }
    if (this.props.dataProfile.user.user.date_of_birth === null) {
      this.setState({
        dof: 'Belum ada data'
      })
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
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKabupaten: false })}>
          <View style={styles.menuProvinsiContainer}>
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
                onChangeText={this.handleChangeSearch}
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
        </TouchableOpacity>
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
    const postData = new FormData()
    postData.append('images', { uri: photo, type: 'image/jpg', name: 'image.jpg' })
    postData.append('type', 'profile')
    this.props.postFotoToko(postData)
  }

  handleChangename = (text) => {
    this.setState({ namaPemilik: text })
  }

  handleChangeSearch = (text) => {
    this.setState({ search: text })
    this.props.searchKabupaten(text)
  }

  handlingRadio (index, value) {
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
    this.props.updateProfile(this.state.updatePhoto, this.state.namaPemilik, this.state.gender, this.state.idKabTerpilih, this.state.uploadDate)
  }

  async date () {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        mode: 'calendar',
        date: moment(this.timeStampToDate, 'DD/MM/YYYY')._d
      })

      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const dateChoose = String(day + '/' + (parseInt(month) + 1) + '/' + year)
        const tempChooseDate = moment(dateChoose, 'DD/MM/YYYY').month()
        const tempTimestamp = day + '-' + (parseInt(month) + 1) + '-' + year
        const bulan = months[tempChooseDate]
        const label = day + ' ' + bulan + ' ' + year
        const timestamp = moment(tempTimestamp, 'DD-MM-YYYY').unix()

        this.setState({
          dof: label,
          timestamp: timestamp,
          uploadDate: year + '-' + (month + 1) + '-' + day
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  }

  renderFoto () {
    return (
      <View>
        <CameraModal
          visible={this.state.showModalCamera}
          onClose={() => {
            this.setState({showModalCamera: false})
          }}
          onPress={() => {
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
              <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.date()}>
                <Text style={[styles.inputText, {color: this.state.colorPicker, borderBottomWidth: 0, flex: 1, marginLeft: 0}]}>{this.state.dof}</Text>
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
    getKota: (id) => dispatch(locationAction.getDistrict({id: id})),
    searchKabupaten: (key) => dispatch(locationAction.getDistrict({q: key})),
    updateProfile: (photo, namaPemilik, gender, idKabTerpilih, timestamp) => dispatch(userAction.updateProfile({photo: photo, name: namaPemilik, gender: gender, place_of_birth: idKabTerpilih, date_of_birth: timestamp}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Biodata)
