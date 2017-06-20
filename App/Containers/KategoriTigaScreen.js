import React from 'react'
import { ScrollView, Text, ListView, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KategoriDuaScreenStyle'

// Images
import { Images } from '../Themes'

class KategoriTigaScreenScreen extends React.Component {
  constructor (props) {
    super(props)
    var menuFashionAksesoris = [
      { gambar: Images.dapur, title: 'Sepatu Formal' },
      { gambar: Images.dapur, title: 'Sepatu Casual' },
      { gambar: Images.dapur, title: 'Sepatu Sport' },
      { gambar: Images.dapur, title: 'Sneakers Pria' }
    ]
    var dataSourceAllFashion = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      search: '',
      dataSourceAllFashion: dataSourceAllFashion.cloneWithRows(menuFashionAksesoris),
      jenis: this.props.jenis
    }
  }

  handleDetailKategori (rowId, title) {
    NavigationActions.kategoriempatscreen({
      type: ActionConst.PUSH,
      header: title
    })
  }

  renderRowMenuFashionAksesoris (rowData, rowId) {
    return (
      <TouchableOpacity onPress={() => this.handleDetailKategori(rowId, rowData.title)}>
        <View style={styles.itemList}>
          <Image source={rowData.gambar} style={styles.imageCategory} />
          <View style={[styles.namaContainer, {marginLeft: 15}]}>
            <Text style={styles.textNama}>
              {rowData.title}
            </Text>
          </View>
          <Image source={Images.rightArrow} style={styles.rightArrow} />
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const {jenis} = this.state
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <View style={styles.fixMenuItem}>
            <Image source={Images.iconKategoriTemp} style={styles.imageCategory} />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                Lihat Semua di {jenis}
              </Text>
            </View>
            <Image source={Images.rightArrow} style={styles.rightArrow} />
          </View>
        </TouchableOpacity>
        <View>
          <ListView
            dataSource={this.state.dataSourceAllFashion}
            renderRow={this.renderRowMenuFashionAksesoris.bind(this)}
          />
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(KategoriTigaScreenScreen)
