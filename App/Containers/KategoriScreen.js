import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KategoriScreenStyle'

// Images
import { Images } from '../Themes'

class KategoriScreenScreen extends React.Component {
  constructor (props) {
    super(props)
    var menuFashionAksesoris = [
      { gambar: Images.dapur, title: 'Fashion Pria' },
      { gambar: Images.dapur, title: 'Fashion Wanita' },
      { gambar: Images.dapur, title: 'Fashion Wanita' },
      { gambar: Images.dapur, title: 'Fashion Wanita' }
    ]
    var menuAllIbu = [
      { gambar: Images.dapur, title: 'Perlengkapan Bayi' },
      { gambar: Images.dapur, title: 'Susu dan Nutrisi Bayi' },
      { gambar: Images.dapur, title: 'Baby Sitter' }
    ]
    var dataSourceAllFashion = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    var dataSourceAllIbu = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      search: '',
      dataSourceAllFashion: dataSourceAllFashion.cloneWithRows(menuFashionAksesoris),
      dataSourceAllIbu: dataSourceAllIbu.cloneWithRows(menuAllIbu)
    }
  }

  handleDetailKategori (rowId, title) {
    NavigationActions.kategoriduascreen({
      type: ActionConst.PUSH,
      title: title,
      jenis: title
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

  renderRowMenuAllIbu (rowData, rowId) {
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
    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerBanner}>
          <Text style={styles.textBanner}>
            Fashion dan Aksesoris
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.fixMenuItem}>
            <Image source={Images.iconKategoriTemp} style={styles.imageCategory} />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                Lihat Semua di Fashion dan Aksesoris
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
        <View style={styles.containerBanner}>
          <Text style={styles.textBanner}>
            Ibu dan Anak
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.fixMenuItem}>
            <Image source={Images.iconKategoriTemp} style={styles.imageCategory} />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                Lihat Semua di Ibu dan Anak
              </Text>
            </View>
            <Image source={Images.rightArrow} style={styles.rightArrow} />
          </View>
        </TouchableOpacity>
        <View>
          <ListView
            dataSource={this.state.dataSourceAllIbu}
            renderRow={this.renderRowMenuAllIbu.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(KategoriScreenScreen)
