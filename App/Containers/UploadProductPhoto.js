import React from 'react'
import { View, Text, ActivityIndicator, BackAndroid, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import CameraModal from '../Components/CameraModal'
import * as storeAction from '../actions/stores'
import * as categoriAction from '../actions/home'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/UploadPhotoProdukScreenStyle'
import { Images, Colors } from '../Themes'

class UploadProductPhoto extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      foto: [],
      loading: false,
      showModalCamera: false,
      count: 0,
      images: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataPhoto.status === 200) {
      let temp = this.state.images
      nextProps.dataPhoto.payload.images.map((data, i) => {
        temp[i] = ({'name': data.name})
      })
      this.setState({
        loading: false
      })
      this.props.getKategori()
      NavigationActions.productinfonameandcategory({
        type: ActionConst.PUSH,
        images: temp
      })
    } else if (nextProps.dataPhoto.status > 200) {
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

  thumnailFoto () {
    if (this.state.foto.length < 0) {
      return (
        <View />
      )
    } else {
      const mapFoto = this.state.foto.map((data, i) => {
        return (
          <View key={i} style={{flexDirection: 'row'}}>
            <View style={styles.foto}>
              <TouchableOpacity>
                <View style={styles.fotoTumb}>
                  <Image source={{uri: data}} style={styles.imageProduk} />
                </View>
              </TouchableOpacity>
              <View style={styles.containerDiskon}>
                <TouchableOpacity onPress={() => this.removePhoto(i)}>
                  <Image source={Images.closeCircleBack} style={styles.imageClose} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      })
      return (
        <View>
          <ScrollView horizontal contentContainerStyle={{paddingBottom: 12}}>
            {mapFoto}
            <View style={styles.foto}>
              <TouchableOpacity onPress={() => this.setState({showModalCamera: true})}>
                <View style={styles.fotoTumb}>
                  <Image source={Images.tambahWhite} style={styles.imageTambahProduk} />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )
    }
  }

  removePhoto (i) {
    let temp = this.state.foto
    temp.splice(i, 1)
    this.setState({foto: temp})
  }

  addPhoto (photo, i) {
    let temp = this.state.foto
    temp.push(photo)
    this.setState({foto: temp, showModalCamera: false})
  }

  nextState () {
    const postData = new FormData()
    this.state.foto.map(data => {
      postData.append('images', { uri: data, type: 'image/jpg', name: 'image.jpg' })
    })
    postData.append('type', 'product')
    this.props.photoUpload(postData)
    this.setState({loading: true})
  }

  stateOne () {
    return (
      <View style={styles.stateOne}>
        <Text style={styles.title}>Masukkan Gambar Produk minimal satu foto.{'\n'}Gunakan 4 foto terbaik untuk gambar produk anda.</Text>
        <CameraModal
          visible={this.state.showModalCamera}
          onClose={() => {
            this.setState({showModalCamera: false})
          }}
          onPhotoCaptured={(path) => {
            this.addPhoto(path)
          }}
        />
        {this.thumnailFoto()}
      </View>
    )
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
        {this.stateOne()}
        <View style={{backgroundColor: Colors.background}}>
          <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
            <Text style={styles.textButtonNext}>
              Lanjutkan
            </Text>
          </TouchableOpacity>
        </View>
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
    photoUpload: (data) => dispatch(storeAction.photoUpload({data: data})),
    getKategori: () => dispatch(categoriAction.categoryList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductPhoto)
