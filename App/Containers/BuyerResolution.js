import React from 'react'
import { ToastAndroid, RefreshControl, ActivityIndicator, ScrollView, Modal, TextInput, Text, View, Image, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CameraModal from '../Components/CameraModal'
import * as userAction from '../actions/user'
import * as storeAction from '../actions/stores'
import {isFetching, isError, isFound} from '../Services/Status'
import moment from 'moment'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BuyerResolutionStyle'
import { Colors, Images } from '../Themes/'

class BuyerResolution extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      done: false,
      waiting: false,
      upload: false,
      create: false
    }
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
      choosenPriority: 1,
      choosenTopic: 1,
      buttonDisable: false,
      resolveState: {
        data: [],
        page: 1,
        loadmore: false,
        isRefreshing: true,
        isLoading: true,
        gettingData: true
      },
      unresolveState: {
        data: [],
        page: 1,
        loadmore: false,
        isRefreshing: true,
        isLoading: true,
        gettingData: true
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataResolutionResolve, dataResolutionUnresolve, dataPhoto, dataCreateResolution} = nextProps

    if (!isFetching(dataResolutionResolve) && this.submitting.done) {
      this.submitting = { ...this.submitting, done: false }
      if (isError(dataResolutionResolve)) {
        ToastAndroid.show(dataResolutionResolve.message, ToastAndroid.SHORT)
      }
      if (isFound(dataResolutionResolve)) {
        const isFound = dataResolutionResolve.resolutions.length
        if (isFound >= 10) {
          const data = [...this.state.resolveState.data, ...dataResolutionResolve.resolutions]
          this.setState({
            resolveState: {
              data: data,
              isLoading: false,
              loadmore: true,
              page: this.state.resolveState + 1,
              isRefreshing: false,
              gettingData: false
            }
          })
        } else {
          const data = [...this.state.resolveState.data, ...dataResolutionResolve.resolutions]
          this.setState({
            resolveState: {
              data: data,
              isLoading: true,
              loadmore: false,
              page: 1,
              isRefreshing: false,
              gettingData: false
            }
          })
        }
      }
    }

    if (!isFetching(dataResolutionUnresolve) && this.submitting.waiting) {
      this.submitting = { ...this.submitting, waiting: false }
      if (isError(dataResolutionUnresolve)) {
        ToastAndroid.show(dataResolutionUnresolve.message, ToastAndroid.SHORT)
      }
      if (isFound(dataResolutionUnresolve)) {
        const isFound = dataResolutionUnresolve.resolutions.length
        if (isFound >= 10) {
          const data = [...this.state.unresolveState.data, ...dataResolutionUnresolve.resolutions]
          this.setState({
            unresolveState: {
              data: data,
              isLoading: false,
              loadmore: true,
              page: this.state.unresolveState.page + 1,
              isRefreshing: false,
              gettingData: false
            }
          })
        } else {
          const data = [...this.state.unresolveState.data, ...dataResolutionUnresolve.resolutions]
          this.setState({
            unresolveState: {
              data: data,
              isLoading: true,
              loadmore: false,
              page: 1,
              isRefreshing: false,
              gettingData: false
            }
          })
        }
      }
    }

    if (!isFetching(dataPhoto) && this.submitting.upload) {
      this.submitting = { ...this.submitting, upload: false }
      if (isError(dataPhoto)) {
        ToastAndroid.show(dataPhoto.message, ToastAndroid.SHORT)
      }
      if (isFound(dataPhoto)) {
        let tempPhoto = []
        dataPhoto.payload.images.map((data, i) => {
          tempPhoto.push({'name': data.name})
        })
        this.submitting.create = true
        this.props.createResolution(
          this.state.choosenPriority,
          this.state.choosenTopic,
          this.state.titleComplaint,
          this.state.messageComplaint,
          tempPhoto
        )
      }
    }

    if (!isFetching(dataCreateResolution) && this.submitting.create) {
      this.submitting = { ...this.submitting, create: false }
      if (isError(dataCreateResolution)) {
        ToastAndroid.show(dataCreateResolution.message, ToastAndroid.SHORT)
      } else {
        Reactotron.log('success')
        this.refreshUnresolve()
        this.setState({
          modalCreateComplaint: false,
          buttonDisable: false,
          notif: true,
          messageNotif: dataCreateResolution.message,
          messageComplaint: '',
          titleComplaint: '',
          dataPriority: this.state.dataPriorityStore,
          dataTopic: this.state.dataTopicStore,
          choosenPriority: '',
          choosenTopic: '',
          foto: [],
          gettingData: true
        })
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.done) {
      this.submitting = {
        ...this.submitting,
        done: true
      }
      this.props.getListResolutionResolve({page: 1})
    }

    if (!this.submitting.waiting) {
      this.submitting = {
        ...this.submitting,
        waiting: true
      }
      this.props.getListResolutionUnresolve({page: 1})
    }
  }

  loadMoreResolve = () => {
    const { resolveState } = this.state
    if (!resolveState.isLoading) {
      if (resolveState.loadmore) {
        if (!this.submitting.done) {
          this.submitting = {
            ...this.submitting,
            done: true
          }
          let page = resolveState.page
          this.props.getListResolutionResolve({page: page})
        }
      }
    }
  }

  loadMoreUnresolve = () => {
    const { unresolveState } = this.state
    if (!unresolveState.isLoading) {
      if (unresolveState.loadmore) {
        if (!this.submitting.waiting) {
          this.submitting = {
            ...this.submitting,
            waiting: true
          }
          let page = unresolveState.page
          this.props.getListResolutionUnresolve({page: page})
        }
      }
    }
  }

  refreshResolve = () => {
    this.setState({
      unresolveState: {
        data: [],
        isLoading: true,
        loadmore: false,
        page: 1,
        isRefreshing: true,
        gettingData: true,
        notif: false
      }
    })
    if (!this.submitting.done) {
      this.submitting = {
        ...this.submitting,
        done: true
      }
      this.props.getListResolutionResolve({page: 1})
    }
  }

  refreshUnresolve = () => {
    this.setState({
      unresolveState: {
        data: [],
        isLoading: true,
        loadmore: false,
        page: 1,
        isRefreshing: true,
        gettingData: true,
        notif: false
      }
    })
    if (!this.submitting.waiting) {
      this.submitting = {
        ...this.submitting,
        waiting: true
      }
      this.props.getListResolutionUnresolve({page: 1})
    }
  }

  handleResolution (typeMessage) {
    this.setState({notif: false})
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
      case 'foto':
        ToastAndroid.show('Foto harus diunggah', ToastAndroid.SHORT)
        break
    }
  }

  sendComplaint () {
    const {choosenPriority, foto, choosenTopic, messageComplaint, titleComplaint} = this.state
    if (choosenPriority === '') {
      this.onError('priority')
    } else if (choosenTopic === '') {
      this.onError('topic')
    } else if (titleComplaint === '') {
      this.onError('title')
    } else if (messageComplaint === '') {
      this.onError('message')
    } else if (foto.length === 0) {
      this.onError('foto')
    } else if (choosenPriority !== '' && choosenTopic !== '' && messageComplaint !== '' && titleComplaint !== '' && foto.length !== 0) {
      this.setState({notif: false, loading: true, buttonDisable: true})
      const postData = new FormData()
      foto.map(data => {
        postData.append('images', { uri: data, type: 'image/jpg', name: 'image.jpg' })
      })
      postData.append('type', 'resolution')
      if (!this.submitting.upload) {
        this.submitting = {
          ...this.submitting,
          upload: true
        }
        this.props.photoUpload(postData)
      }
    }
  }

  handleDetailResolution (id) {
    this.setState({idResolution: id, notif: false})
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

  renderEmptyState () {
    return (
      <View style={styles.containerEmpty}>
        <Image source={Images.emptyResolution} style={{width: 201, height: 177}} />
        <Text style={styles.textTitleEmpty}>Pusat Resolusi Anda Kosong</Text>
        <Text style={styles.textTitleEmpty2}>Anda belum pernah mengirimkan keluhan</Text>
      </View>
    )
  }

  checkStateResolutionUnresolve (data) {
    const {unresolveState} = this.state
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(data)}
        renderRow={(rowData) => this.renderRowUnresolveResolution(rowData)}
        onEndReached={() => this.loadMoreUnresolve()}
        renderFooter={() => {
          if (unresolveState.loadmore) {
            return (
              <ActivityIndicator
                style={[styles.loadingStyle, { height: 50 }]}
                size='small'
                color='#ef5656'
              />
            )
          }
          return <View />
        }}
        enableEmptySections
        contentContainerStyle={{flex: 1}}
      />
    )
  }

  checkStateResolutionResolve (data) {
    const {resolveState} = this.state
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(data)}
        renderRow={(rowData) => this.renderRowResolveResolution(rowData)}
        onEndReached={() => this.loadMoreResolve()}
        renderFooter={() => {
          if (resolveState.loadmore) {
            return (
              <ActivityIndicator
                style={[styles.loadingStyle, { height: 50 }]}
                size='small'
                color='#ef5656'
              />
            )
          }
          return <View />
        }}
        enableEmptySections
        contentContainerStyle={{flex: 1}}
      />
    )
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
    const { resolveState, unresolveState } = this.state
    let resolveView, unresolveView
    if (!resolveState.gettingData) {
      if (resolveState.data.length > 0) {
        resolveView = (this.checkStateResolutionResolve(resolveState.data))
      } else {
        resolveView = (this.renderEmptyState())
      }
    } else {
      resolveView = (this.checkStateResolutionResolve(resolveState.data))
    }

    if (!unresolveState.gettingData) {
      if (unresolveState.data.length > 0) {
        unresolveView = (this.checkStateResolutionUnresolve(unresolveState.data))
      } else {
        unresolveView = (this.renderEmptyState())
      }
    } else {
      unresolveView = (this.checkStateResolutionUnresolve(unresolveState.data))
    }
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
          <View tabLabel='Menunggu' style={styles.container}>
            <View
              style={{flex: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={unresolveState.isRefreshing}
                  onRefresh={this.refreshUnresolve}
                  tintColor={Colors.red}
                  colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
                  title='Loading...'
                  titleColor={Colors.red}
                  progressBackgroundColor={Colors.snow}
                />
              }>
              {this.notif()}
              {unresolveView}
            </View>
          </View>
          <View tabLabel='Terselesaikan' style={styles.container}>
            <View
              style={{flex: 1}}
              tabLabel='Terselesaikan'
              refreshControl={
                <RefreshControl
                  refreshing={resolveState.isRefreshing}
                  onRefresh={this.refreshResolve}
                  tintColor={Colors.red}
                  colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
                  title='Loading...'
                  titleColor={Colors.red}
                  progressBackgroundColor={Colors.snow}
                />
              }>
              {resolveView}
            </View>
          </View>
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
  getListResolutionResolve: (param) => dispatch(userAction.getResolvedResolutions(param)),
  getListResolutionUnresolve: (param) => dispatch(userAction.getUnresolvedResolutions(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerResolution)
