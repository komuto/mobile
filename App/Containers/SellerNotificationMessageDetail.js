import React from 'react'
import { ScrollView, ToastAndroid, Text, View, TouchableOpacity, Image, Modal, BackAndroid, ListView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import moment from 'moment'
import {isFetching, isError, isFound} from '../Services/Status'
// import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

// Styles
import styles from './Styles/BuyerDetailMessageStyle'
import { Images } from '../Themes'

class SellerNotificationMessageDetail extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      move: false,
      detail: false,
      delete: false,
      reply: false
    }
    this.state = {
      loading: false,
      messages: '',
      idMessage: this.props.idMessage,
      heightDesc: 0,
      modalPopup: false,
      data: [],
      detailMessageUser: [],
      typeMessage: 'conversation',
      callback: this.props.callback,
      iconSend: Images.sendMessageInactive
    }
  }

  componentWillReceiveProps (nextProps) {
    const {detailMessage, dataReplyMessage, dataMoveMessage, dataDeleteMessage} = nextProps

    if (!isFetching(detailMessage) && this.submitting.detail) {
      this.submitting = { ...this.submitting, detail: false }
      if (isError(detailMessage)) {
        ToastAndroid.show(detailMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(detailMessage)) {
        this.setState({
          data: detailMessage.sellerDetailMessage,
          typeMessage: detailMessage.sellerDetailMessage.type,
          detailMessageUser: nextProps.detailMessage.sellerDetailMessage.detail_messages
        })
      }
    }

    if (!isFetching(dataReplyMessage) && this.submitting.reply) {
      this.submitting = { ...this.submitting, reply: false }
      if (isError(dataReplyMessage)) {
        ToastAndroid.show(dataReplyMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataReplyMessage)) {
        if (!this.submitting.conversation) {
          this.submitting = {
            ...this.submitting,
            detail: true
          }
          this.props.getDetailMessage(this.state.idMessage)
        }
      }
    }

    if (!isFetching(dataMoveMessage) && this.submitting.move && this.state.typeMessage === 'conversation') {
      this.submitting = { ...this.submitting, move: false }
      if (isError(dataMoveMessage)) {
        ToastAndroid.show(dataMoveMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataMoveMessage)) {
        NavigationActions.pop({
          refresh: {
            callbackArchive: !this.state.callback,
            pesanNotifArchive: dataMoveMessage.message
          }
        })
      }
    }

    if (!isFetching(dataMoveMessage) && this.submitting.move && this.state.typeMessage === 'archive') {
      this.submitting = { ...this.submitting, move: false }
      if (isError(dataMoveMessage)) {
        ToastAndroid.show(dataMoveMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataMoveMessage)) {
        NavigationActions.pop({
          refresh: {
            callbackConversation: !this.state.callback,
            pesanNotifConversation: dataMoveMessage.message
          }
        })
      }
    }

    if (!isFetching(dataDeleteMessage) && this.submitting.delete && this.state.typeMessage === 'conversation') {
      this.submitting = { ...this.submitting, delete: false }
      if (isError(dataDeleteMessage)) {
        ToastAndroid.show(dataDeleteMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataDeleteMessage)) {
        NavigationActions.pop({
          refresh: {
            callbackArchive: !this.state.callback,
            pesanNotifArchive: dataDeleteMessage.message
          }
        })
      }
    }

    if (!isFetching(dataDeleteMessage) && this.submitting.delete && this.state.typeMessage === 'archive') {
      this.submitting = { ...this.submitting, delete: false }
      if (isError(dataDeleteMessage)) {
        ToastAndroid.show(dataDeleteMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataDeleteMessage)) {
        NavigationActions.pop({
          refresh: {
            callbackConversation: !this.state.callback,
            pesanNotifConversation: dataDeleteMessage.message
          }
        })
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.conversation) {
      this.submitting = {
        ...this.submitting,
        detail: true
      }
      this.props.getDetailMessage(this.state.idMessage)
    }
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

  renderHeader () {
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => this.backButton()}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Detail
        </Text>
        <TouchableOpacity onPress={() => this.setState({modalPopup: true})}>
          <Image source={Images.threeDot} style={styles.imageDot} />
        </TouchableOpacity>
      </View>
    )
  }

  modalPopupMenu () {
    if (this.state.typeMessage === 'conversation') {
      this.text = 'Arsip'
    } else {
      this.text = 'Percakapan'
    }
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalPopup}
        onRequestClose={() => this.setState({ modalPopup: false })}
        >
        <TouchableOpacity onPress={() => this.setState({modalPopup: false})}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={() => this.handleMoveToArchive()}>
              <Text style={styles.textMenu}>Pindahkan ke {this.text}</Text>
            </TouchableOpacity>
            <View style={styles.border} />
            <TouchableOpacity onPress={() => this.handleDeleteMessage()}>
              <Text style={styles.textMenu}>Hapus Selamanya</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  checkMessage (rowData) {
    if (rowData.store) {
      return (
        <Text style={styles.title}>{rowData.user.name}</Text>
      )
    } else {
      return (
        <Text style={styles.title}>{rowData.user.name}</Text>
      )
    }
  }

  renderRowMessage (rowData) {
    var timeStampToDate = moment.unix(rowData.created_at).format('DD MMM YYYY - h:mm').toString()
    return (
      <View onPress={() => this.handelDetailMessage()}activeOpacity={0.5} style={styles.containerMessage}>
        <View style={styles.maskedPhoto}>
          <Image source={{uri: rowData.user.photo}} style={styles.photo} />
        </View>
        <View style={{marginLeft: 20, flex: 1}}>
          <View style={styles.flexRow}>
            {this.checkMessage(rowData)}
            <Text style={styles.date}>{timeStampToDate}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.content}</Text>
        </View>
      </View>
    )
  }

  handleChangeMessage = (text) => {
    this.setState({ messages: text })
  }

  handleMoveToArchive () {
    this.setState({ modalPopup: false })
    if (!this.submitting.move) {
      this.submitting = {
        ...this.submitting,
        move: true
      }
      if (this.state.typeMessage === 'conversation') {
        this.props.movingMessage(this.state.idMessage, 'archive')
      } else {
        this.props.movingMessage(this.state.idMessage, 'conversation')
      }
    }
  }

  handleDeleteMessage () {
    this.setState({ modalPopup: false })
    if (!this.submitting.delete) {
      this.submitting = {
        ...this.submitting,
        delete: true
      }
      this.props.deleteMessage(this.state.idMessage)
    }
  }

  sendReply () {
    if (this.state.messages.length === 0) {
    } else {
      this.setState({messages: ''})
      if (!this.submitting.reply) {
        this.submitting = {
          ...this.submitting,
          reply: true
        }
        this.props.replyMessage(this.state.idMessage, this.state.messages)
      }
    }
  }

  render () {
    let image
    if (this.state.messages === '') {
      image = Images.sendMessageInactive
    } else {
      image = Images.sendMessage
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={styles.containerTitle}>
          <Text style={styles.titleMessage}>
            {this.state.data.subject}
          </Text>
        </View>
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.detailMessageUser)}
            renderRow={this.renderRowMessage.bind(this)}
            enableEmptySections
          />
        </ScrollView>
        <View style={styles.floatImageContainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.messages}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            blurOnSubmit
            onChange={(event) => {
              this.setState({
                messages: event.nativeEvent.text
              })
            }}
            underlineColorAndroid='transparent'
            placeholder='Tulis pesan Anda disini'
          />
          <TouchableOpacity style={styles.sendContainer} onPress={() => this.sendReply()}>
            <Image source={image} style={styles.sendMessage} />
          </TouchableOpacity>
        </View>
        {this.modalPopupMenu()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detailMessage: state.sellerDetailMessage,
    dataReplyMessage: state.replyMessage,
    dataDeleteMessage: state.deleteMessage,
    dataMoveMessage: state.updateMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    replyMessage: (id, content) => dispatch(messageAction.sellerReplyMessage({id: id, content: content})),
    getDetailMessage: (id) => dispatch(messageAction.getSellerDetailMessage({id})),
    deleteMessage: (id) => dispatch(messageAction.sellerDeleteMessage({id})),
    movingMessage: (id, type) => dispatch(messageAction.updateSellerMessage({id: id, messageType: type}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerNotificationMessageDetail)
