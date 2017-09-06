import React from 'react'
import { ScrollView, Modal, TextInput, Text, View, Image, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CameraModal from '../Components/CameraModal'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BuyerResolutionStyle'
import { Colors, Images } from '../Themes/'

class BuyerResolution extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: true,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      dataWaiting: [],
      dataApprove: [],
      notif: this.props.notif,
      messageNotif: this.props.messageNotif,
      page: this.props.page || 0,
      modalCreateComplaint: false,
      dataPriority: [
        {'label': 'High', 'value': 3},
        {'label': 'Medium', 'value': 2},
        {'label': 'Low', 'value': 1}
      ],
      dataTopic: [
        {'label': 'Umum', 'value': 4},
        {'label': 'Info', 'value': 3},
        {'label': 'Transaksi', 'value': 2},
        {'label': 'Lainnya', 'value': 1}
      ],
      titleComplaint: '',
      messageComplaint: '',
      foto: [],
      showModalCamera: false,
      count: 0,
      images: []
    }
  }

  loadMore () {
    const { id, page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.props.reviewAction(id, page)
      }
    }
  }

  refresh = () => {
    const { id } = this.state
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    this.props.reviewAction(id, 1)
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
        style={styles.listView}
      />
    )
  }

  handleResolution (typeMessage) {
    NavigationActions.detailresolution({
      type: ActionConst.PUSH
    })
  }

  handleChangeTitle = (text) => {
    this.setState({ titleComplaint: text })
  }

  handleChangeMessage = (text) => {
    this.setState({ messageComplaint: text })
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity onPress={() => this.handleResolution()} style={styles.renderRow}>
        <View style={styles.border}>
          <View style={styles.profile}>
            <Image
              source={{ uri: rowData.photoProduct }}
              style={styles.styleFotoToko}
            />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                {rowData.productName}
              </Text>
              <Text style={styles.textKelola}>
                {rowData.storeName}
              </Text>
            </View>
          </View>
          <View style={styles.messages}>
            <Text style={styles.textMessage}>{rowData.review}</Text>
          </View>
          <View style={styles.status}>
            <View style={styles.iconStatus} />
            <Text style={styles.textNama}>
              Dalam Tahap Review Pihak Komuto
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  checkStateResolution (data) {
    if (data.length > 0) {
      return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(data)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
        />
      )
    } else {
      return (
        <View style={styles.containerEmpty}>
          <Image source={Images.emptyResolution} style={{width: 173, height: 178}} />
          <Text style={styles.textTitleEmpty}>Pusat Resolusi Kosong</Text>
          <Text style={styles.textTitleEmpty2}>Anda belum memiliki hal untuk didiskusikan{'\n'}penyelesaian masalahnya</Text>
        </View>
      )
    }
  }

  renderRowPriority (rowData) {
    return (
      <TouchableOpacity style={styles.continerCheckBox} onPress={() => {}}>
        <View style={styles.box}>
          <Image
            source={Images.centangBiru}
            style={styles.gambarCentangBox}
          />
        </View>
        <Text style={styles.title}>{rowData.label}</Text>
      </TouchableOpacity>
    )
  }

  renderRowTopic (rowData) {
    return (
      <TouchableOpacity style={styles.continerCheckBox} onPress={() => {}}>
        <View style={styles.box}>
          <Image
            source={Images.centangBiru}
            style={styles.gambarCentangBox}
          />
        </View>
        <Text style={styles.title}>{rowData.label}</Text>
      </TouchableOpacity>
    )
  }

  thumnailFoto () {
    if (this.state.foto.length < 0) {
      return (
        <View />
      )
    } else {
      const mapFoto = this.state.foto.map((data, i) => {
        return (
          <View key={i} style={{flexDirection: 'row'}}>
            <View style={styles.foto}>
              <TouchableOpacity>
                <View style={styles.fotoTumb}>
                  <Image source={{uri: data}} style={styles.imageProduk} />
                </View>
              </TouchableOpacity>
              <View style={styles.containerDiskon}>
                <TouchableOpacity onPress={() => this.removePhoto(i)}>
                  <Image source={Images.closeCircleBack} style={styles.imageClose} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      })
      return (
        <View>
          <ScrollView horizontal contentContainerStyle={{paddingBottom: 12}}>
            {mapFoto}
            <View style={styles.foto}>
              <TouchableOpacity onPress={() => this.setState({showModalCamera: true})}>
                <View style={styles.fotoTumb}>
                  <Image source={Images.tambahWhite} style={styles.imageTambahProduk} />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )
    }
  }

  removePhoto (i) {
    let temp = this.state.foto
    temp.splice(i, 1)
    this.setState({foto: temp})
  }

  addPhoto (photo, i) {
    let temp = this.state.foto
    temp.push(photo)
    this.setState({foto: temp, showModalCamera: false})
  }

  modalBuyerCreateComplaint () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalCreateComplaint}
        onRequestClose={() => this.setState({ modalCreateComplaint: false })}
        >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Kirim Keluhan</Text>
            <TouchableOpacity style={styles.touchableClose} onPress={() => this.setState({modalCreateComplaint: false})}>
              <Image source={Images.closewhite} style={styles.imageTambah} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.containerComplaint}>
              <Text style={styles.textTitle}>Prioritas</Text>
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.dataPriority)}
                renderRow={this.renderRowPriority.bind(this)}
                enableEmptySections
              />
              <Text style={[styles.textTitle, {paddingTop: 30}]}>Topik Keluhan</Text>
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.dataTopic)}
                renderRow={this.renderRowPriority.bind(this)}
                enableEmptySections
              />
              <Text style={[styles.textTitle, {paddingTop: 30}]}>Judul Keluhan</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref='titleComplaint'
                  style={styles.inputText}
                  value={this.state.titleComplaint}
                  keyboardType='default'
                  returnKeyType='next'
                  onSubmitEditing={() => this.refs.slogan.focus()}
                  autoCapitalize='none'
                  autoCorrect
                  onChangeText={this.handleChangeTitle}
                  underlineColorAndroid='transparent'
                  placeholder=''
                />
              </View>
              <Text style={[styles.textTitle, {paddingTop: 30}]}>Pesan Keluhan</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  ref='titleComplaint'
                  style={styles.inputText}
                  value={this.state.messageComplaint}
                  keyboardType='default'
                  returnKeyType='done'
                  autoCapitalize='none'
                  autoCorrect
                  onChangeText={this.handleChangeMessage}
                  underlineColorAndroid='transparent'
                  placeholder=''
                />
              </View>
              <Text style={[styles.textTitle, {paddingTop: 30}]}>Upload Foto</Text>
              <View style={styles.camera}>
                <CameraModal
                  visible={this.state.showModalCamera}
                  onClose={() => {
                    this.setState({showModalCamera: false})
                  }}
                  onPhotoCaptured={(path) => {
                    this.addPhoto(path)
                  }}
                />
                {this.thumnailFoto()}
              </View>
              <View style={{backgroundColor: Colors.background}}>
                <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.sendComplaint()}>
                  <Text style={styles.textButtonNext}>
                    Kirim Keluhan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  sendComplaint () {
    this.setState({modalCreateComplaint: false})
  }

  handleDetailResolution () {
    NavigationActions.buyerdetailresolution({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
          initialPage={this.state.page}
        >
          <ScrollView tabLabel='Menunggu' ref='waiting' style={styles.scrollView}>
            <TouchableOpacity style={styles.tabWaiting} onPress={() => this.handleDetailResolution()}>
              <View style={styles.containerResolution}>
                <Text style={styles.textResolution}>Uang Refund saya belum juga masuk saldo, padahal di menu transaksinya sudah di refund oleh seller</Text>
                <View style={styles.label}>
                  <Text style={styles.textStatus}>Transaksi</Text>
                </View>
              </View>
              <Text style={styles.date}>23 Agustus 2017</Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView tabLabel='Terselesaikan' ref='complete' style={styles.scrollView} />
        </ScrollableTabView>
        <TouchableOpacity style={styles.create} onPress={() => this.setState({modalCreateComplaint: true})}>
          <View elevation={9}>
            <Image source={Images.tambahWhite} style={styles.imageTambah} />
          </View>
        </TouchableOpacity>
        {this.modalBuyerCreateComplaint()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerResolution)
