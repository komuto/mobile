import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  ListView,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BuyerDetailResolutionStyle'
import { Colors, Images } from '../Themes/'

class BuyerDetailResolution extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      messages: '',
      foto: [Images.contohproduct, Images.contohproduct, Images.contohproduct, Images.contohproduct],
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
      page: this.props.page || 0
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

  renderRowInformation (rowData) {
    return (
      <View style={styles.containerMessage}>
        <Image source={rowData.photoUser} style={styles.photo} />
        <View style={{marginLeft: 20}}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.titleMessage}s</Text>
            <Text style={styles.date}>{rowData.date}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.message}</Text>
        </View>
      </View>
    )
  }

  renderInfo (infotext, infoValue, border) {
    return (
      <View style={[styles.row, {borderBottomWidth: border}]}>
        <Text style={styles.textInfo}>{infotext}</Text>
        <Text style={styles.textInfoValue}>{infoValue}</Text>
      </View>
    )
  }

  renderPhotoProduct () {
    const mapFoto = this.state.foto.map((data, i) => {
      return (
        <View key={i} style={{flexDirection: 'row'}}>
          <View style={styles.foto}>
            <Image source={data} style={styles.imageProduk} />
          </View>
        </View>
      )
    })
    return (
      <View style={{paddingLeft: 20, paddingBottom: 20, backgroundColor: Colors.snow}}>
        <View style={{borderTopColor: Colors.silver, borderTopWidth: 0.5, paddingTop: 20}}>
          <ScrollView horizontal contentContainerStyle={{paddingBottom: 12}}>
            {mapFoto}
          </ScrollView>
        </View>
      </View>
    )
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
          <ScrollView tabLabel='Informasi' ref='information' style={styles.scrollView}>
            <View style={styles.containerInfo}>
              {this.renderInfo('Status', 'Dalam Tahap Review')}
              {this.renderInfo('Prioritas', 'High', 0)}
            </View>
            <View style={styles.tabWaiting}>
              <View style={styles.containerResolution}>
                <Text style={styles.textResolution}>Uang Refund saya belum juga masuk saldo, padahal di menu transaksinya sudah di refund oleh seller</Text>
                <View style={styles.label}>
                  <Text style={styles.textStatus}>Transaksi</Text>
                </View>
              </View>
              <Text style={styles.date2}>23 Agustus 2017</Text>
            </View>
            <View style={styles.tabWaiting}>
              <Text style={styles.textInfo}>Keluhan</Text>
              <Text style={[styles.textInfoValue, {lineHeight: 23, textAlign: 'left'}]}>Sepatunya tidak sesuai dengan yang di gambar dan deskripsi. Saya ingin merefund dana saja. Saya takut kalau ganti barang, barangnya tetap tidak sesuai. Takut buang2 waktu untuk menunggu</Text>
            </View>
            {this.renderPhotoProduct()}
          </ScrollView>
          <View tabLabel='Diskusi Solusi' ref='discussionSolution' style={{marginBottom: 47}}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataArchive)}
              renderRow={this.renderRowInformation.bind(this)}
              enableEmptySections
            />
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
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDetailResolution)
