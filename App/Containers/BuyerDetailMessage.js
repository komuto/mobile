import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  BackAndroid,
  ListView,
  ToastAndroid,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

// Styles
import styles from './Styles/BuyerDetailMessageStyle'
import { Images } from '../Themes'

class BuyerDetailMessage extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      messages: '',
      idMessage: this.props.idMessage,
      heightDesc: 0,
      modalPopup: false,
      data: [],
      detailMessageUser: [],
      typeMessage: 'conversation'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.idMessage !== this.props.idMessage) {
      this.props.getDetailMessage(this.props.idMessage)
      this.setState({
        idMessage: this.props.idMessage
      })
    }
    if (nextProps.detailMessage.status === 200) {
      this.setState({
        data: nextProps.detailMessage.buyerDetailMessage,
        typeMessage: nextProps.detailMessage.buyerDetailMessage.type,
        detailMessageUser: nextProps.detailMessage.buyerDetailMessage.detail_messages
      })
      nextProps.detailMessage.status = 0
    } else if (nextProps.detailMessage.status !== 200 && nextProps.detailMessage.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.detailMessage.message, ToastAndroid.LONG)
      nextProps.detailMessage.status = 0
    }
    if (nextProps.dataReplyMessage.status === 200) {
      nextProps.dataReplyMessage.status = 0
      this.props.getDetailMessage(this.state.idMessage)
    } else if (nextProps.dataReplyMessage.status !== 200 && nextProps.dataReplyMessage.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataReplyMessage.message, ToastAndroid.LONG)
      nextProps.dataReplyMessage.status = 0
    }
    if (nextProps.dataMoveMessage.status === 200 && this.state.typeMessage === 'conversation') {
      nextProps.dataMoveMessage.status = 0
      this.props.getListMessages()
      this.props.getListArchiveMessages()
      NavigationActions.buyermessage({
        type: ActionConst.POP_AND_REPLACE,
        notif: true,
        messageNotif: 'Berhasil memindahkan ke Arsip',
        page: 1
      })
    }
    if (nextProps.dataMoveMessage.status === 200 && this.state.typeMessage === 'archive') {
      nextProps.dataMoveMessage.status = 0
      this.props.getListMessages()
      this.props.getListArchiveMessages()
      NavigationActions.buyermessage({
        type: ActionConst.POP_AND_REPLACE,
        notif: true,
        messageNotif: 'Berhasil memindahkan ke Percakapan',
        page: 0
      })
    }
    if (nextProps.dataMoveMessage.status !== 200 && nextProps.dataMoveMessage.status !== 0) {
      nextProps.dataMoveMessage.status = 0
      ToastAndroid.show(nextProps.dataMoveMessage.message, ToastAndroid.LONG)
    }
    if (nextProps.dataDeleteMessage.status === 200) {
      nextProps.dataDeleteMessage.status = 0
      this.props.getListMessages()
      this.props.getListArchiveMessages()
      NavigationActions.buyermessage({
        type: ActionConst.POP_AND_REPLACE,
        notif: true,
        messageNotif: 'Berhasil menghapus Percakapan',
        page: 0
      })
    } else if (nextProps.dataDeleteMessage.status !== 200 && nextProps.dataDeleteMessage.status !== 0) {
      nextProps.dataDeleteMessage.status = 0
      ToastAndroid.show(nextProps.dataDeleteMessage.message, ToastAndroid.LONG)
    }
  }

  componentDidMount () {
    this.props.getDetailMessage(this.props.idMessage)
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
    var timeStampToDate = moment.unix(rowData.created_at).format('DD MMM YYYY - HH:MM').toString()
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
    if (this.state.typeMessage === 'conversation') {
      this.props.movingMessage(this.state.idMessage, 'archive')
    } else {
      this.props.movingMessage(this.state.idMessage, 'conversation')
    }
  }

  handleDeleteMessage () {
    this.setState({ modalPopup: false })
    this.props.deleteMessage(this.state.idMessage)
  }

  sendReply () {
    this.setState({messages: ''})
    this.props.replyMessage(this.state.idMessage, this.state.messages)
  }

  render () {
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
        <TextInput
          style={[styles.inputText]}
          value={this.state.messages}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          onChange={(event) => {
            this.setState({
              messages: event.nativeEvent.text
            })
          }}
          onSubmitEditing={() => this.sendReply()}
          underlineColorAndroid='transparent'
          placeholder='Tulis pesan Anda disini'
        />
        {this.modalPopupMenu()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detailMessage: state.buyerDetailMessage,
    dataReplyMessage: state.replyMessage,
    dataDeleteMessage: state.deleteMessage,
    dataMoveMessage: state.updateMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    replyMessage: (id, content) => dispatch(messageAction.buyerReplyMessage({id: id, content: content})),
    getDetailMessage: (id) => dispatch(messageAction.getBuyerDetailMessage({id})),
    deleteMessage: (id) => dispatch(messageAction.buyerDeleteMessage({id})),
    movingMessage: (id, type) => dispatch(messageAction.updateBuyerMessage({id: id, messageType: type})),
    getListMessages: () => dispatch(messageAction.getBuyerMessages()),
    getListArchiveMessages: () => dispatch(messageAction.getArchiveBuyerMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDetailMessage)
