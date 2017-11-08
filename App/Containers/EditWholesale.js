import React from 'react'
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import Switch from 'react-native-switch-pro'
import { Actions as NavigationActions } from 'react-native-router-flux'
import * as productAction from '../actions/product'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditWholesaleStyle'

class EditWholesale extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      imageProduct: this.props.dataDetailProduct.storeProductDetail.images[0].file,
      namaProduk: this.props.dataDetailProduct.storeProductDetail.product.name,
      wholesale: this.props.dataDetailProduct.storeProductDetail.product.is_wholesaler,
      form: [],
      lengthDefaultForm: this.props.dataDetailProduct.storeProductDetail.wholesaler.length,
      data: [...this.props.dataDetailProduct.storeProductDetail.wholesaler],
      dataUpload: [...this.props.dataDetailProduct.storeProductDetail.wholesaler],
      callback: this.props.callback
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.dataUpdateData.status === 200) {
      nextProps.dataUpdateData.status = 0
      NavigationActions.pop({ refresh: { callback: !this.state.callback } })
      ToastAndroid.show('Produk berhasil diubah', ToastAndroid.LONG)
    } else if (nextProps.dataUpdateData.status !== 200 && nextProps.dataUpdateData.status !== 0) {
      nextProps.dataUpdateData.status = 0
      ToastAndroid.show(nextProps.dataUpdateData.message, ToastAndroid.LONG)
    }
  }

  defaultForm () {
    const formData = [...this.props.dataDetailProduct.storeProductDetail.wholesaler]
    formData.map((data, i) => {
      this.buildForm(data, i)
    })
  }

  buildForm (data, i) {
    const { form, dataUpload } = this.state
    let tempUploadData = dataUpload
    tempUploadData.push({
      'id': data.id,
      'min': data.min,
      'max': data.max,
      'price': data.price,
      'status': 2
    })
    let temp = form
    const temp2 = (
      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.wholesale}>
            <Text style={styles.textLabel}>
              Jumlah Produk
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={data.min.toString()}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChange={(event) => this.changeStart(event.nativeEvent.text, i)}
                underlineColorAndroid='transparent'
              />
              <Text style={[styles.textLabel, { marginLeft: 5, marginRight: 5 }]}>
                s/d
              </Text>
              <TextInput
                style={styles.inputText}
                value={data.max.toString()}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChange={(event) => this.changeEnd(event.nativeEvent.text, i)}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <View style={[styles.wholesale, { marginLeft: 30 }]}>
            <Text style={styles.textLabel}>
              Harga Produk
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={data.price.toString()}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect
                onChangeText={(event) => this.changePrice(event.nativeEvent.text, i)}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.textDelete}>
            Hapus
          </Text>
        </TouchableOpacity>
      </View>
    )
    temp.push(temp2)
    this.setState({
      form: temp,
      dataUpload: [...tempUploadData,
        ...{
          'id': '',
          'min': 0,
          'max': 0,
          'price': 0,
          'status': false
        }
      ]
    })
  }

  renderProduct () {
    return (
      <View style={styles.header}>
        <Image source={{ uri: this.state.imageProduct }} style={styles.imageProduct} />
        <Text style={styles.textProduct}>
          {this.state.namaProduk}
        </Text>
      </View>
    )
  }

  renderActivateWholesale () {
    return (
      <View style={styles.saleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            Aktifkan Harga Grosir
          </Text>
          <Text style={styles.textDescription}>
            Aktifkan fitur harga grosir jika Anda
            menjual produk dalam jumlah banyak.
          </Text>
        </View>
        <View style={styles.switch}>
          <Switch
            defaultValue={this.state.wholesale}
            width={35}
            height={20}
            onSyncPress={(value) =>
              this.set(value)
            }
          />
        </View>
      </View>
    )
  }

  set (value) {
    this.setState({
      wholesale: value,
      data: [...this.props.dataDetailProduct.storeProductDetail.wholesaler]
    })
    console.log(this.state.data)
    // this.defaultForm()
  }

  changeStart (text, id) {
    const { data, dataUpload } = this.state
    console.log(dataUpload)
    let temp = data
    let tempDataUpload = dataUpload
    const defaultData = [...this.props.dataDetailProduct.storeProductDetail.wholesaler]
    try {
      if (defaultData[id].id === data[id].id) {
        temp[id].status = 2
        tempDataUpload[id].status = 2
      }
    } catch (e) {

    }
    temp[id].min = text
    tempDataUpload[id].min = text
    this.setState({
      data: temp,
      dataUpload: tempDataUpload
    })
  }

  changeEnd (text, id) {
    const { data, dataUpload } = this.state
    let temp = data
    let tempDataUpload = dataUpload
    const defaultData = [...this.props.dataDetailProduct.storeProductDetail.wholesaler]
    try {
      if (defaultData[id].id === data[id].id) {
        temp[id].status = 2
        tempDataUpload[id].status = 2
      }
    } catch (e) {

    }
    temp[id].max = text
    tempDataUpload[id].max = text
    this.setState({
      data: temp,
      dataUpload: tempDataUpload
    })
  }

  changePrice (text, id) {
    const { data, dataUpload } = this.state
    let temp = data
    let tempDataUpload = dataUpload
    const defaultData = [...this.props.dataDetailProduct.storeProductDetail.wholesaler]
    try {
      if (defaultData[id].id === data[id].id) {
        temp[id].status = 2
        tempDataUpload[id].status = 2
      }
    } catch (e) {

    }
    temp[id].price = text
    tempDataUpload[id].price = text
    this.setState({
      data: temp,
      dataUpload: tempDataUpload
    })
  }

  renderWholesale () {
    const { data, wholesale } = this.state
    if (wholesale) {
      const tempData = data
      const mapFoto = data.map((data, i) => {
        return (
          <View key={i}>
            <View style={styles.formContainer}>
              <View style={styles.rowContainer}>
                <View style={styles.wholesale}>
                  <Text style={styles.textLabel}>
                    Jumlah Produk
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputText}
                      value={tempData[i].min.toString()}
                      keyboardType='numeric'
                      returnKeyType='done'
                      autoCapitalize='none'
                      maxLength={3}
                      autoCorrect
                      onChange={(event) => this.changeStart(event.nativeEvent.text, i)}
                      underlineColorAndroid='transparent'
                    />
                    <Text style={[styles.textLabel, { marginLeft: 5, marginRight: 5 }]}>
                      s/d
                    </Text>
                    <TextInput
                      style={styles.inputText}
                      value={tempData[i].max.toString()}
                      keyboardType='numeric'
                      returnKeyType='done'
                      autoCapitalize='none'
                      maxLength={3}
                      autoCorrect
                      onChange={(event) => this.changeEnd(event.nativeEvent.text, i)}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                </View>
                <View style={[styles.wholesale, { marginLeft: 30 }]}>
                  <Text style={styles.textLabel}>
                    Harga Produk
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputText}
                      value={tempData[i].price.toString()}
                      keyboardType='numeric'
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect
                      onChange={(event) => this.changePrice(event.nativeEvent.text, i)}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => this.removeItem(i)}>
                <Text style={styles.textDelete}>
                  Hapus
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
          </View>
        )
      })
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitleWholesale}>
              Daftar Harga Grosir
            </Text>
          </View>
          {mapFoto}
          <TouchableOpacity style={styles.addButton} onPress={() => this.addSale()}>
            <Text style={styles.textAddSale}>
              + Tambah Daftar Harga Grosir
            </Text>
          </TouchableOpacity>
          <View style={styles.separator} />
        </View>
      )
    }
  }

  removeItem (i) {
    const { data } = this.state
    let tempData = data
    tempData.splice(i, 1)
    this.setState({
      data: tempData
    })
  }

  addSale () {
    const { data, dataUpload } = this.state
    let tempData = [...data]
    let tempDataUpload = dataUpload
    tempData.push({
      'id': -1,
      'min': 0,
      'max': 0,
      'price': 0,
      'status': 1
    })
    tempDataUpload.push({
      'id': -1,
      'min': 0,
      'max': 0,
      'price': 0,
      'status': 1
    })
    this.setState({
      data: tempData,
      dataUpload: tempDataUpload
    })
  }

  save () {
    const dataDefault = [...this.props.dataDetailProduct.storeProductDetail.wholesaler]
    const { data } = this.state
    let tempData = [...data]
    var j, i
    let coba = new Promise((resolve) => {
      for (i = 0; i < dataDefault.length; i++) {
        if (data.length === 0) {
          tempData.push({
            'id': dataDefault[i].id,
            'min': dataDefault[i].min,
            'max': dataDefault[i].max,
            'price': dataDefault[i].price,
            'status': 3
          })
          this.setState({
            dataUpload: tempData
          })
        } else {
          for (j = 0; j < data.length; j++) {
            if (dataDefault[i].id === data[j].id) {
              tempData[j].status = 2
              break
            } else if (dataDefault[i].id !== data[j].id && (j === (data.length - 1))) {
              tempData.push({
                'id': dataDefault[i].id,
                'min': dataDefault[i].min,
                'max': dataDefault[i].max,
                'price': dataDefault[i].price,
                'status': 3
              })
            }
            this.setState({
              dataUpload: tempData
            })
          }
        }
      }
      resolve(tempData)
    })
    coba.then((result) =>
    this.props.updateData({id: this.state.id, is_wholesaler: this.state.wholesale, wholesales: result}))
  }

  renderSaveButton () {
    return (
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.save} onPress={() => this.save()}>
          <Text style={styles.textButtonNext}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderProduct()}
        <ScrollView>
          {this.renderActivateWholesale()}
          {this.renderWholesale()}
          {this.renderSaveButton()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDetailProduct: state.storeProductDetail,
    dataUpdateData: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateData: (params) => dispatch(productAction.updateProduct(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWholesale)
