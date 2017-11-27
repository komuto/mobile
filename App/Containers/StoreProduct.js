import React from 'react'
import {
  View,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import StoreProductDisplayed from './StoreProductDisplayed'
import StoreProductHidden from './StoreProductHidden'

import styles from './Styles/DaftarProdukScreenStyle'
import { Colors } from '../Themes/'

class StoreProduct extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      callback: this.props.callback || false
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
        >
          <StoreProductDisplayed tabLabel='Ditampilkan di Toko' callback={this.props.callback} />
          <StoreProductHidden tabLabel='Disembunyikan'callback={this.props.callback} />
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreProduct)
