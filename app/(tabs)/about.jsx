import React, { memo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Memoized section component for performance
const Section = memo(({ title, content }) => (
  <View style={styles.section}>
    <Text style={styles.subheading}>{title}</Text>
    <Text style={styles.paragraph}>{content}</Text>
  </View>
));

const sections = [
  {
    title: 'About the Hymnal App',
    content:
      'Welcome to the UAC Hymnal App – your digital companion for worship, study, and personal devotion. This app brings the timeless beauty of hymns right to your fingertips, making it easy to find, read, and sing your favorite songs anytime, anywhere.',
  },
  {
    title: 'Features',
    content:
      '• Browse hymns by number, title, or category.\n• Quickly search hymns by keywords or lyrics.\n• View lyrics in full-screen mode.',
  },
  {
    title: 'Our Mission',
    content:
      'Created by a team of church members, the Hymnal App is designed to preserve the rich heritage of hymns while making worship more accessible to everyone.',
  },
  {
    title: 'Getting Started',
    content:
      'Simply browse or search for a hymn, tap to view the lyrics, and start singing.',
  },
  {
    title: 'Contact Us',
    content:
      'We value your feedback! For suggestions, support, or inquiries, please contact us at .........',
  },
];

const About = () => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={sections}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <Section title={item.title} content={item.content} />}
      initialNumToRender={3} // render first few sections immediately
      removeClippedSubviews={true} // improves performance
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  section: {
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default About;
