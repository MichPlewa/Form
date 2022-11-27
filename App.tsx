import { StyleSheet, Text, Switch, View, Button, Image } from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { TextInput } from '@react-native-material/core';

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
          <Text style={styles.title}>Nowy Kontrahenta</Text>
          <SegmentedControl
            values={['Osoba', 'Firma']}
            selectedIndex={indexOfselected()}
            onChange={(e) => {
              if (e.nativeEvent.value === 'Osoba') setIsOsoba(false);
              else setIsOsoba(true);
            }}
            style={{ margin: 16 }}
          />
          <TextInput
            style={styles.form}
            label="Imię"
            onChangeText={(e) => {
              setName(e);
            }}
          />
          <TextInput
            label="Nazwisko"
            style={styles.form}
            onChangeText={(e) => {
              setSurname(e);
            }}
          />
          {!isOsoba ? (
            <TextInput
              label="PESEL"
              style={styles.form}
              onChangeText={(e) => {
                setPesel(e);
              }}
            />
          ) : (
            <TextInput
              label="NIP"
              style={styles.form}
              onChangeText={(e) => {
                setNip(e);
              }}
            />
          )}
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
          <View style={styles.sendBtn}>
            <Button
              title="Wyślij"
              color="#9ef500"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

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
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  title: {
    marginLeft: 16,
    marginTop: 16,
    fontSize: 21,
    textAlign: 'center',
  },
  form: {
    marginBottom: 8,
    width: 300,
    marginLeft: 16,
    marginRight: 16,
  },
  imgBtn: {
    justifyContent: 'flex-start',
  },
  img: {
    width: 50,
    height: 50,
  },
  sendBtn: { margin: 16 },
});
