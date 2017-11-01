import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  ListView,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import CameraModal from '../Components/CameraModal'
import Reactotron from 'reactotron-react-native'

import * as storeAction from '../actions/stores'
import * as loginaction from '../actions/user'
import {isFetching, isError, isFound} from '../Services/Status'
// import * as expeditionAction from '../actions/expedition'

import { Images, Colors } from '../Themes'

import styles from './Styles/InformasiTokoScreenStyle'

class InfoStore extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      updateInfoStore: false
    }
    this.state = {
      namaToko: this.props.dataProfile.user.store.name || '',
      slogan: this.props.dataProfile.user.store.slogan || '',
      descToko: this.props.dataProfile.user.store.description || '',
      fotoToko: this.props.dataProfile.user.store.logo || '',
      showModalCamera: false,
      store: [],
      stores: [],
      storeTemp: [],
      storesTemp: [],
      textPemilik: 'Nama Toko Tidak Dapat Diubah',
      textDesc: '',
      textPemilikColor: Colors.labelgrey,
      textSloganColor: Colors.snow,
      textDescColor: Colors.snow,
      heightSlogan: 0,
      heightDesc: 0,
      loading: false,
      maxLine: 25,
      lineLeft: 25,
      textSlogan: ' sisa karakter',
      createStore: this.props.createStores,
      textButton: this.props.textButton,
      editAbles: this.props.editAble,
      notif: false,
      errSlogan: false,
      uploadPhoto: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataUpdate} = nextProps
    if (nextProps.dataPhoto.status === 200) {
      Reactotron.log(nextProps.dataPhoto)
      this.setState({
        loading: false,
        uploadPhoto: nextProps.dataPhoto.payload.images[0].name
      })
    } if (nextProps.dataPhoto.status > 200) {
      this.setState({
        loading: false
      })
    }
    if (!isFetching(dataUpdate) && this.submitting.updateInfoStore) {
      this.submitting = { ...this.submitting, updateInfoStore: false }
      if (isError(dataUpdate)) {
        ToastAndroid.show(dataUpdate.message, ToastAndroid.SHORT)
      }
      if (isFound(dataUpdate)) {
        this.props.getProfile()
        this.setState({
          loading: false,
          notif: true
        })
      }
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

  backButton () {
    NavigationActions.pop()
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Berhasil memperbarui informasi toko</Text>
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

  handleChangename = (text) => {
    this.setState({ namaToko: text })
  }

  handleChangeSlogan = (text) => {
    this.setState({
      slogan: text
    })
  }

  handleChangeDesToko = (text) => {
    this.setState({ descToko: text })
  }

  renderCameraButton () {
    if (this.state.fotoToko === null) {
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
          <Image style={styles.fotoStyle} source={{uri: this.state.fotoToko}} />
        </View>
      </TouchableOpacity>
    )
  }

  addPhoto (photo) {
    this.setState({ fotoToko: photo, showModalCamera: false, loading: true })
    const PicturePath = this.state.fotoToko
    const postData = new FormData()
    postData.append('images', { uri: PicturePath, type: 'image/jpg', name: 'image.jpg' })
    postData.append('type', 'store')
    this.props.postFotoToko(postData)
  }

  onError = (field) => {
    console.log('field', field)
    switch (field) {
      case 'pemilik':
        this.setState({
          textPemilik: 'Nama toko harus diisi',
          textPemilikColor: Colors.red
        })
        break
      case 'slogan':
        this.setState({
          textSlogan: 'Slogan harus diisi',
          textSloganColor: Colors.red,
          errSlogan: true
        })
        break
      case 'desc':
        this.setState({
          textDesc: 'Deskripsi harus diisi',
          textDescColor: Colors.red
        })
        break
      case 'foto':
        window.alert('Foto Toko Kosong')
        break
      case 'empty':
        this.setState({
          textPemilik: 'Nama Pemilik harus diisi',
          textPemilikColor: Colors.red,
          textSlogan: 'Slogan harus diisi',
          textSloganColor: Colors.red,
          textDesc: 'Deskripsi harus diisi',
          textDescColor: Colors.red
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'pemilik':
        this.setState({
          textPemilik: 'Nama Toko Tidak Dapat Diubah',
          textPemilikColor: Colors.labelgrey
        })
        break
      case 'slogan':
        this.setState({
          textSlogan: ' sisa karakter',
          textSloganColor: Colors.labelgrey,
          errSlogan: false
        })
        break
      case 'desc':
        this.setState({
          textDesc: 'Deskripsi harus diisi',
          textDescColor: Colors.snow
        })
        break
      case 'foto':
        this.setState({
          textDesc: 'Foto harus diUpload',
          textDescColor: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          textPemilik: 'Nama Pemilik harus diisi',
          textPemilikColor: Colors.labelgrey,
          textSlogan: 'Slogan harus diisi',
          textSloganColor: Colors.labelgrey,
          textDesc: 'Deskripsi harus diisi',
          textDescColor: Colors.snow
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'pemilik':
        this.setState({
          textPemilik: 'Nama Toko Tidak Dapat Diubah',
          textPemilikColor: Colors.labelgrey
        })
        break
      case 'slogan':
        this.setState({
          textSloganColor: Colors.labelgrey
        })
        break
      case 'desc':
        this.setState({
          textDescColor: Colors.snow
        })
        break
      case 'foto':
        this.setState({
          textDescColor: Colors.snow
        })
        break
      default:
        this.setState({
          textPemilikColor: Colors.labelgrey,
          textSloganColor: Colors.labelgrey,
          textDescColor: Colors.snow
        })
        break
    }
  }

  renderStateOne () {
    const {textButton, editAbles, maxLine, namaToko, slogan, descToko, textPemilik, textSlogan, textDesc, textSloganColor, textPemilikColor, textDescColor, errSlogan} = this.state

    if (errSlogan) {
      this.sloganError = (<Text style={[styles.textLabel, {fontSize: 12, marginBottom: 37, color: textSloganColor}]}>
        {textSlogan}
      </Text>)
    } else {
      this.sloganError = (<Text style={[styles.textLabel, {fontSize: 12, marginBottom: 37, color: textSloganColor}]}>
        {this.state.maxLine - this.state.slogan.length} {textSlogan}
      </Text>)
    }

    return (
      <View>
        <View style={{flex: 1}}>
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
              <Text style={styles.uploadText}>Upload Foto Profil Toko</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textLabel}>Nama Toko</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref='name'
                style={styles.inputText}
                editable={editAbles}
                value={namaToko}
                keyboardType='default'
                returnKeyType='next'
                onFocus={() => this.onFocus('pemilik')}
                onBlur={() => this.onBlur('pemilik')}
                onSubmitEditing={() => this.refs.slogan.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangename}
                underlineColorAndroid='transparent'
                placeholder='Nama Toko Anda'
              />
            </View>
            <Text style={[styles.textLabel, {fontSize: 12, marginBottom: 37, color: textPemilikColor}]}>{textPemilik}</Text>
            <Text style={styles.textLabel}>Slogan</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref='slogan'
                style={[styles.inputText]}
                value={slogan}
                maxLength={maxLine}
                keyboardType='default'
                returnKeyType='next'
                onFocus={() => this.onFocus('slogan')}
                onBlur={() => this.onBlur('slogan')}
                onSubmitEditing={() => this.refs.descToko.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeSlogan}
                underlineColorAndroid='transparent'
                placeholder='Slogan Toko Anda'
              />
            </View>
            {this.sloganError}
            <Text style={styles.textLabel}>Deskripsi Toko</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref='descToko'
                style={[styles.inputText, {height: Math.max(35, this.state.heightDesc)}]}
                multiline
                value={descToko}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect
                onFocus={() => this.onFocus('desc')}
                onBlur={() => this.onBlur('desc')}
                onChange={(event) => {
                  this.setState({
                    descToko: event.nativeEvent.text,
                    heightDesc: event.nativeEvent.contentSize.height
                  })
                }}
                underlineColorAndroid='transparent'
                placeholder='Deskripsi Toko Anda'
              />
            </View>
            <Text style={[styles.textLabel, {fontSize: 12, color: textDescColor}]}>Deskripsi Toko {textDesc}</Text>
          </View>
          <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
            <Text style={styles.textButtonNext}>
              {textButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  nextState () {
    const {createStore, namaToko, slogan, descToko, store, stores, uploadPhoto} = this.state
    if (namaToko === '') {
      this.onError('pemilik')
    }
    if (slogan === '') {
      this.onError('slogan')
    }
    if (descToko === '') {
      this.onError('desc')
    }
    if (uploadPhoto === '') {
      this.onError('foto')
    }
    if (namaToko !== '' && slogan !== '' && descToko !== '') {
      if (createStore) {
        store[0] = namaToko
        store[1] = slogan
        store[2] = descToko
        store[3] = uploadPhoto
        stores[0] = store
        NavigationActions.storeexpedition({
          type: ActionConst.PUSH,
          dataStore: stores
        })
      } else {
        this.setState({loading: true})
        this.submitting.updateInfoStore = true
        this.props.updateInfoTokos(namaToko, slogan, descToko, uploadPhoto)
      }
    }
  }

  stateIndicator () {
    if (this.state.createStore) {
      return (
        <View style={styles.header}>
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>1</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>2</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>3</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>4</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.notif()}
        {this.stateIndicator()}
        <ScrollView>
          {this.renderStateOne()}
        </ScrollView>
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataPhoto: state.upload,
    dataProfile: state.profile,
    dataUpdate: state.updateStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postFotoToko: (data) => dispatch(storeAction.photoUpload({data: data})),
    updateInfoTokos: (name, slogan, desc, photo) => dispatch(storeAction.updateInformation({
      name: name,
      slogan: slogan,
      description: desc,
      logo: photo
    })),
    getProfile: (login) => dispatch(loginaction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStore)
