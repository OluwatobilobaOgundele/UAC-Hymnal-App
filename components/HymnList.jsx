import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import hymnsData from '../assets/hymn.json';

export default function HymnList({ language, onSelectHymn, onBack }) {
  const [hymns, setHymns] = useState([]);
  const [filteredHymns, setFilteredHymns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocalHymns();
  }, [language]);

  const loadLocalHymns = async () => {
    setLoading(true);
    try {
      const filtered = hymnsData.filter(h =>
        language === "english"
          ? h.verses_english.length > 0
          : h.verses_yoruba.length > 0
      );

      setHymns(filtered);
      setFilteredHymns(filtered);
    } catch (err) {
      console.error("Failed to load hymns:", err);
    }
    setLoading(false);
  };

  /** 🔍 SEARCH — Titles, Verses, Number, Suggestions */
  const handleSearch = (text) => {
    setSearchText(text);
    setSuggestions([]);

    if (!text.trim()) {
      setFilteredHymns(hymns);
      return;
    }

    const t = text.toLowerCase();

    // Search by number
    if (!isNaN(text)) {
      const num = parseInt(text);
      const match = hymns.find(h => h.id === num);
      setFilteredHymns(match ? [match] : []);
    }

    const results = hymns.filter(hymn => {
      const title =
        language === "english"
          ? hymn.title_english
          : hymn.title_yoruba;

      const verses =
        language === "english"
          ? hymn.verses_english
          : hymn.verses_yoruba;

      return (
        title.toLowerCase().includes(t) ||
        verses.some(v => v.toLowerCase().includes(t))
      );
    });

    setFilteredHymns(results);

    // 🔎 Suggestions (top 6 titles)
    const suggestionMatches = hymns
      .filter(h =>
        (language === "english" ? h.title_english : h.title_yoruba)
          .toLowerCase()
          .includes(t)
      )
      .slice(0, 6);

    setSuggestions(suggestionMatches);
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

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {language === "english" ? "English Hymns" : "Yoruba Hymns"}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search by title, verse, or number..."
          placeholderTextColor="#666"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSearchText(
                  language === "english"
                    ? item.title_english
                    : item.title_yoruba
                );
                setFilteredHymns([item]);
                setSuggestions([]);
              }}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>
                {language === "english" ? item.title_english : item.title_yoruba}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Hymn List */}
      <FlatList
        data={filteredHymns}
        renderItem={renderHymnItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B0000',
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  backButton: { marginRight: 16 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  suggestionBox: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 15,
    color: '#333',
  },

  listContent: { padding: 16 },

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
});
