import React, { useState } from 'react';
import {
  View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList, Image,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

// Inline movies data with poster URLs and descriptions
const moviesData = [
  {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi',
    poster: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
    description: 'A skilled thief leads a team into people\'s dreams to steal secrets.'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    genre: 'Action',
    poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
    description: 'Batman faces the Joker, a criminal mastermind bent on chaos.'
  },
  {
    id: '3',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    description: 'A team of explorers travels through a wormhole to save humanity.'
  },
  // ... add more movies
];

const SearchScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredResults, setFilteredResults] = useState<typeof moviesData>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filtered = moviesData.filter(
      (movie) =>
        movie.title.toLowerCase().includes(text.toLowerCase()) ||
        movie.genre.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredResults(filtered);

    if (text.trim() && !recentSearches.includes(text)) {
      setRecentSearches([text, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearRecentSearch = (text: string) => {
    setRecentSearches(recentSearches.filter(item => item !== text));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies or genres..."
        placeholderTextColor="#FFD700"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => handleSearch(searchText)}
      />
      <TouchableOpacity onPress={() => handleSearch(searchText)}>
        <Text style={styles.cancelText}>Search</Text>
      </TouchableOpacity>

      {recentSearches.length > 0 && (
        <View style={styles.history}>
          <Text style={styles.label}>Recent Searches</Text>
          {recentSearches.map((item) => (
            <View key={item} style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={() => handleSearch(item)}>
                <Text style={styles.btnText}>{item}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearRecentSearch(item)}>
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.label}>Genres</Text>
      <View style={styles.genresContainer}>
        {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Fantasy', 'Thriller'].map((genre) => (
          <TouchableOpacity
            key={genre}
            style={styles.genreButton}
            onPress={() => handleSearch(genre)}
          >
            <Text style={styles.genreText}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display search results */}
      {filteredResults.length > 0 && (
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { movie: item })}>
              <View style={styles.card}>
                <Image source={{ uri: item.poster }} style={styles.poster} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.genre}>{item.genre}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  searchInput: {
    height: 45, borderColor: '#FFD700', borderWidth: 1,
    borderRadius: 10, paddingHorizontal: 12, color: '#FFD700', marginBottom: 10,
  },
  cancelText: { color: '#FFD700', textAlign: 'right', marginBottom: 10 },
  history: { marginBottom: 20 },
  label: { color: '#FFD700', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  btnContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  btn: { backgroundColor: '#222', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10 },
  btnText: { color: '#FFD700', fontSize: 14 },
  deleteText: { color: '#FFD700', fontSize: 18 },
  genresContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  genreButton: { backgroundColor: '#222', borderRadius: 20, padding: 10, margin: 5 },
  genreText: { color: '#FFD700' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    alignItems: 'center'
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  genre: {
    color: '#ccc',
  },
});

export default SearchScreen;
