import React from 'react'
import { AsyncStorage, Linking, ToastAndroid } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { baseUrl } from '../config'
import * as loginaction from '../actions/user'
import FCM from 'react-native-fcm'
import * as messageAction from '../actions/message'
import * as reviewAction from '../actions/review'
import * as productAction from '../actions/product'

// Styles

class Splash extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notificationAction: '',
      redirectId: ''
    }
  }

  componentDidMount () {
    Linking.getInitialURL().then(url => {
      if (url === null || url === undefined) {
        FCM.getFCMToken().then(tokenFCM => {
          if (tokenFCM !== null && tokenFCM !== undefined) {
          }
        })
        SplashScreen.show()
        FCM.getInitialNotification().then(notif => {
          if (notif && notif.fcm && notif.fcm.action) {
            switch (notif.type) {
              case 'BUYER_MESSAGE':
                this.setState({
                  notificationAction: 'BUYER_MESSAGE',
                  redirectId: notif.id
                })
                break
              case 'BUYER_DISCUSSION':
                this.setState({
                  notificationAction: 'BUYER_DISCUSSION',
                  redirectId: notif.id
                })
                break
              case 'BUYER_REVIEW':
                this.setState({
                  notificationAction: 'BUYER_REVIEW'
                })
                break
              case 'BUYER_RESOLUTION':
                this.setState({
                  notificationAction: 'BUYER_RESOLUTION'
                })
                break
              default:
            }
          }
        })
        setTimeout(() => {
          this._loadInitialState().done()
        }, 1000)
      } else {
        this.openUrl(url)
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataVerify.status === 200) {
      NavigationActions.notification({
        type: ActionConst.REPLACE,
        tipeNotikasi: 'welcome'
      })
      this.props.stateLogin(true)
      nextProps.dataVerify.status = 0
    } else if (nextProps.dataVerify.status !== 200 && nextProps.dataVerify.status !== 0) {
      NavigationActions.backtab({
        type: ActionConst.REPLACE
      })
      ToastAndroid.show(nextProps.dataVerify.message, ToastAndroid.LONG)
      nextProps.dataVerify.status = 0
    }
  }

  async openUrl (url) {
    if (url.includes('product')) {
      const id = url.replace(baseUrl + 'product-detail?id=', '')
      NavigationActions.detailproduct({
        type: ActionConst.REPLACE,
        id: id
      })
      this.props.getDetailProduk(id)
    } else if (url.includes('verification')) {
      const verifyToken = await url.replace(baseUrl + 'signup/verification?token=', '')
      this.props.verify(verifyToken)
    }
  }

  _loadInitialState = async () => {
    // check if already state fix for android back
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.stateLogin(true)
        // switch (this.state.notificationAction) {
        //   case 'BUYER_MESSAGE':
        //     this.props.getDetailMessage(this.state.redirectId)
        //     NavigationActions.buyerdetailmessage({ type: ActionConst.REPLACE, idMessage: this.state.redirectId })
        //     break
        //   case 'BUYER_DISCUSSION':
        //     this.props.getDetailDiscussion(this.state.redirectId)
        //     NavigationActions.buyerdetaildiscussion({ type: ActionConst.REPLACE, idDiscussion: this.state.redirectId })
        //     break
        //   case 'BUYER_REVIEW':
        //     this.props.getListReview()
        //     NavigationActions.buyerreview({ type: ActionConst.REPLACE })
        //     break
        //   case 'BUYER_RESOLUTION':
        //     NavigationActions.buyerresolution({ type: ActionConst.REPLACE })
        //     break
        //   default:
        //     NavigationActions.backtab({ type: ActionConst.REPLACE })
        // }
        NavigationActions.backtab({ type: ActionConst.REPLACE })
        SplashScreen.hide()
      }
      SplashScreen.hide()
      NavigationActions.backtab({ type: ActionConst.REPLACE })
    })
  }

  render () {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.isLogin,
    dataVerify: state.verification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateLogin: (login) => dispatch(loginaction.stateLogin({login})),
    getListReview: () => dispatch(reviewAction.getBuyerReview()),
    getDetailDiscussion: (id) => dispatch(productAction.getComment({id})),
    getDetailMessage: (id) => dispatch(messageAction.getBuyerDetailMessage({id})),
    getDetailProduk: (id) => dispatch(productAction.getProduct({id: id})),
    verify: (token) => dispatch(loginaction.verification({token: token}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
