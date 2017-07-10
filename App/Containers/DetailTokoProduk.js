import React from 'react'
import { View, Text, ListView, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailTokoProdukStyle'
import stylesHome from './Styles/HomeStyle'

class DetailTokoProduk extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [{
        kategori: 'Gadget dan Elektronik',
        product: [
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 90000, harga: 90000, like: true, jumlahlikes: 130, dateCreate: '06/19/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Army simple Sling Bag for daily usage', toko: 'GadgetArena', status: 'unverified', statusDiskon: true, nominalDiskon: 80000, harga: 80000, like: false, jumlahlikes: 140, dateCreate: '06/18/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'unverified', statusDiskon: false, nominalDiskon: 70000, harga: 70000, like: true, jumlahlikes: 150, dateCreate: '06/21/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 60000, harga: 60000, like: true, jumlahlikes: 120, dateCreate: '06/20/2017' }
        ]
      },
      {
        kategori: 'Gadget dan Elektronik',
        product: [
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 90000, harga: 90000, like: true, jumlahlikes: 130, dateCreate: '06/19/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Army simple Sling Bag for daily usage', toko: 'GadgetArena', status: 'unverified', statusDiskon: true, nominalDiskon: 80000, harga: 80000, like: false, jumlahlikes: 140, dateCreate: '06/18/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'unverified', statusDiskon: false, nominalDiskon: 70000, harga: 70000, like: true, jumlahlikes: 150, dateCreate: '06/21/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 60000, harga: 60000, like: true, jumlahlikes: 120, dateCreate: '06/20/2017' }
        ]
      },
      {
        kategori: 'Gadget dan Elektronik',
        product: [
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 90000, harga: 90000, like: true, jumlahlikes: 130, dateCreate: '06/19/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Army simple Sling Bag for daily usage', toko: 'GadgetArena', status: 'unverified', statusDiskon: true, nominalDiskon: 80000, harga: 80000, like: false, jumlahlikes: 140, dateCreate: '06/18/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'unverified', statusDiskon: false, nominalDiskon: 70000, harga: 70000, like: true, jumlahlikes: 150, dateCreate: '06/21/2017' },
          { diskon: 50, gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 60000, harga: 60000, like: true, jumlahlikes: 120, dateCreate: '06/20/2017' }
        ]
      }
      ]
    }
  }

  renderList (rowData) {
    return (
      <View style={styles.containerListView}>
        <View style={styles.containerKategori}>
          <View style={styles.kategori}>
            <Text style={styles.textKategori}>{rowData.kategori}</Text>
          </View>
          <TouchableOpacity style={styles.lihat}>
            <Text style={styles.textButton}>Lihat Semuanya</Text>
          </TouchableOpacity>
        </View>
        <ListView
          horizontal
          enableEmptySections
          showsHorizontalScrollIndicator={false}
          dataSource={this.dataSource.cloneWithRows(rowData.product)}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }

  renderRow (rowData) {
    if (rowData.diskon > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.harga, rowData.diskon)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.harga
    }

    const money = MaskService.toMask('money', String(this.hargaDiskon), {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity
        style={[stylesHome.rowDataContainer, {width: (Metrics.screenWidth / 2) + 20}]}
        activeOpacity={0.5}
      >
        <Image source={rowData.gambar} style={stylesHome.imageProduct} />
        <View style={stylesHome.containerDiskon}>
          <Text style={stylesHome.diskon}>
            {rowData.diskon} %
          </Text>
        </View>
        <Text style={stylesHome.textTitleProduct}>
          {rowData.title}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {rowData.toko}
          </Text>
          {this.renderVerified(rowData.status)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.harga)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={stylesHome.like}>
            {rowData.jumlahlikes}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderVerified (status) {
    if (status === 'verified') {
      return (
        <Image source={Images.verified} style={stylesHome.imageVerified} />
      )
    }
    return (
      <Image source={Images.love} style={stylesHome.imageVerified} />
    )
  }

  renderDiskon (status, nominal) {
    if (status) {
      const money = MaskService.toMask('money', nominal, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
      return (
        <Text style={stylesHome.nominalDiskon}>
          {money}
        </Text>
      )
    }
    return (
      <Text style={stylesHome.nominalDiskon1}>
        asd
      </Text>
    )
  }

  renderLikes (status) {
    if (status) {
      return (
        <TouchableOpacity>
          <Image source={Images.love} style={stylesHome.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity>
        <Image source={Images.love} style={stylesHome.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderList.bind(this)}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoProduk)
