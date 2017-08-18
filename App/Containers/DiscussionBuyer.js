import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DiscussionBuyerScreenStyle'
import { Images } from '../Themes/'
class DiscussionBuyerScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      dataDiscussion: [
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Sepatu Jogging Nike Hitam', 'date': '14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Sepatu Jogging Nike Hitam ', 'date': '14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Sepatu Jogging Nike Hitam ', 'date': '14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Sepatu Jogging Nike Hitam ', 'date': '14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        },
        {
          'id': 1, 'photoUser': Images.contohproduct, 'titleMessage': 'Sepatu Jogging Nike Hitam ', 'date': '14:30', 'storeName': 'Sports Station Shop', 'message': 'Halo Gan, untuk Gundam yang warna biru habis. apakah mau ditukar dengan barang lain atau gimana enaknya?'
        }
      ]
    }
  }

  handelDetailDiscussion () {
    NavigationActions.detaildiscussionbuyer({
      type: ActionConst.PUSH
    })
  }

  renderRowDiscussion (rowData) {
    return (
      <TouchableOpacity onPress={() => this.handelDetailDiscussion()} activeOpacity={0.5} style={styles.containerMessage}>
        <Image source={rowData.photoUser} style={styles.photo} />
        <View style={styles.border}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.titleMessage}</Text>
            <Text style={styles.date}>{rowData.date}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.message}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView tabLabel='Percakapan' ref='conversation' style={styles.scrollView}>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.dataDiscussion)}
            renderRow={this.renderRowDiscussion.bind(this)}
            enableEmptySections
          />
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionBuyerScreenScreen)
