import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  release_year: string;
  duration: string;
  poster_url: string;
  description: string;
}

const MovieDetailScreen = ({ route }: { route: RouteProp<any> }) => {
  const { movie } = route.params as { movie: Movie };
  const navigation = useNavigation();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png', // arrow-left icon
          }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Movie Poster */}
      <Image source={{ uri: movie.poster_url }} style={styles.detailPoster} />

      {/* Movie Info */}
      <Text style={styles.detailTitle}>{movie.title}</Text>
      <Text style={styles.detailGenre}>{movie.genre}</Text>
      <Text style={styles.detailGenre}>⭐ {movie.rating}</Text>
      <Text style={styles.detailGenre}>Year: {movie.release_year}</Text>
      <Text style={styles.detailGenre}>Duration: {movie.duration}</Text>
      <Text style={styles.detailDescription}>{movie.description}</Text>

      {/* Watchlist Button */}
      <TouchableOpacity
        style={[styles.watchlistButton, isInWatchlist && styles.watchlistActive]}
        onPress={toggleWatchlist}
      >
        <Image
          source={{
            uri: isInWatchlist
              ? 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png' // filled bookmark
              : 'https://cdn-icons-png.flaticon.com/512/1828/1828971.png', // outline bookmark
          }}
          style={styles.icon}
        />
        <Text style={styles.watchlistText}>
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
    backgroundColor: '#111',
    padding: 8,
    borderRadius: 20,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFD700',
  },
  detailPoster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 60,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  detailGenre: { fontSize: 18, color: '#ccc', marginBottom: 10 },
  detailDescription: {
    color: '#eee',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  watchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  watchlistActive: { backgroundColor: '#333' },
  watchlistText: { color: '#FFD700', fontSize: 16, marginLeft: 8 },
});

export default MovieDetailScreen;
