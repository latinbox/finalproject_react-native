import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInput from '../../components/Commons/TextInput';
import AddPhoto from '../../components/Photo/AddPhoto';
import {useTheme} from '../../context/Theme';
import {useUserInformation} from '../../context/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
const Summary = () => {
  const insets = useSafeAreaInsets();
  const {
    mainTheme: {backgroundColor},
  } = useTheme();

  const {
    name,
    updateName,
    email,
    updateEmail,
    telefono,
    updateTelefono,
    photo,
  } = useUserInformation();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.container,
        {paddingTop: insets.top, backgroundColor},
      ]}>
      <AddPhoto uri={photo} />
      <TextInput
        value={name}
        placeholder="Escribe tu nombre"
        labelTag="Nombre"
        onChange={(text) => updateName(text)}
      />
      <TextInput
        value={email}
        placeholder="Escribe tu correo"
        labelTag="Correo"
        onChange={(text) => updateEmail(text)}
      />
      <TextInput
        value={telefono}
        placeholder="Escribe tu teléfono"
        labelTag="Telefono"
        onChange={(text) => updateTelefono(text)}
      />
    </KeyboardAwareScrollView>
  );
};

export default Summary;
