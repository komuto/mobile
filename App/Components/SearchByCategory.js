import React from 'react'
import { TextInput, Text, View, Image, Modal, TouchableOpacity, ListView } from 'react-native'
import styles from './Styles/SearchByCategoryStyle'
import {Images} from '../Themes'

export default class SearchByCategory extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderResult () {
    const { isFound } = this.props
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
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this.props.renderRow}
          enableEmptySections
        />
      )
    }
  }

  render () {
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
                ref='search'
                autoFocus
                style={styles.inputText}
                value={this.props.value}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.props.onChangeText}
                underlineColorAndroid='transparent'
                placeholder='Cari barang atau toko'
              />
            </View>
          </View>
          {this.renderResult()}
        </View>
      </Modal>
    )
  }
}
