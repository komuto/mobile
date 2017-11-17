import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ListView,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import Switch from 'react-native-switch-pro'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as loginaction from '../actions/user'

// Styles
import styles from './Styles/PengaturanNotifikasiScreenStyle'
import { Colors, Images } from '../Themes/'

class NotificationSetting extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.update = false
    this.state = {
      notif: false,
      messageNotif: '',
      listNotifications: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataNotifications.status === 200) {
      this.setState({
        listNotifications: nextProps.dataNotifications.settings
      })
    } else if (nextProps.dataNotifications.status !== 200 && nextProps.dataNotifications.status !== 0) {
      ToastAndroid.show(nextProps.dataNotifications.message, ToastAndroid.SHORT)
      nextProps.dataNotifications.status = 0
    }

    if (nextProps.dataNotifications.status === 200 && this.update) {
      this.setState({
        notif: true,
        messageNotif: nextProps.dataNotifications.message,
        listNotifications: nextProps.dataNotifications.settings
      })
    } else if (nextProps.dataNotifications.status !== 200 && nextProps.dataNotifications.status !== 0) {
      ToastAndroid.show(nextProps.dataNotifications.message, ToastAndroid.SHORT)
      nextProps.dataNotifications.status = 0
    }
  }

  componentDidMount () {
    this.props.getNotificationUser()
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

  SwitchChanges (types) {
    const {listNotifications} = this.state
    for (var j = 0; j < listNotifications.length; j++) {
      if (listNotifications[j].type === types) {
        if (listNotifications[j].is_active) {
          listNotifications[j].is_active = false
        } else {
          listNotifications[j].is_active = true
        }
      }
    }
    const newDataSource = listNotifications.map(data => {
      return {...data}
    })
    this.setState({
      listNotifications: newDataSource
    })
  }

  renderNotification (rowData) {
    return (
      <View style={[styles.menu]}>
        <Text style={[styles.textMenu, {paddingTop: 22, paddingBottom: 22, lineHeight: 23}]}>{rowData.content}</Text>
        <Switch
          width={42}
          height={21}
          value={rowData.is_active}
          circleColor={Colors.teal}
          circleColorInactive={Colors.red}
          backgroundActive={'rgba(0, 148, 133, 0.5)'}
          backgroundInactive={'#42221f1f'}
          onSyncPress={() => this.SwitchChanges(rowData.type)} />
      </View>
    )
  }

  handleUpdataNotification () {
    let temp = this.state.listNotifications
    this.update = true
    this.props.updateNotificationUser(temp)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.notif()}
        <View style={styles.header}>
          <Text style={styles.textHeader}>Pilih Notifikasi yang ingin dikirimkan ke akun Anda</Text>
        </View>
        <View style={styles.containerMain}>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.listNotifications)}
            renderRow={this.renderNotification.bind(this)}
            enableEmptySections
          />
        </View>
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handleUpdataNotification()}>
          <Text style={styles.textButtonNext}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataNotifications: state.notifSettings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationUser: () => dispatch(loginaction.getNotifSettings()),
    updateNotificationUser: (data) => dispatch(loginaction.updateNotifSettings({notifications: data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSetting)
