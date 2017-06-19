import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/SearchResultStyle'

class SearchResult extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      search: '',
      header: this.props.header || 'search',
      tipe: this.props.tipe || 'kategori'
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
  }

  search () {
    console.log('dispatch search')
  }

  renderHeader () {
    const { search } = this.state
    if (this.state.tipe === 'search') {
      return (
        <View style={styles.headerContainerRender}>
          <TouchableOpacity>
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
      )
    }
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {this.state.header}
        </Text>
        <TouchableOpacity onPress={() => this.openSearch()}>
          <Image
            source={Images.searchWhite}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  openSearch () {
    this.setState({
      tipe: 'search'
    })
  }

  render () {
    let background
    if (this.state.tipe === 'search') {
      background = styles.search
    } else {
      background = styles.kategori
    }
    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer, background]}>
          {this.renderHeader()}
        </View>
        <ScrollView>
          <Text>SearchResult Container</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)
