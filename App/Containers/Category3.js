import React from 'react'
import { ScrollView, Text, ListView, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as homeAction from '../actions/home'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KategoriDuaScreenStyle'

// Images
import { Images } from '../Themes'

class Category3 extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      search: '',
      data: [],
      loadingKategori: true,
      id: this.props.id,
      title: this.props.title,
      name: this.props.title,
      iconParent: '',
      gettingData: true
    }
    this.props.getKategori(this.props.id)
  }

  backToHome () {
    NavigationActions.backtab({
      type: ActionConst.RESET
    })
    return true
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataSubCategory.status === 200) {
      this.setState({
        data: nextProps.dataSubCategory.categories.sub_categories,
        iconParent: nextProps.dataSubCategory.categories.icon,
        loadingKategori: false,
        gettingData: false
      })
    } else if (nextProps.dataSubCategory.status > 200) {
      this.setState({
        loadingKategori: false
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataSubCategory.message)
    } else if (nextProps.dataSubCategory.status === 'ENOENT') {
      this.setState({
        loadingKategori: false
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataSubCategory.message)
    }
  }

  handleDetailKategori (rowId, title) {
    NavigationActions.category4({
      type: ActionConst.PUSH,
      header: title,
      id: rowId
    })
  }

  renderRow (rowData, rowId) {
    return (
      <TouchableOpacity style={styles.itemList} onPress={() => this.handleDetailKategori(rowData.id, rowData.name)}>
        <Image source={{uri: rowData.icon}} style={styles.imageCategory} />
        <View style={[styles.namaContainer, {marginLeft: 15}]}>
          <Text style={styles.textNama}>
            {rowData.name}
          </Text>
        </View>
        <Image source={Images.rightArrow} style={styles.rightArrow} />
      </TouchableOpacity>
    )
  }

  render () {
    const {title, iconParent, data, gettingData} = this.state
    const spinner = this.state.loadingKategori
    ? (<View style={styles.spinnerProduk}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    let view
    if (!gettingData) {
      if (data.length > 0) {
        view = (
          <View>
            <TouchableOpacity style={styles.itemList} onPress={() => this.handleDetailKategori(this.state.id)}>
              <Image source={{uri: iconParent}} style={styles.imageCategory} />
              <View style={[styles.namaContainer, {marginLeft: 15}]}>
                <Text style={styles.textNama}>
                  Lihat semua di {title}
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </TouchableOpacity>
            <ListView
              style={{ marginTop: 5 }}
              dataSource={this.dataSource.cloneWithRows(this.state.data)}
              renderRow={this.renderRow.bind(this)}
              initialListSize={10}
              enableEmptySections
            />
          </View>
        )
      } else {
        view = (
          <View style={styles.imageContainer}>
            <Image source={Images.notFound} style={styles.image} />
            <Text style={styles.textLabel}>Produk tidak ditemukan</Text>
            <Text style={styles.textInfo}>
              Kami tidak bisa menemukan barang dari kategori produk ini
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => this.backToHome()}>
                <Text style={styles.textButton}>Kembali ke Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    } else {
      view = null
    }
    return (
      <ScrollView style={styles.container}>
        {view}
        {spinner}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataSubCategory: state.subCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: (id) => dispatch(homeAction.subCategory({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category3)
