import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Produk1 from './LoginScreen'
import Produk from './DetailTokoProduk'
// Styles
import styles from './Styles/DetailTokoStyle'

class DetailToko extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.profilContainer}>
                <Image source={Images.contohproduct} style={styles.profilImage} />
              </View>
              <View style={styles.info}>
                <Text style={styles.namaToko}>Sports Station Shop</Text>
                <Text style={styles.alamatToko}>Jakarta Selatan, DKI Jakarta</Text>
                <View style={styles.verifyContainer}>
                  <Image source={Images.verified} style={styles.imageVerify} />
                  <Text style={styles.verifiedText}>Terverifikasi</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Image source={Images.pesan} style={styles.image} />
                <Text style={styles.verifiedText}>Kirim Pesan</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.button}>
                <Image source={Images.tambah} style={styles.image} />
                <Text style={styles.verifiedText}>Favorit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollableTabView
            tabBarBackgroundColor={Colors.snow}
            tabBarActiveTextColor={Colors.darkgrey}
            tabBarUnderlineStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            tabBarInactiveTextColor={Colors.lightgrey}
            tabBarTextStyle={styles.textTab}
            locked
          >
            <Produk tabLabel='Produk' />
            <Produk1 tabLabel='Profile' />
            <Produk1 tabLabel='Penilaian' />
          </ScrollableTabView>
        </ScrollView>
        <TouchableOpacity style={styles.floatButton}>
          <Image source={Images.closewhite} style={styles.floatImage} />
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailToko)
