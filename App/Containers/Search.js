import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableOpacity
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/SearchStyle'

class Search extends React.Component {

  constructor (props) {
    super(props)
    var menu = [
      { nama: 'Sepatu Lari' },
      { nama: 'Sepatu Lari Nike Run Casual' },
      { nama: 'Sepatu Lari Adidas Black' },
      { nama: 'Sepatu Lari Skechers' },
      { nama: 'Sepatu Lari New Balance' }
    ]
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      search: this.props.search,
      dataSource: dataSource.cloneWithRows(menu)
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
  }

  detailResult (nama) {
    NavigationActions.searchresult({ type: ActionConst.PUSH, header: nama })
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.detailResult(rowData.nama)}>
        <Text style={styles.textResult}>
          {rowData.nama}
        </Text>
      </TouchableOpacity>
    )
  }

  back () {
    NavigationActions.pop()
  }

  search () {
    // dispatch
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
              onSubmitEditing={() => this.search()}
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
            />
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
