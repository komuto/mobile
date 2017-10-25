import React from 'react'
import { ToastAndroid, ActivityIndicator, ScrollView, Modal, TextInput, Text, View, Image, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CameraModal from '../Components/CameraModal'
import moment from 'moment'
import * as userAction from '../actions/user'
import * as storeAction from '../actions/stores'

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
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      notif: this.props.notif,
      messageNotif: this.props.messageNotif,
      page: this.props.page || 0,
      modalCreateComplaint: false,
      dataPriority: [
        {'label': 'High', 'value': 3, 'isChecked': false},
        {'label': 'Medium', 'value': 2, 'isChecked': false},
        {'label': 'Low', 'value': 1, 'isChecked': false}
      ],
      dataTopic: [
        {'label': 'Umum', 'value': 4, 'isChecked': false},
        {'label': 'Info', 'value': 3, 'isChecked': false},
        {'label': 'Transaksi', 'value': 2, 'isChecked': false},
        {'label': 'Lainnya', 'value': 1, 'isChecked': false}
      ],
      dataPriorityStore: [
        {'label': 'High', 'value': 3, 'isChecked': false},
        {'label': 'Medium', 'value': 2, 'isChecked': false},
        {'label': 'Low', 'value': 1, 'isChecked': false}
      ],
      dataTopicStore: [
        {'label': 'Umum', 'value': 4, 'isChecked': false},
        {'label': 'Info', 'value': 3, 'isChecked': false},
        {'label': 'Transaksi', 'value': 2, 'isChecked': false},
        {'label': 'Lainnya', 'value': 1, 'isChecked': false}
      ],
      titleComplaint: '',
      messageComplaint: '',
      foto: [],
      showModalCamera: false,
      count: 0,
      images: [],
      dataResolve: [],
      dataUnresolve: [],
      choosenPriority: '',
      choosenTopic: '',
      buttonDisable: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataResolutionResolve.status === 200 && nextProps.dataResolutionUnresolve.status === 200) {
      this.setState({
        dataResolve: nextProps.dataResolutionResolve.resolutions,
        dataUnresolve: nextProps.dataResolutionUnresolve.resolutions,
        loading: false
      })
    }
    if (nextProps.dataPhoto.status === 200) {
      this.props.createResolution(
        this.state.choosenPriority,
        this.state.choosenTopic,
        this.state.titleComplaint,
        this.state.messageComplaint,
        nextProps.dataPhoto.payload.images
      )
      this.setState({
        modalCreateComplaint: false,
        buttonDisable: false,
        notif: true,
        messageNotif: 'Berhasil mengirim keluhan',
        messageComplaint: '',
        titleComplaint: '',
        dataPriority: this.state.dataPriorityStore,
        dataTopic: this.state.dataTopicStore
      })
      nextProps.dataPhoto.status = 0
    }
    if (nextProps.dataCreateResolution.status === 200 && this.state.foto) {
      this.props.getListResolutionUnresolve()
      this.setState({
        modalCreateComplaint: false,
        buttonDisable: false,
        notif: true,
        messageNotif: 'Berhasil mengirim keluhan',
        messageComplaint: '',
        titleComplaint: '',
        dataPriority: this.state.dataPriorityStore,
        dataTopic: this.state.dataTopicStore
      })
      nextProps.dataCreateResolution.status = 0
    }
    if (nextProps.dataPhoto.status !== 200 && nextProps.dataPhoto.status !== 0 && nextProps.dataCreateResolution.status !== 200 && nextProps.dataCreateResolution.status !== 0) {
      this.setState({buttonDisable: false})
      ToastAndroid.show(nextProps.dataPhoto.message, ToastAndroid.LONG)
    }
    if (nextProps.dataResolutionResolve.status !== 200 && nextProps.dataResolutionResolve.status !== 0 && nextProps.dataResolutionUnresolve.status !== 200 && nextProps.dataResolutionUnresolve.status !== 0) {
      ToastAndroid.show(nextProps.dataResolutionResolve.message, ToastAndroid.LONG)
    }
  }

  componentDidMount () {
    this.refresh()
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

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{this.state.messageNotif}</Text>
          <TouchableOpacity onPress={() => this.setState({notif: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
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

  renderRowPriority (rowData, y, x) {
    const checkPriority = rowData.isChecked ? Images.centangBiru : null
    return (
      <TouchableOpacity style={styles.continerCheckBox} onPress={() => this.onClickPriority(x)}>
        <View style={styles.box}>
          <Image
            source={checkPriority}
            style={styles.gambarCentangBox}
          />
        </View>
        <Text style={styles.title}>{rowData.label}</Text>
      </TouchableOpacity>
    )
  }

  onClickPriority (index) {
    const {dataPriority} = this.state
    let id
    for (var k = 0; k < dataPriority.length; k++) {
      dataPriority[k].isChecked = false
    }
    if (dataPriority[index].isChecked) {
      dataPriority[index].isChecked = false
    } else {
      dataPriority[index].isChecked = true
      id = dataPriority[index].value
    }
    const newDataSource = dataPriority.map(data => {
      return {...data}
    })
    this.setState({
      dataPriority: newDataSource,
      choosenPriority: id
    })
  }

  renderRowTopic (rowData, y, x) {
    const checkTopic = rowData.isChecked ? Images.centangBiru : null
    return (
      <TouchableOpacity style={styles.continerCheckBox} onPress={() => this.onClickTopic(x)}>
        <View style={styles.box}>
          <Image
            source={checkTopic}
            style={styles.gambarCentangBox}
          />
        </View>
        <Text style={styles.title}>{rowData.label}</Text>
      </TouchableOpacity>
    )
  }

  onClickTopic (index) {
    const {dataTopic} = this.state
    let id
    for (var k = 0; k < dataTopic.length; k++) {
      dataTopic[k].isChecked = false
    }
    if (dataTopic[index].isChecked) {
      dataTopic[index].isChecked = false
    } else {
      dataTopic[index].isChecked = true
      id = dataTopic[index].value
    }
    const newDataSources = dataTopic.map(data => {
      return {...data}
    })
    this.setState({
      dataTopic: newDataSources,
      choosenTopic: id
    })
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
                renderRow={this.renderRowTopic.bind(this)}
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
                  onSubmitEditing={() => this.refs.titleComplaint.focus()}
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
                  onPress={() => {
                    this.setState({showModalCamera: false})
                  }}
                  onPhotoCaptured={(path) => {
                    this.addPhoto(path)
                  }}
                />
                {this.thumnailFoto()}
              </View>
              <View style={{backgroundColor: Colors.background, marginBottom: 30}}>
                <TouchableOpacity disabled={this.state.buttonDisable} style={[styles.buttonnext]} onPress={() => this.sendComplaint()}>
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

  onError (field) {
    switch (field) {
      case 'priority':
        ToastAndroid.show('Pilih salah satu Prioritas', ToastAndroid.SHORT)
        break
      case 'topic':
        ToastAndroid.show('Pilih salah satu Topik', ToastAndroid.SHORT)
        break
      case 'title':
        ToastAndroid.show('Judul Keluhan harus diisi', ToastAndroid.SHORT)
        break
      case 'message':
        ToastAndroid.show('Pesan Keluhan harus diisi', ToastAndroid.SHORT)
        break
      case 'empty':
        ToastAndroid.show('Informasi Keluhan tidak boleh kosong', ToastAndroid.SHORT)
        break
    }
  }

  sendComplaint () {
    const {choosenPriority, choosenTopic, messageComplaint, titleComplaint} = this.state
    if (choosenPriority === '' && choosenTopic === '' && messageComplaint === '' && titleComplaint === '') {
      this.onError('empty')
    } else if (choosenPriority === '') {
      this.onError('priority')
    } else if (choosenTopic === '') {
      this.onError('topic')
    } else if (titleComplaint === '') {
      this.onError('title')
    } else if (messageComplaint === '') {
      this.onError('message')
    } else {
      this.setState({loading: true, buttonDisable: true})
      if (this.state.foto) {
        this.props.createResolution(
          this.state.choosenPriority,
          this.state.choosenTopic,
          this.state.titleComplaint,
          this.state.messageComplaint,
        )
      } else {
        const postData = new FormData()
        this.state.foto.map(data => {
          postData.append('images', { uri: data, type: 'image/jpg', name: 'image.jpg' })
        })
        postData.append('type', 'resolution')
        this.props.photoUpload(postData)
      }
    }
  }

  handleDetailResolution (id) {
    this.setState({idResolution: id})
    this.props.getDetailResolution(id)
    NavigationActions.buyerdetailresolution({
      type: ActionConst.PUSH,
      idResolution: id
    })
  }

  checkTopic (data) {
    if (data === 1) {
      return (
        <Text style={styles.textStatus}>Umum</Text>
      )
    } if (data === 2) {
      return (
        <Text style={styles.textStatus}>Info</Text>
      )
    } if (data === 3) {
      return (
        <Text style={styles.textStatus}>Transaksi</Text>
      )
    } if (data === 4) {
      return (
        <Text style={styles.textStatus}>Lainnya</Text>
      )
    }
  }

  renderRowUnresolveResolution (rowData) {
    var timeStampToDate = moment.unix(rowData.created_at).format('DD MMMM YYYY').toString()
    return (
      <TouchableOpacity style={styles.tabWaiting} onPress={() => this.handleDetailResolution(rowData.id)}>
        <View style={styles.containerResolution}>
          <Text style={styles.textResolution}>{rowData.title}</Text>
          <View style={styles.label}>
            {this.checkTopic(rowData.topic)}
          </View>
        </View>
        <Text style={styles.date}>{timeStampToDate}</Text>
      </TouchableOpacity>
    )
  }

  renderRowResolveResolution (rowData) {
    var timeStampToDate = moment.unix(rowData.created_at).format('DD MMMM YYYY').toString()
    return (
      <TouchableOpacity onPress={() => this.handleDetailResolution(rowData.id)}>
        <View style={styles.tabWaiting}>
          <View style={styles.containerResolution}>
            <Text style={styles.textResolution}>{rowData.title}</Text>
            <View style={styles.label}>
              {this.checkTopic(rowData.topic)}
            </View>
          </View>
          <Text style={styles.date}>{timeStampToDate}</Text>
        </View>
        <View style={styles.containerStatus}>
          <View style={styles.circle} >
            <Text style={styles.label2}>i</Text>
          </View>
          <Text style={styles.label3}>Dinyatakan selesai oleh Admin</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
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
            {this.notif()}
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataUnresolve)}
              renderRow={this.renderRowUnresolveResolution.bind(this)}
              enableEmptySections
            />
            {spinner}
          </ScrollView>
          <ScrollView tabLabel='Terselesaikan' ref='complete' style={styles.scrollView}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataResolve)}
              renderRow={this.renderRowResolveResolution.bind(this)}
              enableEmptySections
            />
          </ScrollView>
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

const mapStateToProps = (state) => ({
  dataResolutionResolve: state.resolvedResolutions,
  dataResolutionUnresolve: state.unresolvedResolutions,
  dataPhoto: state.upload,
  dataCreateResolution: state.createResolution
})

const mapDispatchToProps = (dispatch) => ({
  getDetailResolution: (id) => dispatch(userAction.getResolutionDetail({id: id})),
  createResolution: (priority, topic, title, message, images) =>
    dispatch(userAction.createResolution({
      priority: priority,
      topic: topic,
      title: title,
      message: message,
      images: images
    })),
  photoUpload: (data) => dispatch(storeAction.photoUpload({data: data})),
  getListResolutionUnresolve: () => dispatch(userAction.getUnresolvedResolutions())
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerResolution)
