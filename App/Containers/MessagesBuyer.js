import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MessagesBuyerScreenStyle'
import { Colors, Images } from '../Themes/'

class MessagesBuyerScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      dataConversation: [
        {
          'id': 1, 'typeMessage': 'conversation', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'conversation', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'conversation', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'conversation', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'conversation', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        }
      ],
      dataArchive: [
        {
          'id': 1, 'typeMessage': 'archive', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'archive', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'archive', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'archive', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'typeMessage': 'archive', 'photoUser': Images.contohproduct, 'titleMessage': 'Gundam Biru Special Edition  Stok warna biru habis', 'date': '24 Feb 2017', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        }
      ],
      notif: this.props.notif,
      messageNotif: this.props.messageNotif,
      page: this.props.page
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

  handelDetailMessage (typeMessage) {
    NavigationActions.detailmessage({
      type: ActionConst.PUSH,
      typeMessage: typeMessage
    })
  }

  renderRowMessage (rowData) {
    return (
      <TouchableOpacity onPress={() => this.handelDetailMessage(rowData.typeMessage)}activeOpacity={0.5} style={styles.containerMessage}>
        <Image source={rowData.photoUser} style={styles.photo} />
        <View style={{marginLeft: 20}}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.titleMessage}s</Text>
            <Text style={styles.date}>{rowData.date}</Text>
          </View>
          <Text style={styles.storesText}>{rowData.storeName}</Text>
          <Text style={styles.messageText}>{rowData.message}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Sukses {this.state.messageNotif}</Text>
          <TouchableOpacity onPress={() => this.setState({notif: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  fileView () {
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
          initialPage={this.state.page}
        >
          <ScrollView tabLabel='Percakapan' ref='conversation' style={styles.scrollView}>
            {this.notif()}
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataConversation)}
              renderRow={this.renderRowMessage.bind(this)}
              enableEmptySections
            />
          </ScrollView>
          <ScrollView tabLabel='Arsip' ref='files' style={styles.scrollView}>
            {this.notif()}
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataArchive)}
              renderRow={this.renderRowMessage.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </ScrollableTabView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBuyerScreenScreen)
