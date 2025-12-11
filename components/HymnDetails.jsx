import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hymnsData from '../assets/hymn.json';

export default function HymnDetail({ hymn, language, onBack, onNavigateHymn }) {
  if (!hymn) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Hymn not found.</Text>
      </View>
    );
  }

  const title = language === 'english' ? hymn.title_english : hymn.title_yoruba;
  const tunes = hymn.title_tune;
  const passage = language === 'english' ? hymn.passage_english : hymn.passage_yoruba;
  const verses = language === 'english' ? hymn.verses_english : hymn.verses_yoruba;
  const chorus = language === 'english' ? hymn.chorus_english : hymn.chorus_yoruba;

  const currentId = hymn.id;

  const prevHymn = hymnsData.find(h => h.id === currentId - 1);
  const nextHymn = hymnsData.find(h => h.id === currentId + 1);

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

        {tunes ? <Text style={styles.passage}>{tunes}</Text> : null}
        {passage ? <Text style={styles.passage}>{passage}</Text> : null}

        {/* VERSES */}
        {verses.map((verse, index) => (
          <View key={index} style={styles.verseContainer}>
            <Text style={styles.verseNumber}>Verse {index + 1}</Text>
            <Text style={styles.verseText}>{verse}</Text>

            {chorus ? (
              <Text style={[styles.verseText, styles.chorus]}>{chorus}</Text>
            ) : null}
          </View>
        ))}

        {/* NAVIGATION BUTTONS */}
        <View style={styles.navRow}>
          {/* PREVIOUS */}
          <TouchableOpacity
            disabled={!prevHymn}
            onPress={() => onNavigateHymn(prevHymn)}
            style={[styles.navButton, !prevHymn && styles.disabledButton]}
          >
            <Ionicons
              name="arrow-back-circle"
              size={40}
              color={!prevHymn ? "#bbb" : "#8B0000"}
            />
          </TouchableOpacity>

          {/* NEXT */}
          <TouchableOpacity
            disabled={!nextHymn}
            onPress={() => onNavigateHymn(nextHymn)}
            style={[styles.navButton, !nextHymn && styles.disabledButton]}
          >
            <Ionicons
              name="arrow-forward-circle"
              size={40}
              color={!nextHymn ? "#bbb" : "#8B0000"}
            />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    backgroundColor: '#8B0000',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: { marginRight: 16, padding: 6 },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  content: { flex: 1 },

  contentContainer: { padding: 20 },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },

  passage: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  verseContainer: { marginBottom: 24,
       textAlign: 'center',
   },

  verseNumber: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: '#8B0000',
    marginBottom: 6,
  },

  verseText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
  },

  chorus: {
    marginTop: 8,
    fontWeight: '700',
    color: '#8B0000',
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
    paddingHorizontal: 40,
    paddingBottom: 40,
  },

  navButton: {
    padding: 10,
  },

  disabledButton: {
    opacity: 0.3,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    fontSize: 18,
    color: "red",
  },
});

 