import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
import * as productAction from '../actions/product'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DiskusiAddStyle'

class DiskusiAdd extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      data: [],
      foto: this.props.foto,
      price: this.props.price,
      namaProduk: this.props.namaProduk,
      pertanyaan: '',
      height: 50
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDiskusi.status === 200) {
      this.setState({
        pertanyaan: ''
      })
      NavigationActions.pop()
    }
  }

  renderProduct () {
    const totalHarga = MaskService.toMask('money', this.state.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.namaProduk}
            </Text>
            <Text style={styles.textKelola}>
              {totalHarga}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  handlePertanyaan = (text) => {
    this.setState({ pertanyaan: text })
  }

  newDiscussion () {
    const {id, pertanyaan} = this.state
    if (this.state.pertanyaan !== '') {
      this.props.newDiscussion(id, pertanyaan)
    } else {
      Alert.alert('Pesan', 'Pertanyaan tidak boleh kosong..')
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderProduct()}
        <View style={styles.questionContainer}>
          <Text style={styles.textKelola}>
            Pertanyaan Anda
          </Text>
          <TextInput
            style={[styles.textInput, { height: this.state.height }]}
            multiline
            value={this.state.pertanyaan}
            onContentSizeChange={(event) => {
              this.setState({height: event.nativeEvent.contentSize.height})
            }}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handlePertanyaan}
            underlineColorAndroid='transparent'
            placeholder='Tulis Pertanyaan Anda'
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.newDiscussion()}>
          <Text style={styles.textButton}>
            Kirimkan Pertanyaan
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDiskusi: state.newDiscussion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newDiscussion: (id, question) => dispatch(productAction.newDiscussion({ id: id, question: question }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskusiAdd)
