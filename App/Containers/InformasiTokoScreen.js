import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, TextInput, BackAndroid } from 'react-native'
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
      namaToko: '',
      slogan: '',
      maxText: 25,
      descToko: '',
      fotoToko: null,
      showModalCamera: false,
      store: [],
      stores: [],
      storeTemp: [],
      storesTemp: []
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
            <Image source={Images.defaultprofile} />
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity onPress={() => this.setState({showModalCamera: true})}>
        <Image style={styles.foto2} source={{uri: this.state.fotoToko}} />
      </TouchableOpacity>
    )
  }

  addPhoto (photo) {
    this.setState({ fotoToko: photo, showModalCamera: false })
  }

  updoadFotoToko () {
    const PicturePath = this.state.fotoToko
    const postData = new FormData()
    postData.append('images', { uri: PicturePath, type: 'image/jpg', name: 'image.jpg' })
    postData.append('type', 'store')
    this.props.postFotoToko(postData)
  }

  renderStateOne () {
    const {namaToko, slogan, maxText, descToko} = this.state
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
            <TouchableOpacity onPress={() => this.updoadFotoToko()}>
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
                onSubmitEditing={() => this.refs.slogan.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangename}
                underlineColorAndroid='transparent'
                placeholder='Nama Toko Anda'
              />
            </View>
            <Text style={[styles.textLabel, {fontSize: 12, marginBottom: 37}]}>Nama toko tidak dapat diubah</Text>
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
                onSubmitEditing={() => this.refs.descToko.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeSlogan}
                underlineColorAndroid='transparent'
                placeholder='Slogan Toko Anda'
              />
            </View>
            <Text style={[styles.textLabel, {fontSize: 12, marginBottom: 37}]}>{maxText} sisa karakter</Text>
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
                onChangeText={this.handleChangeDesToko}
                underlineColorAndroid='transparent'
                placeholder='Deskripsi Toko Anda'
              />
            </View>
          </View>
          <View style={{flex: 1, backgroundColor: Colors.background}}>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
              <Text style={styles.textButtonNext}>
                Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.Camera}
      </View>
    )
  }

  nextState () {
    const {namaToko, slogan, descToko, store, stores, storesTemp} = this.state
    store.push(namaToko)
    store.push(slogan)
    store.push(descToko)
    stores.push(store)
    storesTemp[0] = store
    NavigationActions.ekspedisitoko({
      type: ActionConst.PUSH,
      namaToko: namaToko,
      slogan: slogan,
      descToko: descToko,
      dataStore: this.state.stores,
      storeSingle: this.state.storesTemp
    })
  }

  render () {
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
