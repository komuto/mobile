import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, TextInput, ActivityIndicator, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import CameraModal from '../Components/CameraModal'
import * as storeAction from '../actions/stores'

import { Images, Colors } from '../Themes'

import styles from './Styles/InformasiTokoScreenStyle'

class InformasiTokoScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      namaToko: 'jaya',
      slogan: 'kaya',
      maxText: 25,
      descToko: 'sukses',
      fotoToko: null,
      showModalCamera: false,
      store: [],
      stores: [],
      storeTemp: [],
      storesTemp: [],
      textPemilik: 'text',
      textSlogan: 'text',
      textDesc: 'text',
      textPemilikColor: Colors.snow,
      textSloganColor: Colors.snow,
      textDescColor: Colors.snow,
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataPhoto.status === 200) {
      this.setState({
        loading: false,
        fotoToko: nextProps.dataPhoto.payload.name
      })
    } else {
      this.setState({
        loading: false
      })
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

  handleChangename = (text) => {
    this.setState({ namaToko: text })
  }

  handleChangeSlogan = (text) => {
    this.setState({ slogan: text })
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
    console.tron.log('field', field)
    switch (field) {
      case 'pemilik':
        this.setState({
          textPemilik: 'Nama Pemilik harus diisi',
          textPemilikColor: Colors.red
        })
        break
      case 'slogan':
        this.setState({
          textSlogan: 'Slogan harus diisi',
          textSloganColor: Colors.red
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
          textSlogan: '25 sisa karakter',
          textSloganColor: Colors.labelgrey
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
          textDesc: 'Deskripsi harus diisi',
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
          textSlogan: '25 sisa karakter',
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
    const {namaToko, slogan, descToko, textPemilik, textSlogan, textDesc, textSloganColor, textPemilikColor, textDescColor} = this.state
    return (
      <View>
        <ScrollView style={{marginBottom: 40}}>
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
              <Text style={styles.uploadText}>Upload Foto Profil Toko</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textLabel}>Nama Toko</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref='name'
                style={styles.inputText}
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
                style={styles.inputText}
                multiline
                maxLength={25}
                value={slogan}
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
            <Text style={[styles.textLabel, {fontSize: 12, marginBottom: 37, color: textSloganColor}]}>{textSlogan}</Text>
            <Text style={styles.textLabel}>Deskripsi Toko</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref='descToko'
                style={styles.inputText}
                multiline
                value={descToko}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect
                onFocus={() => this.onFocus('desc')}
                onBlur={() => this.onBlur('desc')}
                onChangeText={this.handleChangeDesToko}
                underlineColorAndroid='transparent'
                placeholder='Deskripsi Toko Anda'
              />
            </View>
            <Text style={[styles.textLabel, {color: textDescColor}]}>Deskripsi Toko {textDesc}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: Colors.background}}>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
              <Text style={styles.textButtonNext}>
                Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  nextState () {
    const {namaToko, slogan, descToko, store, stores, storesTemp, fotoToko} = this.state
    if (namaToko === '' && slogan === '' && descToko === '') {
      this.onError('empty')
    } if (namaToko === '') {
      this.onError('pemilik')
    } if (slogan === '') {
      this.onError('slogan')
    } if (descToko === '') {
      this.onError('slogan')
    } if (fotoToko === null) {
      this.onError('foto')
    } else {
      store[0] = namaToko
      store[1] = slogan
      store[2] = descToko
      store[3] = fotoToko
      stores[3] = store
      storesTemp[0] = store
      NavigationActions.ekspedisitoko({
        type: ActionConst.PUSH,
        namaToko: namaToko,
        slogan: slogan,
        descToko: descToko,
        dataStore: storesTemp
      })
      console.log(storesTemp)
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
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
        {this.renderStateOne()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataPhoto: state.upload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postFotoToko: (data) => dispatch(storeAction.photoUpload({data: data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InformasiTokoScreenScreen)
