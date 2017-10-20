import React from 'react'
import {
  ScrollView,
  Text,
  View,
  ToastAndroid,
  Image,
  TouchableOpacity,
  ListView,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
import * as homeAction from '../actions/home'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KategoriScreenStyle'

// Images
import { Images } from '../Themes'

class Category1 extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      category1: false
    }
    this.state = {
      search: '',
      data: props.dataAllCategory || null,
      loadingKategori: true,
      id: '',
      categoryTitle: '',
      gettingData: true
    }
  }

  backToHome () {
    NavigationActions.popTo('backtab')
    return true
  }

  componentWillReceiveProps (nextProps) {
    const {dataAllCategory} = nextProps

    if (!isFetching(dataAllCategory) && this.submitting.category1) {
      this.submitting = { ...this.submitting, category1: false }
      if (isError(dataAllCategory)) {
        ToastAndroid.show(dataAllCategory.message, ToastAndroid.SHORT)
      }
      if (isFound(dataAllCategory)) {
        this.setState({ data: dataAllCategory, gettingData: false })
      }
    }
  }

  componentDidMount () {
    const { data } = this.state
    if (!data.isFound) {
      this.submitting = {
        ...this.submitting,
        category1: true
      }
      this.props.getKategori()
    }
  }

  handleDetailKategori (rowId, title) {
    NavigationActions.category2({
      type: ActionConst.PUSH,
      id: rowId,
      title: title,
      name: title
    })
  }

  handleAllKategori (id, title) {
    this.setState({categoryTitle: title, id: id})
    NavigationActions.category4({
      type: ActionConst.PUSH,
      id: id,
      header: title,
      name: title,
      searchfrom: 'category1'
    })
  }

  renderSubListView (subCategory) {
    if (subCategory.length <= 0) {
      return null
    } else {
      const subCategoryView = subCategory.map((obj, i) =>
        (<TouchableOpacity key={i} style={styles.itemList} onPress={() => this.handleDetailKategori(obj.id, obj.name)}>
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
    const { data, gettingData } = this.state
    const spinner = this.state.data.isLoading
    ? (<View style={styles.spinnerProduk}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    let view
    if (!gettingData) {
      if (data.allCategory.length > 0) {
        view = (
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.data.allCategory)}
            renderRow={this.renderRow.bind(this)}
            initialListSize={10}
            enableEmptySections
          />
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
    dataAllCategory: state.allCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: () => dispatch(homeAction.allCategory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category1)
