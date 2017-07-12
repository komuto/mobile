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
      data: [],
      namaToko: '',
      verified: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataToko.status === 200) {
      console.log(nextProps.dataToko.store)
      this.setState({
        data: nextProps.dataToko.store.catalogs,
        namaToko: nextProps.dataToko.store.store.name,
        verified: nextProps.dataToko.store.store.is_verified
      })
    }
  }

  renderList (rowData) {
    if (rowData.products.length > 0) {
      return (
        <View style={styles.containerListView}>
          <View style={styles.containerKategori}>
            <View style={styles.kategori}>
              <Text style={styles.textKategori}>{rowData.name}</Text>
            </View>
            <TouchableOpacity style={styles.lihat}>
              <Text style={styles.textButton}>Lihat Semuanya</Text>
            </TouchableOpacity>
          </View>
          <ListView
            horizontal
            enableEmptySections
            showsHorizontalScrollIndicator={false}
            dataSource={this.dataSource.cloneWithRows(rowData.products)}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      )
    }
    return (
      <View style={styles.containerListView}>
        <View style={styles.containerKategori}>
          <View style={styles.kategori}>
            <Text style={styles.textKategori}>{rowData.name}</Text>
          </View>
          <TouchableOpacity style={styles.lihat}>
            <Text style={styles.textButton}>Lihat Semuanya</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerKategori}>
          <Text style={styles.textTitleProduct}>Tidak ada data</Text>
        </View>
      </View>
    )
  }

  renderRow (rowData) {
    let image
    if (rowData.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.price, rowData.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.price
    }

    const money = MaskService.toMask('money', String(this.hargaDiskon), {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    try {
      image = rowData.image.file
    } catch (e) {
      image = null
    }
    return (
      <TouchableOpacity
        style={[stylesHome.rowDataContainer, {width: (Metrics.screenWidth / 2) + 20}]}
        activeOpacity={0.5}
      >
        {this.renderImage(image)}
        <View style={stylesHome.containerDiskon}>
          <Text style={stylesHome.diskon}>
            {rowData.discount} %
          </Text>
        </View>
        <Text style={stylesHome.textTitleProduct}>
          {rowData.name}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {this.state.namaToko}
          </Text>
          {this.renderVerified(this.state.verified)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.price)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(true)}
          <Text style={stylesHome.like}>
            {10}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderImage (image) {
    if (image === null) {
      return (
        <Image source={Images.contohproduct} style={stylesHome.imageProduct} />
      )
    }
    return (
      <Image source={{ uri: image }} style={stylesHome.imageProduct} />
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
          <Image source={Images.lovered} style={stylesHome.imageStyleLike} />
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
    dataToko: state.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoProduk)
