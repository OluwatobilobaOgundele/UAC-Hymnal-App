import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function LanguageSelector({ onSelectLanguage }) {
  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoCircle}>
        <Image
          source={require('../assets/images/icon1.jpg')}
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.heading}>Select Preferred Language</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.englishButton]}
          onPress={() => onSelectLanguage('english')}>
          <Text style={styles.buttonText}>ENGLISH</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.yorubaButton]}
          onPress={() => onSelectLanguage('yoruba')}>
          <Text style={styles.buttonText}>YORUBA</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    paddingTop: 60,
    paddingHorizontal: 40,
  },

  /** Logo container */
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 60,
  },

  /** Real logo image */
  logoImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 35,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },

  buttonsContainer: {
    gap: 20,
  },

  button: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },

  englishButton: {
    backgroundColor: '#8B0000',
  },

  yorubaButton: {
    backgroundColor: '#000080',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
