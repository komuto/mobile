import React from 'react'
import { View, ScrollView, Text, ListView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as loginaction from '../actions/user'

import { Colors } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourAActivityIndicatorctions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InfoPemilikTokoScreenStyle'

class InfoStoreOwner extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      noIdentitas: '111',
      namaIbu: 'marta',
      namaPelimilik: '',
      email: '',
      noHp: '',
      dataStore: this.props.dataStore,
      tempData: [],
      textNoIdentitas: 'NO Identitas',
      textNamaIbu: 'Nama Ibu',
      textNoIdentitasColor: Colors.snow,
      textNamaIbuColor: Colors.snow,
      opacity: 1,
      loading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProfile.status === 200) {
      this.setState({
        namaPelimilik: nextProps.dataProfile.user.user.name,
        email: nextProps.dataProfile.user.user.email,
        noHp: nextProps.dataProfile.user.user.phone_number,
        loading: false
      })
    }
  }

  componentDidMount () {
    this.props.getProfile()
  }

  handleChangeIdentitas = (text) => {
    this.setState({ noIdentitas: text })
  }

  handleChangeNamaIbu = (text) => {
    this.setState({ namaIbu: text })
  }

  onError = (field) => {
    console.tron.log('field', field)
    switch (field) {
      case 'noidentitas':
        this.setState({
          textNoIdentitas: 'No Identitas harus diisi',
          textNoIdentitasColor: Colors.red
        })
        break
      case 'namaibu':
        this.setState({
          textNamaIbu: 'Nama Ibu harus diisi',
          textNamaIbuColor: Colors.red
        })
        break
      case 'empty':
        this.setState({
          textNoIdentitas: 'No Identitas harus diisi',
          textNoIdentitasColor: Colors.red,
          textNamaIbuColor: Colors.red,
          textNamaIbu: 'Nama Ibu harus diisi'
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'noidentitas':
        this.setState({
          textNoIdentitas: 'No Identitas',
          textNoIdentitasColor: Colors.snow
        })
        break
      case 'namaibu':
        this.setState({
          textNamaIbu: 'Nama Ibu',
          textNamaIbuColor: Colors.snow
        })
        break
      default:
        this.setState({
          textNoIdentitas: 'No Identitas',
          textNamaIbu: 'Nama Ibu',
          textNoIdentitasColor: Colors.snow,
          textNamaIbuColor: Colors.snow
        })
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'noidentitas':
        this.setState({
          textNoIdentitasColor: Colors.snow
        })
        break
      case 'namaibu':
        this.setState({
          textNamaIbuColor: Colors.snow
        })
        break
      default:
        this.setState({
          textNoIdentitasColor: Colors.snow,
          textNamaIbuColor: Colors.snow
        })
        break
    }
  }

  renderStateThree () {
    const {noIdentitas, namaIbu, namaPelimilik, email, noHp, textNoIdentitas, textNamaIbu, textNoIdentitasColor, textNamaIbuColor} = this.state
    return (
      <View>
        <ScrollView>
          <View style={styles.infoPemilikContainer}>
            <Text style={styles.textLabel}>Nama Pemilik</Text>
            <Text style={styles.textInfoPemilik}>{namaPelimilik}</Text>
            <Text style={styles.textLabel}>Alamat Email</Text>
            <Text style={styles.textInfoPemilik}>{email}</Text>
            <Text style={styles.textLabel}>No Handphone</Text>
            <Text style={[styles.textInfoPemilik]}>{noHp}</Text>
            <View style={[styles.inputContainer, {marginTop: 15}]}>
              <TextInput
                ref='noindentitas'
                style={[styles.inputText]}
                value={noIdentitas}
                keyboardType='default'
                returnKeyType='next'
                onFocus={() => this.onFocus('noidentitas')}
                onBlur={() => this.onBlur('noidentitas')}
                onSubmitEditing={() => this.refs.namaibu.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeIdentitas}
                underlineColorAndroid='transparent'
                placeholder='No Identitas (KTP/SIM/Paspor)'
              />
            </View>
            <Text style={[styles.errorLabel, {color: textNoIdentitasColor}]}>{textNoIdentitas}</Text>
            <View style={[styles.inputContainer, {marginTop: 20}]}>
              <TextInput
                ref='namaibu'
                style={[styles.inputText]}
                value={namaIbu}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect
                onFocus={() => this.onFocus('namaibu')}
                onBlur={() => this.onBlur('namaibu')}
                onChangeText={this.handleChangeNamaIbu}
                underlineColorAndroid='transparent'
                placeholder='Nama Ibu Kandung'
              />
            </View>
            <Text style={[styles.errorLabel, {color: textNamaIbuColor}]}>{textNamaIbu}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: Colors.background}}>
            <TouchableOpacity style={styles.buttonnext} onPress={() => this.nextState()}>
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
    const {dataStore, tempData, noIdentitas, namaIbu, namaPelimilik, email, noHp} = this.state
    if (noIdentitas === '' && namaIbu === '') {
      this.onError('empty')
    } else if (namaIbu === '') {
      this.onError('namaibu')
    } else if (noIdentitas === '') {
      this.onError('noidentitas')
    } else {
      tempData.push(noIdentitas)
      tempData.push(namaIbu)
      dataStore[2] = tempData
      NavigationActions.infoaddressstore({
        type: ActionConst.PUSH,
        noIdentitas: noIdentitas,
        namaIbu: namaIbu,
        namaPelimilik: namaPelimilik,
        email: email,
        noHp: noHp,
        dataStore: dataStore
      })
      console.log(dataStore)
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
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>2</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>3</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>4</Text>
          </View>
        </View>
        {this.renderStateThree()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataProfile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (login) => dispatch(loginaction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStoreOwner)
