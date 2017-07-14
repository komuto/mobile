import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  preview: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  headerModal: {
    height: 56,
    backgroundColor: '#fb395a',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  closeBoxStyle: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleBoxStyle: {
    height: 24,
    marginLeft: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleTextStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    textAlign: 'left',
    color: '#ffffff'
  },
  cameraRollBoxStyle: {
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    height: 96,
    backgroundColor: '#444444',
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    height: 64,
    width: 64,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureInside: {
    height: 56,
    width: 56,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    borderWidth: 4,
    borderColor: '#fb395a'
  },
  instructionBoxStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  instructionTextStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: '#ffffff',
    marginLeft: 8
  }
})
