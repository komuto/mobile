import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, BackAndroid, ListView, TextInput, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'

// Styles
import styles from './Styles/DetailDiscussionBuyerScreenStyle'
import { Images } from '../Themes'

class DetailDiscussionBuyerScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      discussionMessages: '',
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
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetailProduk.status === 200) {
      this.setState({loading: false})
      NavigationActions.detailproduct({
        type: ActionConst.PUSH
      })
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
        <Image
          source={Images.contohproduct}
          style={styles.imageProduct}
        />
        <View style={styles.containerProduct}>
          <Text style={styles.textProduct}>Blue Training Kit Machester United</Text>
          <Text style={styles.priceProduct}>Rp 1.685.000</Text>
        </View>
      </View>
    )
  }

  renderRowMessage (rowData) {
    return (
      <View style={styles.containerMessage}>
        <Image source={rowData.photoUser} style={styles.photo} />
        <View style={{marginLeft: 20}}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.storeName}</Text>
            <Text style={styles.date}>{rowData.date}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.message}</Text>
        </View>
      </View>
    )
  }

  handleDetailProduct () {
    this.setState({loading: true})
    this.props.getDetailProduct(93)
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <TouchableOpacity style={styles.allCategory} onPress={() => this.handleDetailProduct()}>
          <Text style={styles.textAllCategory}>
            Lihat Produk
          </Text>
          <Image source={Images.rightArrow} style={styles.imageCategory} />
        </TouchableOpacity>
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderRowMessage.bind(this)}
            enableEmptySections
          />
        </ScrollView>
        <TextInput
          style={[styles.inputText, {height: Math.max(30, this.state.heightMessage)}]}
          value={this.state.discussionMessages}
          multiline
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect
          onChange={(event) => {
            this.setState({
              discussionMessages: event.nativeEvent.text,
              heightMessage: event.nativeEvent.contentSize.height
            })
          }}
          underlineColorAndroid='transparent'
          placeholder='Tulis pesan Anda disini'
        />
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataDetailProduk: state.productDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduct: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDiscussionBuyerScreenScreen)
