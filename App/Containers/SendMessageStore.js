import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as storeAction from '../actions/stores'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

import { Images } from '../Themes'
// Styles
import styles from './Styles/KirimPesanTokoStyle'

class SendMessageStore extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      foto: this.props.foto,
      namaToko: this.props.namaToko,
      alamat: this.props.alamat,
      judul: this.props.title,
      pertanyaan: '',
      height: 50,
      heightJudul: 50,
      loading: false,
      notification: false,
      titles: this.props.title || 'Kirim Pesan',
      typeMessage: this.props.typeMessage || 'sendMessageStore'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataPesan.status === 200) {
      this.setState({
        loading: false,
        notification: true,
        judul: '',
        pertanyaan: ''
      })
      ToastAndroid.show('Pesan Berhasil Dikirim', ToastAndroid.LONG)
      Actions.pop()
      this.props.resetSendMessage()
    } else if (nextProps.dataPesan.status !== 200 && nextProps.dataPesan.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataPesan.message, ToastAndroid.LONG)
      this.props.resetSendMessage()
    }
    if (nextProps.dataMessageTransaction.status === 200) {
      this.setState({
        loading: false,
        notification: true,
        judul: '',
        pertanyaan: ''
      })
      nextProps.dataMessageTransaction.status = 0
    } else if (nextProps.dataMessageTransaction.status !== 200 && nextProps.dataMessageTransaction.status !== 0) {
      this.setState({
        loading: false
      })
      nextProps.dataMessageTransaction.status = 0
      ToastAndroid.show(nextProps.dataPedataMessageTransactionsan.message, ToastAndroid.LONG)
    }
  }

  renderProduct () {
    const { foto, namaToko, alamat } = this.state
    let renderAddress
    if (alamat === '' || alamat === null || alamat === undefined) {
      renderAddress = null
    } else {
      renderAddress = (
        <Text style={styles.textKelola}>
          {alamat}
        </Text>
      )
    }
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {namaToko}
            </Text>
            {renderAddress}
          </View>
        </View>
      </View>
    )
  }

  handlePertanyaan = (text) => {
    this.setState({ pertanyaan: text })
  }

  handleJudul = (text) => {
    this.setState({ judul: text })
  }

  back () {
    Actions.pop()
  }

  kirimpesan () {
    const { id, judul, pertanyaan } = this.state
    if (judul === '') {
      ToastAndroid.show('Judul Pesan tidak boleh kosong', ToastAndroid.LONG)
    } else if (pertanyaan === '') {
      ToastAndroid.show('Pertanyaan tidak boleh kosong', ToastAndroid.LONG)
    } else if (judul !== '' && pertanyaan !== '') {
      this.setState({
        loading: true
      })
      if (this.state.typeMessage === 'sendMessageStore') {
        this.props.sendMessage(id, judul, pertanyaan)
      } if (this.state.typeMessage === 'sendMessageBuyer') {
        this.props.sendMessageBuyer(id, judul, pertanyaan)
      } if (this.state.typeMessage === 'sendMessageSeller') {
        this.props.sendMessageSeller(id, judul, pertanyaan)
      } if (this.state.typeMessage === 'sendMessageReseller') {
        this.props.sendMessageReseller(id, judul, pertanyaan)
      }
    }
  }

  renderloading () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    if (this.state.loading) {
      return (
        <View style={styles.containerText}>
          {spinner}
        </View>
      )
    }
    return (
      <Text style={styles.textButton}>
        Kirim Pesan
      </Text>
    )
  }

  renderNotification () {
    const { notification } = this.state
    if (notification) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Berhasil Mengirim Pesan</Text>
          <TouchableOpacity onPress={() => this.setState({notification: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textTitle}>{this.state.titles}</Text>
          </View>
          <TouchableOpacity onPress={() => this.back()}>
            <Image
              source={Images.closewhite}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>
        {this.renderNotification()}
        {this.renderProduct()}
        <View style={styles.questionContainer}>
          <Text style={styles.textKelola}>
            Judul Pesan
          </Text>
          <TextInput
            style={[styles.textInput, { height: this.state.heightJudul }]}
            multiline
            value={this.state.judul}
            onContentSizeChange={(event) => {
              this.setState({heightJudul: event.nativeEvent.contentSize.height})
            }}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleJudul}
            underlineColorAndroid='transparent'
            placeholder='Judul Pesan'
          />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.textKelola}>
            Pertanyaan Anda
          </Text>
          <TextInput
            style={[styles.textInput, { height: this.state.height }]}
            multiline
            value={this.state.pertanyaan}
            onContentSizeChange={(event) => {
              this.setState({height: event.nativeEvent.contentSize.height})
            }}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handlePertanyaan}
            underlineColorAndroid='transparent'
            placeholder='Tulis Pertanyaan Anda'
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.kirimpesan()}>
          {this.renderloading()}
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataPesan: state.sendMessageStore,
    dataMessageTransaction: state.transactionMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (id, subject, content) => dispatch(storeAction.sendMessageStore({id: id, subject: subject, content: content})),
    resetSendMessage: () => dispatch(storeAction.sendMessageStoreReset()),
    sendMessageBuyer: (id, subject, content) => dispatch(messageAction.messageBuyer({id: id, subject: subject, content: content})),
    sendMessageSeller: (id, subject, content) => dispatch(messageAction.messageSeller({id: id, subject: subject, content: content})),
    sendMessageReseller: (id, subject, content) => dispatch(messageAction.messageReseller({id: id, subject: subject, content: content}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageStore)
