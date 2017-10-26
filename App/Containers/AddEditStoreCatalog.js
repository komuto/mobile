import React from 'react'
import { Text, View, TextInput, TouchableOpacity, BackAndroid, ActivityIndicator, ToastAndroid, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as katalogAction from '../actions/catalog'

// Styles
import styles from './Styles/TambahEditKatalogTokoScreenStyle'

class AddEditStoreCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      namaKatalog: this.props.namaKatalog || '',
      textButton: this.props.titleButton || 'Buat Katalog Baru',
      edit: false,
      idkatalog: this.props.idKatalogs || ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCatalog.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.storecatalog({
        type: ActionConst.PUSH,
        notif: true,
        pesanNotif: 'menambahkan katalog baru'
      })
      Keyboard.dismiss()
      this.props.getCatalog()
      nextProps.dataCatalog.status = 0
    } else if (nextProps.dataCatalog.status !== 200 && nextProps.dataCatalog.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataCatalog.message, ToastAndroid.LONG)
      nextProps.dataCatalog.status = 0
    }
    if (nextProps.updateCatalogs.status === 200) {
      Keyboard.dismiss()
      NavigationActions.storecatalog({
        type: ActionConst.PUSH,
        notif: true,
        pesanNotif: 'mengedit katalog'
      })
      this.props.getCatalog()
      nextProps.updateCatalogs.status = 0
    } else if (nextProps.updateCatalogs.status !== 200 && nextProps.updateCatalogs.status !== 0) {
      ToastAndroid.show(nextProps.updateCatalogs.message, ToastAndroid.LONG)
      nextProps.updateCatalogs.status = 0
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

  handleNamaKatalog = (text) => {
    this.setState({ namaKatalog: text })
  }

  tambahKatalog () {
    if (this.state.namaKatalog === '') {
      ToastAndroid.show('Nama Katalog Harus diisi', ToastAndroid.SHORT)
    } else {
      if (this.props.edit) {
        this.props.updateCatalog(this.state.idkatalog, this.state.namaKatalog)
      } else {
        this.setState({
          loading: true
        })
        this.props.createCatalog(this.state.namaKatalog)
      }
    }
  }

  renderFormInputCatalog () {
    return (
      <View>
        <View style={styles.infoContainer}>
          <View style={{opacity: 0.50}}>
            <Text style={styles.textHeader}>Nama Katalog</Text>
          </View>
          <TextInput
            ref='name'
            style={styles.inputText}
            value={this.state.namaKatalog}
            keyboardType='default'
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleNamaKatalog}
            underlineColorAndroid='transparent'
          />
        </View>
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.tambahKatalog()}>
          <Text style={styles.textButtonNext}>
            {this.state.textButton}
          </Text>
        </TouchableOpacity>
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
        {this.renderFormInputCatalog()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataCatalog: state.createCatalog,
    updateCatalogs: state.updateCatalog,
    detailCatalog: state.getCatalog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCatalog: (data) => dispatch(katalogAction.createCatalog({name: data})),
    getCatalog: () => dispatch(katalogAction.getListCatalog()),
    updateCatalog: (id, name) => dispatch(katalogAction.updateCatalog({id, name: name}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditStoreCatalog)
