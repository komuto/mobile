import React from 'react'
import { RefreshControl, View, ListView, Text, TouchableOpacity, Image, TextInput, Modal } from 'react-native'
import styles from './Styles/SearchJsStyle'
import { Images, Colors } from '../Themes'

export default class Search extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderResult () {
    const { notFound, dataSource, renderRow, refreshing, onChangeSearch } = this.props
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
            <TouchableOpacity style={styles.buttonChange} onPress={onChangeSearch}>
              <Text style={styles.textButton}>
                Ubah Pencarian
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <ListView
          dataSource={dataSource}
          renderRow={renderRow}
          enableEmptySections
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor={Colors.red}
              colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
              title='Loading...'
              titleColor={Colors.red}
              progressBackgroundColor={Colors.snow}
            />
          }
          />
      )
    }
  }

  render () {
    const { visible, onRequestClose, value, onChangeText } = this.props
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={this.props.onBack}>
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
                value={value}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect
                onChangeText={onChangeText}
                underlineColorAndroid='transparent'
                placeholder='Cari barang'
              />
            </View>
          </View>
          {this.renderResult()}
        </View>
      </Modal>
    )
  }
}

// // Prop type warnings
// Search.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Search.defaultProps = {
//   someSetting: false
// }
