import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Image 
          source={require('../assets/images/icon1.jpg')} 
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.title}>UAC</Text>
      <Text style={styles.title}>Hymnal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    borderRadius: 55,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#000000',
  },
});
