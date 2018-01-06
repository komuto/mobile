import React from 'react'
import { View, Text, ListView, TouchableOpacity, Image, Picker, TextInput, Alert } from 'react-native'
import styles from './Styles/FilterStyle'
import { Images, Colors } from '../Themes'
import { connect } from 'react-redux'
import * as filterAction from '../actions/location'
import * as expeditionAction from '../actions/expedition'
import * as brandAction from '../actions/brand'

class Filter extends React.Component {
  constructor (props) {
    super(props)
    const dataObjects = [
      {id: 1, title: 'Kondisi', active: true},
      {id: 2, title: 'Jasa Pengiriman', active: false},
      {id: 3, title: 'Rentang Harga', active: false},
      {id: 4, title: 'Dikirim Dari', active: false},
      {id: 5, title: 'Brand', active: false},
      {id: 6, title: 'Lainnya', active: false}
    ]
    const dataKondisi = [
      {id: 1, title: 'Semua Kondisi', active: false},
      {id: 2, title: 'Baru', active: false},
      {id: 3, title: 'Bekas', active: false}
    ]
    const dataLainnya = [
      {id: 1, title: 'Diskon', value: 'discount', active: false},
      {id: 2, title: 'Seller Terverifikasi', value: 'verified', active: false},
      {id: 3, title: 'Grosir', value: 'wholesaler', active: false}
    ]
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      dataSourceKondisi: ds.cloneWithRows(dataKondisi),
      dataSourceLainnya: ds.cloneWithRows(dataLainnya),
      dataObjects,
      dataKondisi,
      dataPengiriman: [],
      tambahanPengiriman: [
        {
          'id': 0,
          'name': 'Semua Jasa Pengiriman',
          'description': 'semua',
          'logo': null,
          'full_name': 'Semua Ekspedisi',
          'is_checked': false
        }
      ],
      dataBrand: [],
      dataLainnya,
      active: 1,
      activeKondisi: 0,
      provinsiId: this.props.provinsiId,
      hargaMinimal: '',
      hargaMaksimal: '',
      provinsi: [],
      tambahanProvinsi: [
        {
          'id': 0,
          'name': 'Pilih Provinsi'
        }
      ],
      kota: [],
      tambahanKota: [
        {
          'id': 0,
          'ro_id': 0,
          'name': this.props.kota || 'Pilih Kota'
        }
      ],
      provinsiTerpilih: this.props.provinsi || 'Semua Wilayah',
      kotaTerpilih: this.props.kota || 'Semua Wilayah',
      filterPengiriman: this.props.filterPengiriman, // default []
      filterKondisi: this.props.filterKondisi, // default ''
      filterAddress: this.props.filterAddress, // default ''
      filterPrice: this.props.filterPrice, // default [0, 0]
      filterBrand: this.props.filterBrand, // default []
      filterOthers: this.props.filterOthers // default []
    }
  }

  componentDidMount () {
    this.props.getProvinsi()
    if (this.props.provinsiId === '') {
      this.props.getKota(11)
    } else {
      this.props.getKota(this.props.provinsiId)
    }
    this.props.getExpedition()
    this.props.getBrand()
    let tempData = [...this.state.dataKondisi]
    if (this.props.filterKondisi === 'new') {
      tempData[0].active = false
      tempData[1].active = true
      tempData[2].active = false
      this.setState({
        dataSourceKondisi: tempData
      })
    } else if (this.props.filterKondisi === 'used') {
      tempData[0].active = false
      tempData[1].active = false
      tempData[2].active = true
      this.setState({
        dataSourceKondisi: tempData
      })
    }
    if (this.props.filterPrice[0] !== 0) {
      this.setState({
        hargaMinimal: this.props.filterPrice[0]
      })
    }
    if (this.props.filterPrice[1] !== 0) {
      this.setState({
        hargaMaksimal: this.props.filterPrice[1]
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProvinsi.status === 200) {
      this.setState({
        provinsi: this.state.tambahanProvinsi.concat(nextProps.dataProvinsi.provinces)
      })
    }
    if (nextProps.dataKota.status === 200) {
      this.setState({
        kota: this.state.tambahanKota.concat(nextProps.dataKota.districts)
      })
    }
    if (nextProps.dataPengirimanReducer.status === 200) {
      const data = this.state.tambahanPengiriman.concat(nextProps.dataPengirimanReducer.expeditionServices)
      this.setState({
        dataPengiriman: data
      })
    }
    if (nextProps.dataBrandReducer.status === 200) {
      this.setState({
        dataBrand: nextProps.dataBrandReducer.brands
      })
    }
  }

  handleChangeMinimal (text) {
    this.setState({ hargaMinimal: text })
    if (text === '') {
      this.state.filterPrice[0] = 0
    } else {
      this.state.filterPrice[0] = Number(text)
    }
  }

  handleChangeMaksimal (text) {
    this.setState({ hargaMaksimal: text })
    if (text === '' || text === '0' || text === null) {
      this.state.filterPrice[1] = Number(100000000000000000)
    } else {
      this.state.filterPrice[1] = Number(text)
    }
  }

  handlingFilter (valueMin, valueMax) {
    if (valueMax === 0 || valueMax === '') {
      this.props.handlingFilter(
        this.state.filterKondisi,
        this.state.filterPengiriman,
        this.state.filterPrice,
        this.state.filterAddress,
        this.state.filterBrand,
        this.state.filterOthers,
        this.state.provinsiId,
        this.state.provinsiTerpilih,
        this.state.kotaTerpilih
      )
    } else if (valueMax < valueMin) {
      Alert.alert('Pesan', 'Harga Maksimal harus lebih besar dari harga minimal')
    } else if (valueMin <= valueMax) {
      this.props.handlingFilter(
        this.state.filterKondisi,
        this.state.filterPengiriman,
        this.state.filterPrice,
        this.state.filterAddress,
        this.state.filterBrand,
        this.state.filterOthers,
        this.state.provinsiId,
        this.state.provinsiTerpilih,
        this.state.kotaTerpilih
      )
    }
  }

  resetFilter () {
    const { dataKondisi, dataSourceKondisi, dataLainnya, dataSourceLainnya } = this.state
    const newDataSource = dataKondisi.map(data => {
      return {...data, active: data.id === 0}
    })
    dataLainnya[0].active = false
    dataLainnya[1].active = false
    dataLainnya[2].active = false
    const newDataSourceLainnya = dataLainnya.map(data1 => {
      return {...data1}
    })
    this.setState({
      activeKondisi: 0,
      dataSourceKondisi: dataSourceKondisi.cloneWithRows(newDataSource),
      dataSourceLainnya: dataSourceLainnya.cloneWithRows(newDataSourceLainnya),
      hargaMinimal: '',
      hargaMaksimal: '',
      provinsi: [],
      kota: [],
      provinsiId: '',
      provinsiTerpilih: 'Semua Wilayah',
      kotaTerpilih: 'Semua Wilayah',
      filterPengiriman: [],
      filterKondisi: '',
      filterAddress: '',
      filterBrand: [],
      filterOthers: []
    })
    this.props.getProvinsi()
    this.props.getKota(11)
    this.props.getExpedition()
    this.props.getBrand()
  }

  onClickLabel = (selected) => (e) => {
    const {dataObjects, active, dataSource} = this.state
    if (active !== selected) {
      const newDataSource = dataObjects.map(data => {
        return {...data, active: selected === data.id}
      })
      this.setState({
        dataSource: dataSource.cloneWithRows(newDataSource),
        active: selected
      })
    }
  }

  onClickKondisi = (selected) => (e) => {
    const {dataKondisi} = this.state
    let tempData = [...dataKondisi]
    if (parseInt(selected) === 0) {
      if (tempData[selected].active) {
        tempData[0].active = false
        tempData[1].active = false
        tempData[2].active = false
        this.setState({
          dataSourceKondisi: tempData
        })
      } else {
        tempData[0].active = true
        tempData[1].active = true
        tempData[2].active = true
        this.setState({
          dataSourceKondisi: tempData
        })
      }
    } else {
      if (tempData[selected].active) {
        tempData[selected].active = false
        tempData[0].active = false
        this.setState({
          dataSourceKondisi: tempData
        })
      } else {
        tempData[selected].active = true
        this.setState({
          dataSourceKondisi: tempData
        })
      }
    }
    console.log(tempData[selected])
    if (tempData[0].active || ((tempData[1].active && tempData[2].active))) {
      this.setState({
        filterKondisi: ''
      })
    } else if (tempData[1].active) {
      this.setState({
        filterKondisi: 'new'
      })
    } else if (tempData[2].active) {
      this.setState({
        filterKondisi: 'used'
      })
    }
    // if (activeKondisi !== selected) {
    //   const newDataSource = dataKondisi.map(data => {
    //     return {...data, active: selected === data.id}
    //   })
    //   if (dataKondisi[selected - 1].title.includes('Semua')) {
    //     this.setState({
    //       filterKondisi: ''
    //     })
    //   } else if (dataKondisi[selected - 1].title.includes('Baru')) {
    //     this.setState({
    //       filterKondisi: 'new'
    //     })
    //   } else if (dataKondisi[selected - 1].title.includes('Bekas')) {
    //     this.setState({
    //       filterKondisi: 'used'
    //     })
    //   }
    //   this.setState({
    //     dataSourceKondisi: dataSourceKondisi.cloneWithRows(newDataSource),
    //     activeKondisi: selected
    //   })
    // }
  }

  onClickPengiriman (selected) {
    const {dataPengiriman, filterPengiriman} = this.state
    let dummy = filterPengiriman
    let tempData = dataPengiriman
    if (selected === 0) {
      if (dataPengiriman[0].is_checked) {
        var j = dummy.indexOf(dataPengiriman[selected].id)
        if (j !== -1) {
          dummy.splice(j, 1)
        }
        for (var k = 0; k < dataPengiriman.length; k++) {
          tempData[k].is_checked = false
        }
        this.setState({
          dataPengiriman: tempData,
          filterPengiriman: []
        })
      } else if (!dataPengiriman[0].is_checked) {
        // dummy.push(dataPengiriman[selected].id)
        for (var t = 0; t < dataPengiriman.length; t++) {
          tempData[t].is_checked = true
          dummy.push(dataPengiriman[t].id)
        }
        this.setState({
          dataPengiriman: tempData,
          filterPengiriman: dummy
        })
      }
    } else {
      if (dataPengiriman[selected].is_checked) {
        var i = dummy.indexOf(dataPengiriman[selected].id)
        var L = dummy.indexOf(dataPengiriman[0].id)
        if (i !== -1) {
          dummy.splice(i, 1)
          dummy.splice(L, 1)
        }
        tempData[selected].is_checked = false
        tempData[0].is_checked = false
        this.setState({
          dataPengiriman: tempData,
          filterPengiriman: dummy
        })
      } else {
        dummy.push(dataPengiriman[selected].id)
        tempData[selected].is_checked = true
        this.setState({
          dataPengiriman: tempData,
          filterPengiriman: dummy
        })
      }
    }
    this.forceUpdate()
  }

  onClickBrand = (selected) => (e) => {
    const {dataBrand, filterBrand} = this.state
    let dummy = filterBrand
    if (dataBrand[selected].is_checked) {
      var i = dummy.indexOf(dataBrand[selected].id)
      if (i !== -1) {
        dummy.splice(i, 1)
      }
      dataBrand[selected].is_checked = false
      const newDataSource = dataBrand.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceBrand: newDataSource,
        filterBrand: dummy
      })
    } else {
      dummy.push(dataBrand[selected].id)
      dataBrand[selected].is_checked = true
      const newDataSource = dataBrand.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceBrand: newDataSource,
        filterBrand: dummy
      })
    }
  }

  onClickLainnya = (selected) => (e) => {
    const {dataLainnya, dataSourceLainnya, filterOthers} = this.state
    let dummy = filterOthers
    if (dataLainnya[selected - 1].active) {
      var i = dummy.indexOf(dataLainnya[selected - 1].value)
      if (i !== -1) {
        dummy.splice(i, 1)
      }
      dataLainnya[selected - 1].active = false
      const newDataSource = dataLainnya.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceLainnya: dataSourceLainnya.cloneWithRows(newDataSource),
        filterOthers: dummy
      })
    } else {
      dummy.push(dataLainnya[selected - 1].value)
      dataLainnya[selected - 1].active = true
      const newDataSource = dataLainnya.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceLainnya: dataSourceLainnya.cloneWithRows(newDataSource),
        filterOthers: dummy
      })
    }
  }

  renderRow = (rowData) => {
    const rowStyle = rowData.active ? styles.rowStyleActive : styles.rowStyle
    const centang = rowData.active ? Images.centangBiru : null
    return (
      <TouchableOpacity style={rowStyle} onPress={this.onClickLabel(rowData.id)} >
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{rowData.title}</Text>
          <Image
            source={centang}
            style={styles.gambarCentang}
          />
        </View>
      </TouchableOpacity>
    )
  }

  renderRowData = (rowData, sectionID, rowID) => {
    const centang = rowData.active ? Images.centangBiru : null
    return (
      <TouchableOpacity style={styles.rowButton} onPress={this.onClickKondisi(rowID)} >
        <View style={styles.labelContainerSecond}>
          <Text style={styles.label}>{rowData.title}</Text>
          <View style={styles.box}>
            <Image
              source={centang}
              style={styles.gambarCentangBox}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowDataPengiriman = (rowData, sectionID, rowID, highlightRow) => {
    let centang = rowData.is_checked ? Images.centangBiru : null
    for (var i = 0; i < this.state.filterPengiriman.length; i++) {
      if (rowData.id === this.state.filterPengiriman[i]) {
        centang = Images.centangBiru
        break
      }
    }
    return (
      <TouchableOpacity style={styles.rowButton} onPress={() => this.onClickPengiriman(parseInt(rowID))} >
        <View style={styles.labelContainerSecond}>
          <Text style={styles.label}>{rowData.full_name}</Text>
          <View style={styles.box}>
            <Image
              source={centang}
              style={styles.gambarCentangBox}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowDataBrand = (rowData, sectionID, rowID, highlightRow) => {
    let centang = rowData.is_checked ? Images.centangBiru : null
    for (var i = 0; i < this.state.filterBrand.length; i++) {
      if (rowData.id === this.state.filterBrand[i]) {
        centang = Images.centangBiru
        break
      }
    }
    return (
      <TouchableOpacity style={styles.rowButton} onPress={this.onClickBrand(rowID)} >
        <View style={styles.labelContainerSecond}>
          <Text style={styles.label}>{rowData.name}</Text>
          <View style={styles.box}>
            <Image
              source={centang}
              style={styles.gambarCentangBox}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowDataLainnya = (rowData) => {
    let centang = rowData.active ? Images.centangBiru : null
    for (var i = 0; i < this.state.filterOthers.length; i++) {
      if (rowData.value === this.state.filterOthers[i]) {
        centang = Images.centangBiru
        break
      }
    }
    return (
      <TouchableOpacity style={styles.rowButton} onPress={this.onClickLainnya(rowData.id)} >
        <View style={styles.labelContainerSecond}>
          <Text style={styles.label}>{rowData.title}</Text>
          <View style={styles.box}>
            <Image
              source={centang}
              style={styles.gambarCentangBox}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  provinsiValue = (key: string, value: number) => {
    if (key.includes('Semua')) {
      this.setState({
        provinsiTerpilih: key,
        kotaTerpilih: 'Semua Wilayah',
        filterAddress: ''
      })
    } else {
      this.setState({
        provinsiTerpilih: key,
        kotaTerpilih: 'Pilih Kota',
        provinsiId: this.state.provinsi[value].id
      })
      this.props.getKota(this.state.provinsi[value].id)
    }
  }

  kotaValue = (key: string, value: number) => {
    if (key.includes('Pilih')) {
      this.setState({
        kotaTerpilih: key,
        filterAddress: ''
      })
    } else {
      this.setState({
        kotaTerpilih: key,
        filterAddress: this.state.kota[value].id
      })
    }
  }

  renderRightView = () => {
    const {active} = this.state
    switch (active) {
      case 1:
        return (
          <ListView
            dataSource={this.dataSourcePengiriman.cloneWithRows(this.state.dataKondisi)}
            renderRow={this.renderRowData}
          />
        )
      case 2:
        return (
          <ListView
            enableEmptySections
            dataSource={this.dataSourcePengiriman.cloneWithRows(this.state.dataPengiriman)}
            renderRow={this.renderRowDataPengiriman}
          />)
      case 3:
        const { hargaMinimal, hargaMaksimal } = this.state
        return (
          <View style={styles.rentanHargaContainer}>
            <Text style={styles.textHarga}>
              Harga Minimal
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.textHarga}>
                Rp{' '}
              </Text>
              <TextInput
                style={styles.inputText}
                value={String(hargaMinimal)}
                keyboardType='numeric'
                onChangeText={this.handleChangeMinimal.bind(this)}
                underlineColorAndroid='transparent'
                placeholder='100.000'
              />
            </View>
            <Text style={styles.textHarga}>
              Harga Maksimal
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.textHarga}>
                Rp{' '}
              </Text>
              <TextInput
                style={styles.inputText}
                value={String(hargaMaksimal)}
                keyboardType='numeric'
                onChangeText={this.handleChangeMaksimal.bind(this)}
                underlineColorAndroid='transparent'
                placeholder='250.000'
              />
            </View>
          </View>
        )
      case 4:
        const { provinsi, kota } = this.state
        const dataProvinsi = provinsi.map(provinsi =>
        (<Picker.Item
          key={provinsi.id}
          label={provinsi.name}
          value={provinsi.name}
          color={Colors.darkgrey}
        />))
        const dataKota = kota.map(kota =>
        (<Picker.Item
          key={kota.id}
          label={kota.name}
          value={kota.name}
          color={Colors.darkgrey}
        />))
        return (
          <View style={styles.rentanHargaContainer}>
            <Text style={styles.textHarga}>
              Wilayah / Provinsi
            </Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.provinsiTerpilih}
              onValueChange={this.provinsiValue.bind(this)}
              mode='dropdown'
            >
              {dataProvinsi}
            </Picker>
            <View style={styles.separator} />
            <Text style={styles.textHarga}>
              Kota
            </Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.kotaTerpilih}
              onValueChange={this.kotaValue.bind(this)}
              mode='dropdown'
            >
              {dataKota}
            </Picker>
            <View style={styles.separator} />
          </View>
        )
      case 5:
        return (
          <ListView
            dataSource={this.dataSourcePengiriman.cloneWithRows(this.state.dataBrand)}
            renderRow={this.renderRowDataBrand}
          />
        )
      case 6:
        return (
          <ListView
            dataSource={this.state.dataSourceLainnya}
            renderRow={this.renderRowDataLainnya}
          />
        )
    }
  }

  render () {
    const { filterPrice } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.mainContainerFilter}>
          <ListView
            style={styles.firstView}
            contentContainerStyle={styles.rowStyle}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            pageSize={15} />
          <View style={styles.secondView}>
            {this.renderRightView()}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.resetFilter()}>
            <Text style={styles.labelButtonReset}>
              Reset Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOke} onPress={() => this.handlingFilter(filterPrice[0], filterPrice[1])}>
            <Text style={styles.labelButtonOke}>
              Terapkan Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProvinsi: state.provinces,
    dataKota: state.districts,
    dataPengirimanReducer: state.expeditionServices,
    dataBrandReducer: state.brands
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProvinsi: () => dispatch(filterAction.getProvince()),
    getKota: (id) => dispatch(filterAction.getDistrict({ province_id: id })),
    getExpedition: () => dispatch(expeditionAction.getServices()),
    getBrand: () => dispatch(brandAction.getBrand())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
