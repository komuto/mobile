import React from 'react'
import {
  View,
  ScrollView,
  ToastAndroid,
  Text,
  TextInput,
  TouchableOpacity,
  BackAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
  DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/TermsScreenStyle'

class TermsScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.submitting = {
      term: false
    }
    this.keyboardHeight = new Animated.Value(0)
    this.state = {
      termInput: '',
      height: 0,
      loading: false,
      profiles: props.profile || null,
      term: props.profile.user.store || null,
      visibleHeight: Dimensions.get('window').height - 150,
      margin: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataTerms.status === 200 && this.submitting.term) {
      this.submitting = {...this.submitting, term: false}
      this.setState({
        loading: false,
        termInput: '',
        height: 0,
        term: nextProps.dataTerms.updateStore
      })
      this.props.profile.user.store = nextProps.dataTerms.updateStore
    } if (nextProps.profile.status === 200) {
      this.setState({
        loading: false,
        profiles: nextProps.profile
      })
    } if (nextProps.dataTerms.status > 200) {
      this.setState({loading: true})
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillMount () {
    this.keyboardDidShowListener = DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  keyboardDidShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize - 140
    })
  }

  keyboardDidHide (e) {
    this.setState({
      visibleHeight: Dimensions.get('window').height - 150
    })
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  handleChangeTerms = (text) => {
    this.setState({ termInput: text })
  }

  handleUpdateTerms () {
    if (this.state.termInput !== '') {
      this.setState({loading: true})
      this.submitting.term = true
      this.props.updateTerm({
        term_condition: this.state.termInput
      })
    } else {
      ToastAndroid.show('Term and Conditions harus diisi', ToastAndroid.SHORT)
    }
  }

  onLayout = (event) => {
    const layout = event.nativeEvent.layout
    this.setState({margin: layout.y})
  }

  checkTermStore (data) {
    if (!data.term_condition) {
      return (
        <Text onLayout={this.onLayout} style={styles.contoh}>
          Contoh:{'\n'}
          - Toko Hanya melakukan pengiriman di hari kamis
          - Pesanan diatas jam 10 pagi akan diproses besok
        </Text>
      )
    } else {
      return (
        <Text onLayout={this.onLayout} style={styles.contoh}>
          Terms and Conditions Toko {data.name} :{'\n'}
          <Text style={{padding: 5}} />
          {data.term_condition}
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
        <KeyboardAvoidingView
        >
          <ScrollView style={{marginBottom: this.state.margin}}>
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
              {this.checkTermStore(this.state.term)}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={[styles.buttonBg, {top: this.state.visibleHeight}]}>
          <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handleUpdateTerms()}>
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
    dataTerms: state.updateStore,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerm: (param) => dispatch(storeAction.updateTerm(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsScreenScreen)
