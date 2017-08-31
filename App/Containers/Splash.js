import React from 'react'
import { AsyncStorage } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
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

  componentWillMount () {
    SplashScreen.show()
    FCM.getInitialNotification().then(notif => {
      if (notif && notif.fcm && notif.fcm.action) {
        console.log(notif.type)
        switch (notif.type) {
          case 'BUYER_MESSAGE':
            console.log('BUYER_MESSAGE')
            this.setState({
              notificationAction: 'BUYER_MESSAGE',
              redirectId: notif.id
            })
            break
          case 'BUYER_DISCUSSION':
            console.log('BUYER_DISCUSSION')
            this.setState({
              notificationAction: 'BUYER_DISCUSSION',
              redirectId: notif.id
            })
            break
          case 'BUYER_REVIEW':
            console.log('BUYER_REVIEW')
            this.setState({
              notificationAction: 'BUYER_REVIEW'
            })
            break
          case 'BUYER_RESOLUTION':
            console.log('BUYER_RESOLUTION')
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
  }

  _loadInitialState = async () => {
    // check if already state fix for android back
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.stateLogin(true)
        console.log('state', this.state.notificationAction)
        switch (this.state.notificationAction) {
          case 'BUYER_MESSAGE':
            console.log('ee BUYER_MESSAGE')
            this.props.getDetailMessage(this.state.redirectId)
            NavigationActions.messagesbuyer({ type: ActionConst.REPLACE, idMessage: this.state.redirectId })
            break
          case 'BUYER_DISCUSSION':
            console.log('ee BUYER_DISCUSSION')
            this.props.getDetailDiscussion(this.state.redirectId)
            NavigationActions.discussionbuyer({ type: ActionConst.REPLACE, idDiscussion: this.state.redirectId })
            break
          case 'BUYER_REVIEW':
            console.log('ee BUYER_REVIEW')
            this.props.getListReview()
            NavigationActions.reviewbuyer({ type: ActionConst.REPLACE })
            break
          case 'BUYER_RESOLUTION':
            console.log('ee BUYER_RESOLUTION')
            NavigationActions.resolutioncenter({ type: ActionConst.REPLACE })
            break
          default:
            NavigationActions.backtab({ type: ActionConst.REPLACE })
        }
        SplashScreen.hide()
        console.log(value)
      }
      console.log('ee masuk')
      SplashScreen.hide()
    })
  }

  render () {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateLogin: (login) => dispatch(loginaction.stateLogin({login})),
    getListReview: () => dispatch(reviewAction.getBuyerReview()),
    getDetailDiscussion: (id) => dispatch(productAction.getComment({id})),
    getDetailMessage: (id) => dispatch(messageAction.getBuyerDetailMessage({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
