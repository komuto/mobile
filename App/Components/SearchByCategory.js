import React from 'react'
import { TextInput, RefreshControl, Text, View, Image, Modal, TouchableOpacity, ListView } from 'react-native'
import styles from './Styles/SearchByCategoryStyle'
import {Images, Colors} from '../Themes'

export default class SearchByCategory extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderResult () {
    const { isFound, dataSource, renderRow, refreshing, onChangeSearch } = this.props
    if (isFound) {
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
    const { onChangeText, value } = this.props
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
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
                ref='searchCat'
                autoFocus
                style={styles.inputText}
                value={value}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect
                onChangeText={onChangeText}
                underlineColorAndroid='transparent'
                placeholder='Cari Barang'
              />
            </View>
          </View>
          {this.renderResult()}
        </View>
      </Modal>
    )
  }
}
