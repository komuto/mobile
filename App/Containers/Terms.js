import React from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, BackAndroid, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import * as storeAction from '../actions/stores'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TermsScreenStyle'

class TermsScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      termInput: '',
      height: 0,
      loading: false,
      profiles: props.profile || null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataTerms.status === 200) {
      this.setState({
        loading: false,
        termInput: '',
        height: 0
      })
    } if (nextProps.profile.status === 200) {
      this.setState({
        loading: false,
        profiles: nextProps.profile.user
      })
    } if (nextProps.dataTerms.status > 200) {
      this.setState({loading: true})
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

  handleChangeTerms = (text) => {
    this.setState({ termInput: text })
  }

  handleUpdateTerms () {
    this.setState({loading: true})
    this.props.updateTerm(this.state.termInput)
  }

  checkTermStore (data) {
    Reactotron.log(data.user.store)
    if (!data.user.store.term_condition) {
      return (
        <Text style={styles.contoh}>
          Contoh:{'\n'}
          - Toko Hanya melakukan pengiriman di hari kamis
          - Pesanan diatas jam 10 pagi akan diproses besok
        </Text>
      )
    } else {
      return (
        <Text style={styles.contoh}>
          Terms and Conditions Toko {data.user.store.name} :{'\n'}
          <Text style={{padding: 5}} />
          {data.user.store.term_condition}
        </Text>
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
        <ScrollView>
          <Text style={styles.headerTitle}>
            Terms and Conditions akan ditampilkan pada profil toko dan detal barang Anda.
          </Text>
          <View style={styles.body}>
            <TextInput
              style={[styles.inputText, {height: Math.max(40, this.state.height)}]}
              value={this.state.termInput}
              multiline
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect
              onChange={(event) => {
                this.setState({
                  termInput: event.nativeEvent.text,
                  height: event.nativeEvent.contentSize.height
                })
              }}
              underlineColorAndroid='transparent'
              placeholder='Tulis Terms and Conditions'
          />
            {this.checkTermStore(this.state.profiles)}
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handleUpdateTerms()}>
              <Text style={styles.textButtonNext}>
                Simpan Perubahan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataTerms: state.updateStore,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerm: (data) => dispatch(storeAction.updateTerm({term_condition: data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsScreenScreen)
