import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import hymnsData from '../assets/hymn.json';  // ← import the local JSON

export default function HymnList({ language, onSelectHymn }) {
  const [hymns, setHymns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocalHymns();
  }, [language]);

  const loadLocalHymns = async () => {
    setLoading(true);

    try {
      // Filter by language (english / yoruba)
      const filtered = hymnsData.filter(h => 
        language === "english" ? h.verses_english.length > 0 : h.verses_yoruba.length > 0
      );

      setHymns(filtered);
    } catch (err) {
      console.error("Failed to load hymns:", err);
    }

    setLoading(false);
  };

  const renderHymnItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hymnItem}
      onPress={() => onSelectHymn(item)}>
      <Text style={styles.hymnNumber}>{item.id}</Text>
      <Text style={styles.hymnTitle}>
        {language === "english" ? item.title_english : item.title_yoruba}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B0000" />
      </View>
    );
  }

  if (hymns.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hymns available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={hymns}
        renderItem={renderHymnItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  listContent: {
    padding: 16,
  },
  hymnItem: {
    backgroundColor: '#C8A2A2',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  hymnNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    minWidth: 40,
  },
  hymnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
