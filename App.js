import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);

  const obterPermissao = async () => {
    const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      alert('Permissão necessária');
    }
  };

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  React.useEffect(() => {
    obterPermissao();
  }, [])

  return (
    <View style={styles.container}>
      {image && (
        <Image
        source={{ uri: image }}
        style={styles.image}
        />
      )}

      <TouchableOpacity onPress={escolherImagem}>
        <Text>Selecionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});
