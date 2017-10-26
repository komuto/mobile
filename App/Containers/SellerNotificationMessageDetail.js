import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Modal, BackAndroid, ListView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'

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
        data: nextProps.detailMessage.sellerDetailMessage,
        typeMessage: nextProps.detailMessage.sellerDetailMessage.type,
        detailMessageUser: nextProps.detailMessage.sellerDetailMessage.detail_messages
      })
      nextProps.detailMessage.status = 0
    } if (nextProps.dataReplyMessage.status === 200) {
      nextProps.dataReplyMessage.status = 0
      this.props.getDetailMessage(this.state.idMessage)
    } if (nextProps.dataMoveMessage.status === 200 && this.state.typeMessage === 'conversation') {
      console.log('b')
      nextProps.dataMoveMessage.status = 0
      this.props.getListMessages()
      this.props.getListArchiveMessages()
      NavigationActions.sellernotificationmessage({
        type: ActionConst.POP_AND_REPLACE,
        notif: true,
        messageNotif: 'Berhasil memindahkan ke Arsip',
        page: 1
      })
    } if (nextProps.dataMoveMessage.status === 200 && this.state.typeMessage === 'archive') {
      console.log('a')
      nextProps.dataMoveMessage.status = 0
      this.props.getListMessages()
      this.props.getListArchiveMessages()
      NavigationActions.sellernotificationmessage({
        type: ActionConst.POP_AND_REPLACE,
        notif: true,
        messageNotif: 'Berhasil memindahkan ke Percakapan',
        page: 0
      })
    } if (nextProps.dataDeleteMessage.status === 200) {
      nextProps.dataDeleteMessage.status = 0
      this.props.getListMessages()
      this.props.getListArchiveMessages()
      NavigationActions.sellernotificationmessage({
        type: ActionConst.POP_AND_REPLACE,
        notif: true,
        messageNotif: 'Berhasil menghapus Percakapan',
        page: 0
      })
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
        <View style={styles.floatImageContainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.messages}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            blurOnSubmit
            onSubmitEditing={() => this.sendReply()}
            onChange={(event) => {
              this.setState({
                messages: event.nativeEvent.text
              })
            }}
            underlineColorAndroid='transparent'
            placeholder='Tulis pesan Anda disini'
          />
          <TouchableOpacity style={styles.sendContainer} onPress={() => this.sendReply()}>
            <Image source={Images.sendMessage} style={styles.sendMessage} />
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
    movingMessage: (id, type) => dispatch(messageAction.updateSellerMessage({id: id, messageType: type})),
    getListMessages: () => dispatch(messageAction.getSellerMessages()),
    getListArchiveMessages: () => dispatch(messageAction.getArchiveSellerMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerNotificationMessageDetail)
