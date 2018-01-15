import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  ScrollView,
  BackAndroid,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  Modal
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import moment from 'moment'
import {isFetching, isError, isFound} from '../Services/Status'
import * as complaintAction from '../actions/transaction'
import Reactotron from 'reactotron-react-native'

import styles from './Styles/SellerComplainDiscussionStyle'
import {Colors, Images} from '../Themes'

class SellerComplainDiscussion extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.submitting = {
      discussion: false,
      fetching: true,
      reply: false
    }
    this.listHeight = 0
    this.footerY = 0
    this.state = {
      discussion: [],
      messages: '',
      idComplain: this.props.idComplain,
      modalLoading: false,
      lengthdata: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsReply, propsDetailCompaint} = nextProps
    if (!isFetching(propsDetailCompaint) && this.submitting.discussion) {
      this.submitting = { ...this.submitting, discussion: false, fetching: false }
      if (isError(propsDetailCompaint)) {
        ToastAndroid.show(propsDetailCompaint.message, ToastAndroid.SHORT)
      }
      if (isFound(propsDetailCompaint)) {
        console.log('data ', propsDetailCompaint)
        Reactotron.log('isFound')
        this.setState({
          discussion: propsDetailCompaint,
          lengthdata: propsDetailCompaint.orderDetail.discussions.length
        })
      }
    }

    if (!isFetching(propsReply) && this.submitting.reply) {
      this.submitting = {...this.submitting, reply: false, fetching: false}
      if (isError(propsReply)) {
        ToastAndroid.show(propsReply.message, ToastAndroid.SHORT)
        this.setState({
          modalLoading: false
        })
      }
      if (isFound(propsReply)) {
        this.setState({
          messages: '',
          modalLoading: false
        })
        this.submitting.discussion = true
        this.props.getDetailComplaintSeller(this.state.idComplain)
      }
    }
  }

  componentDidMount () {
    const { discussion } = this.state
    if (!discussion.isFound || !this.submitting.discussion) {
      this.submitting = {
        ...this.submitting,
        discussion: true
      }
      Reactotron.log('didmount')
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

  maskedDate (value) {
    const timeStampToDate = moment.unix(value).format('DD MMMM YYYY').toString()
    return timeStampToDate
  }

  onLayout = (event) => {
    const layout = event.nativeEvent.layout
    this.footerY = layout.y
  }

  scrollToBottom (animated = true) {
    const scrollTo = this.footerY
    this.refs.listView.scrollTo({
      y: scrollTo,
      animated: animated
    })
  }

  modalLoading () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalLoading}
        onRequestClose={() => this.setState({ modalLoading: false })}
        >
        <View style={[styles.containerLoading]}>
          <View style={styles.loading}>
            <ActivityIndicator color='white' size='large' />
          </View>
        </View>
      </Modal>
    )
  }

  renderRowDiscussion (rowData) {
    const image = rowData.orderDetail.discussions.map((data, i) => {
      const timeStampToDate = moment.unix(data.created_at).format('DD MMMM YYYY h:mm').toString()
      return (
        <View key={i} onLayout={this.onLayout} style={styles.containerMessage}>
          <View style={styles.maskedPhoto}>
            <Image source={{uri: data.user.photo}} style={styles.photoUser} />
          </View>
          <View style={{marginLeft: 20, flex: 1}}>
            <View style={styles.flexRowMessage}>
              <Text style={styles.titleMessage}>{data.user.name}</Text >
              <Text style={styles.date}>{timeStampToDate}</Text>
            </View>
            <Text style={styles.messageText}>{data.content}</Text >
          </View>
        </View>
      )
    })
    return (
      <View>
        {image}
      </View>
    )
  }

  sendDiscussion () {
    this.submitting.reply = true
    this.setState({modalLoading: true})
    this.props.replyDiscussion(this.props.idComplain, this.state.messages)
  }

  render () {
    if (this.submitting.fetching) {
      Reactotron.log('render ' + this.submitting.fetching)
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    let image
    let view = null
    if (this.state.messages === '') {
      image = Images.sendMessageInactive
    } else {
      image = Images.sendMessage
    }
    const lengthdata = this.state.lengthdata
    if (lengthdata > 0) {
      view = (
        <ScrollView ref='listView'>
          {this.renderRowDiscussion(this.state.discussion)}
        </ScrollView>
        )
    } else if (lengthdata === 0) {
      view = (
        <ScrollView>
          <View style={styles.containerEmpty}>
            <Image source={Images.emptyDiscussion} style={{width: 173, height: 178}} />
            <Text style={styles.textTitleEmpty}>Diskusi Produk Anda Kosong</Text>
            <Text style={styles.textTitleEmpty2}>Anda belum pernah melakukan tanya jawab{'\n'}kepada penjual untuk produk apapun</Text>
          </View>
        </ScrollView>
      )
    }
    return (
      <View style={{flex: 1}} >
        {view}
        {/* <TouchableOpacity onPress={() => this.scrollToBottom()} style={styles.absolute}>
          <Image source={Images.down} style={{width: 30, height: 30}} />
        </TouchableOpacity> */}
        <View style={styles.floatImageContainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.messages}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            blurOnSubmit
            onSubmitEditing={() => this.sendDiscussion()}
            onChangeText={(text) => this.setState({messages: text})}
            underlineColorAndroid='transparent'
            placeholder='Tulis pesan Anda disini'
          />
          <TouchableOpacity style={styles.sendContainer} onPress={() => this.sendDiscussion()}>
            <Image source={image} style={styles.sendMessage} />
          </TouchableOpacity>
        </View>
        {this.modalLoading()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  propsDetailCompaint: state.sellerComplainedOrderDetail,
  propsReply: state.sellerComplaintDiscussion
})

const mapDispatchToProps = (dispatch) => ({
  replyDiscussion: (id, content) => dispatch(complaintAction.createComplaintDiscussionSeller({id: id, content: content})),
  getDetailComplaintSeller: (id) => dispatch(complaintAction.getComplainedOrderDetailSeller({id: id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerComplainDiscussion)
