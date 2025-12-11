import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ImageBackground
      source={require('../assets/images/image12.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Logo */}
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/images/icon1.jpg')}
            style={styles.logoImage}
          />
        </View>

        {/* Text */}
        <Text style={styles.title}>UAC</Text>
        <Text style={styles.title}>Hymnal</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** Optional dim / tint overlay for better readability */
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // light tint overlay
    borderRadius: 16,
  },

  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 6, // Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  logoImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    borderRadius: 55,
  },

  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowRadius: 4,
    textShadowOffset: { width: 1, height: 2 },
  },
});
