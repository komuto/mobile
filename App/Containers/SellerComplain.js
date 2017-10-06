import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import SellerComplainWaiting from './SellerComplainWaiting'
import SellerComplainDone from './SellerComplainDone'

// Styles
import styles from './Styles/SellerListComplaintsGoodsStyle'
import {Colors} from '../Themes'

class SellerComplain extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={{backgroundColor: 'transparent'}}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <ScrollView tabLabel='Menunggu' ref='waiting'>
            <SellerComplainWaiting />
          </ScrollView>
          <ScrollView tabLabel='Terselesaikan' ref='done'>
            <SellerComplainDone />
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SellerComplain)
