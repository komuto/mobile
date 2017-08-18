import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Modal, BackAndroid, ListView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailMessagesScreenStyle'
import { Images } from '../Themes'

class DetailMessagesScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      messages: '',
      heightDesc: 0,
      modalPopup: false,
      data: [
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2107 - 14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2107 - 14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2107 - 14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017 - 14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017 - 14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        }
      ],
      typeMessage: this.props.typeMessage
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
            <TouchableOpacity>
              <Text style={styles.textMenu}>Hapus Selamanya</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderRowMessage (rowData) {
    return (
      <TouchableOpacity onPress={() => this.handelDetailMessage()}activeOpacity={0.5} style={styles.containerMessage}>
        <Image source={rowData.photoUser} style={styles.photo} />
        <View style={{marginLeft: 20}}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.storeName}</Text>
            <Text style={styles.date}>{rowData.date}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.message}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  handleChangeMessage = (text) => {
    this.setState({ messages: text })
  }

  handleMoveToArchive () {
    this.setState({ modalPopup: false })
    if (this.state.typeMessage === 'conversation') {
      NavigationActions.messagesbuyer({
        type: ActionConst.PUSH,
        notif: true,
        messageNotif: 'Berhasil memindahkan ke Arsip',
        page: 1
      })
    } else {
      NavigationActions.messagesbuyer({
        type: ActionConst.PUSH,
        notif: true,
        messageNotif: 'Berhasil memindahkan ke Percakapan',
        page: 0
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={styles.containerTitle}>
          <Text style={styles.titleMessage}>
            Gundam Biru Special Edition - Stok warna biru habis. Apakah mau diganti yang lain?
          </Text>
        </View>
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderRowMessage.bind(this)}
            enableEmptySections
          />
        </ScrollView>
        <TextInput
          style={[styles.inputText, {height: Math.max(30, this.state.heightMessage)}]}
          value={this.state.messages}
          multiline
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect
          onChange={(event) => {
            this.setState({
              messages: event.nativeEvent.text,
              heightMessage: event.nativeEvent.contentSize.height
            })
          }}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMessagesScreenScreen)
