import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function OnboardingScreen({ message, isLast, onNext, img }) {
  return (
    <ImageBackground source={img} resizeMode="cover" style={styles.container}>
      
      {/* Optional dark overlay for readability */}
      <View style={styles.overlay} />

      {/* Logo */}
      <View style={styles.logoCircle}>
        <Image
          source={require('../assets/images/icon1.jpg')}
          style={styles.logoImage}
        />
      </View>

      {/* Message & Pagination */}
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, !isLast && styles.dotInactive]} />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>
          {isLast ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)', // Light overlay for better readability
  },

  /** Logo Circle */
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 5,
  },

  logoImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 35,
  },

  /** Text Content */
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  message: {
    fontSize: 32,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 45,
    textShadowColor: '#000',
    textShadowOpacity: 0.3,
    textShadowRadius: 8,
  },

  /** Pagination dots */
  pagination: {
    flexDirection: 'row',
    gap: 10,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },

  dotInactive: {
    backgroundColor: '#cccccc',
  },

  /** Button */
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    elevation: 5,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});
