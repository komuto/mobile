import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
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
      loadingSearch: true,
      dataSource: dataSource.cloneWithRows([]),
      from: this.props.from
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.search !== this.state.query) {
      this.props.getSearch(nextProps.search)
      this.setState({
        query: nextProps.search,
        search: nextProps.query
      })
    }
    if (nextProps.dataSearch.status === 200) {
      const result = nextProps.dataSearch.products
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result),
        loadingSearch: false
      })
    } else if (nextProps.dataSearch.status > 200) {
      this.setState({
        loadingSearch: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataSearch.message)
    } else if (nextProps.dataSearch.status === 'ENOENT') {
      this.setState({
        loadingSearch: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataSearch.message)
    }
  }

  componentDidMount () {
    this.props.getSearch(this.state.query)
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

  render () {
    const spinner = this.state.loadingSearch
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
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
        <ScrollView>
          <View style={styles.listViewContainer}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              enableEmptySections
            />
          </View>
        </ScrollView>
        {spinner}
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
