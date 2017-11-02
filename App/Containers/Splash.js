import React from 'react'
import { AsyncStorage, Linking, ToastAndroid } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { baseUrl } from '../config'
import * as loginaction from '../actions/user'
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
    SplashScreen.show()
    Linking.getInitialURL().then(url => {
      if (url === null || url === undefined) {
        AsyncStorage.getItem('token').then((value) => {
          if (value === null || value === undefined || value === '') {
          } else {
            this.props.stateLogin(true)
            NavigationActions.storedashboard({ type: ActionConst.REPLACE })
            SplashScreen.hide()
          }
          SplashScreen.hide()
          NavigationActions.storedashboard({ type: ActionConst.REPLACE })
        })
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
