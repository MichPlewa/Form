import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bc: {
    backgroundColor: 'rgba(215, 179, 252, 1)',
    maxWidth: 400,
    borderRadius: 16,
  },
  container: {
    flex: 1,
  },
  containerImgPicker: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
  },
  title: {
    marginLeft: 16,
    marginTop: 16,
    fontSize: 21,
    textAlign: 'center',
    fontFamily: 'Lato_700Bold',
  },
  form: {
    marginBottom: 8,
    width: 300,
    marginLeft: 16,
    marginRight: 16,
  },
  formPeselNip: {
    width: 300,
    marginLeft: 16,
    marginRight: 16,
  },
  errorMsg: {
    marginLeft: 16,
    fontSize: 12,
    color: 'red',
  },
  errorMsgSend: {
    textAlign: 'center',
    marginLeft: 16,
    fontSize: 16,
    color: 'red',
  },
  imgBtn: {
    marginLeft: 16,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  img: {
    marginLeft: 16,
    width: 64,
    height: 64,
  },
  sendBtn: { margin: 16 },
});

export default styles;
