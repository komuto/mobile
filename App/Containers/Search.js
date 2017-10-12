import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { connect } from 'react-redux'
import * as homeAction from '../actions/home'

import { Images } from '../Themes'
// Styles
import styles from './Styles/SearchStyle'

class Search extends React.Component {

  constructor (props) {
    super(props)
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      search: this.props.search,
      query: this.props.search,
      dataSource: dataSource.cloneWithRows([]),
      from: this.props.from,
      notFound: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.search !== this.state.query) {
      this.props.getSearch(nextProps.search)
      this.setState({
        query: nextProps.search,
        search: nextProps.search
      })
    }
    if (nextProps.dataSearch.status === 200) {
      const result = nextProps.dataSearch.products
      if (result.length === 0) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result),
          notFound: true
        })
      } else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result),
          notFound: false
        })
      }
    } else if (nextProps.dataSearch.status !== 200 && nextProps.dataSearch.status !== 0) {
      Alert.alert('Terjadi kesalahan', nextProps.dataSearch.message)
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
    this.trySearch(text)
  }

  trySearch (text) {
    if (text !== '') {
      this.props.getSearch(text)
    }
  }

  detailResult (name) {
    NavigationActions.searchresult({ type: ActionConst.PUSH, header: name, querys: name, from: this.state.from })
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.detailResult(rowData.name)}>
        <Text style={styles.textResult}>
          {rowData.name}
        </Text>
      </TouchableOpacity>
    )
  }

  back () {
    this.setState({
      search: ''
    })
    NavigationActions.pop()
  }

  search () {
    this.setState({
      notFound: false,
      search: ''
    })
    this.refs.search.focus()
  }

  renderResult () {
    const { notFound } = this.state
    if (notFound) {
      return (
        <View style={styles.notFoundContainer}>
          <Image
            source={Images.notFound}
            style={styles.image}
          />
          <Text style={styles.textTitle}>
            Hasil Pencarian tidak ditemukan
          </Text>
          <Text style={styles.textLabel}>
            Kami tidak bisa menemukan barang dari
            kata kunci yang Anda masukkan
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buttonChange} onPress={() => this.search()}>
              <Text style={styles.textButton}>
                Ubah Pencarian
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <ScrollView>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections
          />
        </ScrollView>
      )
    }
  }

  render () {
    const { search } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.back()}>
            <Image
              source={Images.leftArrow}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <View style={styles.textInputContainer}>
            <TextInput
              ref='search'
              autoFocus
              style={styles.inputText}
              value={search}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleTextSearch}
              underlineColorAndroid='transparent'
              placeholder='Cari barang atau toko'
            />
          </View>
        </View>
        {this.renderResult()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataSearch: state.searchProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearch: (query) => dispatch(homeAction.search({query}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
