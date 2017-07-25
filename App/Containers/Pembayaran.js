import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranStyle'

class Pembayaran extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      total: '250219',
      saldo: '450000'
    }
  }

  renderTotal () {
    const { total } = this.state
    const totalHarga = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <View style={styles.biaya}>
            <Text style={[styles.textLabel, { marginBottom: 7 }]}>Total Pembayaran</Text>
            <Text style={styles.textTotal}>{totalHarga}</Text>
          </View>
          <TouchableOpacity style={styles.buttonDetail}>
            <Text style={styles.textBiru}>Detail</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.textNote}>Harga sudah termasuk pajak dan biaya lainnya</Text>
        </View>
      </View>
    )
  }

  renderSaldo () {
    const { saldo } = this.state
    const totalSaldo = MaskService.toMask('money', saldo, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainer}>
        <View style={styles.total}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Saldo ({totalSaldo})</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderBank () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Transfer Bank</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderKartuKredit () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Kartu Kredit</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderATM () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Virtual Account (ATM)</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderMandiri () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Mandiri ClickPlay</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderBRI () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>E-Pay BRI</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderDoku () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Doku Wallet</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderAlfaMart () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>AlfaMart</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderTotal()}
          <Text style={styles.textPilihMetode}>Pilih Metode Pembayaran</Text>
          {this.renderSaldo()}
          {this.renderBank()}
          {this.renderKartuKredit()}
          {this.renderATM()}
          {this.renderMandiri()}
          {this.renderBRI()}
          {this.renderDoku()}
          {this.renderAlfaMart()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Pembayaran)
