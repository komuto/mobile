import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
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
      saldo: '300000'
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
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainer} onPress={() => this.saldo()}>
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
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank} onPress={() => this.transferBank()}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Transfer Bank</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.mandiri} style={styles.imageBank} />
          <Image source={Images.bca} style={styles.imageBank} />
          <Image source={Images.bni} style={styles.imageBank} />
          <Image source={Images.bri} style={styles.imageBank} />
        </View>
      </TouchableOpacity>
    )
  }

  renderKartuKredit () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainerBank} onPress={() => this.kartuKredit()}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Kartu Kredit</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.visa} style={styles.imageBank} />
          <Image source={Images.masterCard} style={styles.imageBank} />
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
          <Image source={Images.atmBersama} style={styles.imageBank} />
          <Image source={Images.prima} style={styles.imageBank} />
          <Image source={Images.alto} style={styles.imageBank} />
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
          <Image source={Images.mandiriClickPay} style={styles.imageBank} />
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
          <Image source={Images.epayBri} style={styles.imageBank} />
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
          <Image source={Images.doku} style={styles.imageBank} />
        </View>
      </TouchableOpacity>
    )
  }

  renderAlfaMart () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={[styles.totalContainerBank, { marginBottom: 15 }]}>
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>AlfaMart</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={Images.alfamart} style={styles.imageBank} />
          <Image source={Images.alfamidi} style={styles.imageBank} />
        </View>
      </TouchableOpacity>
    )
  }

  transferBank () {
    NavigationActions.pembayarantransferbank({
      type: ActionConst.PUSH
    })
  }

  kartuKredit () {
    NavigationActions.pembayarankartukredit({
      type: ActionConst.PUSH
    })
  }

  saldo () {
    NavigationActions.pembayaransaldo({
      type: ActionConst.PUSH
    })
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
