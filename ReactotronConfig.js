import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking
} from 'reactotron-react-native'
// import {reactotronRedux} from 'reactotron-redux'

if (__DEV__) {
  Reactotron
    .configure({host: '192.168.10.125', name: 'Komuto'})
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    // .use(reactotronRedux())
    .connect()
}

Reactotron.clear()

