import React from 'react'
import { View, Text, ListView, TouchableOpacity, Image, Picker, TextInput } from 'react-native'
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
      {id: 3, title: 'Rentan Harga', active: false},
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
          'full_name': 'Semua Ekspedisi'
        }
      ],
      dataBrand: [],
      dataLainnya,
      active: 1,
      activeKondisi: 0,
      hargaMinimal: '',
      hargaMaksimal: '',
      provinsi: [],
      kota: [],
      provinsiTerpilih: 'DKI Jakarta',
      kotaTerpilih: 'Jakarta',
      filterPengiriman: [],
      filterKondisi: '',
      filterAddress: 1116,
      filterBrand: [],
      filterOthers: []
    }
  }

  componentDidMount () {
    this.props.getProvinsi()
    this.props.getKota(11)
    this.props.getExpedition()
    this.props.getBrand()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProvinsi.status === 200) {
      this.setState({
        provinsi: nextProps.dataProvinsi.provinces
      })
    }
    if (nextProps.dataKota.status === 200) {
      this.setState({
        kota: nextProps.dataKota.districts
      })
    }
    if (nextProps.dataPengirimanReducer.status === 200) {
      this.setState({
        dataPengiriman: this.state.tambahanPengiriman.concat(nextProps.dataPengirimanReducer.expeditions)
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
  }

  handleChangeMaksimal (text) {
    this.setState({ hargaMaksimal: text })
  }

  terapkanFilter () {
    console.log('kondisi', this.state.filterKondisi)
    console.log('pengiriman', JSON.stringify(this.state.filterPengiriman).replace('[', '').replace(']', '').replace('0,', ''))
    if (this.state.hargaMinimal === '' && this.state.hargaMaksimal === '') {
      console.log('price', 50 + '-' + 10000000000)
    } else if (this.state.hargaMinimal !== '' && this.state.hargaMaksimal === '') {
      console.log('price', this.state.hargaMinimal + '-' + 10000000000)
    } else if (this.state.hargaMinimal === '' && this.state.hargaMaksimal !== '') {
      console.log('price', 50 + '-' + this.state.hargaMaksimal)
    } else {
      console.log('price', this.state.hargaMinimal + '-' + this.state.hargaMaksimal)
    }
    console.log('address', this.state.filterAddress)
    console.log('brand', JSON.stringify(this.state.filterBrand).replace('[', '').replace(']', '').replace('0,', ''))
    console.log('others', JSON.stringify(this.state.filterOthers).replace('[', '').replace(']', '').replace(/"/gi, ''))
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
      provinsiTerpilih: 'DKI Jakarta',
      kotaTerpilih: 'Jakarta',
      filterPengiriman: [],
      filterKondisi: '',
      filterAddress: 1116,
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
    const {dataKondisi, activeKondisi, dataSourceKondisi} = this.state
    if (activeKondisi !== selected) {
      const newDataSource = dataKondisi.map(data => {
        return {...data, active: selected === data.id}
      })
      if (dataKondisi[selected - 1].title.includes('Semua')) {
        this.setState({
          filterKondisi: ''
        })
      } else if (dataKondisi[selected - 1].title.includes('Baru')) {
        this.setState({
          filterKondisi: 'new'
        })
      } else if (dataKondisi[selected - 1].title.includes('Bekas')) {
        this.setState({
          filterKondisi: 'used'
        })
      }
      this.setState({
        dataSourceKondisi: dataSourceKondisi.cloneWithRows(newDataSource),
        activeKondisi: selected
      })
    }
  }

  onClickPengiriman = (selected) => (e) => {
    const {dataPengiriman, filterPengiriman} = this.state
    let dummy = filterPengiriman
    if (dataPengiriman[selected].is_checked !== null) {
      var i = dummy.indexOf(dataPengiriman[selected].id)
      if (i !== -1) {
        dummy.splice(i, 1)
      }
      dataPengiriman[selected].is_checked = null
      const newDataSource = dataPengiriman.map(data => {
        return {...data}
      })
      this.setState({
        dataSourcePengiriman: newDataSource,
        filterPengiriman: dummy
      })
    } else {
      dummy.push(dataPengiriman[selected].id)
      dataPengiriman[selected].is_checked = 1
      const newDataSource = dataPengiriman.map(data => {
        return {...data}
      })
      this.setState({
        dataSourcePengiriman: newDataSource,
        filterPengiriman: dummy
      })
    }
  }

  onClickBrand = (selected) => (e) => {
    const {dataBrand, filterBrand} = this.state
    let dummy = filterBrand
    if (dataBrand[selected].is_checked !== null) {
      var i = dummy.indexOf(dataBrand[selected].id)
      if (i !== -1) {
        dummy.splice(i, 1)
      }
      dataBrand[selected].is_checked = null
      const newDataSource = dataBrand.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceBrand: newDataSource,
        filterBrand: dummy
      })
    } else {
      dummy.push(dataBrand[selected].id)
      dataBrand[selected].is_checked = 1
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
    const centang = rowData.active ? Images.centang : null
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

  renderRowData = (rowData) => {
    const centang = rowData.active ? Images.centang : null
    return (
      <TouchableOpacity style={styles.rowButton} onPress={this.onClickKondisi(rowData.id)} >
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
    const centang = rowData.is_checked !== null ? Images.centang : null
    return (
      <TouchableOpacity style={styles.rowButton} onPress={this.onClickPengiriman(rowID)} >
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
    const centang = rowData.is_checked ? Images.centang : null
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
    const centang = rowData.active ? Images.centang : null
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
    this.setState({
      provinsiTerpilih: key
    })
    this.props.getKota(this.state.provinsi[value].id)
  }

  kotaValue = (key: string, value: number) => {
    this.setState({
      kotaTerpilih: key,
      filterAddress: this.state.kota[value].id
    })
  }

  renderRightView = () => {
    const {active} = this.state
    switch (active) {
      case 1:
        return (
          <ListView
            dataSource={this.state.dataSourceKondisi}
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
              <TextInput
                style={styles.inputText}
                value={hargaMinimal}
                keyboardType='numeric'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeMinimal.bind(this)}
                underlineColorAndroid='transparent'
                placeholder='100.000'
              />
            </View>
            <Text style={styles.textHarga}>
              Harga Maksimal
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={hargaMaksimal}
                keyboardType='numeric'
                autoCapitalize='none'
                autoCorrect
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
          <TouchableOpacity style={styles.buttonOke} onPress={() => this.terapkanFilter()}>
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
