import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function OnboardingScreen({ message, isLast, onNext }) {
  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoCircle}>
        <Image
          source={require('../assets/images/icon1.jpg')}
          style={styles.logoImage}
        />
      </View>

      {/* Message */}
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  /** Logo Circle */
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },

  /** Actual resized logo */
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
  },

  message: {
    fontSize: 38,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },

  /** Pagination dots */
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },

  dotInactive: {
    backgroundColor: '#999999',
  },

  /** Button */
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});
