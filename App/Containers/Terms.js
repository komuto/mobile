import React from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, BackAndroid, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import * as storeAction from '../actions/stores'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TermsScreenStyle'

class TermsScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      termInput: '',
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataTerms.status === 200) {
      this.setState({
        loading: false,
        termInput: ''
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
              style={styles.inputText}
              value={this.state.termInput}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangeTerms}
              underlineColorAndroid='transparent'
              placeholder='Tulis Terms and Conditions'
          />
            <Text style={styles.contoh}>
              Contoh:{'\n'}
              - Toko Hanya melakukan pengiriman di hari kamis{'\n'}
              - Pesanan diatas jam 10 pagi akan diproses besok
            </Text>
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
    dataTerms: state.updateStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerm: (data) => dispatch(storeAction.updateTerm({term_condition: data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsScreenScreen)
