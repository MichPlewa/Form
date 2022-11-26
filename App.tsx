import {
  StyleSheet,
  Text,
  Switch,
  View,
  Button,
  TextInput,
  Image,
} from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [pesel, setPesel] = useState('');
  const [nip, setNip] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  console.log(name);
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 100,
      maxWidth: 100,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: false,
    },
  };
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log(result);
  };
  const handleSubmit = () => {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('surrname', surname);
    if (!isEnabled) fd.append('pesel', pesel);
    else fd.append('nip', nip);

    const fetchOptions = {
      method: 'POST',
      body: fd,
    };

    fetch('https://localhost:60001/Contractor/Save', fetchOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      });
  };

  return (
    <View style={styles.container}>
      {/* <LinearGradient
        colors={['#c848db', '#9448db']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      ></LinearGradient> */}
      <Text style={styles.title}>Dodaj Kontrahenta:</Text>
      <TextInput
        placeholder="Imię"
        style={styles.form}
        onChangeText={(e) => {
          setName(e);
        }}
      />
      <TextInput
        placeholder="Nazwisko"
        style={styles.form}
        onChangeText={(e) => {
          setSurname(e);
        }}
      />
      {!isEnabled ? (
        <TextInput
          placeholder="Pesel"
          style={styles.form}
          onChangeText={(e) => {
            setPesel(e);
          }}
        />
      ) : (
        <TextInput
          placeholder="NIP"
          style={styles.form}
          onChangeText={(e) => {
            setNip(e);
          }}
        />
      )}
      <View style={styles.switch}>
        <Text>Osoba</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>Firma</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.imgBtn}>
          <Button title="Dodaj Zdjęcie" onPress={() => openGallery()} />
        </View>
        <View>
          <Image style={styles.img} source={require('./assets/favicon.png')} />
        </View>
      </View>
      <View style={styles.sendBtn}>
        <Button title="Wyślij" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: '100%',
    width: '350%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64,
    backgroundColor: '#7206d6',
  },
  container1: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: 21,
  },
  switch: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  form: {
    width: '70%',
    padding: 10,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: 'lightgray',
  },
  imgBtn: {
    justifyContent: 'flex-start',
  },
  img: {
    width: 50,
    height: 50,
  },
  sendBtn: {},
});
