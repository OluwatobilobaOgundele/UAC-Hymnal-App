import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HymnDetail({ hymn, language, onBack }) {
  const title =
    language === 'english' ? hymn.title_english : hymn.title_yoruba;

  const passage =
    language === 'english' ? hymn.passage_english : hymn.passage_yoruba;

  const verses =
    language === 'english' ? hymn.verses_english : hymn.verses_yoruba;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Hymn {hymn.id}</Text>
      </View>

      {/* CONTENT */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        {passage ? (
          <Text style={styles.passage}>{passage}</Text>
        ) : null}

        {verses.map((verse, index) => (
          <View key={index} style={styles.verseContainer}>
            <Text style={styles.verseNumber}>Verse {index + 1}</Text>
            <Text style={styles.verseText}>{verse}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#8B0000',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  passage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  verseContainer: {
    marginBottom: 24,
  },
  verseNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8B0000',
    marginBottom: 6,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  },
});
