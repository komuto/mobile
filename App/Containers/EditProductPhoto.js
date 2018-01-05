import React from 'react'
import { View, Text, ActivityIndicator, ToastAndroid, BackAndroid, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CameraModal from '../Components/CameraModal'
import * as storeAction from '../actions/stores'
import * as productAction from '../actions/product'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditProductPhotoStyle'
import { Images, Colors } from '../Themes'

class EditProductPhoto extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      foto: this.props.foto,
      loading: false,
      showModalCamera: false,
      count: 0,
      id: this.props.id,
      callback: this.props.callback,
      fileName: this.props.fileName,
      upload: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataPhoto.status === 200) {
      this.setState({
        loading: false
      })
      let temp = []
      nextProps.dataPhoto.payload.images.map((data, i) => {
        temp.push({'name': data.name})
      })
      this.state.fileName.map((data, i) => {
        temp.push({'name': data})
      })
      this.props.updateData(this.state.id, temp)
      Reactotron.log(nextProps.dataPhoto.payload.images)
      nextProps.dataPhoto.status = 0
    } else if (nextProps.dataPhoto.status !== 200 && nextProps.dataPhoto.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataPhoto.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataUpdateData.status === 200) {
      nextProps.dataUpdateData.status = 0
      NavigationActions.pop({ refresh: { callback: !this.state.callback } })
      ToastAndroid.show('Produk berhasil diubah', ToastAndroid.SHORT)
    } else if (nextProps.dataUpdateData.status !== 200 && nextProps.dataUpdateData.status !== 0) {
      nextProps.dataUpdateData.status = 0
      ToastAndroid.show(nextProps.dataUpdateData.message, ToastAndroid.SHORT)
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
    let uploadTemp = this.state.upload
    let fileTemp = this.state.fileName
    temp.splice(i, 1)
    uploadTemp.splice(i, 1)
    fileTemp.splice(i, 1)
    this.setState({foto: temp, upload: uploadTemp, fileName: fileTemp})
  }

  addPhoto (photo, i) {
    let temp = this.state.foto
    let file = []
    temp.push(photo)
    file.push(...this.state.upload, photo)
    this.setState({foto: temp, upload: file, showModalCamera: false})
  }

  save () {
    const postData = new FormData()
    if (this.state.upload.length === 0) {
      let temp = []
      this.state.fileName.map((data, i) => {
        temp.push({'name': data})
      })
      this.props.updateData(this.state.id, temp)
    } else {
      this.state.upload.map(data => {
        postData.append('images', { uri: data, type: 'image/jpg', name: 'image.jpg' })
      })
      postData.append('type', 'product')
      this.props.photoUpload(postData)
      this.setState({loading: true})
    }
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
          onPress={() => {
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
        {this.stateOne()}
        <View style={{backgroundColor: Colors.background}}>
          <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.save()}>
            <Text style={styles.textButtonNext}>
              Simpan Perubahan
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
    dataPhoto: state.upload,
    dataUpdateData: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    photoUpload: (data) => dispatch(storeAction.photoUpload({data: data})),
    resetAlterProduct: () => dispatch(productAction.resetAlterProduct()),
    updateData: (id, images) => dispatch(productAction.updateProduct({id: id, images: images}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPhoto)
