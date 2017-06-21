import React from 'react'
import { View, Text, ListView, TouchableOpacity, Image, Picker } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import styles from './Styles/FilterStyle'
import { Images, Colors } from '../Themes'

export default class Filter extends React.Component {
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
    const dataPengiriman = [
      {id: 1, title: 'Semua Ekspedisi', active: false},
      {id: 2, title: 'JNE Reguler', active: false},
      {id: 3, title: 'JNE Yes', active: false},
      {id: 4, title: 'JNE OKE', active: false},
      {id: 5, title: 'JNE Popbx', active: false},
      {id: 6, title: 'JNE CTC', active: false},
      {id: 7, title: 'JNE CTC OKE', active: false},
      {id: 8, title: 'JNE CTC YES', active: false}
    ]
    const dataBrand = [
      {id: 1, title: 'Semua Brand', active: false},
      {id: 2, title: 'Adidas', active: false},
      {id: 3, title: 'Nike', active: false},
      {id: 4, title: 'New Balance', active: false},
      {id: 5, title: 'Diadora', active: false},
      {id: 6, title: 'Reebok', active: false},
      {id: 7, title: 'Umbro', active: false}
    ]
    const dataLainnya = [
      {id: 1, title: 'Diskon', active: false},
      {id: 2, title: 'Seller Terverifikasi', active: false},
      {id: 3, title: 'Grosir', active: false}
    ]
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      dataSourceKondisi: ds.cloneWithRows(dataKondisi),
      dataSourcePengiriman: ds.cloneWithRows(dataPengiriman),
      dataSourceBrand: ds.cloneWithRows(dataBrand),
      dataSourceLainnya: ds.cloneWithRows(dataLainnya),
      dataObjects,
      dataKondisi,
      dataPengiriman,
      dataBrand,
      dataLainnya,
      active: 1,
      hargaMinimal: '',
      hargaMaksimal: '',
      provinsi: [
        {id: 1, title: 'DKI Jakarta'},
        {id: 2, title: 'Jawa Barat'},
        {id: 3, title: 'Jawa Tengah'}
      ],
      kota: [
        {id: 1, title: 'Jakarta'},
        {id: 2, title: 'Tangerang'},
        {id: 3, title: 'Yogyakarta'}
      ],
      provinsiTerpilih: 'DKI Jakarta',
      kotaTerpilih: 'Jakarta'
    }
  }

  handleChangeMinimal (text) {
    this.setState({ hargaMinimal: text })
  }

  handleChangeMaksimal (text) {
    this.setState({ hargaMaksimal: text })
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
    const {dataKondisi, dataSourceKondisi} = this.state
    if (dataKondisi[selected - 1].active) {
      dataKondisi[selected - 1].active = false
      const newDataSource = dataKondisi.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceKondisi: dataSourceKondisi.cloneWithRows(newDataSource)
      })
    } else {
      dataKondisi[selected - 1].active = true
      const newDataSource = dataKondisi.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceKondisi: dataSourceKondisi.cloneWithRows(newDataSource)
      })
    }
  }

  onClickPengiriman = (selected) => (e) => {
    const {dataPengiriman, dataSourcePengiriman} = this.state
    if (dataPengiriman[selected - 1].active) {
      dataPengiriman[selected - 1].active = false
      const newDataSource = dataPengiriman.map(data => {
        return {...data}
      })
      this.setState({
        dataSourcePengiriman: dataSourcePengiriman.cloneWithRows(newDataSource)
      })
    } else {
      dataPengiriman[selected - 1].active = true
      const newDataSource = dataPengiriman.map(data => {
        return {...data}
      })
      this.setState({
        dataSourcePengiriman: dataSourcePengiriman.cloneWithRows(newDataSource)
      })
    }
  }

  onClickBrand = (selected) => (e) => {
    const {dataBrand, dataSourceBrand} = this.state
    if (dataBrand[selected - 1].active) {
      dataBrand[selected - 1].active = false
      const newDataSource = dataBrand.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceBrand: dataSourceBrand.cloneWithRows(newDataSource)
      })
    } else {
      dataBrand[selected - 1].active = true
      const newDataSource = dataBrand.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceBrand: dataSourceBrand.cloneWithRows(newDataSource)
      })
    }
  }

  onClickLainnya = (selected) => (e) => {
    const {dataLainnya, dataSourceLainnya} = this.state
    if (dataLainnya[selected - 1].active) {
      dataLainnya[selected - 1].active = false
      const newDataSource = dataLainnya.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceLainnya: dataSourceLainnya.cloneWithRows(newDataSource)
      })
    } else {
      dataLainnya[selected - 1].active = true
      const newDataSource = dataLainnya.map(data => {
        return {...data}
      })
      this.setState({
        dataSourceLainnya: dataSourceLainnya.cloneWithRows(newDataSource)
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

  renderRowDataPengiriman = (rowData) => {
    const centang = rowData.active ? Images.centang : null
    return (
      <TouchableOpacity style={styles.rowButton} onPress={this.onClickPengiriman(rowData.id)} >
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

  renderRowDataBrand = (rowData) => {
    const centang = rowData.active ? Images.centang : null
    return (
      <TouchableOpacity style={styles.rowButton} onPress={this.onClickBrand(rowData.id)} >
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

  provinsiValue = (key: string, value: string) => {
    this.setState({
      provinsiTerpilih: value
    })
  }

  kotaValue = (key: string, value: string) => {
    this.setState({
      kotaTerpilih: value
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
            dataSource={this.state.dataSourcePengiriman}
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
              <TextInputMask
                type={'money'}
                options={{ unit: 'Rp ', separator: '.', delimiter: '.', precision: 3 }}
                style={styles.inputText}
                value={hargaMinimal}
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
              <TextInputMask
                type={'money'}
                options={{ unit: 'Rp ', separator: '.', delimiter: '.', precision: 3 }}
                style={styles.inputText}
                value={hargaMaksimal}
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
          label={provinsi.title}
          value={provinsi.title}
          color={Colors.darkgrey}
        />))
        const dataKota = kota.map(kota =>
        (<Picker.Item
          key={kota.id}
          label={kota.title}
          value={kota.title}
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
              onValueChange={this.provinsiValue.bind(this, 'provinsiTerpilih')}
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
              onValueChange={this.kotaValue.bind(this, 'kotaTerpilih')}
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
            dataSource={this.state.dataSourceBrand}
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
          <TouchableOpacity style={styles.buttonReset}>
            <Text style={styles.labelButtonReset}>
              Reset Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOke}>
            <Text style={styles.labelButtonOke}>
              Terapkan Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
