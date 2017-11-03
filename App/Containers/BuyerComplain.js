import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import BuyerComplainWaiting from './BuyerComplainWaiting'
import BuyerComplainDone from './BuyerComplainDone'
// Styles
import styles from './Styles/BuyerComplainStyle'

class BuyerComplain extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     isRefreshing: false
  //   }
  // }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.paleGrey}
          tabBarTextStyle={styles.textTab}
          prerenderingSiblingsNumber={2}
          locked
        >
          <BuyerComplainWaiting tabLabel='Menunggu' />
          <BuyerComplainDone tabLabel='Terselesaikan' />
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplain)
