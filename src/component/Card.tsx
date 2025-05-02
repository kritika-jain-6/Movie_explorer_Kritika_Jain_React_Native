import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getMovieDetails } from '../api/MovieAPI';
import { useNavigation } from '@react-navigation/native';

// Get device width and height
const { width, height } = Dimensions.get('window');

interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  release_year: string;
  duration: string;
  poster_url: string; // Update to match the API field for the image URL
}

const MovieItem = ({ item }: { item: Movie }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { movie: item })}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster_url }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.details}>
          {item.release_year} | {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Card = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovieDetails();
        setMovies(movieData.movies);
      } catch (err: any) {
        console.error('Error fetching movies:', err.message);
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
  },
  item: {
    borderRadius: 10,
    marginRight: 15,
    width: width * 0.4,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 8,
  },
  title: {
    color: '#fff', // White text for title
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
  rating: {
    color: '#fff', // White text for rating
  },
  details: {
    color: '#fff', // White text for details
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff', // White text for loading state
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff', // White text for error message
    fontSize: 16,
  },
});
export default Card;
