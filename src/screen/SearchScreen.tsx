import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {searchMovies, fetchGenres} from '../api/MovieAPI'; // Ensure these APIs are implemented correctly

const SearchScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      setLoadingGenres(true);
      try {
        const data = await fetchGenres(); // Call the API to fetch genres
        setGenres(Array.isArray(data) ? data : []); // Ensure genres is an array
      } catch (error) {
        console.error('Failed to load genres:', error);
        setGenres([]); // Fallback to empty array
      } finally {
        setLoadingGenres(false);
      }
    };
    loadGenres();
  }, []);

  const handleSearch = async (query: string, genreFilter = selectedGenre) => {
    if (!query.trim() && !genreFilter) return;

    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }

    setLoadingSearch(true);
    try {
      const data = await searchMovies(query, genreFilter); // Call the API to search movies
      setSearchResults(Array.isArray(data) ? data : []); // Ensure search results is an array
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]); // Fallback to empty array
    } finally {
      setLoadingSearch(false);
    }
  };

  const clearRecentSearch = (text: string) => {
    setRecentSearches(recentSearches.filter(item => item !== text));
  };

  const clearAll = () => {
    setRecentSearches([]);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>Search</Text>

      {/* Search Input */}
      <View style={styles.searchInputContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/622/622669.png',
          }}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies, actors, genres..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => handleSearch(searchText)}
        />
      </View>

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Categories</Text>
      {loadingGenres ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={styles.genreGrid}>
          {genres.length > 0 ? (
            genres.map(genre => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.genreBox,
                  selectedGenre === genre && styles.genreBoxActive,
                ]}
                onPress={() => {
                  const newGenre = selectedGenre === genre ? '' : genre;
                  setSelectedGenre(newGenre);
                  handleSearch(searchText, newGenre);
                }}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/616/616554.png',
                  }}
                  style={styles.genreIcon}
                />
                <Text style={styles.genreText}>{genre}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noGenresText}>No categories available</Text>
          )}
        </View>
      )}

      {/* Search Results Section */}
      <Text style={styles.sectionTitle}>Search Results</Text>
      {loadingSearch ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({item}) => (
            <View style={styles.resultCard}>
              <Image source={{uri: item.poster}} style={styles.resultImage} />
              <Text style={styles.resultTitle}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}

      {/* Recent Searches Section */}
      {recentSearches.length > 0 && (
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearAll}>Clear all</Text>
            </TouchableOpacity>
          </View>
          {recentSearches.map(item => (
            <TouchableOpacity key={item} onPress={() => handleSearch(item)}>
              <View style={styles.recentItem}>
                <Text style={styles.recentText}>{item}</Text>
                <TouchableOpacity onPress={() => clearRecentSearch(item)}>
                  <Text style={styles.clearIcon}>×</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f14', // Black background
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1f26',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#fff', // White color for icon
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#fff',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  genreBox: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#292e3a',
    padding: 12,
    borderRadius: 10,
    gap: 10,
  },
  genreBoxActive: {
    backgroundColor: '#1E90FF',
  },
  genreIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff', // White color for icon
  },
  genreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  noGenresText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultImage: {
    width: 50,
    height: 75,
    borderRadius: 4,
    marginRight: 12,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
  },
  noResultsText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  recentContainer: {
    marginTop: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearAll: {
    color: '#1E90FF',
    fontSize: 14,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#333',
  },
  recentText: {
    color: '#ccc',
    fontSize: 14,
  },
  clearIcon: {
    color: '#ccc',
    fontSize: 18,
  },
});

export default SearchScreen;