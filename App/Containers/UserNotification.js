import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, BackAndroid, Image, ScrollView } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as messageAction from '../actions/message'
import * as userAction from '../actions/user'
import * as reviewAction from '../actions/review'
import * as transactionAction from '../actions/transaction'
import ModalLogin from '../Components/ModalLogin'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NotifikasiPenggunaStyle'
import { Images } from '../Themes'

class UserNotification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: this.props.datalogin.login
    }
  }

  ComponentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  handleReview () {
    this.props.getListReview()
    NavigationActions.buyerreview({
      type: ActionConst.PUSH
    })
  }

  handleMessages () {
    this.props.getListMessages()
    this.props.getListArchiveMessages()
    NavigationActions.buyermessage({
      type: ActionConst.PUSH
    })
  }

  handleDiscussion () {
    this.props.getListDiscussion()
    NavigationActions.buyerdiscussion({
      type: ActionConst.PUSH
    })
  }

  handleResolution () {
    this.props.getListResolutionResolve()
    this.props.getListResolutionUnresolve()
    NavigationActions.buyerresolution({
      type: ActionConst.PUSH
    })
  }

  handleComplain () {
    this.props.getDisputeList()
    this.props.getDisputeListDone()
    NavigationActions.buyercomplain({
      type: ActionConst.PUSH
    })
  }

  menu (borderStyle, image, titleMenu, onPress) {
    return (
      <TouchableOpacity style={styles.profile} onPress={onPress}>
        <Image source={image} style={styles.imageCategory} />
        <View style={borderStyle}>
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {titleMenu}
            </Text>
          </View>
          <Image source={Images.rightArrow} style={styles.rightArrow} />
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { isLogin } = this.state
    let view = null
    if (!isLogin) {
      view = <ModalLogin visible={!isLogin} onClose={() => this.setState({ isLogin: true })} />
    }
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.dataProfileContainer, {elevation: 0.5}]}>
          {this.menu(styles.borderContainer, Images.messageBuyer, 'Pesan', () => this.handleMessages())}
          {this.menu(styles.borderContainer, Images.komentar, 'Diskusi Produk', () => this.handleDiscussion())}
          {this.menu(styles.borderContainer, Images.bintang, 'Review', () => this.handleReview(93))}
          {this.menu(styles.borderContainer, Images.help, 'Pusat Resolusi', () => this.handleResolution())}
          {this.menu(styles.borderContainer, Images.laporkan, 'Komplain Barang', () => this.handleComplain())}
        </View>
        {view}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListMessages: () => dispatch(messageAction.getBuyerMessages()),
    getListArchiveMessages: () => dispatch(messageAction.getArchiveBuyerMessages()),
    getListDiscussion: () => dispatch(userAction.getDiscussion()),
    getListReview: () => dispatch(reviewAction.getBuyerReview()),
    getListResolutionResolve: () => dispatch(userAction.getResolvedResolutions()),
    getListResolutionUnresolve: () => dispatch(userAction.getUnresolvedResolutions()),
    getDisputeList: () => dispatch(transactionAction.getComplainedOrdersBuyer({ is_resolved: false })),
    getDisputeListDone: () => dispatch(transactionAction.getComplainedOrdersBuyer2({ is_resolved: true }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotification)
