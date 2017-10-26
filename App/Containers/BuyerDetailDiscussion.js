import React from 'react'
import { ScrollView, ToastAndroid, Text, View, TouchableOpacity, Image, BackAndroid, ListView, TextInput, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import moment from 'moment'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as productAction from '../actions/product'

// Styles
import styles from './Styles/BuyerDetailDiscussionStyle'
import { Images } from '../Themes'

class BuyerDetailDiscussion extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      idProduct: this.props.idProduct || 93,
      nameProduct: this.props.nameProduct || 'Sepatu',
      imageProduct: this.props.imageProduct || null,
      priceProduct: this.props.priceProduct || 100000,
      idDiscussion: this.props.idDiscussion,
      loading: false,
      discussionMessages: '',
      data: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetailDiscussion.status === 200) {
      this.setState({
        loading: false,
        data: nextProps.dataDetailDiscussion.comments.comments
      })
      nextProps.dataDetailDiscussion.status = 0
    } else if (nextProps.dataDetailDiscussion.status !== 200 && nextProps.dataDetailDiscussion.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataDetailDiscussion.message, ToastAndroid.LONG)
    }
    if (nextProps.dataNewComent.status === 200) {
      this.setState({loading: false})
      this.props.getDetailDiscussion(this.state.idDiscussion)
      nextProps.dataNewComent.status = 0
    } else if (nextProps.dataNewComent.status !== 200 && nextProps.dataNewComent.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataNewComent.message, ToastAndroid.LONG)
    }
    if (nextProps.dataDetailProduk.status === 406) {
      this.setState({loading: false})
      ToastAndroid.show('Gagal mengambil produk..', ToastAndroid.LONG)
      nextProps.dataDetailProduk.status = 0
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
    const priceMasked = MaskService.toMask('money', this.state.priceProduct, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => this.backButton()}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Image
          source={{uri: this.state.imageProduct}}
          style={styles.imageProduct}
        />
        <View style={styles.containerProduct}>
          <Text style={styles.textProduct}>{this.state.nameProduct}</Text>
          <Text style={styles.priceProduct}>{priceMasked}</Text>
        </View>
      </View>
    )
  }

  renderRowMessage (rowData) {
    var timeStampToDate = moment.unix(rowData.created_at).format('DD MMM YYYY - HH:MM').toString()
    return (
      <View style={styles.containerMessage}>
        <View style={styles.maskedPhoto}>
          <Image source={{uri: rowData.user.photo}} style={styles.photo} />
        </View>
        <View style={{marginLeft: 20, flex: 1}}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.user.name}</Text>
            <Text style={styles.date}>{timeStampToDate}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.content}</Text>
        </View>
      </View>
    )
  }

  handleDetailProduct () {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: this.state.idProduct
    })
    this.props.getDetailProduct(this.state.idProduct)
  }

  sendComent () {
    this.setState({discussionMessages: ''})
    this.props.createDisscussionComent(this.state.idDiscussion, this.state.discussionMessages)
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
        <View style={styles.floatImageContainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.discussionMessages}
            keyboardType='default'
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect
            onChange={(event) => {
              this.setState({
                discussionMessages: event.nativeEvent.text
              })
            }}
            onSubmitEditing={() => this.sendComent()}
            underlineColorAndroid='transparent'
            placeholder='Tulis pesan Anda disini'
          />
          <TouchableOpacity style={styles.sendContainer} onPress={() => this.sendComent()}>
            <Image source={Images.sendMessage} style={styles.sendMessage} />
          </TouchableOpacity>
        </View>
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataDetailProduk: state.productDetail,
    dataDetailDiscussion: state.comments,
    dataNewComent: state.newComment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduct: (id) => dispatch(productAction.getProduct({id: id})),
    createDisscussionComent: (id, content) => dispatch(productAction.newComment({id: id, content: content})),
    getDetailDiscussion: (id) => dispatch(productAction.getComment({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDetailDiscussion)
