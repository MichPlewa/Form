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
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function App() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [pesel, setPesel] = useState('');
  const [nip, setNip] = useState('');
  const [isOsoba, setIsOsoba] = useState(false);
  const openGallery = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    });
    console.log(result);
  };
  const handleSubmit = () => {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('surrname', surname);
    if (!isOsoba) fd.append('pesel', pesel);
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

  const indexOfselected = () => {
    if (isOsoba) return 1;
    else return 0;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.linearGradient}
        colors={['#5600f5', '#9b00f5']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.bc}>
          <Text style={styles.title}>Dodaj Kontrahenta</Text>
          <SegmentedControl
            values={['Osoba', 'Firma']}
            selectedIndex={indexOfselected()}
            onChange={(e) => {
              if (e.nativeEvent.value === 'Osoba') setIsOsoba(false);
              else setIsOsoba(true);
            }}
            style={{ marginBottom: 16 }}
          />
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
          {!isOsoba ? (
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
          <View></View>
          <View style={styles.container1}>
            <View style={styles.imgBtn}>
              <Button title="Dodaj Zdjęcie" onPress={() => openGallery()} />
            </View>
            <View>
              <Image
                style={styles.img}
                source={require('./assets/favicon.png')}
              />
            </View>
          </View>
          <Button
            title="Wyślij"
            color="#9ef500"
            onPress={() => handleSubmit()}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bc: {
    backgroundColor: 'rgba(215, 179, 252, 1)',
    padding: 64,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  container1: {
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
    padding: 10,
    marginBottom: 25,
    borderRadius: 10,
    backgroundColor: '#ffff',
  },
  imgBtn: {
    justifyContent: 'flex-start',
  },
  img: {
    width: 50,
    height: 50,
  },
});
