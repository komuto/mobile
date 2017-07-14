import React from 'react'
import { View, ScrollView, Text, ListView, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as loginaction from '../actions/user'

import { Colors } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InfoPemilikTokoScreenStyle'

class InfoPemilikTokoScreenScreen extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      noIdentitas: '',
      namaIbu: '',
      namaPelimilik: '',
      email: '',
      noHP: '',
      user: this.props.dataEkspedisi,
      tempData: [],
      tempInfoToko: this.props.storesTemp,
      tempEkspedisi: this.props.dataEkspedisi
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProfile.status === 200) {
      this.setState({
        namaPelimilik: nextProps.dataProfile.user.name,
        noHP: nextProps.dataProfile.user.phone_number,
        email: nextProps.dataProfile.user.email
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

  renderStateThree () {
    const {noIdentitas, namaIbu, namaPelimilik, email, noHP} = this.state
    return (
      <View>
        <ScrollView>
          <View style={styles.infoPemilikContainer}>
            <Text style={styles.textLabel}>Nama Pemilik</Text>
            <Text style={styles.textInfoPemilik}>{namaPelimilik}</Text>
            <Text style={styles.textLabel}>Alamat Email</Text>
            <Text style={styles.textInfoPemilik}>{email}</Text>
            <Text style={styles.textLabel}>No Handphone</Text>
            <Text style={[styles.textInfoPemilik, {paddingBottom: 41}]}>{noHP}</Text>
            <View style={[styles.inputContainer, {marginBottom: 40}]}>
              <TextInput
                ref='noindentitas'
                style={[styles.inputText, {paddingBottom: 3}]}
                value={noIdentitas}
                keyboardType='default'
                returnKeyType='next'
                onSubmitEditing={() => this.refs.namaibu.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeIdentitas}
                underlineColorAndroid='transparent'
                placeholder='No Identitas (KTP/SIM/Paspor)'
              />
            </View>
            <View style={[styles.inputContainer]}>
              <TextInput
                ref='namaibu'
                style={[styles.inputText, {paddingBottom: 3}]}
                value={namaIbu}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeNamaIbu}
                underlineColorAndroid='transparent'
                placeholder='Nama Ibu Kandung'
              />
            </View>
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
    const {user, tempData, noIdentitas, namaIbu, namaPelimilik, email, noHP, storesTemp, dataEkspedisi} = this.state
    tempData.push(noIdentitas)
    tempData.push(namaIbu)
    user[2] = tempData
    NavigationActions.infoalamattoko({
      type: ActionConst.PUSH,
      noIdentitas: noIdentitas,
      namaIbu: namaIbu,
      namaPelimilik: namaPelimilik,
      email: email,
      noHP: noHP,
      dataToko: user,
      tempInfoToko: storesTemp,
      tempEkspedisi: dataEkspedisi
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoPemilikTokoScreenScreen)
