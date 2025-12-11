import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import hymnsData from "../assets/hymn.json";

const HymnRow = React.memo(({ item, language, onSelectHymn }) => {
  return (
    <TouchableOpacity style={styles.hymnItem} onPress={() => onSelectHymn(item)}>
      <Text style={styles.hymnNumber}>{item.id}</Text>
      <Text style={styles.hymnTitle}>
        {language === "english" ? item.title_english : item.title_yoruba}
      </Text>
    </TouchableOpacity>
  );
});

export default function HymnList({ language, onSelectHymn, onBack }) {
  const [hymns, setHymns] = useState([]);
  const [filteredHymns, setFilteredHymns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocalHymns();
  }, [language]);

  const loadLocalHymns = () => {
    setLoading(true);

    try {
      const safeFiltered = hymnsData.filter((h) => {
        const english = Array.isArray(h.verses_english) ? h.verses_english : [];
        const yoruba = Array.isArray(h.verses_yoruba) ? h.verses_yoruba : [];
        return language === "english" ? english.length > 0 : yoruba.length > 0;
      });

      setHymns(safeFiltered);
      setFilteredHymns(safeFiltered);
    } catch (err) {
      console.error("Failed to load hymns:", err);
    }

    setLoading(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setSuggestions([]);

    if (!text.trim()) {
      setFilteredHymns(hymns);
      return;
    }

    const t = text.trim().toLowerCase();

    if (!isNaN(text.trim())) {
      const num = parseInt(text.trim(), 10);
      const match = hymns.find((h) => h.id === num);
      if (match) {
        setFilteredHymns([match]);
        return;
      }
    }

    const results = hymns.filter((hymn) => {
      const title = language === "english" ? hymn.title_english : hymn.title_yoruba;
      const verses = Array.isArray(
        language === "english" ? hymn.verses_english : hymn.verses_yoruba
      )
        ? language === "english"
          ? hymn.verses_english
          : hymn.verses_yoruba
        : [];

      return (
        title?.toLowerCase().includes(t) ||
        verses.some((v) => v.toLowerCase().includes(t))
      );
    });

    setFilteredHymns(results);

    const suggestionMatches = hymns
      .filter((h) => {
        const title = language === "english" ? h.title_english : h.title_yoruba;
        return title.toLowerCase().includes(t);
      })
      .slice(0, 6);

    setSuggestions(suggestionMatches);
  };

  const renderHymnItem = useCallback(
    ({ item }) => (
      <HymnRow item={item} language={language} onSelectHymn={onSelectHymn} />
    ),
    [language, onSelectHymn]
  );

  const ITEM_HEIGHT = 72;
  const getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B0000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === "english" ? "English Hymns" : "Yoruba Hymns"}
        </Text>
      </View>

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

      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSearchText(language === "english" ? item.title_english : item.title_yoruba);
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

      <FlatList
        data={filteredHymns}
        renderItem={renderHymnItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B0000",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: { marginRight: 16 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  suggestionBox: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 15,
    color: "#333",
  },
  listContent: { padding: 16 },
  hymnItem: {
    backgroundColor: "#C8A2A2",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  hymnNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    minWidth: 40,
  },
  hymnTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
});