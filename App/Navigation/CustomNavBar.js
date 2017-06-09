import React, { PropTypes } from 'react'
import { Text, View, Image, TouchableOpacity, LayoutAnimation } from 'react-native'
import NavItems from './NavItems'
import styles from './Styles/CustomNavBarStyles'
import SearchBar from '../Components/SearchBar'
import { connect } from 'react-redux'
import { Metrics, Images } from '../Themes'
import SearchActions from '../Redux/SearchRedux'
import { Actions } from 'react-native-router-flux'

class CustomNavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSearchBar: false
    }
  }

  showSearchBar = () => {
    this.setState({showSearchBar: true})
  }

  cancelSearch = () => {
    this.setState({showSearchBar: false})
    this.props.cancelSearch()
  }

  onSearch = (searchTerm) => {
    this.props.performSearch(searchTerm)
  }

  handleBackPress () {
    Actions.pop()
  }

  renderMiddle () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (this.state.showSearchBar) {
      return <SearchBar onSearch={(text) => this.onSearch(text)} searchTerm={this.state.searchTerm} onCancel={this.cancelSearch} onSubmitEditing={() => this.onSearchHandle()} />
    } else {
      let content = null
      if (!this.props.showLogo) {
        content = <Text style={styles.title}> {this.props.title} </Text>
      }

      return (
        <View style={styles.middleContainer}>
          {content}
        </View>
      )
    }
  }

  renderRightButtons () {
    if (!this.props.showSearchIcon) {
      return <View style={styles.rightContainer} />
    }
    if (this.state.showSearchBar) {
      return <View style={{width: Metrics.icons.medium}} />
    } else {
      return (
        <View style={styles.rightButtons}>
          {NavItems.searchButton(this.showSearchBar)}
        </View>
      )
    }
  }

  renderLeftButtons () {
    if (this.state.showSearchBar) {
      return null
    } else {
      if (this.props.showLogo) {
        return (
          <View style={styles.leftLogo}>
            <Image source={Images.logo} style={styles.logoImage} />
          </View>
        )
      } else if (this.props.hideBackImage) {
        return (
          <View style={styles.leftLogo} />
        )
      } else {
        return (
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={this.handleBackPress} style={styles.buttonContainer}>
              <Image source={Images.iconBack} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        )
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderLeftButtons()}
        {this.renderMiddle()}
        {this.renderRightButtons()}
      </View>
    )
  }
}

CustomNavBar.propTypes = {
  navigationState: PropTypes.object,
  navigationBarStyle: View.propTypes.style
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.search.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (searchTerm) => dispatch(SearchActions.search(searchTerm)),
    cancelSearch: () => dispatch(SearchActions.cancelSearch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBar)
