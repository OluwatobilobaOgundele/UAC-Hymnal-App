import React, { memo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Memoized section component for performance
const Section = memo(({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.subheading}>{title}</Text>
    <Text style={styles.paragraph}>{content}</Text>
  </View>
));

// Reusable Link Button Component
const LinkButton = memo(({ icon, label, url, type = 'url' }) => {
  const handlePress = async () => {
    try {
      let finalUrl = url;
      
      // Format URL based on type
      if (type === 'whatsapp' && !url.startsWith('whatsapp://')) {
        finalUrl = `whatsapp://send?phone=${url.replace(/[^0-9]/g, '')}`;
      } else if (type === 'email' && !url.startsWith('mailto:')) {
        finalUrl = `mailto:${url}`;
      } else if (type === 'phone' && !url.startsWith('tel:')) {
        finalUrl = `tel:${url}`;
      }

      const supported = await Linking.canOpenURL(finalUrl);
      
      if (supported) {
        await Linking.openURL(finalUrl);
      } else {
        Alert.alert('Error', `Cannot open ${type}: ${url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while opening the link');
      console.error('Error opening link:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
      <Ionicons name={icon} size={24} color="#8B0000" />
      <Text style={styles.linkText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
});

const sections = [
  {
    title: 'About the Hymnal App',
    content:
      'Welcome to the UAC Hymnal App – your digital companion for worship, study, and personal devotion. This app brings the timeless beauty of hymns right to your fingertips, making it easy to find, read, and sing your favorite songs anytime, anywhere.',
  },
  {
    title: 'Features',
    content:
      '• Browse hymns by number, title.\n• Quickly search hymns by keywords or lyrics.\n• View lyrics in full-screen mode.',
  },
  {
    title: 'Our Mission',
    content:
      'Created by a team of UAC Lagos Area II Youth, the Hymnal App is designed to preserve the rich heritage of hymns while making worship more accessible to everyone.',
  },
  {
    title: 'Getting Started',
    content:
      'Simply browse or search for a hymn, tap to view the lyrics, and start singing.',
  },
];

const About = () => {
  const renderHeader = () => (
    <>
      {sections.map((section) => (
        <Section key={section.title} title={section.title} content={section.content} />
      ))}
      
      {/* Contact Section with Links */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          We value your feedback! For suggestions, support, or inquiries, please reach out to us:
        </Text>
      </View>

      <View style={styles.linksContainer}>
        <LinkButton
          icon="logo-whatsapp"
          label="WhatsApp Support"
          url="2349071329697"
          type="whatsapp"
        />
        
        <LinkButton
          icon="mail-outline"
          label="Email Us"
          url="support@uachymnal.com"
          type="email"
        />
        
        <LinkButton
          icon="call-outline"
          label="Call Us"
          url="+2349071329697"
          type="phone"
        />
        
        <LinkButton
          icon="globe-outline"
          label="Visit Our Website"
          url="https://uacnigeria.org"
          type="url"
        />
        
        <LinkButton
          icon="logo-facebook"
          label="Follow on Facebook"
          url="https://facebook.com/uacnigeria"
          type="url"
        />
        
        <LinkButton
          icon="logo-instagram"
          label="Follow on Instagram"
          url="https://instagram.com/uacnigeria"
          type="url"
        />
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.copyrightText}>
          © 2024 UAC Lagos Area II Youth. All rights reserved.
        </Text>
      </View>
    </>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={[{ key: 'content' }]}
      renderItem={renderHeader}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginTop: 30,
  },
  section: {
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  linksContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default About;