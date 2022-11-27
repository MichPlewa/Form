import { Text, View, Button, Image } from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { TextInput } from '@react-native-material/core';
import styles from './styles';

export default function App() {
  const [data, setData] = useState({
    name: '',
    surname: '',
    pesel: '',
    nip: '',
    imgData: {},
    isOsoba: true,
  });
  const [isValidatePesel, setIsValidatePesel] = useState(false);
  const [isValidateNip, setIsValidateNip] = useState(false);
  const [sendErrorm, setSendError] = useState(false);
  const openGallery = async () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.assets !== null && response.assets) {
          const source = { uri: response.assets[0].uri };
          console.log(source, 'source');
          setData({ ...data, imgData: source });
        }
      }
    );
  };

  const indexOfselected = () => {
    if (!data.isOsoba) return 1;
    else return 0;
  };

  const onChanged = (text: string) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    if (data.isOsoba) {
      if (newText.length === 11) {
        setIsValidatePesel(true);
        setData({ ...data, pesel: newText });
      } else {
        setIsValidatePesel(false);
      }
    } else {
      if (newText.length === 10) {
        setIsValidateNip(true);
        setData({ ...data, nip: newText });
      } else {
        setIsValidateNip(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (isValidateNip || isValidatePesel) {
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
      };

      fetch('https://localhost:60001/Contractor/Save', fetchOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        });
      setSendError(false);
    } else {
      setSendError(true);
    }
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
          <Text style={styles.title}>Nowy Kontrahent</Text>
          <SegmentedControl
            values={['Osoba', 'Firma']}
            selectedIndex={indexOfselected()}
            onChange={(e) => {
              if (e.nativeEvent.value === 'Osoba')
                setData({ ...data, isOsoba: true });
              else setData({ ...data, isOsoba: false });
            }}
            style={{ margin: 16 }}
          />
          <TextInput
            style={styles.form}
            label="Imię"
            value={data.name || ''}
            onChangeText={(e) => {
              setData({ ...data, name: e });
            }}
          />
          <TextInput
            style={styles.form}
            label="Nazwisko"
            value={data.surname || ''}
            onChangeText={(e) => {
              setData({ ...data, surname: e });
            }}
          />
          {data.isOsoba ? (
            <View>
              <TextInput
                style={styles.formPeselNip}
                label="PESEL"
                keyboardType="numeric"
                maxLength={11}
                onChangeText={(e) => {
                  onChanged(e);
                }}
              />
              {isValidatePesel ? null : (
                <View>
                  <Text style={styles.errorMsg}>PESEL musi mieć 11 cyfr</Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.formPeselNip}
                label="NIP"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(e) => {
                  onChanged(e);
                }}
              />
              {isValidateNip ? null : (
                <View>
                  <Text style={styles.errorMsg}>NIP musi mieć 10 cyfr</Text>
                </View>
              )}
            </View>
          )}
          <View style={styles.containerImgPicker}>
            <View style={styles.imgBtn}>
              <Button
                title="Dodaj Zdjęcie"
                color="rgba(31, 159, 103, 1)"
                onPress={() => openGallery()}
              />
            </View>
            <View>
              <Image style={styles.img} source={data.imgData} />
            </View>
          </View>
          <View style={styles.sendBtn}>
            <Button
              title="Wyślij"
              color="rgba(31, 159, 103, 1)"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
