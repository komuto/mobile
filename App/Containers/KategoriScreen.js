import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, ListView, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as homeAction from '../actions/home'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KategoriScreenStyle'

// Images
import { Images } from '../Themes'

class KategoriScreenScreen extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      search: '',
      data: [],
      loadingKategori: true,
      id: '',
      categoryTitle: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataAllCategory.status === 200) {
      console.log(nextProps.dataAllCategory.allCategory)
      this.setState({
        data: nextProps.dataAllCategory.allCategory,
        loadingKategori: false
      })
    } else if (nextProps.dataAllCategory.status > 200) {
      this.setState({
        loadingKategori: false
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataAllCategory.message)
    } else if (nextProps.dataAllCategory.status === 'ENOENT') {
      this.setState({
        loadingKategori: false
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataAllCategory.message)
    }
  }

  handleDetailKategori (rowId, title) {
    NavigationActions.kategoriduascreen({
      type: ActionConst.PUSH,
      id: rowId,
      title: title,
      name: title
    })
  }

  handleAllKategori (rowId, title) {
    this.setState({categoryTitle: title, id: rowId})
    NavigationActions.kategoriempatscreen({
      type: ActionConst.PUSH,
      id: rowId,
      header: title,
      name: title
    })
  }

  renderSubListView (subCategory) {
    if (subCategory.length <= 0) {
      return null
    } else {
      const subCategoryView = subCategory.map((obj) =>
        (<TouchableOpacity style={styles.itemList} onPress={() => this.handleDetailKategori(obj.id, obj.name)}>
          <Image source={Images.dapur} style={styles.imageCategory} />
          <View style={[styles.namaContainer, {marginLeft: 15}]}>
            <Text style={styles.textNama}>
              {obj.name}
            </Text>
          </View>
          <Image source={Images.rightArrow} style={styles.rightArrow} />
        </TouchableOpacity>)
      )
      return (
        <View>{subCategoryView}</View>
      )
    }
  }

  renderRow (rowData, rowId) {
    const subCategory = rowData.sub_categories
    return (
      <View>
        <View style={styles.containerBanner}>
          <Text style={styles.textBanner}>
            Lihat semua di {rowData.name}
          </Text>
        </View>
        <TouchableOpacity style={styles.itemList} onPress={() => this.handleAllKategori(rowData.id, rowData.name)}>
          <Image source={{uri: rowData.icon}} style={styles.imageCategory} />
          <View style={[styles.namaContainer, {marginLeft: 15}]}>
            <Text style={styles.textNama}>
              Lihat semua di {rowData.name}
            </Text>
          </View>
          <Image source={Images.rightArrow} style={styles.rightArrow} />
        </TouchableOpacity>
        {this.renderSubListView(subCategory)}
      </View>
    )
  }

  renderSubRow (rowData, rowId) {
    return (
      <TouchableOpacity style={styles.itemList} onPress={() => this.handleDetailKategori(rowData.id, rowData.name)}>
        <Image source={Images.dapur} style={styles.imageCategory} />
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
    const spinner = this.state.loadingKategori
    ? (<View style={styles.spinnerProduk}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    return (
      <ScrollView style={styles.container}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRow.bind(this)}
          initialListSize={10}
          enableEmptySections
        />
        {spinner}
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataAllCategory: state.allCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: dispatch(homeAction.allCategory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KategoriScreenScreen)
