import React from 'react'
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Switch from 'react-native-switch-pro'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditWholesaleStyle'

class EditWholesale extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      imageProduct: 'https://yt3.ggpht.com/--xn-YG3OCCc/AAAAAAAAAAI/AAAAAAAAAAA/-fucMHe6v8M/s48-c-k-no-mo-rj-c0xffffff/photo.jpg',
      namaProduk: 'Sepatu Lari Nike',
      wholesale: false,
      form: [],
      data: [
        {'start': 0, 'end': 0, 'harga': 0},
        {'start': 0, 'end': 0, 'harga': 0}
      ]
    }
  }

  renderProduct () {
    return (
      <View style={styles.header}>
        <Image source={{ uri: this.state.imageProduct }} style={styles.imageProduct} />
        <Text style={styles.textProduct}>
          {this.state.namaProduk}
        </Text>
      </View>
    )
  }

  renderActivateWholesale () {
    return (
      <View style={styles.saleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>
            Aktifkan Harga Grosir
          </Text>
          <Text style={styles.textDescription}>
            Aktifkan fitur harga grosir jika Anda
            menjual produk dalam jumlah banyak.
          </Text>
        </View>
        <View style={styles.switch}>
          <Switch
            width={35}
            height={20}
            onSyncPress={(value) =>
              this.set(value)
            }
          />
        </View>
      </View>
    )
  }

  set (value) {
    const { data } = this.state
    let temp
    this.setState({
      wholesale: value,
      data: [
        {'start': 0, 'end': 0, 'harga': 0},
        {'start': 0, 'end': 0, 'harga': 0}
      ]
    })
    temp =
    [
      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.wholesale}>
            <Text style={styles.textLabel}>
              Jumlah Produk
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={data[0].start}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChange={(event) => this.changeStart(event.nativeEvent.text, 0)}
                underlineColorAndroid='transparent'
              />
              <Text style={[styles.textLabel, { marginLeft: 5, marginRight: 5 }]}>
                s/d
              </Text>
              <TextInput
                style={styles.inputText}
                value={data[0].end}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChange={(event) => this.changeEnd(event.nativeEvent.text, 0)}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <View style={[styles.wholesale, { marginLeft: 30 }]}>
            <Text style={styles.textLabel}>
              Harga Produk
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={data[0].harga}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChangeText={this.changeMinimalGrosir}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.textDelete}>
            Hapus
          </Text>
        </TouchableOpacity>
      </View>
    ]
    this.setState({
      form: temp
    })
  }

  changeStart (text, id) {
    const { data } = this.state
    let temp = data
    temp[id].start = text
    this.setState({
      data: temp
    })
  }

  changeEnd (text, id) {
    const { data } = this.state
    let temp = data
    temp[id].end = text
    this.setState({
      data: temp
    })
  }

  changePrice (text, id) {
    const { data } = this.state
    let temp = data
    temp[id].harga = text
    this.setState({
      data: temp
    })
  }

  renderWholesale () {
    const { form, data, wholesale } = this.state
    const tempData = data
    const mapFoto = form.map((data, i) => {
      return (
        <View>
          <View style={styles.formContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.wholesale}>
                <Text style={styles.textLabel}>
                  Jumlah Produk
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputText}
                    value={tempData[i].start}
                    keyboardType='numeric'
                    returnKeyType='done'
                    autoCapitalize='none'
                    maxLength={3}
                    autoCorrect
                    onChange={(event) => this.changeStart(event.nativeEvent.text, i)}
                    underlineColorAndroid='transparent'
                  />
                  <Text style={[styles.textLabel, { marginLeft: 5, marginRight: 5 }]}>
                    s/d
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    value={tempData[i].end}
                    keyboardType='numeric'
                    returnKeyType='done'
                    autoCapitalize='none'
                    maxLength={3}
                    autoCorrect
                    onChange={(event) => this.changeEnd(event.nativeEvent.text, i)}
                    underlineColorAndroid='transparent'
                  />
                </View>
              </View>
              <View style={[styles.wholesale, { marginLeft: 30 }]}>
                <Text style={styles.textLabel}>
                  Harga Produk
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputText}
                    value={tempData[i].harga}
                    keyboardType='numeric'
                    returnKeyType='done'
                    autoCapitalize='none'
                    maxLength={3}
                    autoCorrect
                    onChange={(event) => this.changePrice(event.nativeEvent.text, i)}
                    underlineColorAndroid='transparent'
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => this.removeItem(i)}>
              <Text style={styles.textDelete}>
                Hapus
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
        </View>
      )
    })
    if (wholesale) {
      return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitleWholesale}>
              Daftar Harga Grosir
            </Text>
          </View>
          {mapFoto}
          <TouchableOpacity style={styles.addButton} onPress={() => this.addSale()}>
            <Text style={styles.textAddSale}>
              + Tambah Daftar Harga Grosir
            </Text>
          </TouchableOpacity>
          <View style={styles.separator} />
        </View>
      )
    }
  }

  removeItem (i) {
    const { form, data } = this.state
    let tempForm = form
    let tempData = data
    tempForm.splice(i, 1)
    tempData.splice(i, 1)
    this.setState({
      form: tempForm,
      data: tempData
    })
  }

  addSale () {
    const { form, data } = this.state
    let tempData = data
    tempData.push({
      'start': 0,
      'end': 0,
      'harga': 0
    })
    this.setState({
      data: tempData
    })
    const id = form.length + 1
    let tempForm = form
    let temp = (
      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.wholesale}>
            <Text style={styles.textLabel}>
              Jumlah Produk
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={data[id].start}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChange={(event) => this.changeStart(event.nativeEvent.text, id)}
                underlineColorAndroid='transparent'
              />
              <Text style={[styles.textLabel, { marginLeft: 5, marginRight: 5 }]}>
                s/d
              </Text>
              <TextInput
                style={styles.inputText}
                value={data[id].end}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChange={(event) => this.changeEnd(event.nativeEvent.text, id)}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <View style={[styles.wholesale, { marginLeft: 30 }]}>
            <Text style={styles.textLabel}>
              Harga Produk
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={this.state.minimalGrosir}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={3}
                autoCorrect
                onChangeText={this.changeMinimalGrosir}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.textDelete}>
            Hapus
          </Text>
        </TouchableOpacity>
      </View>
    )
    tempForm.push(temp)
    this.setState({
      form: tempForm
    })
    console.log('data: ', this.state.data)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderProduct()}
        <ScrollView>
          {this.renderActivateWholesale()}
          {this.renderWholesale()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditWholesale)
