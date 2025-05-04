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

import { useWatchlist } from '../context/WatchlistContext'; // Import the context

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
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);
  return (
<View style={styles.container}>
<ScrollView   >
      {/* Back Arrow */}
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png', // arrow-left icon
          }}
          style={styles.icon}
        />
         </View>
      </TouchableOpacity>
     

      {/* Movie Poster */}
      <Image source={{ uri: movie.poster_url }} style={styles.detailPoster} />

      {/* Movie Info */}
      <Text style={styles.detailTitle}>{movie.title}</Text>
      <Text style={styles.detailGenre}>{movie.genre}</Text>
      <Text style={styles.detailGenre}>⭐ {movie.rating}/10</Text>
      <Text style={styles.detailGenre}>Year: {movie.release_year}</Text>
      <Text style={styles.detailGenre}>Duration: {movie.duration} min</Text>
      <Text style={styles.detailDescription}>{movie.description}</Text>

      {/* Watchlist Button */}
      <TouchableOpacity
          style={styles.watchlistButton}
          onPress={() => toggleWatchlist(movie)}
        >
          <Text style={styles.watchlistText}>
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Text>
        </TouchableOpacity>
    </ScrollView>
</View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    // backgroundColor: '#111',
    padding: 8,
    borderRadius: 20,
    top: 0,
    zIndex:1,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    // flex:1,
  },
  detailPoster: {
    width: '100%',
    height: 520,
    borderRadius: 10,
    marginBottom: 20,
    // marginTop: 60,
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
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFD700'
  },
  // watchlistActive: {  backgroundColor: '#222', },
  watchlistText: { color: '#FFFFF', fontSize: 16, marginLeft: 8 },
});

export default MovieDetailScreen;
