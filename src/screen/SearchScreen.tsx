import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const trendingNow = [
  {
    id: '1',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi',
    poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
  },
  {
    id: '2',
    title: 'The Creator',
    genre: 'Action',
    poster: 'https://image.tmdb.org/t/p/w500/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg',
  },
  {
    id: '3',
    title: 'Poor Things',
    genre: 'Drama',
    poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
  },
];

const allCategories = [
  { label: 'Action', color: '#FF6B6B' },
  { label: 'Comedy', color: '#6BCBFF' },
  { label: 'Drama', color: '#9B59B6' },
  { label: 'Horror', color: '#2C3E50' },
  { label: 'Sci-Fi', color: '#FFA07A' },
  { label: 'Romance', color: '#FF69B4' },
  { label: 'Fantasy', color: '#00FA9A' },
  { label: 'Thriller', color: '#808080' },
];

const SearchScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filteredMovies, setFilteredMovies] = useState(trendingNow);

  const handleSearch = () => {
    // Add to recent searches if valid and not duplicate
    if (searchText.trim() && !recentSearches.includes(searchText)) {
      setRecentSearches([searchText, ...recentSearches.slice(0, 4)]); // Limit recent searches to 5
    }

    // Filter movies based on search text and selected genre
    const filtered = trendingNow.filter(
      movie =>
        (!selectedGenre || movie.genre === selectedGenre) &&
        movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(filtered);

    setSearchText(''); // Clear input after search
  };

  const handleGenreSelect = (genre: string) => {
    const genreToSearch = genre === selectedGenre ? null : genre; // Toggle genre selection
    setSelectedGenre(genreToSearch);

    // Add genre to recent searches if not already present
    if (genreToSearch && !recentSearches.includes(genreToSearch)) {
      setRecentSearches([genreToSearch, ...recentSearches.slice(0, 4)]); // Limit recent searches to 5
    }

    // Filter movies based on the selected genre
    const filtered = trendingNow.filter(
      movie => !searchText || movie.genre === genreToSearch
    );
    setFilteredMovies(filtered);
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  const filteredCategories = showAllCategories
    ? allCategories
    : allCategories.slice(0, 4);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchBar}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/149/149852.png',
          }}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Movies, actors, genres..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
          onPress={handleSearch} // Only update the text input, no filtering here
        />
        {/* <TouchableOpacity style={styles.okButton} >
          <Text style={styles.okButtonText}></Text>
        </TouchableOpacity> */}
      </View>

      <Text style={styles.sectionTitle}>Trending Now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredMovies.map(item => (
          <View key={item.id} style={styles.trendingCard}>
            <Image source={{ uri: item.poster }} style={styles.trendingImage} />
            <Text style={styles.trendingTitle}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={[
          ...filteredCategories,
          { label: showAllCategories ? 'View Less' : 'View All', isToggle: true },
        ]}
        numColumns={2}
        keyExtractor={(item, index) => item.label + index}
        renderItem={({ item }) => {
          if (item.isToggle) {
            return (
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: '#333' }]}
                onPress={() => setShowAllCategories(!showAllCategories)}>
                <Text style={[styles.categoryText, { color: '#FFD700' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }
          const isSelected = item.label === selectedGenre;
          return (
            <TouchableOpacity
              style={[
                styles.categoryCard,
                { backgroundColor: isSelected ? '#FFD700' : item.color || '#333' },
              ]}
              onPress={() => handleGenreSelect(item.label)}>
              <Text
                style={[
                  styles.categoryText,
                  { color: isSelected ? '#000' : '#fff' },
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
        columnWrapperStyle={styles.categoryRow}
      />

      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        {recentSearches.length > 0 && (
          <TouchableOpacity onPress={clearAllRecentSearches}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {recentSearches.map((item, index) => (
        <View key={index} style={styles.recentRow}>
          <Text style={styles.recentBullet}></Text>
          <Text style={styles.recentText}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#888',
  },
  searchInput: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  // okButton: {
  //   backgroundColor: '#FFD700',
  //   borderRadius: 5,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   marginLeft: 10,
  // },
  // okButtonText: {
  //   color: '#000',
  //   fontWeight: 'bold',
  //   fontSize: 14,
  // },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
    marginTop: 10,
  },
  trendingCard: {
    marginRight: 12,
    width: 120,
  },
  trendingImage: {
    width: '100%',
    height: 170,
    borderRadius: 10,
  },
  trendingTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#ccc',
  },
  recentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clearAll: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentBullet: {
    fontSize: 12,
    marginRight: 8,
    color: '#FFD700',
  },
  recentText: {
    fontSize: 16,
    color: '#ccc',
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    marginBottom: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchScreen;